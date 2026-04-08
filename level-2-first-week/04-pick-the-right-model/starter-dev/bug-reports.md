# Inbound Bug Reports — Week of 2026-04-06

Eight reports landed in the triage queue over the weekend. Triage them all, then pick one P1 to fix.

---

## BUG-001
**Reporter:** enterprise customer (ACME Corp, ~$4k MRR)
**Reported:** 2026-04-05 23:14 UTC
**Description:** "Dashboard is returning stale data. Our 'active users today' count hasn't changed in ~6 hours even though I can see live sessions in our logs. Refreshing doesn't help. Incognito mode doesn't help. Other customers on our team see the same stale numbers."
**Environment:** Production, enterprise tier, Postgres read replica
**Repro steps:** Open dashboard → "Active Users Today" tile shows value from 6 hours ago

---

## BUG-002
**Reporter:** free tier user
**Reported:** 2026-04-06 09:02 UTC
**Description:** "The export to CSV button is slightly misaligned on Firefox. It overlaps the filter icon by about 4 pixels."
**Environment:** Firefox 128, macOS
**Repro steps:** Dashboard → Exports panel → visual only

---

## BUG-003
**Reporter:** internal (support team)
**Reported:** 2026-04-06 11:40 UTC
**Description:** "Three customers this morning reported that password reset emails aren't arriving. I checked the logs — we're logging 'email sent' but SendGrid's dashboard shows 0 delivered for these addresses in the last 24 hours."
**Environment:** Production, affects password reset flow
**Repro steps:** Request password reset → no email arrives → logs say success

---

## BUG-004
**Reporter:** beta tester
**Reported:** 2026-04-06 14:22 UTC
**Description:** "When I click the new 'dark mode' toggle really fast (like 5 times in a row), sometimes the UI gets stuck in a half-state where the sidebar is dark but the main content is still light."
**Environment:** Chrome 125, stable beta branch
**Repro steps:** Rapidly toggle dark mode → inconsistent state

---

## BUG-005
**Reporter:** enterprise customer (Contoso)
**Reported:** 2026-04-06 15:55 UTC
**Description:** "Our SSO login is broken as of this morning. Users land on a 500 page after completing SAML handshake. Error: 'NameID format mismatch.' This was working Friday."
**Environment:** Production, SAML SSO, Okta IdP
**Repro steps:** Any user from Contoso attempts SSO login → 500

---

## BUG-006
**Reporter:** internal (engineering)
**Reported:** 2026-04-06 16:10 UTC
**Description:** "The nightly billing job failed last night with 'connection timeout'. It succeeded on retry this morning but I want to understand why. This has happened three times in the last two weeks."
**Environment:** Production cron, billing service → Stripe
**Repro steps:** Intermittent — check logs for `billing-nightly` job failures

---

## BUG-007
**Reporter:** paid tier user
**Reported:** 2026-04-06 17:03 UTC
**Description:** "The in-app search returns results in what feels like random order. Searching 'alerts' returns a 2023 blog post before the actual Alerts settings page. This worked better a month ago."
**Environment:** Production, search UI
**Repro steps:** Search for any common term → relevance is off

---

## BUG-008
**Reporter:** anonymous (via feedback widget)
**Reported:** 2026-04-07 02:18 UTC
**Description:** "why does the app log me out every like 30 minutes even when i'm actively using it. super annoying"
**Environment:** Unclear (no user agent captured)
**Repro steps:** Reporter didn't provide details
