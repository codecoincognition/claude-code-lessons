# API Gateway — Rate Limiter Specification

## Context
We run a public REST API serving 2,400 customers. Current rate limiting is a simple fixed-window counter in Redis — 100 requests per minute per API key. This causes two problems:

1. **Burst penalty:** A client that sends 80 requests in second 1 and 20 in second 2 hits the limit at 100, even though their average rate is reasonable. The fixed window does not account for distribution within the window.

2. **Window boundary spike:** At the start of each new minute, throttled clients retry simultaneously, causing a traffic spike. This has triggered two outages in the last quarter when the spike exceeded backend connection pool capacity.

## Target: Sliding Window Rate Limiter

Replace the fixed-window counter with a sliding window algorithm that smooths traffic and eliminates boundary spikes.

### Algorithm: Sliding Window Log
For each API key, maintain a sorted set in Redis where each entry is a request timestamp. On each request:

1. Remove all entries older than the window duration (60 seconds)
2. Count remaining entries
3. If count >= limit, reject with 429
4. If count < limit, add current timestamp and allow

This is more memory-intensive than fixed windows but eliminates boundary spikes entirely.

### Redis Schema
```
Key:     ratelimit:{api_key}
Type:    Sorted Set (ZSET)
Members: Request timestamps (Unix ms)
Score:   Same as member (timestamp)
TTL:     120 seconds (2x window for cleanup safety)
```

### Current Code (To Be Replaced)

```python
from fastapi import Request, HTTPException
from redis import Redis
import time

redis_client = Redis(host="redis.internal", port=6379, db=0, decode_responses=True)

DEFAULT_RATE = 100  # requests per minute
WINDOW_SECONDS = 60

async def rate_limiter(request: Request):
    """Fixed-window rate limiter — replace this."""
    api_key = request.headers.get("X-API-Key")
    if not api_key:
        raise HTTPException(status_code=401, detail="Missing API key")
    
    window_key = f"rate:{api_key}:{int(time.time()) // WINDOW_SECONDS}"
    
    pipe = redis_client.pipeline()
    pipe.incr(window_key)
    pipe.expire(window_key, WINDOW_SECONDS)
    count, _ = pipe.execute()
    
    if count > DEFAULT_RATE:
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded",
            headers={
                "Retry-After": str(WINDOW_SECONDS - (int(time.time()) % WINDOW_SECONDS)),
                "X-RateLimit-Limit": str(DEFAULT_RATE),
                "X-RateLimit-Remaining": "0"
            }
        )
    
    request.state.rate_remaining = DEFAULT_RATE - count


class RateLimiterConfig:
    """Per-tier rate limits."""
    TIERS = {
        "free":       {"rate": 30,   "window": 60, "burst_multiplier": 1.0},
        "starter":    {"rate": 100,  "window": 60, "burst_multiplier": 1.5},
        "business":   {"rate": 500,  "window": 60, "burst_multiplier": 2.0},
        "enterprise": {"rate": 2000, "window": 60, "burst_multiplier": 2.0},
    }
    
    @classmethod
    def get_tier(cls, api_key: str) -> dict:
        """Look up tier from API key prefix.
        Keys are formatted as: tier_randomstring
        Example: business_a8f3k2m9x1
        """
        prefix = api_key.split("_")[0] if "_" in api_key else "free"
        return cls.TIERS.get(prefix, cls.TIERS["free"])
```

## Requirements for New Implementation

### Core: Sliding Window
- Replace fixed-window with sliding window log algorithm
- Use Redis ZSET for timestamp storage
- Support per-tier rate limits from `RateLimiterConfig`
- Return standard rate limit headers on every response:
  - `X-RateLimit-Limit`: max requests allowed
  - `X-RateLimit-Remaining`: requests left in current window
  - `X-RateLimit-Reset`: Unix timestamp when window resets
  - `Retry-After`: seconds to wait (only on 429)

### Burst Mode
- For the first 10 seconds after a new client appears (no prior requests in window), allow `burst_multiplier × rate` requests
- After 10 seconds, enforce the standard rate
- Burst mode resets only after the client has zero requests in the window (fully idle)

### Health Endpoint
- `GET /rate-limiter/health` — returns JSON:
  ```json
  {
    "tracked_clients": 1847,
    "avg_request_rate": 42.3,
    "throttled_clients": 12,
    "window_seconds": 60,
    "uptime_seconds": 86400
  }
  ```

### Structured Logging
- Log every throttle event as JSON:
  ```json
  {
    "event": "rate_limit_exceeded",
    "timestamp": "2025-07-15T14:23:01.456Z",
    "api_key_prefix": "business",
    "client_ip": "203.0.113.42",
    "current_rate": 512,
    "limit": 500,
    "tier": "business",
    "burst_active": false
  }
  ```
- Use Python `logging` with a JSON formatter — not print statements

## Open Questions
- Should we implement a global rate limit (across all API keys) to protect backend capacity? Current thinking: yes, at 50,000 req/min total.
- The enterprise tier has clients doing 1,800 req/min sustained. Should we add a "custom" tier or handle these as configuration overrides?
- Redis ZSET memory: at 2,000 req/min, each key holds up to 2,000 entries. With 2,400 clients, worst case is 4.8M entries. Is this acceptable, or should we switch to a hybrid approach (sliding window counter) for high-volume tiers?
