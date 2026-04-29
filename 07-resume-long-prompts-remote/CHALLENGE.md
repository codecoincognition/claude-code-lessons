# Lesson 07: Resume, Long Prompts, and Remote Control

## Goal
Learn three session management skills that keep your work flowing across time, across tools, and across devices: resuming sessions with `--resume`, composing long prompts with `Ctrl+G`, and controlling sessions from your phone with `/remote-control`.

## Pick Your Track

This lesson has two tracks. **Pick one and stick with it** for all four parts:

- **Builder track** — you are reviewing a SaaS product roadmap. No coding required. Best if you are a PM, founder, or non-technical builder.
- **Developer track** — you are building a rate limiter in Python. Requires familiarity with Python, FastAPI, and Redis concepts (no local install needed — Claude generates the code). Best if you write code regularly.

Both tracks take about 25 minutes and teach the same three skills.

## Prerequisites
- Claude Code installed and working
- Completed Lesson 01 (or comfortable with basic prompting)
- A working session open in your terminal

## Before You Start

Create a git baseline so you can see what changes:

```bash
git add -A && git commit -m "before lesson 07"
```

---

## Part 1: Resume Where You Left Off — --resume

Start a new Claude Code session and give it a name:

```bash
claude --name "lesson-07-test"
```

Now give Claude a task using one of the starter files:

**Builder track:**
```
@starter-builder/product-roadmap.md Draft the Q3 executive summary.
Focus on the three shipped features and their impact metrics.
```

**Developer track:**
```
@starter-dev/api-gateway.md Implement the rate limiter middleware
as a Python class. Include sliding window logic and Redis backing.
```

After Claude generates a response, **exit the session** — press `Ctrl+C` or type `/exit`.

Now reopen it:

```bash
claude --resume lesson-07-test
```

**What happens:** Claude loads the full conversation history. It remembers the file you loaded, the task you gave it, and the response it generated. You can continue exactly where you left off.

**Try these variations:**

```bash
# Resume the most recent session in this directory (no picker)
claude -c

# Open the interactive session picker
claude --resume
```

The session picker shows all previous sessions for this directory. Use arrow keys to navigate and Enter to select.

**Expected result:** Your conversation is fully restored. Ask Claude to continue — "Write the next section" or "Add error handling" — and it picks up seamlessly.

**Key detail:** Session-scoped permissions (like file write access) are not restored on resume. You will need to re-approve them when Claude tries to take action.

**When NOT to resume:** If your session is very long (80%+ of the context window) or you changed direction entirely, start fresh instead. Use `/compact` in the old session to save a summary, then start a new named session. A clean session with a clear prompt beats a cluttered session with stale context.

**If resume fails:** Occasionally a session may not resume cleanly — for example, if you moved to a different directory or the session file was corrupted. If `--resume <name>` does not find your session, try `claude --resume` (the picker) to browse all sessions. If the session is gone, start fresh — this is exactly why naming sessions and using `/compact` before exiting long sessions is good practice.

---

## Part 2: Long Prompts with Ctrl+G

Sometimes your prompt is longer than a single line — a detailed brief, a multi-step instruction, or a paste from another document. Typing long prompts directly in the terminal is painful.

Press **Ctrl+G** in your Claude Code session.

**What happens:** Your default text editor opens (whatever `$EDITOR` is set to — vim, nano, VS Code, etc.). Write or paste your prompt there. Save and quit. The prompt is sent to Claude.

**Builder track — try this:**

1. Press `Ctrl+G` in your session
2. In the editor, paste or type this multi-paragraph prompt:

```
I need you to review the product roadmap and create three things:

1. A one-paragraph executive summary for the board deck. Tone: confident
   but honest. Mention the delay on real-time sync.

2. A bullet list of Q3 wins with quantified impact (use the metrics
   from the roadmap document).

3. A risk section covering the two items flagged as "at risk" in the
   roadmap. For each, state the risk, the mitigation plan, and the
   owner.

Format the output as a single markdown document with clear headings.
```

3. Save and quit your editor
4. Claude receives the full prompt and starts working

**Developer track — try this:**

1. Press `Ctrl+G`
2. Paste this multi-step spec:

```
Implement three changes to the rate limiter:

1. Add a "burst" mode that allows 2x the normal rate for the first
   10 seconds of a new client connection. After 10 seconds, drop
   back to the standard rate.

2. Add a /health endpoint that returns the current state of the rate
   limiter: total clients tracked, average request rate, and the
   number of clients currently throttled.

3. Add logging that records every throttle event with timestamp,
   client IP, current rate, and the limit that was exceeded.
   Use structured JSON logging.

Each change should be a separate function. Include docstrings.
```

3. Save and quit — Claude processes all three changes

