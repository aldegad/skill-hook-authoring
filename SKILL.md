---
name: skill-hook-authoring
description: 'Cross-runtime agent-platform interoperability wiki and authoring methodology, refreshed daily from official vendor docs: how Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor, and Kuma Studio compare across skills, hooks, plugins/extensions, project-instruction files, CLI spawn, session resume, and billing, plus the rules to ship one source of truth without drifting between runtimes. Use when authoring, editing, retiring, renaming, or debugging a skill / hook / slash-command / plugin, or when a skill is not triggering and its description needs fixing. Triggers (KR/EN): 스킬 만들기/작성/수정/폐기/삭제/이름변경, 스킬 폐기, 스킬 발동 안 됨, 트리거 안 걸림, description 고치기, 훅 작성/수정, 슬래시 커맨드 추가, 플러그인 패키징, 크로스런타임 호환; skill authoring/editing/retire/rename, skill not triggering, fix skill description, hook authoring, slash command, plugin packaging, cross-runtime compatibility, Codex/Claude/Grok/Hermes/Antigravity/Cursor/gajae-code (가재, gjc) skill and hook comparison.'
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
- **Plugin / extension**: a runtime-specific packaging and trust boundary that can bundle skills, hooks, MCP servers, apps, commands, agents, or metadata. Codex and Grok document plugin packages; Antigravity documents native plugins (legacy Gemini extensions migrate in via `agy plugin import gemini`); Claude documents a first-class `.claude-plugin/plugin.json` plugin format — the direct analogue of Codex's `.codex-plugin/plugin.json` — bundling skills, agents, hooks, MCP servers, LSP servers, and monitors.
- **Package root**: the repo-owned canonical source directory we maintain. Most local "skills" in this workspace are actually plugin-like package roots because they include `SKILL.md`, scripts, docs, installers, and policy.

If the task changes discovery, installation, trust, hook behavior, bundled scripts, or cross-runtime compatibility, treat it as **package authoring**, not just skill text editing.

## Runtime Coverage

Eight runtimes are tracked — seven vendor runtimes plus one community project (**gajae-code**, `gjc`, MIT/beta by Yeachan-Heo, not an official vendor product; flagged the way Kuma Studio is, with its GitHub README as the only source). The detailed, source-cited truth lives in `docs/compatibility-matrix.md` and `docs/plugin-packaging.md`; this is the short working model:

| Runtime | Skill surface | Hook surface | Plugin/package surface |
|---|---|---|---|
| Codex | Repo `.agents/skills/` plus user/admin/system skill roots | User/project `.codex/hooks.json` or inline config hooks, plus plugin-bundled hooks | `.codex-plugin/plugin.json` can bundle skills, apps, MCP servers, hooks, and marketplace metadata |
| Claude Code | Project/user `.claude/skills/`, `.claude/commands`, add-dir skills, and skill-directory plugins | User/project/local `.claude/settings*.json` hooks, plugin hooks, and skill lifecycle hooks | `.claude-plugin/plugin.json` plugins can bundle skills, agents, hooks, MCP servers, LSP servers, and monitors |
| Grok / xAI | User, project, plugin, and configured skill roots | User, project, and plugin hook roots | Plugins can bundle skills, agents, hooks, MCP servers, and LSP servers |
| Hermes Agent | Skills, skill taps, and plugin-bundled skills are documented | Gateway hooks, shell hooks, and plugin hooks are documented | `plugin.yaml` plugins under `~/.hermes/plugins/` can bundle tools, hooks, slash commands, CLI commands, and skills |
| Antigravity CLI (`agy`, was Gemini CLI) | `.agents/skills/` (global `~/.gemini/antigravity-cli/skills/`); skills auto-become `/<name>` slash commands | Hooks in a plugin's `hooks.json` or primary `settings.json` (pre/post-tool); `/hooks` browses loaded hooks | Native plugins at `~/.gemini/antigravity-cli/plugins/<name>/` (`plugin.json`, `hooks.json`, `skills/`, `agents/`, `rules/`) managed by `agy plugin`; MCP via standalone `mcp_config.json` |
| Cursor CLI | Project/user `.agents/skills/` and `.cursor/skills/`, plus Claude/Codex compatibility skill roots | Project `.cursor/hooks.json`, team/enterprise hooks, and command/prompt hook events | Plugins are documented separately; hooks include `workspaceOpen` plugin-path injection, but do not infer Codex-style package parity |
| Kuma Studio | skills in canonical repo paths | guardrail hooks that must fail loudly | symlink or generated-config install |
| gajae-code (`gjc`, community) | `SKILL.md` bundled skills installed into the user `.gjc` directory by `gjc setup defaults` (exact path no longer stated; `gjc skills list`/`read <name>`); ships `deep-interview`, `ralplan`, `ultragoal`, `team` | not documented | not documented (README explicitly says it is "not a hidden plugin" for other CLIs) |

