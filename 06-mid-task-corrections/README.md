# Lesson 06: Mid-Task Corrections

Ask side questions without derailing your current task.

## What You Will Learn

| Concept | Why It Matters |
|---------|---------------|
| `/btw` command | Ask ephemeral side questions that never enter conversation history |
| Full context, no tools | The mental model — `/btw` sees everything but cannot act |
| Minimal cost | Side questions cost almost nothing because they reuse conversation data already in memory |
| When NOT to use `/btw` | Recognize when a normal prompt is the right choice |

## Pick Your Track

| Track | Scenario | You Will Build |
|-------|----------|---------------|
| **Builder** | Q3 product launch for Relay (async team messaging app) | 5-email onboarding sequence while asking side questions about email marketing |
| **Developer** | Auth migration from JWT to session tokens | Redis session store + dual-auth middleware while asking side questions about Redis and FastAPI |

Both tracks take about **10 minutes** and teach the same core skill: using `/btw` to ask without interrupting.

## File Structure

```
06-mid-task-corrections/
├── CHALLENGE.md              ← Start here
├── README.md                 ← You are here
├── VERIFY.md                 ← Check your work
├── starter-builder/
│   └── campaign-brief.md     ← Relay product launch brief
└── starter-dev/
    └── auth-migration.md     ← JWT-to-session migration plan
```

## Key Concept

Every conversation with Claude is a shared whiteboard. Each message you send takes up space on that whiteboard. `/btw` is the sticky note you pass to a colleague during a meeting — they read it, answer, and throw it away. Nothing goes on the whiteboard. The meeting continues.

The same way Lesson 05 taught you to match thinking depth to the task, this lesson teaches you to match the *channel* to the question. Some questions deserve a place in the conversation. Most side questions do not.

## Start

```bash
cd 06-mid-task-corrections
cat CHALLENGE.md
```
