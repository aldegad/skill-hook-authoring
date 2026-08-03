# CLI Spawn And Session Resume

Last reviewed: 2026-08-03

How to spawn each runtime **interactively** (a human-facing TUI session) versus
**non-interactively** (headless / print / one-shot, for a script, hook, or
orchestrator), plus the resume command for each. Every row cites the runtime's
own official docs; where a runtime does not document a capability, the cell says
`not documented`, never an inferred flag.

One row — **gajae-code** (`gjc`) — is a community/MIT beta, not a vendor product;
its rows cite the project's GitHub README (verified 2026-07-20), not vendor docs.

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
- **Antigravity CLI now documents headless one-shot officially.** A dedicated
  "Headless mode" page (`https://antigravity.google/docs/cli/headless`) documents
  `agy -p` / `--print` / `--prompt`: "Headless mode (also called print mode)
  sends a single prompt to the agent, streams or returns the response, and
  exits." The long-standing "no headless flag, SDK-only" verdict is retired —
  `agy -p` is no longer a third-party-only claim.

## A. Interactive launch (opens the TUI)

| Runtime | Launch interactive TUI | Seed with an initial prompt |
|---|---|---|
| Codex | `codex` — "launches the interactive terminal UI (TUI)" | `codex "<prompt>"` — the CLI reference documents an optional positional as `PROMPT: string \| - (read stdin)`, so the interactive command also accepts `-` to read the seed prompt from stdin; omitting it launches the TUI with no pre-filled message (anchored on the CLI reference; the CLI overview page does not state it) |
| Claude Code | `claude` — start interactive session | `claude "<query>"` — start interactive session with an initial prompt |
| Grok / xAI | `grok` — interactive TUI | type after launch (no separate seed-prompt form documented; `-p`/`--single` switches to headless) |
| Hermes Agent | `hermes chat` — interactive chat | type after launch (`-q` switches to a single non-interactive query) |
| Antigravity CLI | `agy` — launches the TUI (first launch detects a legacy Gemini CLI config and runs an interactive migration checklist: auto-converting extensions and global configs, migrating keyring tokens, and aligning settings) | type in the prompt box after launch (no documented interactive seed-prompt positional; `-p`/`--print`/`--prompt` switches to headless) |
| Cursor CLI | `agent` — interactive agent (all three official Cursor CLI pages now document the binary as `agent`) | type after launch (`-p`/`--print` switches to headless) |
| gajae-code (community) | `gjc` — interactive TUI; `gjc --tmux` runs it inside tmux, `gjc --tmux --worktree <name>` adds a git-worktree per task — the README notes "`--worktree` takes an optional branch-like name, not a filesystem path"; to use an existing worktree directory, `cd ../my-task-worktree && gjc --tmux` | `gjc @screenshot.png "<prompt>"` (image + prompt arg); interactive clipboard image paste with Ctrl+V |

## B. Headless run (non-interactive / print / one-shot)

