# Lesson 03: Branch & Experiment

**Time:** 15 minutes
**Builds on:** Lesson 02 (rewind menu, experimentation mindset)
**What you'll cover:** `/branch` (aka `/fork`), parallel conversation branches, comparing approaches side by side, and the A/B testing mindset for AI sessions.

**Pick your track:**
- **Builder track** → `starter-builder/` (newsletter for a SaaS product)
- **Developer track** → `starter-dev/` (database schema decision)

---

## The Problem This Lesson Solves

You have two possible approaches. Which one will Claude execute better? You don't know — and you can't know without trying both.

Before `/branch`, you'd pick one, try it, maybe rewind, try the other, then try to compare them from memory. That's slow, lossy, and biased toward whichever you saw most recently.

`/branch` lets you try both at the same time. One conversation forks into two. Both evolve independently. You compare and pick the winner.

---

## Before You Start — Git Baseline

Same rule as Lesson 02: snapshot before you do anything.

```bash
!git init && git add . && git commit -m "baseline: lesson 03 start"
```

This gives you a recovery option if anything goes sideways, and practicing the habit now means it's automatic by Lesson 10.

---

## Part 1: Set Up Approach A (4 min)

Navigate to your track and launch Claude:

### Builder Track
```
cd starter-builder
claude
```

Read the context files and give Claude a clear brief:

```
@newsletter-draft.md @brand-notes.md

I need to rewrite this newsletter. Read the draft and brand notes.
Before writing anything, confirm you understand:
- Who the audience is
- What the 4 key points are
- What tone got us in trouble last time
```

Wait for Claude to confirm it understands. This context will carry into the branch — getting it right here saves you from repeating it twice.

### Developer Track
```
cd starter-dev
claude
```

```
@schema-options.md @existing-models.js

Read both files. Before proposing anything, confirm you understand:
- What we need to track and why
- The two approaches we're considering
- The three queries we need to run efficiently
- The volume and retention requirements
```

Again — wait for confirmation. Shared context at the branch point means both branches start from the same informed baseline.

---

## Part 2: Try Approach A (3 min)

Now give Claude the first approach to execute:

### Builder Track — Warm & Personal tone
```
Write the full newsletter using a warm, personal tone.
Lead with the 10,000 dashboards milestone as a human story
(our customers built something real, not a product stat).
Keep it under 250 words. Subject line included.
```

Read the result. Don't judge it yet — you need the contrast from Approach B first.

### Developer Track — Event log schema
```
Design the event log schema (Option A from schema-options.md).
Show the CREATE TABLE statement, the three key queries, and
a brief note on tradeoffs at our volume (500 events/user/day,
10,000 users, 90-day retention).
```

Review it. Note what you like and what concerns you.

---

## Part 3: Branch and Try Approach B (4 min)

Here's the move. You're still in the same session. Now type:

```
/branch approach-b
```

Claude confirms the branch was created. You're now in a **new session** that starts from the same conversation point — with all the context from Parts 1 and 2 intact, but none of the Approach A output carried over as a constraint.

Give Claude Approach B:

### Builder Track — Sharp & Data-Driven tone
```
Now try a completely different direction: sharp, data-driven,
treat our readers as smart operators who want numbers and
actionable takeaways. Lead with the multi-channel alerts
feature — what problem does it solve in one sentence?
Same length constraint: under 250 words.
```

### Developer Track — Pre-aggregated counters schema
```
Now design Option B: pre-aggregated counters.
Show the CREATE TABLE statement(s), the same three queries,
and the tradeoffs — especially what you gain and lose compared
to the event log approach at our volume.
```

---

## Part 4: Compare and Decide (4 min)

You now have two complete approaches in separate branches. To switch between them:

```bash
# From terminal (outside Claude), see all sessions:
claude --resume

# Or resume a specific named branch:
claude --resume approach-b
```

Compare side by side. When you've decided, return to the winning branch and continue from there.

> **What to look for:**
>
> **Builder:** Which newsletter do you actually want to send? Which subject line would you open? Does one land better for a non-technical founder?
>
> **Developer:** Which schema makes the three queries simpler? Which one will you regret at 2x the volume? Which migration story is better if you change your mind?

Pick your winner and type:

```
I'm going with this approach. Let's refine it:
[tell Claude specifically what to improve]
```

---

## Part 5: The A/B Testing Mindset (bonus)

The real lesson isn't the command. It's knowing **when** to branch.

Branch when:
- You genuinely don't know which approach is better
- The two options have meaningfully different tradeoffs
- Seeing both outputs is the only way to decide
- The cost of making the wrong call is more than 15 minutes of work

Don't branch when:
- You already know which direction you want
- The difference is cosmetic (just iterate in one session)
- You're avoiding a decision, not making a better one

> **Relationship to Lesson 02:** Rewind is for "that was wrong, try again." Branch is for "both might be right — let me see both." Different tools, different jobs.

---

## Success Criteria

- [ ] You set up shared context before branching (Parts 1–2)
- [ ] You successfully created a branch with `/branch`
- [ ] Approach B started from the same context as Approach A
- [ ] You compared both outputs and made a deliberate choice
- [ ] You continued in the winning branch

---

## Key Takeaways

| Concept | What It Does | When to Use |
|---------|-------------|-------------|
| `/branch [name]` | Creates a new session from this conversation point | Before trying a second approach you're genuinely unsure about |
| `/fork [name]` | Alias for `/branch` — same thing | Use whichever you remember |
| `claude --resume` | Opens session picker — switch between branches | When comparing outputs across branches |
| Branch vs Rewind | Rewind = undo a bad attempt. Branch = explore two good ones | Rewind when you know it was wrong; branch when you don't know yet |

---

## What's Next

**Lesson 04: Pick the Right AI Brain** — Claude has three models. Haiku is fast and cheap. Sonnet handles most tasks. Opus thinks deep. Using the same model for everything is like using a sledgehammer for every job. You'll learn when to switch and how to do it mid-session.
