# Lesson 08 Verification

## Quick Checks

Run these in the lesson directory to verify your setup:

```bash
# CLAUDE.md exists
test -f CLAUDE.md && echo "PASS: CLAUDE.md exists" || echo "FAIL: no CLAUDE.md found"

# At least one rule file exists
ls .claude/rules/*.md 2>/dev/null | head -1 | grep -q . && echo "PASS: rule files found" || echo "FAIL: no .claude/rules/*.md files found"

# settings.json exists
test -f .claude/settings.json && echo "PASS: settings.json exists" || echo "FAIL: no .claude/settings.json found"

# At least one rule file has path scoping
grep -rl "paths:" .claude/rules/*.md 2>/dev/null | head -1 | grep -q . && echo "PASS: path-scoped rule found" || echo "FAIL: no path-scoped rules found (check for paths: in YAML frontmatter)"

# CLAUDE.md is not empty
test -s CLAUDE.md && echo "PASS: CLAUDE.md has content" || echo "FAIL: CLAUDE.md is empty"
```

## Behavioral Checklist

After completing the lesson, verify these by observation:

- [ ] Claude loads CLAUDE.md automatically when you start a session (no @ needed)
- [ ] Running `/status` shows CLAUDE.md and rule files in the loaded instructions list
- [ ] Claude follows conventions from CLAUDE.md without being prompted (first-try test)
- [ ] Path-scoped rules only appear when Claude reads files matching the glob pattern
- [ ] Settings in `.claude/settings.json` apply to the session (check with `/status`)
- [ ] **Builder:** Claude uses third person for blog posts and first person for LinkedIn
- [ ] **Builder:** Claude avoids all forbidden phrases from the brand voice guide
- [ ] **Developer:** Claude uses `get_db` dependency instead of importing Session directly
- [ ] **Developer:** Claude uses `str | None` syntax instead of `Optional[str]`
- [ ] **Developer:** Claude uses named exports for components (default only for pages)

## Common Issues and Recovery

| Issue | Cause | Fix |
|-------|-------|-----|
| CLAUDE.md not loaded | File is in wrong directory | Must be at project root or in `.claude/CLAUDE.md`. Run `/status` to check. |
| Rules not appearing in /status | Wrong directory structure | Files must be `.claude/rules/*.md` — check the path. |
| Path-scoped rule not loading | Glob pattern mismatch | Check that `paths:` uses correct glob syntax with quotes. Patterns with `*` or `{` must be quoted in YAML. |
| Path-scoped rule loads for all files | Missing YAML frontmatter | The `paths:` block must be in a `---` delimited YAML frontmatter block at the top of the file. |
| settings.json not applying | JSON syntax error | Validate with `python3 -c "import json; json.load(open('.claude/settings.json'))"`. |
| Claude ignores a convention | Rule is too vague | Be specific: "Use snake_case" is better than "follow Python conventions." Include examples. |
| Claude still uses Optional[str] | CLAUDE.md does not state the rule | Add explicitly: "Use `str \| None` instead of `Optional[str]` for optional type hints." |
| /init overwrites your CLAUDE.md | Ran /init in a directory that already has one | Back up first. /init generates a new file — it does not merge. |
