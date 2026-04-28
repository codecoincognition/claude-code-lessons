# Lesson 06: Mid-Task Corrections

## Goal
Learn to ask side questions without derailing Claude's current task — using `/btw` for ephemeral, zero-cost clarifications that never clutter your conversation history.

## Prerequisites
- Claude Code installed and working
- Completed Lesson 01 (or comfortable with basic prompting)
- A working session open in your terminal

## Before You Start

Create a git baseline so you can see what changes:

```bash
git add -A && git commit -m "before lesson 06"
```

---

## Part 1: The Problem — Interrupting Costs More Than You Think

Start a session and give Claude a meaty task using one of the starter files:

**Builder track:**
```
@starter-builder/campaign-brief.md Write the full 5-email onboarding
sequence for Relay. Each email should follow the brand voice, hit one
messaging pillar, and include a specific CTA. Start with email 1.
```

**Developer track:**
```
@starter-dev/auth-migration.md Implement the Redis session store as a
Python class with create_session, get_session, revoke_session, and
refresh_ttl methods. Include error handling and connection pooling.
```

While Claude is generating (or after it finishes email 1 / the class skeleton), you will have a question. Maybe you want to know:
- Builder: "What is the difference between a drip sequence and a nurture sequence?"
- Developer: "What is the default Redis connection pool size in the redis-py library?"

**Expected result:** Claude starts generating content — you will see text streaming into your terminal as it writes email 1 or the class skeleton. Let it run. While it works (or after it finishes), a question will come to mind.

**Do NOT type that question into the main prompt yet.** If you do, Claude will:
1. Add your question to the conversation history (consuming context)
2. Lose its train of thought on the current task
3. Answer your question, then you have to re-prompt it to continue

Instead, move to Part 2.

---

## Part 2: /btw — The Side Channel

In your active Claude Code session, type `/btw` followed by your question:

**Builder track:**
```
/btw What is the difference between a drip sequence and a nurture sequence?
```

**Developer track:**
```
/btw What is the default connection pool size for redis-py?
```

**What happens:**
- Claude answers your question in a dismissible overlay (a popup panel that appears on top of your terminal)
- The answer draws from everything already in your conversation (it has full context)
- The question and answer are **not** added to conversation history
- Your main task is untouched — Claude's next response continues where it left off
- Press **Space**, **Enter**, or **Escape** to dismiss the overlay and return to your prompt

**Expected result:** A short, focused answer to your side question. No disruption to the main task. Check your context usage with `/cost` — the side question cost almost nothing because it reused the conversation data already loaded in memory.

---

## Part 3: When /btw Shines — Quick Clarifications Mid-Flow

Now continue your main task. Ask Claude to write the next piece:

**Builder track:**
```
Write email 2. Make it about the async queuing feature.
```

**Developer track:**
```
Now add the dual-auth middleware that tries session first, falls back to JWT.
```

While Claude works, use `/btw` for a few more side questions — the kind of quick lookups you would normally Google or context-switch for:

**Builder track examples:**
```
/btw What open rate is considered good for SaaS onboarding emails?
/btw What does CAN-SPAM require for unsubscribe links?
/btw How long should a SaaS onboarding email be in words?
```

**Developer track examples:**
```
/btw What is the difference between Redis EXPIRE and EXPIREAT?
/btw Does FastAPI's Depends() work with async functions?
/btw What status code should a token exchange endpoint return on success?
```

**What to notice:**
- Each `/btw` answer appears instantly in an overlay, then disappears when you dismiss it
- Your conversation history stays clean — run `/cost` to confirm
- Claude's next response in the main task picks up exactly where it left off, with no awareness that you asked side questions

---

## Part 4: What /btw Cannot Do

Try this deliberately so you understand the boundary:

```
/btw Read the campaign-brief.md file and tell me how many open questions it lists
```

or (developer track):

```
/btw Run a quick Redis PING to check if the connection is alive
```

**What happens:** Claude answers from what is already in context. If you loaded the file earlier with `@`, Claude can answer from memory. But `/btw` **cannot use tools** — it cannot read files, run commands, search the web, or call external integrations. It only sees what is already in the conversation.

This is the key mental model: **`/btw` has full context but no tools.** If your side question needs Claude to *do* something (read a file, run code, search), use a normal prompt instead.

---

## Part 5: /btw vs. Alternatives — When to Use What

Here is when to reach for each option:

| Situation | Use |
|-----------|-----|
| Quick factual question, no tools needed | `/btw` |
| Need Claude to read a file or run code | Normal prompt |
| Want to undo Claude's last action | `Esc` + `Esc` (rewind) |
| Need a parallel exploration without losing context | `/branch` |
| Want to free up context space | `/compact` |

**The rule of thumb:** If the answer is already in Claude's head (from the conversation so far), use `/btw`. If Claude needs to go look at something or do something, use a normal prompt.

---

## Key Takeaways

1. **`/btw` is for side questions that should not become part of the conversation.** It is the sticky note you pass to a colleague — they read it, answer, and throw it away.

2. **Full context, no tools.** This is the mental model. `/btw` sees everything in the conversation but cannot take any action.

3. **It costs almost nothing.** Side questions reuse the conversation data already loaded in memory, so they add minimal token cost.

4. **Dismiss with Space, Enter, or Escape.** The answer appears in an overlay. You are back to your main prompt in one keystroke.

5. **Your conversation stays clean.** No history pollution, no context waste, no derailed tasks. The main thread continues as if the side question never happened.

## Success Criteria

- [ ] Used `/btw` for at least 3 side questions during an active task
- [ ] Confirmed the main task continued uninterrupted after each `/btw`
- [ ] Tried a `/btw` that needed tools and understood why it could not help
- [ ] Checked `/cost` before and after `/btw` usage to see the minimal impact
