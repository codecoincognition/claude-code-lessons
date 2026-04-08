# Lesson 04: Pick the Right Model for the Job

**Time:** 15 minutes
**Builds on:** Lesson 03 (branching, experimentation mindset)
**What you'll cover:** `/model`, `/effort`, and when to swap Haiku, Sonnet, and Opus mid-session — so you stop paying Opus prices for bulk work, and stop asking Haiku to make decisions it can't make.

**Pick your track:**
- **Builder track** → `starter-builder/` (ship a launch campaign)
- **Developer track** → `starter-dev/` (triage bugs + make one architecture call)

---

## The Problem This Lesson Solves

Claude Code has three models. Most people pick one at install and never touch the setting again. That's the sledgehammer problem — using the same tool for every job, whether the job is driving a nail or cutting a gemstone.

| Model | Best at | Think of it as |
|-------|---------|----------------|
| **Haiku** | Fast, cheap, bulk work — transcripts, classification, boilerplate, quick drafts | The intern who's fast and cheerful but shallow |
| **Sonnet** | Everyday coding, writing, analysis — the default | The senior teammate who handles 80% of your work |
| **Opus** | Deep reasoning, architecture, tricky debugging, strategic thinking | The principal who's expensive but worth it for the hard calls |

The mistake isn't picking the wrong model once. It's never switching. A single session might include bug triage, a judgment call, and one architecture decision — three completely different workloads — and most people run all three on whatever the default was.

`/model` lets you switch mid-session. `/effort` lets you dial the thinking depth up or down without switching models at all.

---

## Before You Start — Git Baseline

Same habit from Lessons 02 and 03: take a snapshot so you can undo anything that goes sideways. If you've done those lessons, this is muscle memory. If not, don't worry about what git is — just run this in your **terminal** (not inside Claude):

```bash
git init && git add . && git commit -m "baseline: lesson 04 start"
```

If you see "already a git repo" or "nothing to commit" — that's fine, you're already snapshotted. Either way, move on.

---

## Part 1: See Your Current Model (1 min)

In your **terminal**, launch Claude in your track:

### Builder Track
```bash
cd starter-builder
claude
```

### Developer Track
```bash
cd starter-dev
claude
```

Wait for the Claude Code prompt to appear. That's the signal you're **inside Claude** now — slash commands work here, not back in the terminal. Type this:

```
/model
```

**Expected result:** Claude shows your current model (likely Sonnet, which is the default) and either confirms it in text or opens an interactive picker you can arrow through. Either is fine — you're just reading, not choosing yet.

> **Stuck?** If your terminal says "command not found: /model," you're still in the shell. Run `claude` first, wait for the Claude prompt (you'll see it change), then type `/model` there.
>
> **Note on arguments:** `/model` with no argument opens the picker. `/model sonnet` and `/model opus` switch directly using the short aliases. For Haiku, `/model haiku` works on most plans; if it doesn't, open the picker with `/model` and pick Haiku from the list. Full names like `/model claude-sonnet-4-6` also work.

---

## Part 2: Use Haiku for the Bulk Work (4 min)

This is work where speed and volume matter more than depth. You want ten outputs, fast, and you'll pick the best one.

Switch to Haiku:

```
/model haiku
```

### Builder Track — 15 subject lines
```
Using @campaign-brief.md, generate 15 subject lines for the launch
email — 3 in each of these styles:

- Direct: "Multi-Channel Alerts is live"
- Benefit-led: "Stop finding out about churn at 5pm on Friday"
- Question: "What do you want to know before your customer churns?"
- Curious: "We almost didn't build this"
- Contrarian: "Another alerts tool? Kind of."

Keep each under 60 characters. Output format: labeled list, nothing else.
```

**Expected result:** 15 subject lines come back fast, grouped by style. Some will be good, some will be mediocre — that's fine, volume is the point. Don't judge them yet. You'll pick winners in Part 3.

### Developer Track — Bug triage
```
Using @bug-reports.md, triage all 8 bugs. Output one line per bug:

BUG-ID | severity (P0/P1/P2/P3) | one-sentence summary | likely area

Example: BUG-001 | P1 | Enterprise dashboard returning stale data for 6+ hours | caching/read replica

No explanations. Just the table.
```

**Expected result:** 8 triage lines in the exact format above, fast. Scan the severities — if Haiku got something obviously wrong (the SSO outage as a P3, say), note it but don't argue with it yet. This is Haiku doing what it's good at: pattern-matching at speed.

---

## Part 3: Switch to Sonnet for the Middle Work (4 min)

Now the work shifts. You need judgment, not just throughput. Sonnet is the default for a reason.

```
/model sonnet
```

