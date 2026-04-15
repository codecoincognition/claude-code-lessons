# Lesson 05: Control Thinking Depth

**Time:** 15 minutes
**Builds on:** Lesson 04 (model switching)
**What you'll cover:** `/effort` in depth — when `low` is the right call, when `high` earns its cost, what `max` actually does differently, and how "ultrathink" triggers deep reasoning on a single turn without changing your session setting.

**Pick your track:**
- **Builder track** → `starter-builder/` (rewrite a landing page that's losing visitors)
- **Developer track** → `starter-dev/` (diagnose and fix a slow API endpoint)

---

## The Problem This Lesson Solves

Lesson 04 taught you to match the model to the work. But model is only half the equation. The other half is effort — how deeply the model thinks before answering.

Most people set effort once (or never touch it) and assume the model is doing its best. It isn't. A hard problem on default effort gets a surface-level answer with a confident tone. The same problem on `/effort high` gets the second and third layers — tradeoffs, risks, the question you forgot to ask. A surface-level answer might miss a tradeoff that costs you a week. A deep answer shows you the tradeoff before you commit.

The opposite is also true: a simple task on high effort gets overthought. Claude spends tokens agonizing over a question that needed a quick answer. You wait longer, pay more, and the extra thinking just wastes tokens.

This lesson teaches you to match effort to the task the same way Lesson 04 taught you to match the model.

| Effort Level | What It Does | When to Use |
|-------------|-------------|-------------|
| **low** | Minimal reasoning. Fast, cheap, concise. | Simple lookups, formatting, "just do the thing" tasks |
| **medium** | Balanced. The default for Pro and Max plans. | Everyday work — writing, coding, analysis |
| **high** | Extended reasoning. Considers tradeoffs, edge cases. | Judgment calls, debugging, strategy |
| **max** | Deepest reasoning. No limit on thinking tokens. Opus 4.6 only, current session only. | The one decision that matters most. Use sparingly. |
| **auto** | Resets to the model's default. | After you're done with the hard work |

---

## Before You Start — Git Baseline

Same habit from Lessons 02–04: snapshot first.

```bash
git init && git add . && git commit -m "baseline: lesson 05 start"
```

If you see "already a git repo" or "nothing to commit" — you're good. Move on.

---

## Part 1: See Your Current Effort Level (1 min)

Launch Claude in your track:

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

Wait for the Claude Code prompt to appear — you'll see a prompt bar where you can type messages. Everything from here on is typed **inside Claude**, not back in your terminal. Type this:

```
/effort
```

**Expected result:** Claude shows your current effort level — something like `Effort: medium` or `Effort: high`. On Pro and Max plans, the default is `medium`. On API or Enterprise plans, the default is `high`. Either way, you now know your starting point. Glance at the prompt bar too — it shows the effort level next to the logo (e.g., "with medium effort").

> **Stuck?** If your terminal says "command not found: /effort," you're still in the shell. Run `claude` first, wait for the Claude prompt to appear, then type `/effort` there.

---

## Part 2: Low Effort — When You Need a Quick Answer (3 min)

Set effort to low:

```
/effort low
```

### Builder Track — Quick format check
```
Using @landing-page.md, list every instance where the copy violates
the voice guidelines at the bottom of the document. Format each as:
the sentence + the guideline it breaks. No suggestions, no rewrites.
```

**Expected result:** A short, fast list — expect 3–5 items. Example: "Real-Time Analytics" → generic, violates "specific over vague." Low effort doesn't overthink it — it scans, matches, and reports. This took seconds, not minutes.

> **What's `@`?** The `@` symbol tells Claude to read that file. It's like saying "look at this document and use it when answering."

### Developer Track — Surface-level read
```
Using @slow-endpoint.md, list the performance problems you can see
in the code. One line per problem, no explanations, no fix suggestions.
```

**Expected result:** A bullet list with one line per problem. Expected problems: duplicate ML calls, N+1 queries, no caching, 60 individual trend queries. Low effort catches the obvious stuff fast. It won't dig into why those problems interact or which one matters most. That's fine. You're not asking it to.

---

## Part 3: High Effort — The Second Layer (4 min)

Now raise the effort:

```
/effort high
```

### Builder Track — Strategic rewrite
```
The landing page hero section is bouncing 62% of visitors. Using
@landing-page.md and the competitive landscape section, rewrite
the hero (headline + subhead + CTA) three ways:

1. One that answers "why Nova, not Mixpanel" in under 10 words
2. One that leads with the pain ("you're losing customers")
3. One that leads with the proof (the Relay quote)

For each, explain what it sacrifices compared to the other two.
```

**Expected result:** Three distinct rewrites. Each one should have 2–3 sentences explaining what it sacrifices compared to the others — for example, "the pain-led version is stronger for problem-aware visitors but weaker for someone who just typed 'analytics tool' into Google." If you just got three options with no tradeoff analysis, effort might not have gone up — check the prompt bar and try the prompt again.

### Developer Track — Root cause analysis
```
Using @slow-endpoint.md, diagnose the performance problems in order
of actual impact — not just "this is slow" but "this causes X seconds
of the 4.2s average because Y."

Then tell me: if we fix them incrementally in your recommended order,
what's the expected response time after each fix?
```

**Expected result:** An ordered diagnosis with estimated time savings per fix — something like "~X seconds saved" for each change. High effort connects the dots: the duplicate ML calls aren't just "inefficient," they account for ~60 seconds of serial execution (150 accounts × 200ms × 2 calls) before any batching. You should see Claude modeling the problem, not just listing symptoms. If you got a diagnosis but no time estimates, that's still acceptable — the tradeoff reasoning is the real signal.

---

## Part 4: Max Effort — The Decision That Matters (4 min)

If you have Opus on your plan, switch to it now. If not, stay on your current model — `/effort max` only works on Opus 4.6, but `/effort high` on Sonnet still gives you a taste of deep reasoning.

```
/model opus
/effort max
```

> **Note:** `/effort max` doesn't persist across sessions. When you close Claude and reopen it, effort resets to your default. This is by design — max is expensive and slow, meant for one-off deep dives, not default operation.

### Builder Track — The real question
```
Using @landing-page.md, the current conversion rate is 2.1% with a
62% bounce from hero to features. The team has bandwidth for ONE
change this sprint.

Should we rewrite the hero, restructure the page flow, or rewrite
the features section? Pick one.

Give me:
1. Your recommendation and why it beats the other two options
2. The biggest risk of your recommendation being wrong
3. What data you'd want before committing (that we might already have)
4. What the page should look like in 30 days if you're right
```

**Expected result:** A single, committed recommendation — not "it depends," not "all three have merit." Max effort on Opus picks a direction, explains what goes wrong if you're wrong, and identifies what you should check before committing. If you're getting hedge-y "it depends" answers, check the prompt bar — `/effort max` might not be active. Try running `/effort max` again and paste the same prompt.

### Developer Track — Fix or rewrite?
```
Using @slow-endpoint.md, Sarah says "fix incrementally or rewrite."
The sprint is 2 weeks. The endpoint is called on every dashboard load.
Three enterprise accounts complained in QBRs.

Pick one: incremental fix or rewrite. Give me:
1. Your recommendation (one paragraph, no fence-sitting)
2. The specific changes, in order, with estimated hours each
3. What breaks if we're wrong — what does "being wrong" look like
   for each path at the 2-week mark?
4. One thing Sarah should check before starting that could change
   the answer entirely
```

**Expected result:** A committed recommendation with a concrete plan. Max effort on Opus shows you what could go wrong with each choice — "if we pick incremental and the batched ML call doesn't reduce latency enough, we've burned a week and still have a 3-second endpoint." You should see reasoning about the 2-week constraint, not just about what's technically better.

---

## Part 5: The Ultrathink Shortcut (1 min)

Drop back to your normal settings:

```
/model sonnet
/effort auto
```

Now try the shortcut. Instead of changing your effort level, just include "ultrathink" in your prompt:

### Builder Track
```
ultrathink — Based on the hero rewrite you'd recommend, write the
first 3 sentences of the features section that would follow it.
Keep the same voice.
```

### Developer Track
```
ultrathink — Write the PR description for the fix plan. Include
what's changing, what's not changing, and what to watch in monitoring
after deploy.
```

**Expected result:** A response that includes reasoning alongside the answer — not just "here's the copy" but "here's the copy, and here's why each section connects to the hero rewrite." Compare this to what you'd get without "ultrathink" at default effort — the difference is the reasoning layer. "Ultrathink" triggers high effort for that single turn. It has no effect if you're already at high or max.

> **When to use ultrathink vs. `/effort high`:** Use `/effort high` when you're working on a series of hard questions — multiple turns that all need deep reasoning. Use "ultrathink" when you want one turn to go deeper without changing the setting for everything that follows.

---

## Part 6: The Effort-Picking Mindset (bonus)

Three questions, just like the model-picking questions from Lesson 04:

1. **Is the answer obvious?** If yes → low. If you already know roughly what the answer should look like, you don't need Claude to reason its way there.
2. **Are there tradeoffs?** If yes → high. Tradeoffs mean Claude needs to weigh options, and weighing options is exactly what extended reasoning is for.
3. **Is this the one decision that shapes everything downstream?** If yes → max (on Opus). You don't reach for max daily. You reach for it when the cost of a shallow answer is measured in weeks, not minutes.

> **Relationship to earlier lessons:**
> - Lesson 02 (Rewind) taught you to undo mistakes.
> - Lesson 03 (Branch) taught you to explore alternatives.
> - Lesson 04 (Model) taught you to match the brain to the job.
> - Lesson 05 (Effort) teaches you to choose how carefully the model considers the question.
>
> Together: undo, explore, right-size the brain, and right-size the thinking.

---

## Success Criteria

- [ ] You ran `/effort` and saw your current level
- [ ] You used `/effort low` and got a fast, shallow answer (Part 2)
- [ ] You used `/effort high` and saw deeper reasoning — tradeoffs, not just answers (Part 3)
- [ ] You used `/effort max` (or `/effort high` on Sonnet) and got a committed recommendation (Part 4)
- [ ] You used "ultrathink" in a prompt and saw it trigger deeper thinking for one turn (Part 5)
- [ ] You dropped back to `/effort auto` when the hard work was done
- [ ] You can explain when low, high, and max are each the right call

---

## Key Takeaways

| Concept | What It Does | When to Use |
|---------|-------------|-------------|
| `/effort` | Shows the current effort level | Check before starting hard work |
| `/effort low` | Minimal reasoning, fast answers | Simple tasks, formatting, lookups |
| `/effort high` | Extended reasoning, considers tradeoffs | Judgment calls, debugging, strategy |
| `/effort max` | Deepest reasoning, Opus 4.6 only, current session only | The one decision that matters most |
| `/effort auto` | Resets to model default | After the hard stretch ends |
| `ultrathink` | Triggers high effort for a single turn (include it in the prompt) | One-off deep reasoning without changing your session setting |
| `--effort` flag | Set effort when launching Claude: `claude --effort high` | One-off sessions where you know the depth upfront |

---

## What's Next

**Lesson 06: Mid-Task Corrections** — you know how to pick the model and the depth. But what happens when Claude is mid-task and you realize you forgot to mention something? `/btw` lets you ask a side question without derailing the main task.
