# Changelog

All notable changes to the `skill-hook-authoring` package. This repo has no
package manifest, so the **git tag plus this file are the version record**
(the official Claude SKILL.md frontmatter documents only `name` and
`description`, so the version is intentionally not stamped there).

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
