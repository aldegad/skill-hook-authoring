---
name: skill-hook-authoring
description: 'Cross-runtime agent-platform interoperability wiki, refreshed daily from official vendor docs: how Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor, and Kuma Studio compare across skills, hooks, plugins/extensions, project-instruction files, CLI spawn, session resume, and billing — plus the authoring rules to ship one source of truth without drifting between runtimes.'
---

# Cross-Runtime Agent-Platform Interoperability

This package is two things at once:

1. **A compatibility wiki**, refreshed daily from official vendor docs, recording how today's agent runtimes — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor, and Kuma Studio — compare across skills, hooks, plugins/extensions, project-instruction files, CLI spawn (interactive vs headless), session resume, and billing. Every claim cites the vendor's own docs; absent docs are recorded as `not documented`, never inferred.
2. **A methodology** for *interoperating and managing* those runtimes: how to ship one repo-owned source of truth — skills, hooks, commands, scripts, references, assets, MCP/app wiring, or runtime-specific plugin metadata — without drifting between agents.

The detailed comparison lives in `docs/` (start with `docs/compatibility-matrix.md`); the daily refresh keeps it current (`docs/cloud-automation.md`). The rest of this file is the authoring/interoperation methodology that turns that wiki into shippable, non-drifting packages.

## Taxonomy

Use these words precisely:

- **Skill**: instructions the model reads when the task matches. Usually `SKILL.md` plus optional `scripts/`, `references/`, and `assets/`. A skill can tell the model what to do, but it does not enforce tool behavior by itself.
- **Hook**: a harness-level guard or automation invoked around lifecycle events such as tool calls. A hook can allow, deny, ask, mutate input, or add context depending on runtime support. Hooks must be registered in the runtime config or plugin metadata; putting a hook script inside a skill folder is not enough.
- **Plugin / extension**: a runtime-specific packaging and trust boundary that can bundle skills, hooks, MCP servers, apps, commands, agents, or metadata. Codex and Grok document plugin packages; Gemini documents extensions; Claude documents skills, hooks, and marketplace/plugin settings but not a Codex-style `.codex-plugin/plugin.json` equivalent in the cited sources.
- **Package root**: the repo-owned canonical source directory we maintain. Most local "skills" in this workspace are actually plugin-like package roots because they include `SKILL.md`, scripts, docs, installers, and policy.

If the task changes discovery, installation, trust, hook behavior, bundled scripts, or cross-runtime compatibility, treat it as **package authoring**, not just skill text editing.

## Runtime Coverage

Seven runtimes are tracked. The detailed, source-cited truth lives in `docs/compatibility-matrix.md` and `docs/plugin-packaging.md`; this is the short working model:

| Runtime | Skill surface | Hook surface | Plugin/package surface |
|---|---|---|---|
| Codex | `SKILL.md` in skill bundles | `~/.codex/hooks.json` or plugin-bundled hooks | `.codex-plugin/plugin.json` can bundle skills, apps, MCP servers, hooks, and marketplace metadata |
| Claude Code | `.claude/skills`, `.claude/commands`, skill frontmatter/settings | `.claude/settings.json` hooks | Marketplace/plugin settings exist; no cited Codex-style plugin package format |
| Grok / xAI | Reusable skill folders | User, project, and plugin hook roots | Plugins can bundle skills, agents, hooks, MCP servers, and LSP servers |
| Hermes Agent | Skills and skill preloading are documented | Hook parity is not documented in the cited source set | MCP/toolsets are documented; plugin packaging parity is not documented here |
| Antigravity CLI (`agy`, was Gemini CLI) | `.agents/skills/` (global `~/.gemini/antigravity-cli/skills/`) | TUI `/hooks` browser; config format not verified in the cited render | Native plugins; MCP via standalone `mcp_config.json` |
| Cursor CLI | reusable agent context; `.cursor/rules` | not documented in the cited source set | MCP auto-detection via `mcp.json`; Codex-style packaging not documented |
| Kuma Studio | skills in canonical repo paths | guardrail hooks that must fail loudly | symlink or generated-config install |

When a runtime capability is not documented, write `not documented` or `unknown` and require live verification before shipping behavior that depends on it.

## CLI Spawn And Headless Launch

When one agent **spawns another** from a script, hook, or orchestrator, use the runtime's documented command for the mode you want — interactive and headless are reached differently. Full tables and citations live in `docs/cli-invocation.md`; resume is covered under **Session Resume** below.