| Runtime | Headless command | Prompt / stdin | Output format | Useful scripting flags |
|---|---|---|---|---|
| Codex | `codex exec "<prompt>"` (alias `codex e`) | prompt arg; `-` reads prompt from stdin | `--json` / `--experimental-json` (JSONL); else final message to stdout, progress to stderr | `--model`/`-m`, `--output-last-message`/`-o <file>`, `--sandbox`/`-s`, `--cd`/`-C`, `--output-schema <file>` (JSON-Schema-constrained final message), `--ephemeral` (don't persist rollout files), `--ignore-user-config`, `--ignore-rules`, `--skip-git-repo-check` ("overrides Git repository requirement check"), `--full-auto` (deprecated — the docs say prefer `--sandbox workspace-write`); `CODEX_API_KEY` for inline auth. (Aside: `-p` is `--profile`, a config-profile selector — **not** a print/headless flag.) |
| Claude Code | `claude -p "<query>"` (`--print`) | `cat file \| claude -p "<query>"` | `--output-format text\|json\|stream-json` (+ `--input-format`) | `--model`, `--bare` (skip auto-discovery; recommended for scripts, will become default for `-p`), `--allowedTools`, `--permission-mode default\|manual\|acceptEdits\|plan\|auto\|dontAsk\|bypassPermissions` (`manual` = alias of `default`, v2.1.200), `--max-turns`, `--max-budget-usd`, `--json-schema`, `--system-prompt[-file]`, `--append-system-prompt[-file]`, `--permission-prompt-tool`, `--bg`, `--no-session-persistence`, `--plugin-url <url>` (fetch plugin zip for session), `--agents <json>` (inline subagent definitions), `--settings <file-or-json>`, `--effort low\|medium\|high\|xhigh\|max\|ultracode`, `--advisor <model>` ("model alias (`opus` or `sonnet`) or full model ID") |
| Grok / xAI | `grok -p "<prompt>"` (`--single`) | `grok agent stdio` = ACP agent over JSON-RPC on stdin/stdout | `--output-format plain\|json\|streaming-json` | `--model`/`-m`, `--cwd`, `--always-approve` (alias `--yolo`); `--allow <RULE>` / `--deny <RULE>` permission rules and `--sandbox <PROFILE>` (per the CLI reference page); `--no-alt-screen` (documented on the headless-scripting page only, **not** the reference). Also on the reference flag table: `--effort <LEVEL>` (a CLI-layer reasoning-effort flag; the reasoning capability page now also documents a `reasoning_effort` **API parameter** for `grok-4.5` — `low`/`medium`/`high`, default `high`, reasoning cannot be disabled), `--no-auto-update` (documented on the headless-scripting page for scripts/CI/ACP: skip background update checks; persistent form `auto_update = false` under `[cli]` in `~/.grok/config.toml`), `--fork-session` ("When resuming, fork into a new session ID"), `-w, --worktree [<NAME>]`, `--ref <REF>`, `--rules <TEXT>`, `--system-prompt-override <TEXT>`, `--tools <LIST>` / `--disallowed-tools <LIST>`, `--max-turns <N>`, `--no-plan`, `--no-subagents`, `--no-memory`, `--disable-web-search`, `--experimental-memory`, `--oauth`. The reference also states Claude Code flag names are accepted as aliases where they overlap — `--allowedTools`, `--disallowedTools`, `--append-system-prompt`, `--system-prompt`, and the skip-permissions flag. Subcommands: `grok sessions <list\|search\|delete>`, `grok export <session-id> [output]`, `grok import [targets...]` (imports from Claude Code), `grok worktree <list\|show\|rm\|gc>`, `grok mcp <list\|add\|remove\|doctor>`, `grok dashboard`, `grok wrap`, `grok login [--device-auth]`, `grok logout`, `grok inspect [--json]`, `grok models`, `grok plugin <list\|install\|uninstall\|update\|enable\|disable\|details\|validate>`, `grok plugin marketplace <list\|add\|remove\|update>`, `grok memory clear [--workspace\|--global\|--all]`, `grok update`, `grok version`, `grok completions <shell>`, `grok setup` |
| Hermes Agent | `hermes chat -q "<query>"` (single query); `hermes -w -z "<query>"` runs a single query inside an isolated git worktree | not documented (no stdin/JSON piping flag) | not documented (no JSON output-format flag) | `--model`, `--provider nous\|openrouter`, `--toolsets`, `-s <skill>`, `--verbose`, `-w` (isolated git worktree; `hermes -w` alone is the interactive form), `-z "<query>"` (single-query entry point alongside `-q`) |
| Antigravity CLI | `agy -p "<prompt>"` (`--print`/`--prompt`) — "sends a single prompt to the agent, streams or returns the response, and exits" (dedicated Headless-mode page at `/docs/cli/headless`) | prompt arg | `--output-format text\|json\|stream-json` (json envelope carries `conversation_id`/`status`/`response`/`usage`; stream-json is NDJSON with `init`/`step_update`/`result` events); `--json-schema` for structured output | `--model`, `--effort low\|medium\|high`, `--agent`, `--print-timeout` (default 5m), `--sandbox` (default false — "Run with terminal sandbox restrictions enabled", the launch override of `enableTerminalSandbox`), headless `-c`/`--continue` and `--conversation <id>` resume; `agy models` / `agy agents` list selectable models/agents; `permissions.allow` `action(target)` rules (e.g. `"command(git)"`, `"write_file(src/)"`) in `settings.json`; unapprovable tools are **soft-denied** (run exits 0, notice to stderr); `--dangerously-skip-permissions` = permission_mode always-proceed. The **Antigravity SDK** (`pip install google-antigravity`) remains the richer programmatic path |
| Cursor CLI | `agent -p "<prompt>"` (`--print`) | print mode for scripts | `--output-format text\|json\|stream-json` (only with `--print`); `--stream-partial-output` | `--model`, `-f`/`--force` (`--yolo`), `--trust` (headless only), `--mode <plan\|ask>`, `--plan`, `-w, --worktree [name]` (worktrees land in `~/.cursor/worktrees/<reponame>/<name>`), `--worktree-base <branch>`, `--skip-worktree-setup`, `--sandbox`. Subcommands relevant to orchestration: `agent acp` (ACP agent) and `agent worker` |
| gajae-code (community) | **not documented** — the README dropped `--mode rpc`; no headless one-shot mode is documented | — | not documented (no `--output-format`/`--json` flag) | external control is the SDK loopback WebSocket (`docs/sdk.md`) or `gjc daemon session` — none is a one-shot run; the Coordinator MCP server is `not documented` (every `mcp` mention is absent from the README again as of 2026-07-20). Provider retry budgets in `~/.gjc/config.yml`; BYO provider credentials (Anthropic/OpenAI/Google etc.), MIT/free harness with no billing of its own |

> **Billing caveat (Claude Code).** On a subscription, `claude -p` and Agent SDK
> runs draw from your plan's usage limits — the same pool as interactive use, with
> no separate per-run credit. As of 2026-08-03, the Agent SDK billing
> change announced for 2026-06-15 remains **paused**. The official support page
> opens with a dated banner: *"Update June 15: We're pausing the changes to Claude
> Agent SDK usage described below. For now, nothing has changed: Claude Agent SDK,
> `claude -p`, and third-party app usage still draw from your subscription's usage
> limits."* (The banner adds that the previously announced monthly credit isn't
> available and that any updated plan will be shared before it takes effect.)
> For accounts using `ANTHROPIC_API_KEY`, billing remains pay-as-you-go
> API usage; run `/status` to monitor your remaining plan allocation. For
> unattended/scheduled work prefer a cloud **Claude Routine** over a local
> `claude -p` cron; the reliability advantage (Routine runs regardless of laptop
> state) still applies. See `docs/cloud-automation.md`. (Source:
> https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan,
> verified 2026-08-03; the `ANTHROPIC_API_KEY` caveat re-confirmed 2026-08-03 on
> https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan.)