**Other ways to enter multi-line prompts** (if Ctrl+G does not suit you):

| Method | Works in |
|--------|----------|
| `\` then Enter | All terminals |
| Shift+Enter | iTerm2, WezTerm, Ghostty, Kitty, Warp, Apple Terminal |
| Ctrl+J | Any terminal (no config needed) |
| Paste directly | All terminals (for code blocks and logs) |

**Tip:** In `/config`, you can enable "Show last response in external editor" — this prepends Claude's previous reply as commented context above your prompt, so you can reference it while composing.

---

## Part 3: Control Your Session from Anywhere — /remote-control (Optional Advanced)

> **Note:** Parts 1 and 2 are the core of this lesson. Part 3 is an advanced feature that requires a second device (phone or another computer). If you do not have a second device handy, read through this section and move on to Part 4 — you can try it later.

This feature lets you monitor and interact with a Claude Code session from your phone or another computer.

In your active session, type:

```
/remote-control
```

(Short form: `/rc`)

**What happens:**
- Claude generates a session URL and a QR code in your terminal
- Open the URL in any browser, or scan the QR code with your phone
- You are now connected to the same session from two devices

**Try this workflow:**

1. Type `/remote-control` in your terminal session
2. Scan the QR code with your phone (or open the URL on another device)
3. On your phone, type a prompt: "Summarize what we have done so far"
4. Watch the response appear on both your terminal and your phone
5. Back in your terminal, continue working — both devices stay in sync

**Real-world use cases:**

- Start a long task on your desktop, walk to a meeting, check progress from your phone
- Kick off a test suite, go get coffee, approve or redirect from the mobile app
- Pair with a colleague — share the URL so they can see what Claude is doing

**Starting a session with remote control from the beginning:**

```bash
# Start a new session with remote control enabled
claude --remote-control "My Project"

# Short form
claude --rc "My Project"
```

**Server mode** (for teams or multiple sessions):

```bash
claude remote-control --name "Backend Work" --capacity 4
```

This runs a persistent server that can manage multiple concurrent sessions.

**What works on mobile, and what does not:**

| Works on mobile | Local only |
|----------------|------------|
| Typing prompts and receiving responses | Interactive pickers (/resume, /mcp) |
| /compact, /clear, /context, /cost | File system browsing |
| /exit, /recap | Session-local commands |

**Key details:**
- Remote control uses outbound HTTPS only — it never opens ports on your machine
- If your laptop sleeps, the session reconnects automatically when it wakes
- Network outages beyond about 10 minutes will time out the session
- Requires a Claude.ai subscription (Pro, Max, Team, or Enterprise) — API keys are not supported

**Optional: push notifications.** In `/config`, enable "Push when Claude decides." Claude will send a notification to your phone when a long task finishes or when it needs your input. Requires the Claude mobile app with notifications enabled.

---

## Part 4: Combining All Three

Now put it all together. This is the real workflow:

1. **Start a named session** with remote control:
   ```bash
   claude --name "roadmap-review" --rc
   ```

2. **Use Ctrl+G** to paste a long brief from your notes or a document

3. Claude starts working. **Scan the QR code** with your phone.

4. Walk away from your desk. **Check progress from your phone.** Type a follow-up if needed.

5. Come back to your desk. **Continue in the terminal.** Both devices are in sync.

6. End of day — **exit the session** (`/exit` or Ctrl+C).

7. Tomorrow morning: **resume exactly where you left off:**
   ```bash
   claude --resume roadmap-review
   ```

This is the full session lifecycle: start, compose, monitor, resume. Once it is habit, you never lose work and you never wait.

---

## Key Takeaways

1. **`--resume` restores your full conversation.** Use `claude -c` for the most recent session, `claude --resume` for the picker, or `claude --resume <name>` for a specific session. Name your sessions with `--name` to make them easy to find.

2. **`Ctrl+G` opens your editor for long prompts.** Any prompt longer than two lines is easier to compose in a real editor. Save and quit to send.

3. **`/remote-control` connects any device to your session.** QR code or URL. Both devices stay in sync. Type from wherever you are.

4. **These three skills form a lifecycle:** start a named session, compose with Ctrl+G, monitor from your phone, resume the next day. Your work never stops.

5. **Session permissions reset on resume.** Claude remembers the conversation but not the permissions. You will re-approve file access when needed.

## Success Criteria

- [ ] Started a named session with `--name`
- [ ] Exited and resumed a session with `--resume` or `-c`
- [ ] Used the interactive session picker (`claude --resume` with no argument)
- [ ] Composed a multi-line prompt with `Ctrl+G`
- [ ] Activated `/remote-control` and connected from another device (or browser tab)
- [ ] Combined at least two of the three features in a single workflow
