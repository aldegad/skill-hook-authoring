# Cross-Runtime Agent-Platform Interoperability

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

Two things in one repo:

1. **A compatibility wiki**, refreshed daily from official vendor docs, recording how today's agent runtimes — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor, and Kuma Studio — compare across skills, hooks, plugins/extensions, project-instruction files, CLI spawn (interactive vs headless), session resume, and billing.
2. **A methodology** for interoperating and managing those runtimes: shipping one repo-owned source of truth (skills, hooks, commands, scripts, references, assets, MCP/app wiring, or runtime-specific plugin metadata) without drifting between agents.

Every compatibility claim cites the vendor's own docs; where a runtime does not document a capability, the wiki records `not documented` rather than inferring parity.

## What This Repo Owns

- `SKILL.md` is the skill entrypoint and the authoring/interoperation methodology.
- `docs/compatibility-matrix.md` is the cross-runtime comparison (includes the Session Resume table).
- `docs/cli-invocation.md` records per-runtime CLI spawn (interactive vs headless) and resume syntax.
- `docs/plugin-packaging.md` explains how plugin/extension packaging differs by platform.
- `docs/official-sources.json` is the source manifest that the daily refresh re-verifies.
- `docs/cloud-automation.md` explains the daily update automation and why it runs in the cloud, not locally.
- `docs/kuma-studio-patterns.md` captures public Kuma Studio operating patterns.
- `CHANGELOG.md` plus the git tag are the version record. History stays here, not in the doc bodies.

## Daily Wiki Refresh

A daily agent keeps the wiki current: it reads `docs/official-sources.json`, fetches the official vendor URLs, and opens a pull request when the evidence changed. It never pushes to `main`.

The recommended path is **Claude Routines** — a scheduled Claude Code session that runs in Anthropic's cloud on a Claude subscription, with no API key and no GitHub Actions, and keeps running when your laptop is closed. Running the refresh **locally** via `claude -p` is discouraged: headless `claude -p` bills as per-token API usage (not the subscription), and from 2026-06-15 Agent SDK / `claude -p` usage no longer counts toward the Claude plan at all. See `docs/cloud-automation.md`.

1. In Claude Code, run `/schedule` (or open <https://claude.ai/code/routines>).
2. Point the routine at this repository and use the prompt in `prompts/daily-official-doc-update.md`.
3. Schedule it once a day. It opens a PR, then runs an auto-merge gate that squash-merges docs-only changes passing the source check; anything else waits for your review (see `docs/cloud-automation.md`).

Codex users can run the same flow with a Codex App Automation instead. See `docs/cloud-automation.md` for both paths.

## Local Checks

```bash
node scripts/check-official-sources.mjs --write-report
```

The script validates source IDs, allowed official hosts, URL reachability, the required source categories, and the `SKILL.md` line budget.
