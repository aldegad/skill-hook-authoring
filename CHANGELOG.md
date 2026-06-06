# Changelog

All notable changes to the `skill-hook-authoring` package. This repo has no
package manifest, so the **git tag plus this file are the version record**
(the official Claude SKILL.md frontmatter documents only `name` and
`description`, so the version is intentionally not stamped there).

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
