# Skill Hook Authoring

Shared methodology for authoring agent skills, hooks, commands, extensions, plugins, and repo-owned guardrails without drifting between agent runtimes.

## What This Repo Owns

- `SKILL.md` is the skill entrypoint.
- `docs/official-sources.json` is the source manifest for official vendor documentation.
- `docs/compatibility-matrix.md` records what each agent officially supports.
- `docs/plugin-packaging.md` explains how plugin or extension packaging differs by platform.
- `docs/kuma-studio-patterns.md` captures public Kuma Studio operating patterns.
- `docs/cloud-automation.md` explains the daily update automation.

## Daily Official-Docs Update

A daily agent keeps the compatibility docs current: it reads `docs/official-sources.json`, fetches the official vendor URLs, and opens a pull request when the evidence changed. It never pushes to `main`.

The recommended path is **Claude Routines** — a scheduled Claude Code session that runs in Anthropic's cloud on a Claude subscription, with no API key and no GitHub Actions, and keeps running when your laptop is closed.

1. In Claude Code, run `/schedule` (or open <https://claude.ai/code/routines>).
2. Point the routine at this repository and use the prompt in `prompts/daily-official-doc-update.md`.
3. Schedule it once a day. It opens a PR from a `claude/`-prefixed branch; you review and merge.

Codex users can run the same flow with a Codex App Automation instead. See `docs/cloud-automation.md` for both paths.

## Local Checks

```bash
node scripts/check-official-sources.mjs --write-report
```

The script validates source IDs, allowed official hosts, URL reachability, and the `SKILL.md` line budget.
