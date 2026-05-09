# Lesson 08: Teach Claude Your Project

## What You Will Learn

How to give Claude persistent knowledge about your project so it follows your conventions, uses your build commands, and respects your architecture from the very first prompt — without you re-explaining every time.

## Core Concept: The Briefing

Every time you start a Claude Code session, Claude reads a set of instruction files before you type anything. These files are your project briefing — the equivalent of sitting a new team member down and saying "here is how we do things."

The three layers:

**`CLAUDE.md`** — your project's main briefing document. Lives at the project root. Contains build commands, architecture notes, coding conventions, and anything you would explain to a new developer on day one. Claude reads it automatically at session start.

**`.claude/rules/`** — modular instruction files. One file per concern (testing, security, code style). Can be scoped to specific file paths so Claude only loads them when relevant. Keeps your CLAUDE.md from becoming a 500-line monolith.

**`.claude/settings.json`** — project-level configuration. Controls which tools Claude can use, sets environment variables, and configures permissions. This is the guardrail layer.

## The First-Try Test

The quality of your project instructions determines how often Claude gets things right on the first attempt. When Claude uses the wrong naming convention, imports from the wrong path, or skips your lint step — that is not a Claude problem. That is a briefing problem.

The test: after writing your CLAUDE.md and rules, give Claude a typical task. Did it follow your conventions? Did it run the right build command? Did it match your existing code style? If not, the gap is in your briefing, not in Claude.

## What This Builds On

Lesson 07 taught you to persist sessions. Lesson 08 teaches you to persist knowledge. Sessions save your conversation. CLAUDE.md saves your project's brain.

## Key Commands

| Command | What It Does |
|---------|-------------|
| `/init` | Auto-generate a starter CLAUDE.md from your project |
| `/status` | Show which instruction files are loaded and active |

## Concept Progression

- Lesson 01 introduced `@file` for loading context into a single prompt
- Lesson 07 introduced `--resume` for persisting conversations
- **Lesson 08** introduces `CLAUDE.md` for persisting project knowledge across all sessions
- Lesson 09 will introduce custom slash commands for persisting workflows
