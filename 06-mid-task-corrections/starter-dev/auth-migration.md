# Auth Migration Plan — JWT to Session Tokens

## Context
We are migrating our authentication system from stateless JWT tokens to server-side session tokens stored in Redis. The migration must be backward-compatible — both auth methods must work simultaneously for 30 days before we deprecate JWTs.

## Current Architecture (JWT)
```
Client → API Gateway → JWT Middleware → Route Handler
                         ↓
                    Verify signature
                    Decode payload
                    Extract user_id, roles, exp
```

**Token structure:**
```json
{
  "sub": "user_12345",
  "roles": ["admin", "editor"],
  "org_id": "org_789",
  "exp": 1735689600,
  "iat": 1735603200,
  "jti": "tok_abc123"
}
```

**Known problems with current JWT setup:**
1. Tokens are valid for 24 hours. No way to revoke a compromised token before expiry.
2. Role changes do not take effect until the user logs out and back in.
3. The `jti` field exists but we never implemented a revocation list.
4. Token payload has grown to 1.2KB (added `permissions[]` array last quarter), causing header-size issues with some proxies.

## Target Architecture (Session Tokens)
```
Client → API Gateway → Session Middleware → Route Handler
                         ↓
                    Lookup session_id in Redis
                    Load user_id, roles, org_id
                    Check revocation / expiry
```

**Session token:** Opaque string, 32 bytes, stored as `sess_{base64}`. All user data lives in Redis, not the token.

**Redis schema:**
```
Key:   session:{session_id}
Value: {
  "user_id": "user_12345",
  "roles": ["admin", "editor"],
  "org_id": "org_789",
  "created_at": "2025-01-01T00:00:00Z",
  "last_active": "2025-01-01T12:00:00Z",
  "ip": "192.168.1.1",
  "user_agent": "Mozilla/5.0..."
}
TTL:   86400 (24 hours, sliding window)
```

## Migration Strategy (Dual-Auth Period)

### Phase 1: Build (Week 1–2)
- Implement session token creation on login
- Build Redis-backed session store
- Create dual-auth middleware that tries session token first, falls back to JWT
- Add `/api/auth/exchange` endpoint: takes valid JWT, returns session token

### Phase 2: Migrate (Week 3–4)
- Deploy dual-auth middleware to production
- Client apps start using `/api/auth/exchange` on startup
- Monitor: track % of requests using JWT vs session tokens
- Goal: <10% JWT traffic by end of Week 4

### Phase 3: Deprecate (Week 5–6)
- Log warnings on JWT-authenticated requests
- Send migration notice to API consumers
- Hard cutoff: reject JWTs after Day 30

## Code: Dual-Auth Middleware (Python / FastAPI)

```python
from fastapi import Request, HTTPException
from redis import Redis
import jwt
import time

redis_client = Redis(host="redis.internal", port=6379, db=0)
JWT_SECRET = "shared-secret-from-vault"

async def dual_auth_middleware(request: Request):
    auth_header = request.headers.get("Authorization", "")

    if auth_header.startswith("Bearer sess_"):
        # Session token path
        session_id = auth_header.replace("Bearer ", "")
        session_data = redis_client.get(f"session:{session_id}")
        if not session_data:
            raise HTTPException(status_code=401, detail="Invalid session")
        
        import json
        session = json.loads(session_data)
        
        # Sliding window: reset TTL on activity
        redis_client.expire(f"session:{session_id}", 86400)
        session["last_active"] = time.time()
        redis_client.set(
            f"session:{session_id}", 
            json.dumps(session), 
            ex=86400
        )
        
        request.state.user_id = session["user_id"]
        request.state.roles = session["roles"]
        request.state.org_id = session["org_id"]
        request.state.auth_method = "session"

    elif auth_header.startswith("Bearer ey"):
        # JWT path (legacy)
        token = auth_header.replace("Bearer ", "")
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        request.state.user_id = payload["sub"]
        request.state.roles = payload.get("roles", [])
        request.state.org_id = payload.get("org_id")
        request.state.auth_method = "jwt"

    else:
        raise HTTPException(status_code=401, detail="Missing or invalid auth")


async def exchange_jwt_for_session(request: Request):
    """POST /api/auth/exchange — swap a valid JWT for a session token."""
    auth_header = request.headers.get("Authorization", "")
    token = auth_header.replace("Bearer ", "")
    
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid JWT")
    
    import secrets, json
    session_id = f"sess_{secrets.token_urlsafe(24)}"
    session_data = {
        "user_id": payload["sub"],
        "roles": payload.get("roles", []),
        "org_id": payload.get("org_id"),
        "created_at": time.time(),
        "last_active": time.time(),
        "ip": request.client.host,
        "user_agent": request.headers.get("User-Agent", "unknown")
    }
    
    redis_client.set(f"session:{session_id}", json.dumps(session_data), ex=86400)
    return {"session_token": session_id, "expires_in": 86400}
```

## Open Questions
- Should we store session tokens in Redis Cluster or a single instance with replicas?
- How do we handle the race condition where a user's JWT is exchanged for a session token, but the Redis write has not replicated yet?
- Do we need to implement session pinning for WebSocket connections?
- Should the exchange endpoint rate-limit per user to prevent session flooding?
- What happens to active WebSocket connections when a session is revoked?
