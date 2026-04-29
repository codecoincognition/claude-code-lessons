# Lesson 07: Resume, Long Prompts, and Remote Control

Manage sessions across time, tools, and devices.

## What You Will Learn

| Concept | Why It Matters |
|---------|---------------|
| `--resume` / `-c` | Pick up exactly where you left off — tomorrow, next week, after a reboot |
| `Ctrl+G` external editor | Compose long, structured prompts in your real editor instead of fighting the terminal |
| `/remote-control` | Monitor and interact with sessions from your phone or another computer |
| Session lifecycle | Start, compose, monitor, resume — the full workflow that means you never lose work |

## Pick Your Track

| Track | Scenario | You Will Build |
|-------|----------|---------------|
| **Builder** | Q3 product roadmap review for a SaaS startup | Executive summary, wins list, and risk assessment across multiple sessions |
| **Developer** | API gateway rate limiter | Sliding-window rate limiter with burst mode, health endpoint, and structured logging |

Both tracks take about **25 minutes** and teach the same core skills: resuming sessions, composing in an editor, and controlling from another device.

## File Structure

```
07-resume-long-prompts-remote/
├── CHALLENGE.md              ← Start here
├── README.md                 ← You are here
├── VERIFY.md                 ← Check your work
├── starter-builder/
│   └── product-roadmap.md    ← SaaS product roadmap brief
└── starter-dev/
    └── api-gateway.md        ← API gateway spec with rate limiting
```

## Key Concept

Your Claude Code session is not disposable. It is a workspace — like a desk you leave at the end of the day and return to in the morning. `--resume` is the key that unlocks it. `Ctrl+G` is the notepad you keep next to it for complex instructions. `/remote-control` is the security camera that lets you check on it from anywhere.

The same way Lesson 06 taught you to route questions through the right channel, this lesson teaches you to manage your session across the three dimensions that matter: time (resume), complexity (editor), and location (remote).

## Start

```bash
cd 07-resume-long-prompts-remote
cat CHALLENGE.md
```