## C. Resume invocation (command syntax)

Resume splits the same way: for the flag-based runtimes, the resume flag alone
resumes **interactively** and adding the headless switch resumes **headless**.
Codex uses the `resume` vs `exec resume` command split; Antigravity's `-c` /
`--conversation` now also work headless (`agy -p … --continue`, per the
Headless-mode page). **Session stores, id form, and capture timing live in
`docs/compatibility-matrix.md` → Session Resume** — this table is just the
command to type.

| Runtime | Continue most recent | Pin a specific session | Headless resume |
|---|---|---|---|
| Codex | `codex resume` (picker) | `codex resume <SESSION_ID>` — resume/fork/archive/unarchive/delete accept a session ID (UUID) **or a session name**, and "Session IDs take precedence over session names"; `codex delete --force` "bypasses confirmation for UUIDs only" | `codex exec resume --last` / `codex exec resume <SESSION_ID>` (`--all` widens past cwd) |
| Claude Code | `claude -c` (latest in cwd) | `claude -r "<id-or-name>"` (set a name with `-n`) | add `-p`: `claude -c -p` / `claude -r "<s>" -p` |
| Grok / xAI | `grok -c` | `grok -r <ID>` / `grok -s <ID>` (named) — the reference documents this as `-s, --session-id <UUID>` ("Use a specific UUID for a new session"); the headless-scripting page still shows the looser `<ID>`, so the two pages differ | add `-p` to the same flags |
| Hermes Agent | `hermes -c` | `hermes -r <session_id>` (or by title) | not separately documented |
| Antigravity CLI | `agy -c` / `agy --continue` (latest in workspace); "When you close the CLI, it automatically prints the exact command needed to resume that specific session" | `agy --conversation <conversation-id>`; in-TUI `/resume` (`/switch`, `/conversation`) picker, Tab imports Antigravity 2.0 desktop threads; `/fork` (`/branch`) | add `-p`: the Headless-mode page documents `-c`/`--continue` and `--conversation` working headless |
| Cursor CLI | `--continue` (documented as an alias for `--resume=-1`) / `agent resume`; in-session `/resume` slash command | `agent --resume [chatId]` (list via `agent ls`) | same flags plus `-p`; `agent create-chat` returns a new id |
| gajae-code (community) | not documented | not documented (worktree isolation via `--worktree <name>` is not id-keyed resume) | not documented |

