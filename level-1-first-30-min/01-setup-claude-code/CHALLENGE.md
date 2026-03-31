# Lesson 01: Your First 30 Minutes with Claude Code

**Time:** 25–30 minutes
**What you'll cover:** Install, first prompt, `@` file references, `!` shell escape, `/compact`, `/context`, `/cost`, and the two mental models that separate beginners from power users.

---

## Part 1: Install & Authenticate (5 min)

### Install

**macOS / Linux / WSL:**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell:**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Homebrew (macOS alternative):**
```bash
brew install --cask claude-code
```

> npm install is deprecated. Use the native installer.

### Verify

```bash
claude --version
claude doctor
```

`claude doctor` runs a full diagnostic — installation, auth, network. Run it once now so you have a baseline.

### Authenticate

```bash
cd starter
claude
```

Your browser opens. Sign in with your Claude Pro, Max, Teams, or Enterprise account.

> **API key instead?** `export ANTHROPIC_API_KEY=sk-ant-your-key-here` before running `claude`.

You should see Claude's prompt. You're in.

---

## Part 2: Your First Prompt — Claude Writes Code, Not Suggestions (3 min)

Type this into Claude:

```
Read hello.py and add a function called greet that takes a name parameter and returns "Hello, {name}! Welcome to Claude Code." Then call it with "Vikas" at the bottom of the file.
```

**Watch what happens.** Claude will:
1. Ask permission to read `hello.py`
2. Write a `greet()` function directly into the file
3. Show you the diff

This is the first mental model: **Claude Code is an agent, not a chatbot.** It didn't suggest code for you to copy-paste. It opened the file, edited it, and saved it. You approved the change, and it's in your project.

---

## Part 3: `!` Shell Escape — Run Commands Without Leaving (2 min)

Type this:

```
!python hello.py
```

The `!` prefix runs any shell command from inside Claude. You should see your greeting printed.

Try a few more:

```
!ls
!cat hello.py
!python --version
```

**Why this matters:** Every time you switch between Claude and your terminal, you lose focus and waste tokens re-establishing context. `!` keeps you in the session. From day one, train yourself to run commands inside Claude, not outside it.

> **Token savings tip:** `!ls` costs zero tokens — it runs in your shell, not through the AI. Use it freely for quick checks.

---

## Part 4: `@` File References — Point Claude at Specific Files (5 min)

This is where it gets powerful. The `starter/` folder has three files: `hello.py`, `app.py`, and `utils.py`. The task tracker in `app.py` has a bug.

Type this:

```
@app.py has a bug in the show_stats function — there's a division by zero when no tasks exist. Fix it.
```

The `@` prefix tells Claude exactly which file to look at. Without it, Claude would need to search your project, read multiple files, and figure out where `show_stats` lives. With `@`, you skip all that — Claude goes straight to the file.

**Now try a cross-file reference:**

```
@app.py @utils.py — the truncate function in utils.py has an off-by-one error. The truncated string plus "..." exceeds max_length. Fix it, then use the fixed truncate function in app.py's list_tasks to truncate long task titles.
```

Claude reads both files, fixes the bug in `utils.py`, and wires the fix into `app.py`. Two files, one prompt.

**The rule:** Whenever you know which file(s) the task involves, use `@`. It's faster, cheaper (fewer tokens scanning), and more accurate.

---

## Part 5: `/cost` and `/context` — Know Your Budget (3 min)

Type:

```
/cost
```

This shows your token usage and spend for the current session.

Now type:

```
/context
```

This shows how full your context window is — the amount of "memory" Claude has for this conversation.

**This is the second mental model: Context is a Budget.**

Your context window is like RAM. Every file Claude reads, every prompt you type, every response Claude generates — it all fills the window. When it's full, Claude starts forgetting earlier parts of the conversation. Quality drops. Mistakes increase.

Knowing your context usage isn't optional — it's how you stay effective. Check `/cost` and `/context` the way you'd check your phone battery. If you're above 50%, it's time to compact.

---

## Part 6: `/compact` — The One Command That Prevents 90% of Frustration (5 min)

You've been working for a few minutes. Your context window has some usage. Let's see what happens when you compact.

Type:

```
/compact
```

Claude summarizes the entire conversation into a compressed form and clears the raw history. Your context usage drops dramatically, but Claude retains the key information.

**Try it now.** After compacting, type:

```
What files have we been working on and what changes did we make?
```

Claude should recall the work — the `greet()` function, the division-by-zero fix, the truncate fix — even though the original conversation is compressed.

**When to compact:**
- Context above 50%? Compact.
- Starting a new sub-task in the same session? Compact first.
- Claude giving worse answers than it was 10 minutes ago? Compact.

Most beginners never compact. They hit 95% context, Claude starts hallucinating, and they blame the tool. The tool is fine. The context was full.

---

## Part 7: Stop Chatting, Start Commanding (5 min)

This is the mindset shift. Most people write prompts like this:

```
Can you take a look at app.py and maybe add some input validation?
I think it would be good to check if the title is empty when
adding a task. What do you think?
```

That's chatting. It works, but it's slow, verbose, and wastes tokens on back-and-forth.

Instead, issue commands:

```
@app.py Add input validation to add_task: reject empty titles using validate_title from @utils.py. Print the error message and return early.
```

One prompt. Specific files. Clear action. No hedging.

**Try it now.** Type this exact prompt:

```
@app.py @utils.py Wire validate_title into add_task. If validation fails, print the error and return without saving. Test it by running: python app.py add ""
```

Claude edits `app.py`, imports `validate_title`, adds the check, and you can verify immediately with `!python app.py add ""`.

**The pattern:**
- Lead with `@` file references
- State the action as a command, not a question
- Include the verification step in the prompt when possible

---

## Success Criteria

You've completed Lesson 01 when:

- [ ] `claude --version` returns a version number
- [ ] `hello.py` has a `greet()` function Claude wrote
- [ ] You ran `!python hello.py` from inside Claude
- [ ] You used `@app.py` to fix the division-by-zero bug
- [ ] You used `@app.py @utils.py` in a single prompt (cross-file reference)
- [ ] You ran `/cost` and `/context` at least once each
- [ ] You ran `/compact` and verified Claude retained context
- [ ] You issued a command-style prompt (no "can you" or "maybe")

---

## Key Takeaways

| Concept | What It Means | When to Use |
|---------|--------------|-------------|
| Agent, not chatbot | Claude reads, writes, and executes on your filesystem | Always — this is the foundation |
| `!` shell escape | Run terminal commands inside Claude | Any time you'd switch to your terminal |
| `@` file references | Point Claude at specific files | Whenever you know which file(s) are involved |
| `/compact` | Compress conversation, reclaim context | At 50% context or when starting a new sub-task |
| `/cost` + `/context` | Check your token spend and context usage | Every 10–15 minutes, like a fuel gauge |
| Commands > chat | "Fix X in Y" beats "Can you look at Y?" | Every prompt — be direct, be specific |
| Context = Budget | Every token in is a token used — manage it | Drives every decision above |

---

## What's Next

**Lesson 02** covers session management — `/rewind`, `/fork`, model switching, and `--resume`. You'll learn how to undo mistakes without losing context, branch experiments safely, and pick the right model for each task.
