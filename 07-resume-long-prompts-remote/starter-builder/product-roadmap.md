# Product Roadmap — Nimbus Cloud Storage (Q3 2025)

## Company Context
Nimbus is a cloud storage platform for creative teams — designers, video editors, and marketing departments who need fast preview, version control, and real-time collaboration on large files (500MB+ PSDs, 4K video, Figma exports). 12,000 paying teams, $4.2M ARR, Series A funded.

## Q3 Theme: "Speed and Trust"
After feedback from 200+ user interviews, Q3 focuses on two pillars: making large file operations feel instant, and earning the trust needed for teams to consolidate onto Nimbus from Dropbox/Google Drive.

## Shipped Features (Q3)

### 1. Instant Preview Engine
**Status:** Shipped Week 2
**Impact:** Preview load time dropped from 8.2s to 0.9s for files under 2GB. Measured across 1.4M preview events.
**How:** Server-side rendering pipeline generates preview thumbnails on upload. Previously rendered on-demand when user opened the file.
**User quote:** "I used to go make coffee while waiting for a PSD preview. Now it is just there." — Design lead, Spotify brand team
**Metrics:**
- Preview load time: 8.2s → 0.9s (89% reduction)
- Preview abandonment rate: 34% → 6%
- Support tickets about slow previews: 142/week → 11/week

### 2. Granular Permissions V2
**Status:** Shipped Week 6
**Impact:** Enterprise adoption unblocked. Three Fortune 500 accounts signed within two weeks of launch.
**How:** Folder-level and file-level permission controls with inheritance. Previous system only had workspace-level roles.
**Key capability:** "View but not download" permission — the most requested feature in our history (847 Canny votes).
**Metrics:**
- Enterprise pipeline converted: 3 accounts ($380K combined ACV)
- Permission-related support tickets: 89/week → 23/week
- Average workspace member count: 12 → 31 (teams now add more people because they trust the controls)

### 3. Conflict-Free Merge for Design Files
**Status:** Shipped Week 9
**Impact:** Teams can now edit the same Figma-exported file simultaneously without overwrite conflicts.
**How:** Operational transform (OT) engine adapted for design file formats. Detects layer-level changes and merges non-conflicting edits automatically. Conflicting edits surface a visual diff.
**Metrics:**
- Overwrite incidents: 67/week → 0 (automated merge handles all non-conflicting cases)
- Manual merge time when conflicts detected: 45 min average → 8 min (visual diff reduces comparison work)
- Files with 3+ simultaneous editors: 12% → 38% (teams trust concurrent editing now)

## At-Risk Items

### Real-Time Sync (P0)
**Status:** 3 weeks behind schedule. Target was Week 8, now estimating Week 11.
**Risk:** Core dependency on WebSocket infrastructure hitting scaling issues above 500 concurrent connections per workspace.
**Impact if delayed:** Q4 launch of "Nimbus Live" (real-time co-editing marketing push) slips to Q1. Marketing has already committed $120K in launch spend.
**Mitigation:** Pulled two senior engineers from the CLI team. Running daily standups. Evaluating fallback to long-polling for workspaces above 500 connections.
**Owner:** Marcus Chen, Principal Engineer

### Mobile Upload Reliability (P1)
**Status:** Intermittent failures on iOS 17.4+ when uploading files over 200MB on cellular. Affects approximately 8% of mobile uploads.
**Risk:** App Store rating dropped from 4.6 to 4.2 in the last 30 days. Two one-star reviews specifically mention upload failures.
**Impact if unresolved:** Mobile is our fastest-growing channel (40% of new signups). Continued rating decline could reduce organic installs by 15-20%.
**Mitigation:** iOS engineer identified the issue — NSURLSession background transfer configuration conflict with iOS 17.4 changes. Fix in review, targeting next app release (10 days out).
**Owner:** Priya Patel, Mobile Lead

## Q3 Budget

| Category | Planned | Actual | Variance |
|----------|---------|--------|----------|
| Engineering (headcount) | $840K | $870K | +$30K (contractor for WebSocket work) |
| Infrastructure | $120K | $145K | +$25K (preview rendering compute) |
| Marketing | $95K | $82K | -$13K (postponed Nimbus Live spend) |
| Total | $1,055K | $1,097K | +$42K (4% over) |

## Open Questions for Board Review
1. Should we delay the Nimbus Live marketing push to Q1 to align with the real-time sync timeline? Or launch with a "beta" label in Q4?
2. The three Fortune 500 accounts want SOC 2 Type II. We have Type I. Cost to upgrade: $180K and 4 months. Prioritize in Q4?
3. Marcus is requesting a dedicated WebSocket team (3 engineers) for Q4. Current plan has them returning to CLI work. Which path?
4. Mobile is 40% of signups but 8% of revenue. Should Q4 roadmap weight mobile features more heavily?
