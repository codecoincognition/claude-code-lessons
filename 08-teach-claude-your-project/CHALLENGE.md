# Lesson 08: Teach Claude Your Project

## Goal
Write project instructions that make Claude follow your conventions on the first try — without you re-explaining anything per session.

## Pick Your Track

- **Builder track** — you are setting up project instructions for a content team's writing workflow. No coding required. Best for PMs, founders, and content creators.
- **Developer track** — you are setting up project instructions for a Python/TypeScript codebase. Best if you write code regularly.

Both tracks take about 30 minutes and teach the same three skills.

## Prerequisites
- Claude Code installed and working
- Completed Lesson 01 (or comfortable with basic prompting)
- A working session open in your terminal

## Before You Start

Navigate to this lesson's directory and create a git baseline:

```bash
cd 08-teach-claude-your-project
git add -A && git commit -m "before lesson 08"
```

---

## Part 1: Write Your CLAUDE.md

CLAUDE.md is a markdown file at the root of your project that Claude reads automatically at the start of every session. It is your project's permanent briefing — the context Claude always has before you type anything.

**Create a CLAUDE.md file** in this lesson's directory. You will write it by hand first, then test it.

**Builder track:**

Read `starter-builder/content-workflow.md`. It describes a content team with specific voice guidelines, banned phrases, a required metrics format, and a file structure. The team's pain point: Claude keeps ignoring the brand voice and using banned phrases.

Create a `CLAUDE.md` that solves these problems. Include:

```markdown
# Meridian Analytics — Content Project

## Brand Voice
[Extract the voice rules from content-workflow.md: tone, jargon policy, 
numbers rule, forbidden phrases, person rules (third person for blog, 
first person for LinkedIn)]

## Content Templates
[Define the structure for each content type:
- Blog post: title, intro hook, 3-4 sections with metrics, conclusion
- Case study: Challenge → Solution → Results
- LinkedIn: hook line, 2-3 short paragraphs, CTA]

## File Organization
[Map the directory structure from content-workflow.md]

## Workflow
[Draft → Edit → Design → Publish steps]
```

**Developer track:**

Read `starter-dev/codebase-overview.md`. It describes a FastAPI + React monorepo with specific conventions the team keeps having to re-explain: import style, type hint syntax, error handling patterns, export rules.

Create a `CLAUDE.md` that solves these problems. Include:

```markdown
# TaskFlow — Project Instructions

## Stack
[Python 3.12 + FastAPI + SQLAlchemy / TypeScript 5.5 + React 18 + Vite]

## Build and Test
[Exact commands from codebase-overview.md — copy them precisely]

## Code Conventions
[The rules Claude keeps getting wrong:
- Use get_db dependency, never import Session directly
- Use str | None, not Optional[str]
- Named exports everywhere except pages
- Google-style docstrings
- Standard error message format]

## Architecture
[Directory layout and module responsibilities]
```

Save your CLAUDE.md. Now test it.

**The first-try test:** Start a new Claude Code session in this directory:

```bash
claude --name "lesson-08-test"
```

Claude should automatically load your CLAUDE.md. Give it a task that exercises your conventions:

**Builder track:**
```
Draft a 900-word blog post about how finance teams can reduce quarterly 
close time using automated data validation. Follow the content guidelines.
```

Check the output: Did Claude use third person? Did it avoid banned phrases? Did it include metrics with sources? If not, your CLAUDE.md has gaps — go back and tighten it.

**Developer track:**
```
@starter-dev/codebase-overview.md Add a new endpoint: 
POST /api/tasks/{task_id}/comments that lets users add a comment 
to a task. Include the route handler, Pydantic schema, and a test.
```

Check the output: Did Claude use `get_db` (not import Session directly)? Did it use `str | None` (not `Optional[str]`)? Did it use named exports? Did it follow Google-style docstrings? If not, your CLAUDE.md needs more specificity.

