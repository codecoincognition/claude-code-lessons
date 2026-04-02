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

**Esc×2 didn't work**
Make sure you press Escape twice quickly, not hold it down. It should be two distinct taps.

**/rewind shows no history**
You need at least one Claude response in the session to rewind. If you just started, there's nothing to rewind yet.

**Claude's second attempt is the same as the first**
Be more specific about what was wrong. Instead of just rewinding and re-prompting, tell Claude: "The previous attempt did X wrong. This time, do Y instead." The conversation context from the first attempt helps Claude adjust.
