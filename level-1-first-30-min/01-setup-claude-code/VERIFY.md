# Verification: Lesson 01

Run these checks to confirm you completed all 7 parts.

## Quick Check

```bash
# 1. Claude Code is installed
claude --version

# 2. hello.py was modified by Claude (Part 2)
grep -q "def greet" starter/hello.py && echo "✅ greet function found" || echo "❌ greet function missing"

# 3. Division-by-zero bug is fixed in app.py (Part 4)
grep -q "total == 0\|total < 1\|not tasks\|ZeroDivision" starter/app.py && echo "✅ stats bug likely fixed" || echo "⚠️  Check show_stats manually"

# 4. Truncate off-by-one is fixed in utils.py (Part 4)
python3 -c "
from starter.utils import truncate
result = truncate('a' * 40, 30)
assert len(result) <= 30, f'Still too long: {len(result)} chars'
print('✅ truncate respects max_length')
" 2>/dev/null || echo "⚠️  Run: python3 -c \"from starter.utils import truncate; print(truncate('a'*40, 30))\" and check length"

# 5. validate_title is wired into app.py (Part 7)
grep -q "validate_title" starter/app.py && echo "✅ validation wired in" || echo "❌ validate_title not found in app.py"

# 6. App runs without errors
cd starter && python app.py && cd ..
```

## What Each Part Should Have Produced

| Part | What Changed |
|------|-------------|
| 2 — First Prompt | `hello.py` has a `greet()` function |
| 3 — Shell Escape | You ran `!python hello.py` and saw output |
| 4 — @ References | `app.py` division-by-zero fixed, `utils.py` truncate fixed, truncate wired into `app.py` |
| 5 — /cost /context | You saw your token usage and context percentage |
| 6 — /compact | Context usage dropped after compacting |
| 7 — Command Style | `validate_title` from `utils.py` is imported and used in `app.py`'s `add_task` |

## Common Issues

**"claude: command not found"**
Close and reopen your terminal. The installer updates your PATH but the current session doesn't see it yet.

**"Authentication failed"**
The free Claude.ai tier doesn't include Claude Code. You need Pro, Max, Teams, or Enterprise.

**Claude didn't modify the file**
Did you approve the edit when prompted? Claude asks permission before writing. Re-run the prompt and approve.

**`/compact` didn't seem to help**
Check `/context` before and after. The drop may be small if the session was short. The effect is dramatic in longer sessions (30+ minutes).

**The `@` reference didn't work**
Make sure you're in the `starter/` directory when you launch Claude. `@app.py` looks for the file relative to your current directory.
