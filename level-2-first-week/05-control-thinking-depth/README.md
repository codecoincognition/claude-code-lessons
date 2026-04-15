# Lesson 05: Control Thinking Depth

**Level 2 — First Week** | 15 min | Builds on Lesson 04

Lesson 04 taught you to pick the right model. This lesson teaches you the other dial: `/effort`. Effort controls how deeply the model thinks before answering — and the gap between default effort and high effort is often bigger than the gap between Sonnet and Opus. Today you'll use the same model at three different effort levels on the same problem and see how the shape of the answer changes.

## What You'll Learn

| Skill | Description |
|-------|-------------|
| `/effort` | Show the current effort level |
| `/effort low\|medium\|high` | Set effort (persists across sessions) |
| `/effort max` | Deepest reasoning. Opus 4.6 only, current session only. |
| `/effort auto` | Reset to the model's default |
| `ultrathink` | Include this word in your prompt to trigger high effort for one turn |
| `--effort` flag | Set effort when launching Claude: `claude --effort high` |
| Effort-picking mindset | Obvious answer → low. Tradeoffs → high. Shapes everything → max. |

## Pick Your Track

| | Builder Track | Developer Track |
|--|---------------|-----------------|
| **Files** | `starter-builder/` | `starter-dev/` |
| **Scenario** | Rewrite a landing page that's losing 62% of visitors at the hero | Diagnose and fix a 4.2-second API endpoint |
| **Low effort job** | Scan for voice guideline violations | List visible performance problems |
| **High effort job** | Three strategic hero rewrites with tradeoff analysis | Root cause diagnosis with estimated impact per fix |
| **Max effort job** | Pick the ONE change for this sprint | Incremental fix vs. rewrite — commit to a plan |

## File Structure

```
05-control-thinking-depth/
├── CHALLENGE.md            ← start here
├── README.md               ← this file
├── VERIFY.md               ← check your work
├── starter-builder/
│   └── landing-page.md     ← current page copy, competitive context, conversion data
└── starter-dev/
    └── slow-endpoint.md    ← endpoint code, performance data, constraints
```

## Quick Start

In your terminal:

```bash
# Builder track
cd starter-builder && claude

# Developer track
cd starter-dev && claude
```

Once the Claude prompt appears, read the challenge:

```
@CHALLENGE.md
```

Then follow the parts in order.

## Key Concept

Effort changes the *shape* of the answer, not just the length. Low effort scans and reports. High effort weighs tradeoffs. Max effort models failure modes and commits to a recommendation. The same way Lesson 04 taught you to pick the right model, this lesson teaches you to pick the right amount of thinking time.
