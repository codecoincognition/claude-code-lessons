# Lesson 02: Undo & Recover

**Time:** 20 minutes
**Builds on:** Lesson 01 (install, @, !, /compact, /cost)
**What you'll cover:** /rewind, Esc×2 mid-flight cancel, code vs conversation rollback, and why the best Claude Code users break things on purpose.

**Pick your track:** This lesson has two starter projects. Choose the one that fits you:
- **Builder track** → `starter-builder/` (marketing files for a SaaS product)
- **Developer track** → `starter-dev/` (a working Express API with tests)

---

## Part 1: Break Something on Purpose (5 min)

This lesson starts by making a mess. On purpose. Because you need to feel the "oh no" moment before the undo feels magical.

### Before you start — create a git baseline

Before breaking anything, snapshot your starting state. This gives you an ultimate recovery option beyond /rewind, and it's good Claude Code habit from day one.

```bash
# Do this once before starting either track:
!git init && git add . && git commit -m "baseline: lesson 02 start"
```

If you ever get confused about what changed, `!git diff` shows you. If everything goes sideways, `!git checkout .` restores all files to the baseline. Consider this your safety net under the safety net.

---

### Builder Track

Navigate to the builder folder and launch Claude:

```
cd starter-builder
claude
```

Now give Claude a big, vague instruction:

```
@landing-page.html @email-draft.md @brand-notes.md Completely redesign the landing page to be edgy and modern. Change the brand voice in the email to be more aggressive and salesy. Reorganize all the files however you think is best.
```

Claude will make sweeping changes — the landing page tone shifts, the email becomes pushy, the brand notes might get overwritten. It followed your instructions. But the result feels wrong.

**Don't panic. That's the point.**

### Developer Track

Navigate to the dev folder and launch Claude:

```
cd starter-dev
claude
```

First, install dependencies and confirm everything works:

```
!npm install && npm test
```

All tests should pass. Now commit this as your baseline (same as the Builder track — do this before breaking anything):

```
!git init && git add . && git commit -m "baseline: lesson 02 start"
```

Now give Claude a risky refactoring instruction:

```
@app.js Refactor the authentication to use JWT tokens with a proper middleware pattern. Replace the simple token check with jsonwebtoken library, add token generation on a new /api/login endpoint, and restructure the middleware.
```

Claude will rewrite the auth system. Now run the tests:

```
!npm test
```

Tests will fail — the old token format no longer works, endpoints expect different auth headers.

**Don't panic. That's the point.**

---

## Part 2: Esc×2 — Cancel Mid-Flight (5 min)

The first escape hatch is **Esc×2** — two quick taps of the Escape key while Claude is actively running.

```
Esc  Esc
```

This cancels Claude's response **while it's still generating**. If Claude is mid-edit and you see it's going in the wrong direction, Esc×2 stops it immediately. Claude halts, file changes from that partial response are rolled back, and you can give a better instruction.

> **Important:** Esc×2 works **while Claude is generating**. It's a mid-flight interrupt — like hitting the stop button on a download before it finishes. For undoing a response that has already completed, you'll use `/rewind` in the next part.

**Try it:** Re-run the risky prompt from Part 1. Watch Claude start making changes — then press Esc twice before it finishes. Claude stops. The partial changes are discarded.

Then verify your files are intact:

### Builder Track
```
!cat landing-page.html | head -20
```
Your original landing page should be back — navy hero section, Georgia font, "Simple Pricing."

### Developer Track
```
!npm test
```
All tests should pass. The partial JWT changes are gone.

**When to use Esc×2:** The moment you see Claude heading in the wrong direction. Don't wait for it to finish making a mess — interrupt early.

> **For completed responses:** Once Claude has finished a response and you want to undo it, that's what `/rewind` is for (next part).

---

## Part 3: Selective Rollback — The Power Move (5 min)

Esc×2 undoes everything — conversation and code together. But sometimes you want to keep one and undo the other. That's what `/rewind` gives you.

### Try it: Break things again

Give Claude the same risky instruction from Part 1 (or a different one — experiment). Let it make the changes.

Now type:

```
/rewind
```

Claude shows you a list of recent conversation turns. You can choose exactly how far back to rewind.

**The key insight:** When you rewind, Claude rolls back the file changes BUT keeps the memory of what happened in the conversation. Claude remembers what it tried. It knows what went wrong. So when you give a new instruction, Claude approaches it with the context of the previous failure.

### Builder Track — Rewind and redirect:

After rewinding the aggressive redesign, write your own refined prompt. The key principle: **don't just repeat what you asked — tell Claude what was wrong and what to preserve.**

A good refinement prompt answers three questions:
1. What did the last attempt get wrong?
2. What should stay the same?
3. What specific change do you actually want?

Write your own version and try it. Claude's second attempt will be different because it has context from the first failure — even though the files are back to the original state.

### Developer Track — Rewind and redirect:

After rewinding the broken JWT refactor:

```
@app.js The JWT refactor broke all tests because the auth header format changed. This time, add JWT but keep backward compatibility — accept both the old Bearer token AND new JWT tokens. Make sure all existing tests still pass.
```

Claude approaches differently because it remembers what failed.

```
!npm test
```

Tests should pass this time.

---

## Part 4: The Experimentation Mindset (5 min)

You now have an undo button. Here's what that unlocks:

**If undo is free, experiments are free.**

Most people use Claude cautiously — small changes, safe prompts, lots of "can you maybe..." hedging. That's because they're afraid of making a mess they can't clean up.

You can clean it up in two keystrokes.

### Your final challenge:

Try something ambitious. Something you'd normally be afraid to ask for. Here are some ideas:

**Builder Track:**
```
@landing-page.html Rewrite this landing page for a completely different audience — enterprise buyers instead of small business. Add a ROI calculator section and customer logos placeholder. Go big.
```

Look at the result. Like it? Keep it. Don't like it? Esc×2. Try a different direction. Rewind. Try again. Each attempt takes 30 seconds.

**Developer Track:**
```
@app.js @app.test.js Convert this entire API from Express to a Hono framework. Migrate all routes and update all tests to work with the new framework.
```

Let Claude attempt a full framework migration. Tests broken? Rewind. Tests pass? You just migrated your API in one prompt.

**The mental model:**

In Lesson 01, you learned that Claude is an agent and context is a budget.

In Lesson 02, the new idea is: **undo makes experimentation free.**

Together these mean: give Claude ambitious instructions, check the result, rewind if needed, try again with better context. That loop — instruct → check → rewind → refine — is how the best users work.

---

## Success Criteria

- [ ] You gave Claude a risky instruction that changed your files
- [ ] You used Esc×2 to undo the changes completely
- [ ] You used /rewind to go back, then gave a better instruction that worked
- [ ] Claude's second attempt was better because it remembered the first failure
- [ ] You tried something ambitious you'd normally be afraid to attempt

---

## Key Takeaways

| Concept | What It Does | When to Use |
|---------|-------------|-------------|
| Esc×2 | Cancels Claude's current response mid-generation | The moment you see Claude going in the wrong direction — stop it early |
| /rewind | Rolls back completed changes; Claude keeps conversation memory | After a response finishes and you want to undo it and try again |
| Instruct → Check → Rewind → Refine | The experimentation loop | Every time you give Claude a non-trivial instruction |
| Undo makes experiments free | Mental model | Whenever you're hesitating to try something bold |

---

## What's Next

**Lesson 03: Branch & Experiment** — What if you could try two completely different approaches and compare them side by side? /fork creates parallel conversation branches. You'll A/B test ideas without losing either one.
