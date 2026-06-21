# CLI Spawn And Session Resume

Last reviewed: 2026-06-22

How to spawn each runtime **interactively** (a human-facing TUI session) versus
**non-interactively** (headless / print / one-shot, for a script, hook, or
orchestrator), plus the resume command for each. Every row cites the runtime's
own official docs; where a runtime does not document a capability, the cell says
`not documented`, never an inferred flag.

This doc owns the **command syntax** (launch / headless / resume invocation).
For the deeper resume **semantics** — session stores, id form, capture-before-exit,
and the Codex desktop app-server `thread/resume` protocol — see
`docs/compatibility-matrix.md` → **Session Resume**. The launch/headless claims
here are tracked as `kind: "cli-invocation"` sources in
`docs/official-sources.json`; the resume claims as `kind: "session-resume"`. Both
are re-verified by the daily refresh (`prompts/daily-official-doc-update.md`).

> **Gemini CLI is retired here.** Google moved Gemini CLI to **Antigravity
> CLI** (binary `agy`); for AI Pro/Ultra and free individual users Gemini CLI,
> **as of 2026-06-18, has stopped serving requests**. We track Antigravity CLI as
> the Google-family runtime below. Gemini CLI still exists on an enterprise/Google
> Cloud entitlement — see the transition section.

## The mode switch is not the same shape across runtimes

This is the part that trips people up — `codex exec` and `claude -p` look like
the same idea, but they are reached differently:

- **Headless is a flag on the same binary** for Claude, Grok, Cursor, and Hermes.
  Run the bare command for an interactive session; add the headless switch
  (`-p` / `--print`, or Hermes `-q`) to go non-interactive. So **interactive =
  omit the headless flag.**
- **Headless is a separate subcommand for Codex.** `codex` (and `codex resume`)
  are interactive; `codex exec` (and `codex exec resume`) are headless. There is
  no print/headless `-p` flag to drop — the interactive and headless paths are
  different commands. Note Codex *does* have a `-p`, but it is `--profile` (a
  config-profile selector), **not** a prompt/headless flag: bare `codex -p`
  errors asking for a profile value. So "Codex has no `-p`" is wrong — it has no
  *headless/print* `-p` (verified on `codex-cli 0.140`; `codex --help` lists
  `-p, --profile`).
- **Antigravity CLI documents no headless one-shot flag at all.** `agy` is a TUI;
  programmatic / unattended use goes through the **Antigravity SDK**, not an
  `agy -p` flag. Community guides show `agy -p`, but it is not in the official
  docs — do not depend on it.

## A. Interactive launch (opens the TUI)

| Runtime | Launch interactive TUI | Seed with an initial prompt |
|---|---|---|
| Codex | `codex` — "launches the interactive terminal UI (TUI)" | `codex "<prompt>"` (optional PROMPT arg); `codex -m <model> "<prompt>"`; `codex -i <img> "<prompt>"` |
| Claude Code | `claude` — start interactive session | `claude "<query>"` — start interactive session with an initial prompt |
| Grok / xAI | `grok` — interactive TUI | type after launch (no separate seed-prompt form documented; `-p`/`--single` switches to headless) |
| Hermes Agent | `hermes chat` — interactive chat | type after launch (`-q` switches to a single non-interactive query) |
| Antigravity CLI | `agy` — launches the TUI (first run does color/rendering/trust setup) | type in the prompt box after launch (no documented seed-prompt or headless `-p` flag) |
| Cursor CLI | `cursor-agent` — interactive agent | type after launch (`-p`/`--print` switches to headless) |

## B. Headless run (non-interactive / print / one-shot)