### Builder Track — Pick and polish
```
From the 15 subject lines, pick the 3 you'd actually send to a real
subscriber — the ones you think would get opens, not the ones that
just sound clever. Explain why each one works for our audience
(1 sentence each).

Then write the email body (under 200 words) that pairs with your
top pick. Make sure it:
- Matches the brief's voice (friendly, concrete, no "game-changer"
  or "unleash" type words)
- Includes one concrete scenario (use the "Friday 5pm churn" moment
  from the brief)
- Has a clear CTA ("Turn it on" is a good default)
```

### Developer Track — Fix one P1
```
Pick one of the P1 bugs you triaged. Propose a fix:
1. The actual code change (show the diff)
2. A one-line test that would have caught it
3. Whether this pattern exists elsewhere in the codebase
```

**Expected result:** Builder track — 3 ranked subject lines with one-sentence justifications each, plus an email body under 200 words that matches the brand voice. Developer track — a proposed diff, a test that would have caught the bug, and a yes/no on whether the pattern exists elsewhere. Sonnet is the right depth for this kind of judgment work.

---

## Part 4: Escalate to Opus for the Hard Call (4 min)

Now the decision that actually matters. Haiku would give you a confident wrong answer; Sonnet would give you a reasonable one that misses half the tradeoffs. You want the principal engineer in the room.

Switch models AND crank the effort:

```
/model opus
/effort high
```

### Builder Track — Campaign strategy
```
Using @campaign-brief.md and everything you now know about the
Nova voice, resolve the positioning tension. The brief gave us
three directions and said the team is split. Pick one.

Give me:
1. Your call (feature-first, outcome-first, or contrarian)
2. Why it beats the other two for THIS audience THIS week
3. The single biggest risk of being wrong
4. Anything in the brief you'd push back on
```

### Developer Track — Architecture call
```
Using @architecture-decision.md, review the ADR. Two valid paths,
team is split. Give me:

1. Your recommendation (one paragraph, no fence-sitting)
2. 12-month cost of each path IF we pick it and we're wrong
3. Which path is reversible, which locks us in
4. One question we should answer BEFORE deciding — something
   the ADR didn't raise
```

**Expected result:** A real recommendation (not "it depends"), plus the reasoning behind it. Opus + high effort runs slower — sometimes 30+ seconds — and costs more per token. You don't use it for subject lines. You use it when being wrong costs a quarter.

---

## Part 5: Drop Back Down (1 min)

When the hard thinking is done, drop back to Sonnet so you're not burning Opus tokens on follow-ups:

```
/model sonnet
/effort medium
```

This is the habit that matters. **Escalate for the decision, drop back for the execution.**

---

## Part 6: The Model-Picking Mindset (bonus)

Ask yourself three questions before every non-trivial task:

1. **Volume or depth?** Lots of outputs → Haiku. One good output → Sonnet or Opus.
2. **Reversible or not?** If being wrong is cheap, Sonnet. If being wrong costs a week, Opus.
3. **Am I thinking or typing?** Typing work (boilerplate, refactors, drafts) → cheaper model. Thinking work (architecture, positioning, strategy) → Opus + high effort.

> **Relationship to earlier lessons:**
> - Lesson 02 (Rewind) taught you to undo.
> - Lesson 03 (Branch) taught you to explore alternatives.
> - Lesson 04 (Model) teaches you to match the tool to the job.
>
> Together: you can undo, explore, and right-size the brain doing the work.

---

## Success Criteria

- [ ] You ran `/model` and saw your current model
- [ ] You used Haiku for bulk work (Part 2)
- [ ] You used Sonnet for judgment work (Part 3)
- [ ] You used Opus + `/effort high` for the hard decision (Part 4)
- [ ] You dropped back to Sonnet when the hard thinking ended (Part 5)
- [ ] You can explain *why* you picked each model for each part

---

## Key Takeaways

| Concept | What It Does | When to Use |
|---------|-------------|-------------|
| `/model` | Shows current model, opens picker | Anytime you want to check or change |
| `/model sonnet` \| `/model opus` | Switch models mid-session | When the work inside your session changes shape |
| `/effort low\|medium\|high\|max\|auto` | Dial thinking depth up or down | `high` for hard calls; `max` requires Opus 4.6 and only applies to the current session; `auto` resets to the model default |
| `--model` (CLI flag) | Set the starting model when launching Claude | `claude --model opus` (aliases `sonnet`/`opus`/`haiku` preferred over full names) |

---

## What's Next

**Lesson 05: Control Thinking Depth** — you already touched `/effort` here. Next lesson goes deeper: when `high` beats `max`, when `low` is actually right, and how thinking depth changes the shape of the answer (not just the length).