When a runtime capability is not documented, write `not documented` or `unknown` and require live verification before shipping behavior that depends on it.

**Explicit skill invocation is not the same token across runtimes.** Claude Code, Grok, and Cursor expose user-invocable skills as slash commands such as `/<skill-name>` (Claude/Cursor: `disable-model-invocation: true` makes a skill explicit-only); Codex uses `/skills` (selector) or `$<skill-name>` (mention) — typed `/<skill-name>` is not a documented Codex form, and `allow_implicit_invocation: false` in `agents/openai.yaml` turns off description-matching; Hermes documents no typed invocation token, but Antigravity registers each skill as a typed `/<skill-name>` slash command in the TUI; community gajae-code is the odd one out — it uses a **colon** form, `/skill:<name>` (e.g. `/skill:deep-interview`), not `/<skill-name>`. Full source-cited table: `docs/compatibility-matrix.md` → **Skill Invocation**. For cross-engine commands, rely on description-triggered invocation as the portable layer and treat the typed token as per-engine sugar.

## CLI Spawn And Headless Launch

When one agent **spawns another** from a script, hook, or orchestrator, use the runtime's documented command for the mode you want — interactive and headless are reached differently. Full tables and citations live in `docs/cli-invocation.md`; resume is covered under **Session Resume** below.

| Runtime | Interactive launch | Headless run |
|---|---|---|
| Codex | `codex` (seed-prompt arg no longer stated on the CLI overview — verify before scripting) | `codex exec "<p>"` |
| Claude Code | `claude` / `claude "<q>"` | `claude -p "<q>"` |
| Grok / xAI | `grok` | `grok -p "<p>"` |
| Hermes | `hermes chat` | `hermes chat -q "<q>"` |
| Antigravity CLI | `agy` | not documented (use Antigravity SDK) |
| Cursor CLI | `cursor-agent` | `cursor-agent -p "<p>"` |
| gajae-code (community) | `gjc` / `gjc --tmux` / `gjc --tmux --worktree <branch>` | `gjc --mode rpc` (no JSON/output-format flag documented) |

