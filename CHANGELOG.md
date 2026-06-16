# Changelog

All notable changes to the `skill-hook-authoring` package. This repo has no
package manifest, so the **git tag plus this file are the version record**
(the official Claude SKILL.md frontmatter documents only `name` and
`description`, so the version is intentionally not stamped there).

## v1.10 — 2026-06-16

### Changed

- **Agent SDK billing change paused.** The 2026-06-15 separate-monthly-credit
  change is paused; `claude -p` and Agent SDK usage still draw from the regular
  subscription limits. Corrected in `docs/cli-invocation.md`,
  `docs/cloud-automation.md`, and the `anthropic-*` billing sources.
- **Claude/Cursor refresh claims** folded in: new Claude hooks/settings/memory/
  sessions/plugins claims, Cursor tab hooks + cloud-agent hook restrictions, and
  the `/migrate-to-skills` command.

### Added — Antigravity CLI gathered by dynamic render

The daily automation marks `antigravity.google/docs/*` unreachable (JS-rendered
SPA → static fetch returns an empty shell). Rendered the pages dynamically and
folded in the verified truth, correcting drift:

- **Hooks now documented** (was "config format not verified"): pre/post-tool
  hooks live in a plugin's `hooks.json` or the primary `settings.json`, browsed
  via `/hooks`.
- **Native plugin layout documented**: `~/.gemini/antigravity-cli/plugins/<name>/`
  with `plugin.json` (required), `hooks.json`, `mcp_config.json`, `skills/`,
  `agents/`, `rules/`; managed by `agy plugin list/install/enable/disable/uninstall`.
- **Skill invocation corrected** (was "no typed invocation token"): registered
  skills auto-compile to typed `/<skill-name>` slash commands in the TUI.
- **Antigravity SDK** is the programmatic/headless path: `pip install
  google-antigravity`, Python `Agent`/`LocalAgentConfig`.
- New official sources tracked: `antigravity-cli-plugins`, `antigravity-cli-using`,
  `antigravity-cli-install`, `antigravity-sdk-overview`; existing three Antigravity
  sources stamped "verified by dynamic render 2026-06-16". Recorded the global
  `mcp_config.json` path inconsistency between Google's migration and plugins pages.

## v1.9 — 2026-06-13

### Changed

- **Project-local skills/hooks matrix refreshed.** Added a direct
  `docs/compatibility-matrix.md` table for project-specific skills and hooks:
  Codex, Claude Code, Grok, and Cursor are documented as project-local
  skills+hooks; Antigravity and Hermes are recorded as partial where official
  docs do not establish the same repo-local pair.
- **Claude Code packaging updated.** Claude now has documented
  `.claude-plugin/plugin.json` plugins, skills-directory plugins, plugin hooks,
  and project `.claude/skills/`; older "no cited Codex-style package format"
  wording was replaced with Claude's own plugin format.
- **Hermes and Cursor surfaces updated.** Hermes now records gateway hooks,
  shell hooks, plugin hooks, and `plugin.yaml` plugins with bundled skills.
  Cursor now records Agent Skills and project `.cursor/hooks.json` hooks.
- **Daily refresh PRs absorbed.** Folded in open PR #26, #27, and #28 factual
  updates: Codex hook gaps, Claude hook capabilities, Claude Agent SDK credit
  amounts, and corrected Claude settings claims.

### Added

- New official source entries for Codex skills/config, Claude plugins/reference,
  Hermes hooks/plugins/build-plugin, and Cursor skills/hooks.

## v1.8 — 2026-06-11

### Added

- **Multilingual README.** `README.ko/ja/zh-Hans/es/fr/de.md` generated from
  the English source (the SSoT) with a language switcher; regenerate via
  `kuma translate README.md --lang <code>` after editing the English file.
- **Identity icon.** `assets/icon.png` (hub-cube: one source-of-truth core
  radiating to seven runtime nodes) at the top of every README edition.

### Fixed

- **Auto-merge gate never fired.** `scripts/auto-merge-guard.sh` SAFE regex was
  whole-string anchored (`^(docs/|...)$`), so `docs/<file>` never matched and
  every daily-refresh PR stalled for human review. Regex fixed; PR #18 and
  #25 then merged through the gate.