| Runtime | Headless command | Prompt / stdin | Output format | Useful scripting flags |
|---|---|---|---|---|
| Codex | `codex exec "<prompt>"` (alias `codex e`) | prompt arg; `-` reads prompt from stdin | `--json` / `--experimental-json` (JSONL); else final message to stdout, progress to stderr | `--model`/`-m`, `--output-last-message`/`-o <file>`, `--sandbox`/`-s`, `--cd`/`-C`, `--output-schema <file>` (JSON-Schema-constrained final message), `--ephemeral` (don't persist rollout files), `--ignore-user-config`, `--ignore-rules`; `CODEX_API_KEY` for inline auth. (Aside: `-p` is `--profile`, a config-profile selector — **not** a print/headless flag.) |
| Claude Code | `claude -p "<query>"` (`--print`) | `cat file \| claude -p "<query>"` | `--output-format text\|json\|stream-json` (+ `--input-format`) | `--model`, `--bare` (skip auto-discovery; recommended for scripts, will become default for `-p`), `--allowedTools`, `--permission-mode default\|acceptEdits\|plan\|auto\|dontAsk\|bypassPermissions`, `--max-turns`, `--max-budget-usd`, `--json-schema`, `--system-prompt[-file]`, `--append-system-prompt[-file]`, `--permission-prompt-tool`, `--bg`, `--no-session-persistence`, `--plugin-url <url>` (fetch plugin zip for session), `--agents <json>` (inline subagent definitions), `--settings <file-or-json>` |
| Grok / xAI | `grok -p "<prompt>"` (`--single`) | `grok agent stdio` = ACP agent over JSON-RPC on stdin/stdout | `--output-format plain\|json\|streaming-json` | `--model`/`-m`, `--cwd`, `--always-approve`, `--no-alt-screen`, `--no-auto-update` |
| Hermes Agent | `hermes chat -q "<query>"` (single query) | not documented (no stdin/JSON piping flag) | not documented (no JSON output-format flag) | `--model`, `--provider nous\|openrouter`, `--toolsets`, `-s <skill>`, `--verbose` |
| Antigravity CLI | not documented — no `agy -p` one-shot in official docs | — | the TUI can pipe JSON status-line metadata to a shell script, but that is not a one-shot run | use the **Antigravity SDK** (`pip install google-antigravity`; Python `Agent` + `LocalAgentConfig`) for programmatic/unattended runs; `--sandbox`, `--dangerously-skip-permissions` are launch overrides, not a headless mode |
| Cursor CLI | `cursor-agent -p "<prompt>"` (`--print`) | print mode for scripts | `--output-format text\|json\|stream-json` (only with `--print`); `--stream-partial-output` | `--model`, `-f`/`--force` (`--yolo`), `--trust` (headless only) |

> **Billing caveat (Claude Code).** As of 2026-06-22, the Agent SDK billing
> change announced for 2026-06-15 remains **paused**. The official support page
> opens with a dated banner: *"Update June 15: We're pausing the changes to Claude
> Agent SDK usage described below. For now, nothing has changed: Claude Agent SDK,
> `claude -p`, and third-party app usage still draw from your subscription's usage
> limits."* For accounts using `ANTHROPIC_API_KEY`, billing remains pay-as-you-go
> API usage; run `/status` to monitor your remaining plan allocation. For
> unattended/scheduled work prefer a cloud **Claude Routine** over a local
> `claude -p` cron; the reliability advantage (Routine runs regardless of laptop
> state) still applies. See `docs/cloud-automation.md`. (Source:
> https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan,
> verified 2026-06-22.)

## C. Resume invocation (command syntax)

Resume splits the same way: for the flag-based runtimes, the resume flag alone
resumes **interactively** and adding the headless switch resumes **headless**.
Codex uses the `resume` vs `exec resume` command split; Antigravity resumes only
into the TUI. **Session stores, id form, and capture timing live in
`docs/compatibility-matrix.md` → Session Resume** — this table is just the
command to type.

| Runtime | Continue most recent | Pin a specific session | Headless resume |
|---|---|---|---|
| Codex | `codex resume` (picker) | `codex resume <SESSION_ID>` | `codex exec resume --last` / `codex exec resume <SESSION_ID>` (`--all` widens past cwd) |
| Claude Code | `claude -c` (latest in cwd) | `claude -r "<id-or-name>"` (set a name with `-n`); `claude --from-pr <number>` (resume by PR number or URL) | add `-p`: `claude -c -p` / `claude -r "<s>" -p` |
| Grok / xAI | `grok -c` | `grok -r <ID>` / `grok -s <ID>` (named) | add `-p` to the same flags |
| Hermes Agent | `hermes -c` | `hermes -r <session_id>` (or by title) | not separately documented |
| Antigravity CLI | `agy --continue` (latest in workspace) | `agy --conversation <uuid>`; in-TUI `/resume` (`/switch`, `/conversation`) picker, Tab imports Antigravity 2.0 desktop threads; `/fork` (`/branch`) | not documented (no headless one-shot) |
| Cursor CLI | `--continue` (alias `--resume=-1`) / `agent resume` | `cursor-agent --resume <chatId>` (list via `agent ls`) | same flags plus `-p`; `agent create-chat` returns a new id |

**Pinning a specific session** is shell-level on every runtime: `codex resume <id>`,
`claude -r "<id-or-name>"`, `grok -r <id>`, `hermes -r <id>`,
`agy --conversation <uuid>`, `cursor-agent --resume <chatId>`. Identifiers differ
(UUID vs. human name vs. `--conversation`), so store the handle in the form that
runtime's resume command accepts. Antigravity conversations are
**workspace-scoped** — `agy` only lists sessions started in the current directory.

## Gemini CLI → Antigravity CLI transition

Official (Google Developers Blog, posted 2026-05-19; antigravity.google docs):

- **Cutoff:** As of **2026-06-18**, Gemini CLI and the Gemini Code Assist IDE
  extensions have stopped serving requests for Google AI Pro/Ultra and free
  individual users. Enterprise (Gemini Code Assist Standard/Enterprise, Google
  Cloud GitHub, paid Gemini / Gemini Enterprise Agent Platform API keys) keep
  Gemini CLI with the latest models. (The blog does not state the open-source
  repo's license; the earlier "Apache 2.0" note is dropped as unsourced.)
- **Successor:** Antigravity CLI (`agy`) shares the agent harness with the
  Antigravity 2.0 desktop app and the **Antigravity SDK**
  (`pip install google-antigravity`) — the documented programmatic/headless path,
  since `agy` itself has no one-shot flag. Install `agy` to `~/.local/bin/agy` via
  `curl -fsSL https://antigravity.google/cli/install.sh | bash` (Windows:
  `irm https://antigravity.google/cli/install.ps1 | iex`); auth is via the OS
  keyring (browser/SSH OAuth on first sign-in).
- **Migration:** `agy plugin import gemini` converts legacy Gemini extensions to
  native plugins; first launch auto-detects and offers to convert existing
  profiles. Context files are unchanged — the agent still reads `GEMINI.md` and
  `AGENTS.md` (global `~/.gemini/GEMINI.md`).
- **Path changes:** workspace skills move `.gemini/skills/` → `.agents/skills/`
  (global `~/.gemini/antigravity-cli/skills/`); MCP servers move out of
  `~/.gemini/settings.json` into `~/.gemini/config/mcp_config.json` (global) /
  `.agents/mcp_config.json` (workspace), and the server URI key `url`/`httpUrl`
  becomes `serverUrl`. (Doc inconsistency: the migration page lists the global
  MCP path as `~/.gemini/config/mcp_config.json`, the plugins page as
  `~/.gemini/antigravity-cli/mcp_config.json`; the workspace path agrees.)
- **Plugins, hooks, skills (now documented):** native plugins live at
  `~/.gemini/antigravity-cli/plugins/<name>/` and bundle `plugin.json` (required),
  `hooks.json`, `mcp_config.json`, `skills/`, `agents/`, and `rules/`, managed by
  `agy plugin list/install/enable/disable/uninstall`. Hooks are pre/post-tool,
  declared in a plugin `hooks.json` or the primary `settings.json` and browsed via
  `/hooks`; workspace skills in `.agents/skills/` compile to typed `/<skill-name>`
  slash commands. See `docs/plugin-packaging.md` and `docs/compatibility-matrix.md`.
- **Not confirmed officially** (seen only in third-party guides, so excluded
  here): a headless `agy -p` flag, a `GEMINI_API_KEY` → `AV_API_KEY` env-var
  swap, and specific default-model / exit-code changes. Auth is via the OS
  keyring, not an env var. Re-verify on the official docs before relying on any
  of these.

## Why this matters for package authoring

- A hook or orchestrator that spawns a child agent must use the **documented**
  command for the mode it wants. To run unattended, use the headless command
  (Table B), not the bare interactive launch — and for Codex that means
  `codex exec`, not `codex`. For Antigravity there is **no** headless CLI mode:
  drive it through the Antigravity SDK, not `agy`.
- Output format for machine consumption is **not** uniform: Codex `--json`
  (JSONL); Claude/Cursor `--output-format json|stream-json`; Grok
  `--output-format json`. Hermes and Antigravity document **no** headless JSON
  output flag.
- **Claude Code Agent SDK billing (status as of 2026-06-22):** The billing change planned for 2026-06-15 remains **paused** — `claude -p` and Agent SDK usage on subscription plans continues drawing from the same usage limits as interactive sessions. The separate monthly credit scheme is not active. For `ANTHROPIC_API_KEY` users billing remains pay-as-you-go. For scripted/CI runs against a subscription, authenticate with `claude setup-token` (a long-lived OAuth token, requires a subscription) rather than an API key, and pass `--output-format json` to capture `total_cost_usd` plus a per-model cost breakdown per invocation. Note that `--bare` skips OAuth/keychain, so it needs `ANTHROPIC_API_KEY` or an `apiKeyHelper` (via `--settings`) — i.e. bare mode implies API-key billing unless an `apiKeyHelper` is supplied. (Source: https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan, verified 2026-06-22.)
- Session resume identifiers differ (UUID session id vs. human name vs.
  `--last` / `-1` vs. `--conversation <uuid>`). Store a resume handle in the form
  that runtime's resume command accepts, and remember whether you need the
  interactive or headless resume path. The session store and capture timing are
  in `docs/compatibility-matrix.md` → Session Resume.

## Sources

- Codex CLI overview (interactive vs `exec`) — <https://developers.openai.com/codex/cli>
- Codex CLI reference — <https://developers.openai.com/codex/cli/reference>
- Codex non-interactive mode — <https://developers.openai.com/codex/noninteractive>
- Claude Code CLI reference — <https://code.claude.com/docs/en/cli-reference>
- Claude Code headless mode — <https://code.claude.com/docs/en/headless>
- Grok CLI headless & scripting — <https://docs.x.ai/build/cli/headless-scripting>
- Hermes Agent CLI — <https://hermes-agent.nousresearch.com/docs/user-guide/cli/>
- Gemini CLI → Antigravity CLI transition (official blog) — <https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/>
- Antigravity CLI reference — <https://antigravity.google/docs/cli-reference>
- Antigravity CLI conversations (`--continue`, `--conversation`, `/resume`) — <https://antigravity.google/docs/cli-conversations>
- Antigravity CLI Gemini migration — <https://antigravity.google/docs/gcli-migration>
- Antigravity CLI plugins, hooks & skills — <https://antigravity.google/docs/cli-plugins>
- Antigravity CLI usage (settings, keybindings, launch overrides) — <https://antigravity.google/docs/cli-using>
- Antigravity CLI install & auth — <https://antigravity.google/docs/cli-install>
- Antigravity SDK (programmatic/headless path) — <https://antigravity.google/docs/sdk-overview>
- Cursor CLI parameters — <https://cursor.com/docs/cli/reference/parameters>
- Claude Code with Pro/Max plan (billing) — <https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan>
- Claude Agent SDK / headless plan usage (2026-06-15 change **paused**, still paused as of 2026-06-22) — <https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan>
