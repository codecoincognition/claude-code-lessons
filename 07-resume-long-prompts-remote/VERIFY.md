# Verify — Lesson 07: Resume, Long Prompts, and Remote Control

## Quick Checks

**Did your starter file load?**
```bash
# Builder track
grep -q "Q3" starter-builder/product-roadmap.md && echo "PASS: product roadmap found" || echo "FAIL: product-roadmap.md missing or incomplete"

# Developer track
grep -q "rate_limiter" starter-dev/api-gateway.md && echo "PASS: api gateway found" || echo "FAIL: api-gateway.md missing or incomplete"
```

**Can you see your named session?**
```bash
claude --resume 2>&1 | head -5
# You should see "lesson-07-test" (or your custom name) in the session list
```

## Behavioral Checklist

- [ ] Started a session with `--name` to give it a memorable label
- [ ] Exited the session and resumed with `claude --resume <name>` or `claude -c`
- [ ] Confirmed Claude remembered the full conversation after resuming
- [ ] Used the interactive session picker (`claude --resume` with no argument)
- [ ] Opened the external editor with `Ctrl+G` and composed a multi-line prompt
- [ ] Sent the prompt by saving and quitting the editor
- [ ] Activated `/remote-control` or `/rc` in an active session
- [ ] Connected to the session from another device (phone or browser tab)
- [ ] Sent a prompt from the remote device and saw the response
- [ ] Combined at least two features in one workflow (e.g., named session + remote control + resume)

## Common Issues

**"claude --resume" shows no sessions**
Sessions are tied to the current directory. Make sure you are in the same directory where you started the session. If you started it in the lesson folder, `cd` back there before resuming.

**Ctrl+G does nothing**
Your `$EDITOR` environment variable may not be set. Try running `export EDITOR=nano` (or `vim`, or `code --wait` for VS Code) and then press Ctrl+G again. If you prefer not to use Ctrl+G, use `\` + Enter or Ctrl+J for multi-line input directly in the terminal.

**Remote control QR code does not scan**
Make sure your phone camera can see the full QR code. If the terminal is too narrow, the QR code may wrap. Try making your terminal wider. Alternatively, copy the URL that Claude prints alongside the QR code and open it manually in your phone browser.

**Remote control says "not supported"**
Remote control requires a Claude.ai subscription (Pro, Max, Team, or Enterprise). It does not work with API keys. If you are on a Team or Enterprise plan, your admin may need to enable the Remote Control toggle in admin settings.

**Claude does not remember my permissions after resume**
This is expected behavior. Session-scoped permissions (like file write access) are not preserved across resume. When Claude tries to write a file after resuming, it will ask for permission again. This is a safety feature — you get a fresh approval surface each time.

**I resumed and Claude seems confused about context**
If you switched git branches between sessions, Claude still has the old conversation but the files on disk may have changed. Tell Claude: "I switched to the feature-x branch — re-read the relevant files with @." This re-syncs Claude with your current state.

## What You Learned

Three session management skills that work together: `--resume` for persistence across time, `Ctrl+G` for composing complex prompts in a real editor, and `/remote-control` for interacting from any device. Together they form a session lifecycle — start, compose, monitor, resume — that means your work never stops and you never lose context.