- **Agent SDK billing claim corrected** (via PR #25): from 2026-06-15,
  `claude -p` / Agent SDK usage on eligible plans draws from a separate
  monthly Agent SDK credit — not plain per-token API billing. README and
  `docs/cloud-automation.md` aligned.

## v1.7 — 2026-06-10

### Added

- **Skill Invocation matrix.** New `docs/compatibility-matrix.md` → **Skill
  Invocation** section: per-runtime explicit (user-typed) invocation token and
  model-triggered invocation, source-cited (verified 2026-06-10). Key fact:
  Claude Code and Grok expose skills as `/<skill-name>`; Codex uses `/skills`
  or `$<skill-name>` — typed `/<skill-name>` is not a documented Codex form.
  `SKILL.md` Runtime Coverage gained the short working model.
- **Core rule: no host-layer slash surface.** Don't intercept keystrokes in a
  GUI/terminal wrapper to fake `/command` above the engine — it duplicates the
  engine-side skill's context resolution and assumes one invocation token
  across runtimes. (Trial-and-error 2026-06-10: kuma-studio WorkspaceTerminal
  `/kuma-plan` popover shipped and was removed the same day.)

## v1.6 — 2026-06-09

### Removed

- **Stale-checkout notifier + local installer rolled back.** Removed
  `scripts/notify-if-stale.sh` and `scripts/install-local.mjs`. The per-session
  `git fetch` (Claude `SessionStart`) and per-tool-call process fork (Codex
  `PreToolUse`) cost more than the convenience was worth for a repo that changes
  about once a day. **Remote auto-update stays** via the daily refresh +
  auto-merge gate; sync local checkouts with a plain `git pull`. The matcher and
  macOS-`timeout` lessons from v1.5 are kept in `SKILL.md` as runtime-compat
  knowledge, and manual symlink install remains in the Cross-Agent Install
  Pattern.

## v1.5 — 2026-06-09

### Fixed

- **Codex stale-hook never fired — matcher bug.** `install-local.mjs` registered
  the Codex `PreToolUse` hook with a Claude-style `"*"` matcher, but Codex
  matchers are **regex**, where `"*"` is invalid and matches nothing — so the hook
  silently never ran (confirmed with a probe hook: the event was never invoked).
  Changed to `".*"`. Documented the Claude (`"*"`/omit = all) vs. Codex (regex)
  matcher difference in `SKILL.md`. Claude `SessionStart` path was unaffected.
- **Stale notifier never fetched on macOS — `timeout` bug.** `notify-if-stale.sh`
  wrapped the fetch in `timeout 5`, but `timeout` (GNU coreutils) is absent on
  stock macOS, so it `command not found`-failed and `|| exit 0` made the hook
  silently skip every fetch — it never fired regardless of staleness. Now degrades
  `timeout` → `gtimeout` → plain `git fetch`.

## v1.4 — 2026-06-09

Local install automation for the two runtimes with stable install/hook surfaces
(Claude + Codex), and the stale notifier extended to cover Codex.

### Added

- **`scripts/install-local.mjs`** — local installer. `--runtime claude|codex|both`,
  `--link symlink|copy`, `--with-stale-hook`, `--dry-run`. Symlinks (or copies)
  the skill into `~/.<runtime>/skills/`, is idempotent, backs up any JSON it
  patches, and skips a runtime whose `~/.<runtime>` root is absent.

### Changed

- **Stale-checkout notifier now covers Codex.** `scripts/notify-if-stale.sh`
  auto-detects the hook event: Claude `SessionStart` (once per session) and Codex
  `PreToolUse` (per tool call, self-throttled ~6h via a stamp file). It injects
  `additionalContext` with no `permissionDecision`, so the tool call proceeds
  normally and nothing blocks. `install-local.mjs --with-stale-hook` registers it
  on the matrix-correct event per runtime. The `docs/cloud-automation.md` install
  section was rewritten around the installer; the notifier stays opt-in.

## v1.3 — 2026-06-09

Closes the daily-refresh loop: the routine can now merge its own docs-only PRs
behind a deterministic gate, and local checkouts get a nudge when they fall behind.

### Added

- **Auto-merge gate** (`scripts/auto-merge-guard.sh`): squash-merges a refresh PR
  **only when** the diff is docs/prose-only and `check-official-sources.mjs`
  passes; otherwise it leaves the PR open for human review. Merge authority sits
  on the shell gate's exit code, not the agent's judgement. Wired into
  `prompts/daily-official-doc-update.md` and documented in
  `docs/cloud-automation.md` (the lightweight "Option A" path — no GitHub Actions
  or branch protection required).
- **Stale-checkout notifier** (`scripts/notify-if-stale.sh`): a repo-scoped,
  read-only, non-blocking Claude Code `SessionStart` hook. Silent when the
  checkout is current or you are not in this repo; injects a one-line `git pull`
  heads-up as `additionalContext` when `origin/main` is ahead. Registered in
  `~/.claude/settings.json` (machine config, not in-repo).

### Changed

- Daily prompt + `README.md`: "you review and merge" → the auto-merge gate handles
  docs-only passes and everything else waits for review. `Do NOT push to main`
  softened to "no direct push; merge only via the gate after a PR".

## v1.2 — 2026-06-09

Repositioning release: the package is now framed as what it had already grown
into — a cross-runtime interoperability wiki plus the methodology to manage it.

### Changed

- **Repositioned as a cross-runtime agent-platform interoperability wiki +
  methodology.** `SKILL.md` and `README.md` now lead with the daily-refreshed
  7-runtime compatibility wiki (Codex, Claude Code, Grok, Hermes, Antigravity
  CLI, Cursor, Kuma Studio); the old "Four-Runtime Baseline" became "Runtime
  Coverage" listing all seven. The skill `name` stays `skill-hook-authoring`
  (install symlinks and the `cc-guard` hook depend on the id).

### Added

- **Billing capability domain.** New `kind: "billing"` sources in
  `docs/official-sources.json`: Claude Code subscription vs. API billing, and the
  **2026-06-15** change after which Agent SDK / `claude -p` (headless) usage no
  longer counts toward the Claude plan. Mirrored as a Billing caveat in
  `docs/cli-invocation.md` and a "Why not a local cron" block in
  `docs/cloud-automation.md`; the daily refresh now re-verifies the billing
  category.
- **History-out-of-bodies rule** in `SKILL.md` Core Rules and the daily prompt:
  changelog narrative lives in `CHANGELOG.md` + git tag, doc bodies state current
  truth only (a `Last reviewed:` / `verified` stamp is the lone dated exception).

### Fixed

- `README.md` daily-refresh branch prefix corrected `claude/` → `aldegad/` (the
  `cc-guard` hook rejects branch names containing `claude` or `codex`).

## v1.1 — 2026-06-06

A large doc release adding two capability domains (CLI spawn and session resume),
the Gemini CLI → Antigravity CLI transition, and stronger baseline guards.

### Added

- **CLI spawn & headless launch** — new `docs/cli-invocation.md`: per-runtime
  interactive launch vs non-interactive/headless run for Codex, Claude Code,
  Grok, Hermes, Antigravity CLI, and Cursor, including the mode-switch shape
  difference (flag `-p` vs separate subcommand `codex exec` vs SDK-only) and how
  to pin a specific session. Tracked as `kind: "cli-invocation"` sources.
- **Session Resume** — `SKILL.md` section + `docs/compatibility-matrix.md`
  Session Resume table: same-platform resume invocation, session store, and id
  form for Codex (CLI + app-server `thread/resume`), Claude, Grok, Hermes, and
  Antigravity. Tracked as `kind: "session-resume"` sources.
- **Google Antigravity CLI (`agy`)** as the Gemini CLI successor: interactive
  launch, `--continue` / `--conversation <uuid>` resume, and the
  `agy plugin import gemini` migration, all verified against `antigravity.google`
  (a JS-rendered SPA that needs dynamic rendering).
- **Baseline guards** in `scripts/check-official-sources.mjs` for the
  `cli-invocation` and `session-resume` source categories (codex + claude-code
  anchors), mirroring the existing project-instructions guard.
- Daily refresh (`prompts/daily-official-doc-update.md`) now re-verifies the CLI
  spawn and session-resume categories every run, with an Antigravity SPA-render
  caveat and a 2026-06-18 cutoff note.

### Changed

- **Gemini CLI removed as a tracked runtime** — it is retiring for AI Pro/Ultra
  and free individual users on **2026-06-18** (enterprise/Google Cloud retained;
  OSS repo stays Apache 2.0). Replaced by Antigravity CLI across `SKILL.md`,
  `docs/compatibility-matrix.md`, `docs/plugin-packaging.md`, and the manifest.
  The headless `agy -p` flag and a `GEMINI_API_KEY → AV_API_KEY` env swap are
  **excluded** as officially unconfirmed (third-party only).
- Claude Code settings/memory claims refreshed (auto-memory, `policyHelper`,
  `parentSettingsBehavior`, `httpHookAllowedEnvVars`, `forceLoginMethod`, …);
  skill `name`/`description` "no XML tags" constraint added; OpenAI skill bundle
  size limits recorded.
- Project Instruction Files baseline is now tracked by the daily refresh; the
  symlink-wrapper rule (edit the canonical `AGENTS.md`, treat `CLAUDE.md`
  symlinks as read-only) is documented.
- Cloud automation branch policy: `aldegad/`-prefixed branches (the `cc-guard`
  hook rejects branch names containing `claude` or `codex`).

## v1.0

Baseline: skill/hook authoring rules aligned with official Claude Code + Codex
specs — four-runtime baseline, plugin/extension packaging boundaries, project
instruction files, the `docs/official-sources.json` manifest, and the daily
official-docs refresh automation (Claude Routines, Codex App alternative).
