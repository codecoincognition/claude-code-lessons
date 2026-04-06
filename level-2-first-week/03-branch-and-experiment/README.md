# Lesson 03: Branch & Experiment

**Level 2 — First Week** | 15 min | Builds on Lesson 02

Stop guessing which approach will work best. `/branch` lets you try two directions in parallel, then pick the winner.

## What You'll Learn

| Skill | Description |
|-------|-------------|
| `/branch [name]` | Fork the conversation at any point — both branches evolve independently |
| `/fork [name]` | Alias for `/branch` |
| `claude --resume` | Switch between branches to compare outputs |
| A/B testing mindset | When to branch vs when to iterate in one session |

## Pick Your Track

| | Builder Track | Developer Track |
|--|---------------|-----------------|
| **Files** | `starter-builder/` | `starter-dev/` |
| **Scenario** | Rewrite a newsletter in two different tones | Design two database schemas, compare query patterns |
| **You'll try** | Warm & personal vs sharp & data-driven | Event log vs pre-aggregated counters |
| **Decision** | Which version would your readers actually open? | Which schema makes your queries simpler at scale? |

## File Structure

```
03-branch-and-experiment/
├── CHALLENGE.md        ← start here
├── README.md           ← this file
├── VERIFY.md           ← check your work
├── starter-builder/
│   ├── newsletter-draft.md   ← rough draft + key points
│   └── brand-notes.md        ← tone, voice, word preferences
└── starter-dev/
    ├── schema-options.md     ← requirements + two approaches
    └── existing-models.js    ← production models to coexist with
```

## Quick Start

```bash
# Builder track
cd starter-builder && claude

# Developer track
cd starter-dev && claude
```

Then open `CHALLENGE.md` and follow the parts in order.

## Key Concept

`/branch` creates a copy of your conversation at the current point. The original session stays intact. Both branches have the same starting context but evolve independently. You compare and pick the winner.

This is A/B testing for AI sessions.