| Runtime | Interactive launch | Headless run |
|---|---|---|
| Codex | `codex` / `codex "<p>"` | `codex exec "<p>"` |
| Claude Code | `claude` / `claude "<q>"` | `claude -p "<q>"` |
| Grok / xAI | `grok` | `grok -p "<p>"` |
| Hermes | `hermes chat` | `hermes chat -q "<q>"` |
| Antigravity CLI | `agy` | not documented (use Antigravity SDK) |
| Cursor CLI | `cursor-agent` | `cursor-agent -p "<p>"` |

- **The mode switch is not the same shape.** For Claude/Grok/Cursor/Hermes, headless is a **flag** (`-p`/`--print`, or Hermes `-q`) added to the bare interactive command — so interactive = omit the flag. **Codex** is the exception: headless is a separate **subcommand** (`codex exec`), with no `-p` to drop, so a list of only `codex exec …` is *not* "Codex is headless-only". **Antigravity** (`agy`) is TUI-only with **no documented headless one-shot** — run it unattended through the Antigravity SDK, not `agy -p` (which appears only in third-party guides).
- Output format is not uniform: Codex `--json` (JSONL); Claude/Cursor `--output-format json|stream-json`; Grok `--output-format json`; Hermes and Antigravity document **no** headless JSON flag.
- Gemini CLI is omitted: it is retired for AI Pro/Ultra and free individual users on **2026-06-18** and replaced by Antigravity CLI (`agy`); enterprise/Google Cloud keeps Gemini CLI. See `docs/cli-invocation.md` → transition section.

## Session Resume

Same-platform resume (continue the *same* conversation on the *same* engine, by session id) is officially documented for all four worker runtimes. Per-engine resume invocation, session store, and id form live in `docs/compatibility-matrix.md` → **Session Resume**. The working model:

