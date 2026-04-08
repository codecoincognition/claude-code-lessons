# ADR-014 — Job Queue: Rebuild or Replace?

**Status:** Draft — Decision Required
**Author:** eng-team
**Date:** 2026-04-07

## Context

Our background job system (`nova-jobs`) is the piece that runs:
- Nightly billing reconciliation
- Alert evaluation (the new Multi-Channel Alerts feature, Lesson topic)
- CSV exports requested by customers
- Webhook retries to customer systems
- Scheduled report generation

It was built in 2022 on a homegrown Postgres-backed queue (jobs as rows in a `jobs` table, workers poll with `SELECT ... FOR UPDATE SKIP LOCKED`). It handled us well through 2024 but has been showing strain:

- **Throughput ceiling.** We're hitting ~400 jobs/sec sustained, and the Postgres advisory lock contention is visible on our p95 latency graphs.
- **No priority lanes.** A backlog of CSV exports can starve alert evaluation. Last month a big customer's export blocked alerts for 11 minutes — exactly the product we're about to launch.
- **Observability is thin.** We have counters but no per-job tracing. When something gets stuck, we find out from customers.
- **Retry logic is ad hoc.** Each caller implements its own retry. Some retry forever, some give up after one attempt.

The Multi-Channel Alerts launch is 3 weeks out. We need a decision now because the launch will at least 3x our job volume, and alert jobs are latency-sensitive (the product promise is "near-real-time").

## Decision Required

Two paths. Both have champions on the team.

### Path A — Rebuild on top of what we have

Keep the Postgres queue. Invest 2 weeks hardening it:
- Add priority lanes (`HIGH`, `NORMAL`, `LOW`) as separate tables
- Add a shared retry module with exponential backoff
- Add OpenTelemetry spans per job
- Add a dead-letter queue with a runbook

**Claimed benefits:** No new infra. Our ops team already knows Postgres. Cheap. Reversible if wrong.
**Claimed risks:** We've already hit the throughput ceiling once. At 3x volume we might hit it again within a quarter. Then we're doing the rewrite under pressure.

### Path B — Replace with a managed queue (SQS or equivalent)

Move jobs off Postgres to a managed queue. Build a thin worker framework on top.
- Native priority queues (SQS has FIFO + standard; we'd use separate queues per priority)
- Native DLQ
- Native retry semantics
- Scales horizontally without Postgres pressure

**Claimed benefits:** Solves the throughput ceiling for the foreseeable future. Better primitives. Ops burden shifts to AWS.
**Claimed risks:** New infra to learn. Two-week migration minimum for jobs that must keep running (billing, webhooks). No local dev story for SQS (localstack exists but is janky). Harder to reason about exactly-once — we currently rely on Postgres transactions for some jobs and that guarantee disappears.

## What the team has said so far

- **Senior eng #1 (platform):** Strongly for Path B. "We're going to do this eventually. Doing it under launch pressure is worse than doing it now."
- **Senior eng #2 (billing):** Strongly for Path A. "Billing relies on transactional job+state updates in the same Postgres transaction. Moving to SQS means we invent a new pattern for the exact code path where correctness matters most."
- **SRE lead:** Leaning A, but nervous. "We don't have the headcount to babysit new infra through a launch."
- **VP Eng:** Hasn't weighed in. Wants a recommendation from the ADR.

## What the ADR does NOT currently address

- We haven't quantified how much of the current load is actually throughput-bound vs. lock-contention-bound. A targeted fix to the advisory lock pattern might buy us another year on Path A without the full rebuild.
- We haven't asked what happens to each path if Multi-Channel Alerts underperforms and volume stays flat.
- We haven't asked whether a hybrid is possible: keep billing on Postgres (for the transactional guarantee), move alert evaluation to SQS (where throughput and latency matter most).

## Decision

*To be filled in after review.*