**Expected result:** Claude follows most or all of your documented conventions without you prompting it. The gaps show you exactly what to add to CLAUDE.md.

---

## Part 2: Split Into Rules

A single CLAUDE.md works for small projects. For anything with multiple concerns (testing, security, styling, content types), modular rule files are easier to maintain.

**Create a `.claude/rules/` directory** and split your CLAUDE.md into focused files:

**Builder track:**

```
.claude/rules/
├── voice.md          # Brand voice, tone, forbidden phrases
├── blog-posts.md     # Blog post template and structure rules
├── case-studies.md   # Case study template (Challenge → Solution → Results)
└── linkedin.md       # LinkedIn post format and first-person voice rule
```

For the `linkedin.md` file, add path scoping so it only loads when Claude works on LinkedIn content:

```yaml
---
paths:
  - "content/social/linkedin/**"
---

# LinkedIn Post Rules
- Voice: first person ("we built," "our team discovered")
- Length: 150–250 words
- Structure: hook line → 2–3 short paragraphs → CTA
- Never use hashtags in the body text. Add 3–5 at the end, separated by a line break.
```

**Developer track:**

```
.claude/rules/
├── python-style.md   # Import rules, type hints, naming, docstrings
├── typescript-style.md  # Component rules, exports, naming
├── testing.md        # Test fixtures, database rules, coverage
└── api-errors.md     # Standard error response format
```

For `testing.md`, add path scoping:

```yaml
---
paths:
  - "backend/tests/**/*.py"
  - "frontend/src/**/*.test.ts"
---

# Testing Rules
- Always use test fixtures from conftest.py — never create raw database sessions
- Use the test_client fixture for API tests, not direct function calls
- Test names: test_{action}_{scenario}_{expected_result}
```

**Test your rules:** Exit your session and start fresh:

```bash
claude --name "lesson-08-rules-test"
```

Run `/status` to confirm your rule files are loaded. Then give Claude a task and check if the rules apply correctly.

**Expected result:** `/status` shows your CLAUDE.md and all rule files loaded. Claude follows the modular rules the same way it followed the monolithic CLAUDE.md.

---

## Part 3: Add Project Settings

Settings control what Claude can and cannot do — the guardrail layer.

**Create `.claude/settings.json`:**

**Builder track:**

```json
{
  "env": {
    "CONTENT_STYLE": "meridian-analytics",
    "DEFAULT_WORD_COUNT": "1000"
  }
}
```

**Developer track:**

```json
{
  "env": {
    "PYTHON_VERSION": "3.12",
    "NODE_ENV": "development"
  },
  "permissions": {
    "tools": [
      { "tool": "bash", "mode": "allow" },
      { "tool": "read", "mode": "allow" },
      { "tool": "write", "mode": "ask" }
    ]
  }
}
```

The `env` section injects environment variables into every shell command Claude runs. The `permissions` section controls tool access — `"allow"` runs without asking, `"ask"` prompts each time, `"deny"` blocks entirely.

**Test settings:** Start a new session and run `/status`. You should see your settings loaded. For the developer track, ask Claude to create a file and verify it asks for permission (because `write` is set to `"ask"`).

---

## Part 4: The /init Shortcut

You have been writing CLAUDE.md by hand. There is a faster way for existing projects.

Run `/init` in any project directory. Claude scans your project files (package.json, pyproject.toml, directory structure, git history) and generates a starter CLAUDE.md.

```bash
# Navigate to any real project you have
cd ~/my-actual-project

# Start a Claude session
claude

# Run /init
/init
```

**What happens:** Claude generates a CLAUDE.md with your detected stack, build commands, directory structure, and suggested conventions.

