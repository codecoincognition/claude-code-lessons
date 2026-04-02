# Verification: Lesson 02

## Builder Track

```bash
# 1. Landing page should have original branding (not the aggressive redesign)
grep -q "Nova Analytics" starter-builder/landing-page.html && echo "✅ Landing page has original branding" || echo "❌ Landing page was not restored"

# 2. Brand notes should still contain the original voice rules
# Check that the "never use" section is present (not that the word "leverage" is absent from the file)
grep -q "Words We Never Use" starter-builder/brand-notes.md && echo "✅ Brand notes structure intact" || echo "❌ Brand notes were modified"

# 3. Verify the brand voice section itself survived unchanged
grep -q "Friendly, not corporate" starter-builder/brand-notes.md && echo "✅ Brand voice rules intact" || echo "❌ Brand voice rules were modified or removed"

# 4. Email draft should keep original sign-off
grep -q "The Nova Team" starter-builder/email-draft.md && echo "✅ Email draft intact" || echo "❌ Email draft was modified"
```

## Developer Track

```bash
# 1. Tests should pass (auth is back to working state)
cd starter-dev && npm test 2>&1 | tail -5

# 2. Original auth middleware should still be present
grep -q "Bearer valid-token" starter-dev/app.js && echo "✅ Original auth intact" || echo "⚠️  Auth was modified (this is fine if your second attempt works)"

# 3. All original routes still present
grep -q "GET.*users" starter-dev/app.js && echo "✅ Routes intact" || echo "❌ Routes missing"
```

## Both Tracks

The real verification is behavioral. You've completed this lesson when:

- You felt the "oh no" moment when Claude changed your files
- You felt the relief of Esc×2 bringing everything back
- You used /rewind and noticed Claude's second attempt was better
- You tried something ambitious and didn't hesitate — because undo was free

## Common Issues

**Esc×2 opens the menu but I don't see my earlier turns**
You need at least one completed Claude response in the session. If you just started, give Claude a prompt first, then try Esc×2.

**Rewind didn't restore my files**
Check whether Claude used bash commands (like `!mv`, `!rm`, `!cp`) to modify files. Checkpointing only tracks direct file edits — bash-modified files are not tracked. This is why the git baseline at the start of Part 1 matters.

**Claude's second attempt is the same as the first**
Use "Restore code only" instead of "Restore code and conversation." That way Claude keeps the memory of what failed. Then be specific: tell Claude "The previous attempt did X wrong. This time, do Y instead." The failure context in the conversation is what makes the retry smarter.

**Want to interrupt Claude while it's generating?**
Use `Ctrl+C` — that's the mid-flight cancel. Esc×2 is for after a response has completed.
