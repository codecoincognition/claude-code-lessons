# Lesson 04: Pick the Right Model for the Job

**Level 2 — First Week** | 15 min | Builds on Lesson 03

Claude Code has three models. Most people pick one at install and never switch. `/model` lets you swap them mid-session, and `/effort` lets you dial thinking depth up or down. Today you'll use all three models in one session and feel why the default of "pick one and forget" is the expensive mistake nobody talks about.

## What You'll Learn

| Skill | Description |
|-------|-------------|
| `/model` | Show or switch the current model |
| `/model sonnet` / `/model opus` / `/model haiku` | Jump directly to a model (aliases preferred; full names also work) |
| `/effort low\|medium\|high\|max\|auto` | Dial thinking depth (`max` requires Opus 4.6, current session only; `auto` = model default) |
| `--model` CLI flag | Launch Claude with a chosen model: `claude --model opus` |
| Model-picking mindset | Volume vs depth, reversible vs not, thinking vs typing |

## Pick Your Track

| | Builder Track | Developer Track |
|--|---------------|-----------------|
| **Files** | `starter-builder/` | `starter-dev/` |
| **Scenario** | Ship a product launch campaign end-to-end | Triage 8 bugs, fix one, then make an architecture call |
| **Haiku job** | Generate 15 subject lines | Triage bugs into a severity table |
| **Sonnet job** | Pick winners + write the email body | Propose a fix for one P1 bug |
| **Opus job** | Campaign positioning strategy | Architecture decision (ADR review) |

## File Structure

```
04-pick-the-right-model/
├── CHALLENGE.md            ← start here
├── README.md               ← this file
├── VERIFY.md               ← check your work
├── starter-builder/
│   └── campaign-brief.md   ← launch context, voice, constraints
└── starter-dev/
    ├── bug-reports.md      ← 8 incoming bugs to triage
    └── architecture-decision.md  ← ADR draft with two paths
```

## Quick Start

In your terminal:

```bash
# Builder track
cd starter-builder && claude

# Developer track
cd starter-dev && claude
```

Once the Claude prompt appears, read the challenge file with the `@` syntax:

```
@CHALLENGE.md
```

Then follow the parts in order. Any time the challenge tells you to read a file (like `@campaign-brief.md`), it means the same thing: type `@` followed by the filename inside Claude.

## Key Concept

The mistake isn't picking the wrong model once — it's never switching. One session can contain bulk work (Haiku), everyday judgment (Sonnet), and one hard decision (Opus). Match the model to the work inside the session, not the session as a whole.

**Escalate for the decision, drop back for the execution.**