**Pinning a specific session** is shell-level on every runtime: `codex resume <id>`,
`claude -r "<id-or-name>"`, `grok -r <id>`, `hermes -r <id>`,
`agy --conversation <conversation-id>`, `agent --resume [chatId]`.
Identifiers differ (UUID vs. human name vs. `--conversation`), so store the handle
in the form that runtime's resume command accepts. For Claude Code, "passing a
session ID searches only the current project directory and its git worktrees", so
a resume issued from the wrong cwd fails. `claude --from-pr` is **not** a pin: it
"open[s] the session picker filtered to sessions linked to a specific pull
request. Accepts a PR number, a GitHub or GitHub Enterprise PR URL, a GitLab merge
request URL, or a Bitbucket pull request URL" — it filters a picker rather than
resuming a session directly. Antigravity conversations are
**workspace-scoped** — `agy` only lists sessions started in the current directory;
`agy -c` resolves the workspace through a documented cache map at
`~/.gemini/antigravity-cli/cache/last_conversations.json`.

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
  (`pip install google-antigravity`) — the richer programmatic path alongside the
  now-documented `agy -p` headless mode. Install `agy` to `~/.local/bin/agy` via
  `curl -fsSL https://antigravity.google/cli/install.sh | bash` (Windows
  PowerShell: `irm https://antigravity.google/cli/install.ps1 | iex`; Windows CMD:
  `curl -fsSL https://antigravity.google/cli/install.cmd -o install.cmd && install.cmd && del install.cmd`).
  Documented installation flags: `--skip-aliases` (skip purging/updating shell
  aliases) and `--skip-path` (skip appending to PATH). Auth is via the OS
  keyring (browser/SSH OAuth on first sign-in).
- **Migration:** `agy plugin import gemini` converts legacy Gemini extensions to
  native plugins; first launch auto-detects and offers to convert existing
  profiles. Context files are unchanged — the agent still reads `GEMINI.md` and
  `AGENTS.md` (global `~/.gemini/GEMINI.md`).
- **Path changes:** workspace skills move `.gemini/skills/` → `.agents/skills/`
  (global `~/.gemini/antigravity-cli/skills/`); MCP servers move out of
  `~/.gemini/settings.json` into `~/.gemini/config/mcp_config.json` (global) /
  `.agents/mcp_config.json` (workspace), and the server URI key `url`/`httpUrl`
  becomes `serverUrl`. (These paths are stated on the migration page; as of
  2026-07-04 the plugins page no longer lists MCP paths — it defers to a
  dedicated MCP docs page — so the earlier cross-page global-path inconsistency
  is resolved.)
- **Plugins, hooks, skills (now documented):** native plugins live at
  `~/.gemini/antigravity-cli/plugins/<name>/` and bundle `plugin.json` (required),
  `hooks.json`, `mcp_config.json`, `skills/`, `agents/`, and `rules/`, managed by
  `agy plugin list/install/enable/disable/uninstall`. Hooks are pre/post-tool,
  declared in a plugin `hooks.json` or the primary `settings.json` and browsed via
  `/hooks`; workspace skills in `.agents/skills/` compile to typed `/<skill-name>`
  slash commands. See `docs/plugin-packaging.md` and `docs/compatibility-matrix.md`.
- **Not confirmed officially** (seen only in third-party guides, so excluded
  here): a `GEMINI_API_KEY` → `AV_API_KEY` env-var swap and specific
  default-model / exit-code changes. Auth is via the OS keyring, not an env var.
  (The headless `agy -p` flag left this list on 2026-07-28 — it is now officially
  documented on the Headless-mode page.) Re-verify on the official docs before
  relying on any of these.

## Why this matters for package authoring

- A hook or orchestrator that spawns a child agent must use the **documented**
  command for the mode it wants. To run unattended, use the headless command
  (Table B), not the bare interactive launch — and for Codex that means
  `codex exec`, not `codex`. Antigravity now has a documented headless CLI mode
  (`agy -p`); the Antigravity SDK remains the richer programmatic option.
- Output format for machine consumption is **not** uniform: Codex `--json`
  (JSONL); Claude/Cursor/Antigravity `--output-format json|stream-json`; Grok
  `--output-format json`. Hermes documents **no** headless JSON output flag.
- **Source availability — Grok Build is the one tracked vendor CLI whose source
  is published.** SpaceXAI open-sourced the Grok Build harness and TUI on
  2026-07-14 under **Apache-2.0** at `github.com/xai-org/grok-build`; external
  contributions are not accepted and issues are disabled, so it is readable, not
  participatory. Practical effect: behavior you cannot get a doc answer for can be
  read from the implementation — but that is **implementation, not a vendor
  contract**, so label any such finding `source-verified` with its path and expect
  it to move without notice (`policy.vendorSourceRule`). Note the licence is
  attested **only by the repo**: xAI's own docs never mention it (a full-corpus
  check of `docs.x.ai/llms.txt` returns zero hits for "open source"/"Apache"/"MIT"),
  which is why `xai-grok-build-repo` exists as a narrow `source-availability`
  source while `docs.x.ai` stays canonical for every behavior claim. Every other
  tracked vendor CLI (Codex, Claude Code, `agy`, Cursor `agent`, Hermes) ships as a
  distributed binary with no published source — and for Antigravity specifically,
  the transition blog does **not** state the OSS repo's licence, so no Apache-2.0
  claim is made for it. (The Codex *goal internals* in `completion-stack.md` are
  source-verified against `openai/codex` under the same rule.)