- The minimum to continue is the **resume locator** (session/thread id) plus the engine's resume invocation: Claude `claude --resume <id>`, Codex CLI `codex resume <id>` (desktop app-server: the `thread/resume` method with the recorded `thread.id`), Grok `grok -r/--resume <id>`, Hermes `hermes --resume <id>`.
- Capture the locator **before the worker exits**, keyed by `cwd` (the most stable signal every engine exposes). Session stores differ — Claude/Codex/Grok keep per-session transcript/rollout files; **Hermes keeps history in SQLite `~/.hermes/state.db`**, so a file scan of `~/.hermes/sessions/` (which holds only API error dumps) finds nothing resumable.
- **Antigravity CLI** (`agy`, the Gemini CLI successor) resumes into the TUI only: `agy --continue` (most recent in the workspace) or `agy --conversation <uuid>`; conversations are **workspace-scoped** (it lists only sessions started in that cwd).
- **Cross-engine moves** (resume one engine's session under a *different* engine) are a separate, harder problem and out of scope here — keep them off the same-platform path.
- When a runtime does not document resume, record `not documented` and require live verification before shipping.

## Project Instruction Files

Do not assume every non-Claude runtime reads `AGENTS.md`. Use the officially documented project-instruction filename for the target runtime:

| Runtime | Official project instruction/context files |
|---|---|
| Codex | `AGENTS.override.md`, `AGENTS.md`, then configured `project_doc_fallback_filenames` |
| Claude Code | `CLAUDE.md`, `.claude/CLAUDE.md`, `CLAUDE.local.md`, and `.claude/rules/`; Claude docs explicitly say Claude reads `CLAUDE.md`, not `AGENTS.md` |
| Grok / xAI | `AGENTS.md`, `Agents.md`, `AGENT.md` |
| Hermes Agent | `.hermes.md` / `HERMES.md`, then `AGENTS.md`, then `CLAUDE.md`, then `.cursorrules`; `SOUL.md` is global identity, not project instructions |
| Antigravity CLI (was Gemini CLI) | Reads `GEMINI.md` and `AGENTS.md` (global `~/.gemini/GEMINI.md`); Gemini CLI's `GEMINI.md` hierarchical memory is the legacy form |
| Cursor CLI | `.cursor/rules`, plus project-root `AGENTS.md` and `CLAUDE.md` |
| Kuma Studio | `AGENTS.md` and `CLAUDE.md` are parallel repo SSoT files for shared rules |

For cross-agent repo rules, maintain the smallest set of files that each runtime actually reads. In Kuma-style Codex/Claude/Grok/Hermes repos, that usually means repo-owned `AGENTS.md` plus a `CLAUDE.md` import/symlink or Claude-specific wrapper; add `GEMINI.md` only when Antigravity CLI (or legacy Gemini CLI) is a supported runtime.

**Symlink the wrapper, edit only the canonical file.** When `CLAUDE.md`/`GEMINI.md` are symlinks to a repo-owned `AGENTS.md`, reads resolve correctly — every runtime sees the canonical content, and git stores the link as mode `120000` (a pointer, not a copy; both links share one blob). But Claude Code's Edit/Write **refuses to write through a symlink** (`Refusing to write through symlink ... pass the real target path explicitly`, verified 2026-06-05), so edits must target the real `AGENTS.md`; treat the symlinks as read-only. This is a feature, not a limitation: it stops an atomic-save from silently swapping the link for a divergent regular file, so the SSoT cannot drift. Use **relative** symlinks (`ln -s AGENTS.md CLAUDE.md`, never an absolute path) so they survive clone/move. Caveat: a Windows checkout without `core.symlinks` materializes the link as a plain text file — use a one-line stub+pointer instead of a symlink when a Windows runtime is in scope.

## Core Rules

- Pick one canonical repo path first. Installed copies under `~/.claude` and `~/.codex` must be symlinks or generated config entries.
- Do not edit home-directory installed copies directly.
- Do not keep separate Claude and Codex versions unless a difference is explicitly documented and tested.
- Name the package layer explicitly before editing: skill-only, hook-only, plugin-like package, or generated runtime plugin. Do not let a `SKILL.md` entrypoint hide installer, hook, or trust-boundary changes.
- Keep `SKILL.md` body under 500 lines — a performance guideline, **not** a hard loading cap. Anthropic's [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) say "Keep SKILL.md body under 500 lines for optimal performance": once loaded, every line competes with conversation history and other context. Put deterministic behavior in scripts; move scenario-specific detail into `reference/*.md` linked **one level deep** from `SKILL.md` (progressive disclosure).
- `name`: max 64 chars, lowercase/numbers/hyphens only, no XML tags, no reserved words (`anthropic`, `claude`); prefer gerund form (`processing-pdfs`). `description`: max 1024 chars, no XML tags, third person, stating both *what* the skill does and *when* to use it (trigger terms) — not the procedure.
- **Quote the `description` if it contains a colon-space (`: `), or the skill silently fails to load.** A `: ` in an unquoted YAML scalar is parsed as a nested mapping → `mapping values are not allowed in this context`. Common trap: `description: ... Korean triggers: 원샷, ...`. Wrap the whole value in single quotes (`description: '...'`); double inner single-quotes, double-quotes are fine inside. Validate frontmatter parses before shipping. (Trial-and-error 2026-05-26: an unquoted description with `Korean triggers:` broke skill loading.)
- Hooks are guardrails, not silent fallback paths. They should block clearly, explain why, and require an explicit operator decision for dangerous actions.
- Cross-agent guidance must be based on official vendor docs. If a platform does not document a feature, record it as `not documented` or `unknown`; do not infer parity from another agent.
- **Make hook scripts executable (`chmod +x`) and give them a shebang.** Claude registers hooks as `command: "<abs-path> --args"` and runs them through `/bin/sh`, so a missing exec bit fails with `Permission denied` on *every* matching event (PreToolUse/Stop) in *every* session — one forgotten `chmod +x` silently breaks all agents at once. Codex registers as `node <path>` so it tolerates a missing bit, but always `chmod +x` for parity and **commit the mode** (git stores `100755`). (Trial-and-error 2026-05-26: a new guard hook shipped `644` → `Permission denied` spam across all live sessions until chmod'd.)
- **Hook scripts must not assume GNU coreutils.** macOS ships neither `timeout` nor `stat -c`; a hook that calls them unguarded fails on *every* macOS agent — and a fail-closed `|| exit 0` turns that into a silent no-op that looks like "working but quiet". Detect and degrade (`command -v timeout || gtimeout || plain`) and use portable forms (`stat -f %m || stat -c %Y`). (Trial-and-error 2026-06-09: a `timeout 5 git fetch` in a SessionStart/PreToolUse hook silently `command not found`-failed on macOS, so the hook never fetched and never fired — it took a probe hook to notice.)
- **Keep history out of doc bodies.** Changelog narrative — what was added/changed/removed and when — lives in `CHANGELOG.md` plus the git tag (the version SSoT), never accreting in `SKILL.md` or `docs/*` prose. A doc body states the **current** truth only; when a fact changes, replace it, don't append the old one. The one exception is a *verification* stamp (`Last reviewed: YYYY-MM-DD`, `verified YYYY-MM-DD`): that is provenance for a live claim, not history. This is what keeps a daily-refreshed wiki from turning into a changelog as it is re-verified.

## Recommended Layout

```text
agent-extensions/
  alex-core-invariants/       # standalone repo, own remote
  cmux/                       # standalone repo, cmux skills and hooks
  content-pipeline/           # root-owned skill
  npm-reorg-guard/            # standalone repo, own remote
  skill-hook-authoring/       # root-owned skill
  scripts/install/install-local.mjs
  scripts/test/*
```

Keep the umbrella flat. Do not add a repo-local `skills/` or `hooks/` index unless there is a specific migration plan, because that creates a second source of truth. If a hook belongs to a standalone repo, reference that repo path directly from the installer and agent config.

## Authoring Flow

Before adding or changing a package:

1. Classify the change: skill instruction, hook guard, plugin/extension package, installer/config, or docs-only compatibility claim.
2. Pick the canonical package root and the generated install paths.
3. Decide whether each installed artifact is a symlink, generated config entry, copied file, or runtime-native plugin package.
4. Update the canonical source first, then the installer/config generator, then docs.
5. Validate discovery in every claimed runtime. For undocumented runtimes, mark support as unknown until live verification exists.

Do not move a root-level `SKILL.md` into a plugin subdirectory, or convert a skill folder into a runtime plugin, unless the installer, docs, validation, and rollback path change in the same commit.

## Retiring Or Renaming Artifacts

Deleting a hook, skill, command, or plugin-like package means removing every active ownership path, not just the visible file:

1. Delete or rename the canonical source file/folder.
2. Remove active installer registration and generated config writes.
3. Remove active overlay/settings entries.
4. Add the old id/path/command to the relevant retired list so future installer runs clean existing symlinks or copies.
5. Remove live home-directory symlinks/copies if they are repo-owned.
6. Update docs and plans that describe the artifact in present tense.
7. Search repo and live config for the old id. Remaining hits should be retired lists or historical notes only.
8. Run syntax/config checks and prove the installer no longer recreates the retired artifact.
9. Sweep *instructions* that point at the old name, not just code: agent-executed
   docs (`AGENTS.md`/`CLAUDE.md`-class files, operating doctrine, skill bodies)
   referencing a renamed/retired CLI verb or moved doc path fail at runtime the
   moment an agent follows them. Concretely: grep doc corpora for backticked
   command mentions (e.g. launcher subcommands like `kuma <verb>`) and for
   relative links to the old path. Prefer a CI guard that re-checks this on
   every test run (kuma-studio: `docs-reference-integrity.test.mjs` — relative
   `.md` links must resolve; backticked launcher verbs must map to a real bin).

This rule exists because deleting only `~/.claude/hooks/<id>` or only `scripts/hooks/<id>` can let the artifact reappear on the next setup run — and because instructions pointing at the old name keep *re-teaching* agents the broken path long after the code is gone (trial-and-error 2026-06-10: `kuma read`/`kuma vault`/`kuma spawn-all` doc mentions all outlived their bins).

## Multi-Agent Compatibility Docs

Use these repo documents before changing compatibility claims:

- `docs/official-sources.json` — canonical source manifest for official docs refresh.
- `docs/compatibility-matrix.md` — current cross-agent support matrix (includes the Session Resume table).
- `docs/cli-invocation.md` — per-runtime CLI spawn (interactive vs headless) and resume invocation syntax.
- `docs/plugin-packaging.md` — plugin/extension packaging boundaries.
- `docs/kuma-studio-patterns.md` — public Kuma Studio operating patterns that can be reused by other agents.
- `docs/cloud-automation.md` — daily cloud automation setup (Claude Routines, with a Codex App alternative).

Daily refresh automation must read the source manifest, fetch only official URLs, update docs only when evidence changed, and leave a PR rather than pushing to `main`.

## Cross-Agent Install Pattern

1. Symlink every canonical skill folder into `~/.codex/skills/<id>`.
2. Symlink the same folders into `~/.claude/skills/<id>` when that root exists.
3. Patch `~/.claude/settings.json` idempotently for Claude hooks.
4. Patch `~/.codex/hooks.json` idempotently for Codex hooks.
5. Backup mutated JSON config files before writing.
6. `chmod +x` every hook script before registering it (Claude runs `command` via `/bin/sh`; no exec bit = `Permission denied` everywhere).
7. Validate by feeding representative JSON payloads into the hook scripts — and run the script **directly** (`./hook.cjs ...`, no `node` prefix) to catch a missing exec bit the way Claude would.

## Hook Payload Pattern

Claude Code and Codex CLI use the **same input schema** for `PreToolUse` / `PostToolUse` hooks. A Bash tool call arrives as:

```json
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../transcript.jsonl",
  "cwd": "/Users/me/project",
  "permission_mode": "default",
  "hook_event_name": "PreToolUse",
  "tool_name": "Bash",
  "tool_use_id": "toolu_...",
  "tool_input": {
    "command": "npm install foo",
    "description": "Install foo",
    "timeout": 120000
  }
}
```

Notes:

- `tool_input.command` — the shell command. Use this single field; do not read from `.input.command`, `.arguments.command`, or other variants.
- `cwd`, `session_id`, `transcript_path`, `permission_mode`, `hook_event_name`, `tool_name`, `tool_use_id` are all **top-level**, not under `tool_input`. Reading `tool_input.cwd` returns nothing.
- `permission_mode` is one of `default`, `plan`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`.
- Both engines share this schema. Codex additionally provides `turn_id` and `model`.

## Hook Decision Output

Claude Code and Codex use the **same decision schema** for `PreToolUse`. Pick one of these to block:

Modern (recommended):

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "safedeps: install not approved — run `safedeps check ...` first"
  }
}
```

Legacy (still supported by both engines):

```json
{"decision": "block", "reason": "safedeps: install not approved ..."}
```

`permissionDecision` accepts `"allow" | "deny" | "ask" | "defer"` on both engines. `hookSpecificOutput` may also carry `updatedInput` (replace the tool input before it runs) and `additionalContext` (inject context for the model). For **allow**, exit 0 with no output is sufficient; or emit `permissionDecision: "allow"` explicitly.

**Do not use `{"continue": false, "stopReason": "..."}` for PreToolUse** — that is the schema for the `Stop` hook (final-exit block), not for PreToolUse. Same applies to `{"continue": true}` as an allow signal. Mixing them up silently fails closed or open depending on the engine version.

For `PostToolUse` block (prevent normal post-processing), use `{"decision": "block", "reason": "..."}` on both engines.

## Codex hook registration

`~/.codex/hooks.json` shape (or inline `[hooks]` in `~/.codex/config.toml`):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "^Bash$",
        "hooks": [
          { "type": "command", "command": "~/.codex/skills/<id>/scripts/<hook>.sh", "timeout": 30 }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "^Bash$",
        "hooks": [
          { "type": "command", "command": "~/.codex/skills/<id>/scripts/<hook>.sh", "timeout": 30 }
        ]
      }
    ]
  }
}
```

Claude `~/.claude/settings.json` uses the same `hooks.PreToolUse[].hooks[]` shape. Idempotent installers should match on the canonical `command` string and skip if already present.

**Matcher syntax is NOT shared, even though the payload schema is.** Claude treats a matcher of `"*"`, `""`, or omitted as match-all; **Codex matchers are regular expressions** (`^Bash$`, `Edit|Write`, `mcp__.*`). A literal `"*"` is an invalid regex in Codex and silently matches **nothing**, so a hook registered with Claude-style `"*"` never fires — use `".*"` to match all tools on Codex. (Trial-and-error 2026-06-09: a Codex `PreToolUse` notifier registered with `"*"` never fired — confirmed via a probe hook that the event was never invoked — until the matcher was changed to `".*"`.)

Codex tool coverage (verified 2026-05-26 against <https://developers.openai.com/codex/hooks> + Codex CLI 0.133): PreToolUse now intercepts **Bash, `apply_patch` file edits, and MCP tool calls**, and a denying PreToolUse prevents the blocked `apply_patch` file from being created (`openai/codex#16732` fixed; PR `#18391`). The earlier "Bash only" behavior is obsolete — do **not** assume apply_patch is unhookable. Two things still bite, so design accordingly:

- **Field shape differs per tool.** Bash and apply_patch carry `tool_input.command`; Write/Edit/MultiEdit carry `tool_input.file_path`; MCP tools send their own args. For `apply_patch` the target path lives in the patch body's `*** Add/Update/Delete File: <path>` header lines, **not** a `file_path` field — read the right field and gate on `tool_name`. Scanning the whole `tool_input` blob over-blocks (it matches the path string appearing in *content*, reads, or even the hook script itself).
- **Coverage can still be inconsistent across tool handlers** on some versions (`openai/codex#20204`); very old Codex fired hooks for `Bash` only. Verify on the *target* Codex version rather than assuming.

## Validation Checklist

- The frontmatter YAML parses (quote any `description` containing `: `) — load it and confirm no parse error.
- The skill triggers from its frontmatter description.
- The hook allows normal commands and blocks the intended risky command.
- The hook script is executable (`chmod +x`, committed as `100755`) and runs directly without a `node` prefix — no `Permission denied`.
- The installer is idempotent and can run twice without duplicate hook entries.
- Config writes are atomic or backup-before-write.
- Dangerous-mode bypasses are never taught to the agent as automatic retry steps.
