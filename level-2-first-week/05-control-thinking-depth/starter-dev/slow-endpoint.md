# Performance Issue: /api/v2/dashboard/summary

## Reported By
Sarah Chen, Senior Frontend Engineer — filed Friday 4:47pm

## Symptoms
- The `/api/v2/dashboard/summary` endpoint averages 4.2 seconds response time
- P95 latency is 11.8 seconds
- Customer complaints escalating — three enterprise accounts mentioned it in QBRs this quarter
- Frontend team added a loading spinner six months ago as a "temporary fix"

## What the Endpoint Does
Returns a JSON payload summarizing the user's dashboard:
- Active alert count (across all channels)
- Churn risk distribution (low/medium/high/critical buckets)
- Top 5 at-risk accounts with scores and last-contact dates
- 30-day trend sparkline data (alert volume, response time, churn rate)
- Segment breakdown (counts per saved segment)

## Current Implementation (simplified)

```python
@app.route("/api/v2/dashboard/summary")
@auth_required
def dashboard_summary():
    user = get_current_user()
    org = user.organization

    # 1. Count active alerts
    alerts = db.query(Alert).filter(
        Alert.org_id == org.id,
        Alert.status == "active"
    ).all()
    alert_count = len(alerts)

    # 2. Churn risk distribution
    accounts = db.query(Account).filter(Account.org_id == org.id).all()
    risk_buckets = {"low": 0, "medium": 0, "high": 0, "critical": 0}
    for account in accounts:
        score = calculate_churn_score(account)  # hits ML service
        bucket = classify_risk(score)
        risk_buckets[bucket] += 1

    # 3. Top 5 at-risk
    all_scores = []
    for account in accounts:
        score = calculate_churn_score(account)  # called AGAIN
        all_scores.append({"account": account, "score": score})
    top_5 = sorted(all_scores, key=lambda x: x["score"], reverse=True)[:5]

    # 4. Trend data (last 30 days)
    trends = {}
    for day_offset in range(30):
        date = datetime.now() - timedelta(days=day_offset)
        trends[date.isoformat()] = {
            "alerts": db.query(Alert).filter(
                Alert.org_id == org.id,
                Alert.created_at >= date,
                Alert.created_at < date + timedelta(days=1)
            ).count(),
            "avg_response": db.query(func.avg(Alert.response_time)).filter(
                Alert.org_id == org.id,
                Alert.resolved_at >= date,
                Alert.resolved_at < date + timedelta(days=1)
            ).scalar() or 0,
        }

    # 5. Segment breakdown
    segments = db.query(Segment).filter(Segment.org_id == org.id).all()
    segment_counts = {}
    for seg in segments:
        # Re-evaluates segment filter for every segment
        count = db.query(Account).filter(
            Account.org_id == org.id,
            *seg.build_filter_clauses()
        ).count()
        segment_counts[seg.name] = count

    return jsonify({
        "alert_count": alert_count,
        "risk_distribution": risk_buckets,
        "top_at_risk": serialize_top_5(top_5),
        "trends": trends,
        "segments": segment_counts
    })
```

## Known Context
- The ML service (`calculate_churn_score`) takes ~200ms per call
- Average org has ~150 accounts
- The endpoint is called on every dashboard page load (no caching)
- Database is PostgreSQL on RDS (db.r6g.xlarge)
- No read replica configured
- The 30-day trend query runs 60 individual queries (2 per day × 30 days)
- Sarah's note: "I think there are at least 3 obvious problems and maybe 2 subtle ones"

## What We Need
1. A diagnosis: what's actually slow and why
2. A fix plan: ordered list of changes, estimated impact of each
3. A judgment call: should we fix incrementally or rewrite the endpoint?

## Constraints
- Can't change the API response shape (frontend depends on it)
- Can't add new infrastructure without VP approval (no Redis, no new services)
- Need something shippable by end of next sprint (2 weeks)
- The ML service API is owned by the data team — we can batch-call it but can't change its internals