- **Claude Code Agent SDK billing (status as of 2026-07-31):** The billing change planned for 2026-06-15 remains **paused** — `claude -p` and Agent SDK usage on subscription plans continues drawing from the same usage limits as interactive sessions. The separate monthly credit scheme is not active. For `ANTHROPIC_API_KEY` users billing remains pay-as-you-go. For scripted/CI runs against a subscription, authenticate with `claude setup-token` (a long-lived OAuth token for CI and scripts; requires a Claude subscription — now documented on the CLI reference page, verified 2026-07-29) rather than an API key, and pass `--output-format json` to capture `total_cost_usd` plus a per-model cost breakdown per invocation. Note that `--bare` skips OAuth/keychain, so it needs `ANTHROPIC_API_KEY` or an `apiKeyHelper` (via `--settings`) — i.e. bare mode implies API-key billing unless an `apiKeyHelper` is supplied. (Source: https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan, verified 2026-07-31.)
- **Antigravity CLI billing (G1 credits, verified 2026-07-28):** `agy` model calls
  run against plan quota; the `useG1Credits` setting ("External builds only. Uses
  personal AI credits for model calls once plan quotas are exhausted.") is the
  documented overflow path, and in-session `/credits` "View remaining G1 credits
  and purchase links" is the only documented balance surface. Headless runs now
  exist (`agy -p`), and the json output envelope carries a `usage` field — but no
  documented dollar-cost field like `claude --output-format json`'s
  `total_cost_usd`; budget through the quota display or the SDK.
  (Sources: <https://antigravity.google/docs/cli/reference>,
  <https://antigravity.google/docs/cli/headless>.)
- Session resume identifiers differ (UUID session id vs. human name vs.
  `--last` / `-1` vs. `--conversation <uuid>`). Store a resume handle in the form
  that runtime's resume command accepts, and remember whether you need the
  interactive or headless resume path. The session store and capture timing are
  in `docs/compatibility-matrix.md` → Session Resume.

## Sources

- Codex CLI overview (interactive vs `exec`) — <https://learn.chatgpt.com/docs/codex/cli>
- Codex CLI reference — <https://learn.chatgpt.com/docs/developer-commands?surface=cli>
- Codex non-interactive mode — <https://learn.chatgpt.com/docs/non-interactive-mode>
- Claude Code CLI reference — <https://code.claude.com/docs/en/cli-reference>
- Claude Code headless mode — <https://code.claude.com/docs/en/headless>
- Grok CLI headless & scripting — <https://docs.x.ai/build/cli/headless-scripting>
- Grok CLI reference (flag table, subcommands) — <https://docs.x.ai/build/cli/reference>
- Hermes Agent CLI — <https://hermes-agent.nousresearch.com/docs/user-guide/cli/>
- Gemini CLI → Antigravity CLI transition (official blog) — <https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/>
- Antigravity CLI reference — <https://antigravity.google/docs/cli/reference>
- Antigravity CLI conversations (`--continue`, `--conversation`, `/resume`) — <https://antigravity.google/docs/cli/conversations>
- Antigravity CLI Gemini migration — <https://antigravity.google/docs/cli/gcli-migration>
- Antigravity CLI plugins, hooks & skills — <https://antigravity.google/docs/cli/plugins>
- Antigravity CLI usage (settings, keybindings, launch overrides) — <https://antigravity.google/docs/cli/using>
- Antigravity CLI install & auth — <https://antigravity.google/docs/cli/install>
- Antigravity SDK (programmatic path) — <https://antigravity.google/docs/sdk/overview>
- Antigravity CLI headless mode — <https://antigravity.google/docs/cli/headless>
- Cursor CLI parameters — <https://cursor.com/docs/cli/reference/parameters>
- Cursor CLI overview — <https://cursor.com/docs/cli/overview>
- Cursor CLI using (in-session `/resume`, `--continue`) — <https://cursor.com/docs/cli/using>
- gajae-code (community project, README — not vendor docs) — <https://github.com/Yeachan-Heo/gajae-code>
- Claude Code with Pro/Max plan (billing) — <https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan>
- Claude Agent SDK / headless plan usage (2026-06-15 change **paused**, still paused as of 2026-07-31) — <https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan>
