# Verification: Lesson 03

## Builder Track

```bash
# 1. Check newsletter draft is still the original (not overwritten)
grep -q "October 2024" starter-builder/newsletter-draft.md && echo "✅ Original draft intact" || echo "❌ Draft was modified"

# 2. Check brand notes survived
grep -q "Friendly, not corporate" starter-builder/brand-notes.md && echo "✅ Brand notes intact" || echo "❌ Brand notes were modified"

# 3. Confirm you have more than one Claude session (branching worked)
claude --resume 2>&1 | head -5
# You should see at least 2 sessions listed
```

## Developer Track

```bash
# 1. Existing models file should be unchanged
grep -q "UserModel" starter-dev/existing-models.js && echo "✅ Existing models intact" || echo "❌ Models file was modified"

# 2. Check schema-options.md is intact
grep -q "Event log table" starter-dev/schema-options.md && echo "✅ Schema options intact" || echo "❌ Schema options were modified"

# 3. Confirm sessions exist
claude --resume 2>&1 | head -5
```

## Both Tracks — Behavioral Verification

The real check is whether you actually used branching as a decision tool. You've completed this lesson when:

- [ ] You set context in the main session *before* branching (so both branches started informed)
- [ ] You created a branch with `/branch` and tried a different approach inside it
- [ ] You used `claude --resume` to compare the two outputs
- [ ] You made a deliberate choice between the two approaches — and can explain why

## Common Issues

**`/branch` command not found**
Make sure you're inside an active Claude session when you type `/branch`. It's a slash command, not a terminal command.

**Both branches produced similar output**
The approaches in your two prompts weren't different enough. Go back and make them more distinct — different tone, different constraint, different starting point. The whole point of branching is contrast.

**Can't find my sessions with `claude --resume`**
Sessions are stored per directory. Make sure you're running `claude --resume` from the same directory where you started the session (`starter-builder/` or `starter-dev/`).

**I don't know which approach to pick**
That's not a problem — it means both approaches are viable. Look at the three queries from the dev track (or the unsubscribe rate data from the builder track) and pick the one that performs better on the metric that matters most to you.
