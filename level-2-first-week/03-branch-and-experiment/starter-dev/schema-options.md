# User Activity Tracking — Schema Decision

## The feature
We need to track user activity in the Nova Analytics dashboard — page views, feature usage, click events — for internal analytics (not customer-facing).

## Requirements
- Record every meaningful user action (event type, user ID, timestamp, metadata)
- Query: "Which features does user X use most?"
- Query: "How many users clicked the export button this week?"
- Query: "What's the average session length by plan tier?"
- Volume: ~500 events/user/day, ~10,000 active users
- Retention: 90 days of raw data, indefinite aggregates

## Two approaches under consideration

### Option A: Event log table
Store every event as a raw row. Query at read time.

### Option B: Pre-aggregated counters
Store summary counts per user/feature/day. Update on write.

## Tradeoffs we're unsure about
- Read speed vs write complexity
- Storage cost at scale
- Flexibility for ad-hoc queries we haven't thought of yet
- Migration cost if we change our mind later

## Decision needed
We want to prototype both schemas, see what the queries look like, and decide.
