# Verify — Lesson 06: Mid-Task Corrections

## Quick Checks

**Did your starter file load?**
```bash
# Builder track
grep -q "Relay" starter-builder/campaign-brief.md && echo "PASS: campaign brief found" || echo "FAIL: campaign-brief.md missing or incomplete"

# Developer track
grep -q "dual_auth_middleware" starter-dev/auth-migration.md && echo "PASS: auth migration found" || echo "FAIL: auth-migration.md missing or incomplete"
```

## Behavioral Checklist

- [ ] Used `/btw` at least 3 times during an active task
- [ ] Each `/btw` answer appeared in an overlay (not in the main conversation)
- [ ] Dismissed each overlay with Space, Enter, or Escape
- [ ] Main task continued without interruption after each `/btw`
- [ ] Tried a `/btw` that required tools (file read or command) and saw it could not help
- [ ] Checked `/cost` to confirm minimal token impact from side questions
- [ ] Understand the "full context, no tools" mental model

## Common Issues

**"/btw" does not seem to work**
Make sure you are typing `/btw` (with the slash) inside an active Claude Code session, not in your regular terminal. The slash triggers the command — without it, you are just typing text.

**The answer seems incomplete or wrong**
Remember: `/btw` only has access to what is already in your conversation. If you have not loaded a file with `@` or discussed a topic yet, Claude cannot answer from information it has not seen. Load the file first with a normal `@` reference, then use `/btw` for follow-up questions about it.

**Claude lost track of the main task after my /btw**
This should not happen — `/btw` is ephemeral and does not affect conversation history. If Claude's next response seems off, the issue is likely unrelated to `/btw`. Try re-prompting with a clear instruction like "Continue with email 3" or "Continue implementing the middleware."

**I want to ask a multi-turn follow-up to my /btw question**
`/btw` is single-response only. If your question needs back-and-forth, use a normal prompt instead. The tradeoff: it will enter conversation history and cost context, but you get full multi-turn interaction and tool access.

**Should I always use /btw instead of normal prompts?**
No. Use `/btw` for quick factual lookups and clarifications that do not need tools or follow-up. Use normal prompts when you need Claude to take action (read files, run code, search) or when the question is complex enough to need a multi-turn conversation.

## What You Learned

The `/btw` command is Claude Code's side channel — a way to get quick answers without polluting your conversation history or derailing the current task. The mental model is simple: full context, no tools, single response, zero history. Use it for the questions you would otherwise Google or context-switch for.