- **The mode switch is not the same shape.** For Claude/Grok/Cursor/Hermes, headless is a **flag** (`-p`/`--print`, or Hermes `-q`) added to the bare interactive command — so interactive = omit the flag. **Codex** is the exception: headless is a separate **subcommand** (`codex exec`), with no print/headless `-p` to drop (Codex's `-p` *is* `--profile`, a config-profile selector — not a prompt flag, so "Codex has no `-p`" is wrong; it has no *headless* `-p`), so a list of only `codex exec …` is *not* "Codex is headless-only". **Antigravity** (`agy`) is TUI-only with **no documented headless one-shot** — run it unattended through the Antigravity SDK, not `agy -p` (which appears only in third-party guides).
- Output format is not uniform: Codex `--json` (JSONL); Claude/Cursor `--output-format json|stream-json`; Grok `--output-format json`; Hermes and Antigravity document **no** headless JSON flag.
- Gemini CLI is omitted: **as of 2026-06-18 it has stopped serving** AI Pro/Ultra and free individual users (replaced by Antigravity CLI, `agy`); enterprise/Google Cloud keeps Gemini CLI. See `docs/cli-invocation.md` → transition section.

## Session Resume

Same-platform resume (continue the *same* conversation on the *same* engine, by session id) is officially documented for all four worker runtimes. Per-engine resume invocation, session store, and id form live in `docs/compatibility-matrix.md` → **Session Resume**. The working model:

- The minimum to continue is the **resume locator** (session/thread id) plus the engine's resume invocation: Claude `claude --resume <id>`, Codex CLI `codex resume <id>` (desktop app-server: the `thread/resume` method with the recorded `thread.id`), Grok `grok -r/--resume <id>`, Hermes `hermes --resume <id>`.
- Capture the locator **before the worker exits**, keyed by `cwd` (the most stable signal every engine exposes). Session stores differ — Claude/Codex/Grok keep per-session transcript/rollout files; **Hermes keeps history in SQLite `~/.hermes/state.db`**, so a file scan of `~/.hermes/sessions/` (which holds only API error dumps) finds nothing resumable.
- **Antigravity CLI** (`agy`, the Gemini CLI successor) resumes into the TUI only: `agy --continue` (most recent in the workspace) or `agy --conversation <uuid>`; conversations are **workspace-scoped** (it lists only sessions started in that cwd).
- **gajae-code** documents **no** session-id resume command; it persists per-session evidence under a project `.gjc/` dir and isolates work with git worktrees (`gjc --tmux --worktree <branch>`), but worktree isolation is not the same as id-keyed resume — treat resume as `not documented`.
- **Cross-engine moves** (resume one engine's session under a *different* engine) are a separate, harder problem and out of scope here — keep them off the same-platform path.
- When a runtime does not document resume, record `not documented` and require live verification before shipping.

## Model Lineup

Which models each runtime **currently ships** — the exact ids a caller selects today, their reasoning/effort tiers, and which models the vendor has **retired** — drifts on its own cadence (a new frontier model or a retirement lands independently of any skill/hook/CLI change). The detailed, source-cited record lives in `docs/models/` (one file per runtime, each with a `Last reviewed:` stamp and its official URL); this is the short working model:

- **Claude / Claude Code** — current: Fable 5 (`claude-fable-5`), Opus 4.8 (`claude-opus-4-8`), Sonnet 5 (`claude-sonnet-5`), Haiku 4.5 (`claude-haiku-4-5`, id `claude-haiku-4-5-20251001`). Legacy: Opus 4.7 (→ 4.8) and Sonnet 4.6 (→ 5); `claude-opus-4-1-20250805` is deprecated, retiring 2026-08-05. Reasoning is **adaptive thinking** on the current generation (Haiku 4.5: extended thinking); the numeric `effort`/`ultracode` labels are a Claude Code caller-layer selector, not distinct vendor models. The Mythos pair (`claude-mythos-5`, `claude-mythos-preview`) is documented but invitation-only (not GA) — do not treat it as spawnable.
- **Codex** — current: `gpt-5.5`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.3-codex-spark` (text-only research preview); `gpt-5.2` and `gpt-5.3-codex` are deprecated. `model_reasoning_effort` + `service_tier` stay config knobs; per-model tier tables are `not documented` on the models page.
- **Grok** — current: `grok-4.3`, the `grok-4.20-0309` family (`-reasoning`/`-non-reasoning`/multi-agent), `grok-build-0.1`, plus Imagine image/video models; `grok-composer-2.5-fast` is `not documented` on the official models page (no retired section — absence ≠ retirement).
- **Gemini-Antigravity / Cursor / Hermes** — router- or provider-routed; ids seeded from downstream catalogs and `unverified this run` against each vendor page. Cursor and Hermes select **upstream** provider models rather than shipping their own.

**SSoT boundary — this folder does not own everything model-shaped.** It owns *current shipping ids + tiers + retirement status*, verified against each vendor's official model page. It does **not** own: **pricing/limits** (the `claude-api` skill and vendor pricing pages), the **Kuma Studio spawnable catalog** (`packages/shared/team.json` `modelCatalog` — a *downstream consumer* that syncs from these lineups, never the reverse), or **naming/phonetic-gloss standards** (the Kuma vault `domains/model-frontier.md`). Link to those; do not duplicate. When a value cannot be confirmed against the official doc in a run, mark it `unverified this run` and leave it for the next daily pass — never substitute a guess or a non-vendor mirror.

## Project Instruction Files

Do not assume every non-Claude runtime reads `AGENTS.md`. Use the officially documented project-instruction filename for the target runtime:

| Runtime | Official project instruction/context files |
|---|---|
| Codex | `AGENTS.override.md`, `AGENTS.md`, then configured `project_doc_fallback_filenames` |
| Claude Code | `CLAUDE.md`, `.claude/CLAUDE.md`, `CLAUDE.local.md`, and `.claude/rules/`; Claude docs explicitly say Claude reads `CLAUDE.md`, not `AGENTS.md` |
| Grok / xAI | `AGENTS.md`, `Agents.md`, `AGENT.md` |
| Hermes Agent | `.hermes.md` / `HERMES.md`, then `AGENTS.md`, then `CLAUDE.md`, then `.cursorrules`, then `.cursor/rules/*.mdc`; `SOUL.md` is global identity, not project instructions |
| Antigravity CLI (was Gemini CLI) | Reads `GEMINI.md` and `AGENTS.md` (global `~/.gemini/GEMINI.md`); Gemini CLI's `GEMINI.md` hierarchical memory is the legacy form |
| Cursor CLI | `.cursor/rules`, plus project-root `AGENTS.md` and `CLAUDE.md` |
| Kuma Studio | `AGENTS.md` and `CLAUDE.md` are parallel repo SSoT files for shared rules |
| gajae-code (community) | not documented — README does not document an instruction-file loader (`AGENTS.md`/`CLAUDE.md`/`GEMINI.md`); user config is `~/.gjc/config.yml`, per-project state lives in `.gjc/` |

For cross-agent repo rules, maintain the smallest set of files that each runtime actually reads. In Kuma-style Codex/Claude/Grok/Hermes repos, that usually means repo-owned `AGENTS.md` plus a `CLAUDE.md` import/symlink or Claude-specific wrapper; add `GEMINI.md` only when Antigravity CLI (or legacy Gemini CLI) is a supported runtime.

**The filename is only half the contract — *loading mechanics* differ per engine** along two axes: ancestor walk-up (climb cwd → root, merging every file passed) and subdirectory discovery (nested files below cwd, loaded upfront vs on-demand). Full source-cited comparison: `docs/compatibility-matrix.md` → **Project Instruction File Loading**. The working model:

- **Claude Code** loads ancestor `CLAUDE.md`/`CLAUDE.local.md` from cwd up to the filesystem root **in full at launch** (concatenated root → cwd, closer-to-cwd wins), and discovers nested subdirectory `CLAUDE.md` **on-demand** when it reads files there (not re-injected after `/compact` until that dir is touched again). So it is *not* "just root + cwd" — it is the whole ancestor chain eagerly plus the descendant tree lazily.
- **Codex** walks *root → down to cwd*, ≤ 1 file per dir, concatenated with closer files overriding, built **once per run** under a 32 KiB cap — and has **no subdirectory lookahead** (never reads below cwd).
- **Gemini / Antigravity** concatenates global + ancestor + the **entire subtree below cwd** into the prompt sent with **every request** (`.gitignore`-aware) — always in context, not lazy like Claude.
- **Hermes** loads a **single** project file (first match: `.hermes.md` → `AGENTS.md` → `CLAUDE.md` → `.cursorrules` → `.cursor/rules/*.mdc`, no merge) but does on-demand discovery of the dir + 5 parents (each checked at most once per session) during file ops.
- **Cursor** documents project-root `AGENTS.md`/`CLAUDE.md` only; tree-walk/merge is **not documented**. **Grok** claims Claude-compat but its tree semantics are **unknown** — verify live.

Implication for cross-engine repos: a module-specific instruction placed in a deep subdirectory is seen eagerly by Gemini, lazily by Claude/Hermes, and **never** by Codex (below cwd) — keep anything Codex must obey at or above the launch directory.

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
- **Do not re-implement a slash surface in a host layer above the engine.** A GUI/terminal wrapper that intercepts keystrokes to fake `/command` creates a second input path that must re-derive session context (current target resolution, ambiguity handling) the engine-side skill already has, and it standardizes on one invocation token where runtimes differ (Claude/Grok `/name` vs Codex `$name` — see Runtime Coverage above). Forward typed input to the engine verbatim and ship the capability as a skill + CLI; reserve host-level interception for things no engine surface can do. (Trial-and-error 2026-06-10: kuma-studio's WorkspaceTerminal `/kuma-plan` interception + popover — parser, popover UI, server route, i18n in 4 locales, tests — shipped validator-passed and was removed the same day in favor of the engine-native `kuma-plan` skill.)
- Cross-agent guidance must be based on official vendor docs. If a platform does not document a feature, record it as `not documented` or `unknown`; do not infer parity from another agent.
- **Make hook scripts executable (`chmod +x`) and give them a shebang.** Claude registers hooks as `command: "<abs-path> --args"` and runs them through `/bin/sh`, so a missing exec bit fails with `Permission denied` on *every* matching event (PreToolUse/Stop) in *every* session — one forgotten `chmod +x` silently breaks all agents at once. Codex registers as `node <path>` so it tolerates a missing bit, but always `chmod +x` for parity and **commit the mode** (git stores `100755`). (Trial-and-error 2026-05-26: a new guard hook shipped `644` → `Permission denied` spam across all live sessions until chmod'd.)
- **Hook scripts must not assume GNU coreutils.** macOS ships neither `timeout` nor `stat -c`; a hook that calls them unguarded fails on *every* macOS agent — and a fail-closed `|| exit 0` turns that into a silent no-op that looks like "working but quiet". Detect and degrade (`command -v timeout || gtimeout || plain`) and use portable forms (`stat -f %m || stat -c %Y`). (Trial-and-error 2026-06-09: a `timeout 5 git fetch` in a SessionStart/PreToolUse hook silently `command not found`-failed on macOS, so the hook never fetched and never fired — it took a probe hook to notice.)
- **Keep history out of doc bodies.** Changelog narrative — what was added/changed/removed and when — lives in `CHANGELOG.md` plus the git tag (the version SSoT), never accreting in `SKILL.md` or `docs/*` prose. A doc body states the **current** truth only; when a fact changes, replace it, don't append the old one. The one exception is a *verification* stamp (`Last reviewed: YYYY-MM-DD`, `verified YYYY-MM-DD`): that is provenance for a live claim, not history. This is what keeps a daily-refreshed wiki from turning into a changelog as it is re-verified. **A freshness stamp must advance when the claim is re-verified, even if the wording is unchanged** — for a *time-sensitive status claim* (a status that can flip: billing paused/resumed/cancelled, an announced-but-not-yet-effective cutoff, any "currently X" status), re-confirming it on a new date *is* the update; a still-true status whose stamp is months old reads as wrong. A blanket "no content change → touch nothing" refresh rots exactly these claims, so carve them out.

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

1. Prefer repo-local skill roots when the runtime documents them (`.agents/skills/`, `.claude/skills/`, `.grok/skills/`, `.cursor/skills/`) and the workflow is project-specific.
2. Symlink user-wide canonical skill folders into the runtime's documented user skill root only when the workflow should apply outside one repo.
3. Patch project-local hook config for project guardrails; patch user-level hook config only for personal/global guardrails.
4. Backup mutated JSON config files before writing.
5. `chmod +x` every hook script before registering it (Claude runs `command` via `/bin/sh`; no exec bit = `Permission denied` everywhere).
6. Validate by feeding representative JSON payloads into the hook scripts — and run the script **directly** (`./hook.cjs ...`, no `node` prefix) to catch a missing exec bit the way Claude would.

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

`permissionDecision` accepts `"allow" | "deny" | "ask" | "defer"` on Claude Code. Official Codex hooks docs document only `"allow"` and `"deny"` for `PreToolUse`; `"ask"` (and the legacy `decision: "approve"`, plus `continue`/`stopReason`/`suppressOutput`) are documented as **parsed but not yet supported** on Codex, and `"defer"` is not documented for Codex at all. Codex's separate `PermissionRequest` hook uses a `behavior` field (`"allow"`/`"deny"` with an optional `message`), not `permissionDecision`. `hookSpecificOutput` may also carry `updatedInput` (replace the tool input before it runs) and `additionalContext` (inject context for the model). For **allow**, exit 0 with no output is sufficient; or emit `permissionDecision: "allow"` explicitly.

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

Codex tool coverage (verified 2026-06-22 against <https://developers.openai.com/codex/hooks>): PreToolUse intercepts **Bash, `apply_patch` file edits, and MCP tool calls**, and a denying PreToolUse prevents the blocked `apply_patch` file from being created (`openai/codex#16732` fixed; PR `#18391`). The earlier "Bash only" behavior is obsolete — do **not** assume apply_patch is unhookable. Three things still bite, so design accordingly:

- **Shell coverage is partial — "only the simple ones".** The official docs state PreToolUse "doesn't intercept all shell calls yet, only the simple ones" (and excludes WebSearch and other non-shell tools), so a compound/complex shell invocation can still slip past a Bash `PreToolUse` guard. Treat a Bash hook as best-effort, not a complete shell gate.
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
