# Verification: Lesson 05

## Builder Track

```bash
# 1. Landing page file should be unchanged
grep -q "Nova Analytics" starter-builder/landing-page.md && echo "✅ Landing page intact" || echo "❌ Landing page was modified"

# 2. Confirm you have a session in this folder
claude --resume 2>&1 | head -5
```

## Developer Track

```bash
# 1. Endpoint file should be intact
grep -q "dashboard_summary" starter-dev/slow-endpoint.md && echo "✅ Endpoint file intact" || echo "❌ Endpoint file was modified"

# 2. Confirm sessions exist
claude --resume 2>&1 | head -5
```

## Both Tracks — Behavioral Verification

The real check is whether you felt the difference between effort levels. You've completed this lesson when:

- [ ] You ran `/effort` and saw your current level
- [ ] You used `/effort low` and got a fast, shallow answer (list, no reasoning)
- [ ] You used `/effort high` and got deeper reasoning — tradeoffs, not just answers
- [ ] You used `/effort max` (or `/effort high` on Sonnet) and got a committed recommendation with failure-mode analysis
- [ ] You used "ultrathink" in a prompt and saw it trigger deeper thinking for one turn
- [ ] You dropped back to `/effort auto` when the hard work was done
- [ ] You can explain when low, high, and max are each the right call — in one sentence each

## Common Issues

**`/effort` says the command isn't available**
You're still in your terminal, not inside Claude. You should see the Claude prompt (where you type messages) instead of your regular terminal prompt. If you're still in the terminal, type `claude` and wait for the Claude prompt to appear, then try `/effort` again.

**`/effort max` errors**
`max` requires Opus 4.6. To check your model, type `/model` in Claude. If you see `opus` in the picker, select it and then run `/effort max`. If you don't have Opus, use `/effort high` on Sonnet instead — you'll still practice the depth-switching habit, which is the point of the lesson.

**I don't notice a difference between effort levels**
Two likely causes: (1) your task is too simple — low and high produce similar answers on easy questions. Try the Part 3 or Part 4 prompts, which ask for tradeoffs and recommendations. (2) You're comparing across turns instead of on the same prompt. The clearest way to see the difference is to ask the same question at low effort, then again at high effort.

**"Ultrathink" didn't seem to do anything**
It has no effect if your effort is already `high` or `max`. Drop to `/effort auto` or `/effort medium` first, then include "ultrathink" in the prompt.

**High effort is slow — is that normal?**
Yes. High effort means more thinking tokens before the visible answer. On Opus, this can take 30+ seconds for complex problems. The latency is the cost of depth. If you're waiting a long time for simple tasks, drop effort back down — you're overthinking the question.

**Should I always use high effort?**
No. High effort on a simple task adds noise. The model agonizes over a question that needed a quick answer. The skill this lesson teaches is matching depth to the task: low for obvious work, high for tradeoffs, max for the one call that shapes everything downstream.
