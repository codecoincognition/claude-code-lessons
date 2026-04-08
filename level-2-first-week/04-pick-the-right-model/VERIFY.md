# Verification: Lesson 04

## Builder Track

```bash
# 1. Campaign brief should be unchanged
grep -q "Nova Analytics" starter-builder/campaign-brief.md && echo "✅ Brief intact" || echo "❌ Brief was modified"

# 2. Confirm you have a session in this folder
claude --resume 2>&1 | head -5
```

## Developer Track

```bash
# 1. Bug reports should be intact
grep -q "BUG-001" starter-dev/bug-reports.md && echo "✅ Bug reports intact" || echo "❌ Bug reports were modified"

# 2. ADR should be intact
grep -q "Decision Required" starter-dev/architecture-decision.md && echo "✅ ADR intact" || echo "❌ ADR was modified"

# 3. Confirm sessions exist
claude --resume 2>&1 | head -5
```

## Both Tracks — Behavioral Verification

The real check isn't what's on disk. It's whether you actually swapped models. You've completed this lesson when:

- [ ] You ran `/model` at least once and saw the current model name
- [ ] You switched to Haiku for Part 2 and got fast, bulk output
- [ ] You switched to Sonnet for Part 3 and got judgment-level work
- [ ] You switched to Opus + `/effort high` for Part 4 and got real reasoning
- [ ] You dropped back to Sonnet in Part 5
- [ ] You can explain why each model fit each part in one sentence each

## Common Issues

**`/model` says the command isn't available**
Check you're inside an active Claude Code session (you'll see the Claude prompt, not your shell). `/model` is a slash command, typed into Claude — not a terminal command.

**`/model haiku` errors or Haiku isn't in the picker**
Your plan may not include Haiku access. Run `/model` with no arguments to see the interactive picker with the models available to you, and pick the smallest one you have.

**Opus feels no different from Sonnet**
Two likely causes: (1) you forgot to set `/effort high`, so Opus is running at default depth, or (2) the task you gave it wasn't actually hard. Opus shines on reasoning problems, not on "write me a thing" tasks. Re-read your Part 4 prompt — is it asking for a judgment call or just execution?

**I don't want to pay for Opus**
Then don't use it for this lesson — swap `/model opus` for `/model sonnet` and `/effort high` instead. You'll lose some reasoning depth but you'll still practice the escalation habit, which is the point.

**I ran everything on Opus and it was great, why switch?**
Because Opus is ~5x the cost of Sonnet and ~15x Haiku. You can get away with "Opus everywhere" until your bill arrives. The habit you want is matching model to work, not "pick the smartest one and forget about it."