**The catch:** `/init` gives you a starting point, not a finished product. It catches the obvious things (stack, build commands) but misses the subtle things (your team's naming conventions, your preferred error format, the banned phrases in your style guide). Your job is to review the generated CLAUDE.md and add what `/init` could not infer.

**Try this workflow:**
1. Run `/init` to generate the skeleton
2. Review the output — what did it get right? What did it miss?
3. Add the conventions, rules, and constraints that are specific to your team
4. Test with the first-try test: give Claude a task and check if it follows your rules

---

## Part 5: The Global CLAUDE.md — Karpathy's 4 Rules

Everything so far has been project-level instructions. But Claude also loads `~/.claude/CLAUDE.md` — a global file that applies to every project on your machine. That is where behavioral rules live — rules that are not about any one codebase but about how Claude should approach coding in general.

Andrej Karpathy identified four LLM coding failure modes that show up regardless of the project. A repository packaging these into a CLAUDE.md hit #1 on GitHub trending with over 50,000 stars: [github.com/forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills). Create your global CLAUDE.md now:

```bash
mkdir -p ~/.claude
cat > ~/.claude/CLAUDE.md << 'EOF'
# Global Rules

## 1. Think Before Coding
Do not assume. If a requirement has multiple interpretations, list them.
If something is unclear, stop and ask instead of guessing.

## 2. Simplicity First
Minimum code that solves the problem. No features beyond what was asked.
No abstractions for single-use code. If 50 lines can solve it, do not write 200.

## 3. Surgical Changes
Touch only what you must. Do not "improve" adjacent code or refactor things
that are not broken. Every changed line should trace directly to the request.

## 4. Goal-Driven Execution
Define success criteria before starting. Transform vague tasks into verifiable
goals. "Fix the bug" becomes "write a test that reproduces it, then make it pass."
EOF
```

**Why these four:** They correct universal LLM defaults — building the wrong thing because the model assumed instead of asking, over-engineering with abstractions nobody requested, creating noisy diffs by touching code it was never asked to change, and coding without defining done.

**Test it:** Start a new Claude Code session in any project. Run `/status` — you should see your global CLAUDE.md listed. Give Claude a vague task and check: does it ask for clarification instead of guessing? Does it keep the change minimal?

**The two-layer model:** Your project CLAUDE.md handles conventions (import patterns, naming, test fixtures). Your global CLAUDE.md handles discipline (ask before assuming, keep it simple, touch only what you must). Both load automatically, every session.

---

## Key Takeaways

1. **CLAUDE.md is your project's permanent briefing.** Claude reads it at the start of every session. Write what you would tell a new team member on day one.

2. **Rules files split concerns.** One file per topic (testing, security, style). Use path scoping to load rules only when relevant. Keeps context lean.

3. **Settings control permissions.** `settings.json` sets environment variables and tool access. Use `"deny"` to block dangerous operations, `"ask"` for sensitive ones.

4. **The first-try test reveals gaps.** Give Claude a task after writing your instructions. If it does something wrong, the problem is in your briefing — fix the instructions, not the prompt.

5. **`/init` generates the skeleton. You add the brain.** Auto-generated instructions catch the obvious. Your team's conventions are the hard part.

6. **CLAUDE.md is alive — update it whenever Claude gets something wrong.** Every convention Claude violates is a line you forgot to write. Fix the instructions, not the prompt. The fix propagates to every future session automatically.

7. **Global CLAUDE.md handles discipline. Project CLAUDE.md handles conventions.** Karpathy's four rules (think before coding, simplicity first, surgical changes, goal-driven execution) belong in `~/.claude/CLAUDE.md` because they fix LLM behavior in every project, not just one.

## Success Criteria

- [ ] Created a CLAUDE.md that Claude loads automatically at session start
- [ ] Tested CLAUDE.md with the first-try test — Claude followed documented conventions
- [ ] Created at least two rule files in `.claude/rules/`
- [ ] Used path scoping (`paths:` frontmatter) on at least one rule file
- [ ] Created a `.claude/settings.json` with at least one `env` variable
- [ ] Ran `/status` to confirm all instruction files are loaded
- [ ] Created a global `~/.claude/CLAUDE.md` with Karpathy's 4 behavioral rules
