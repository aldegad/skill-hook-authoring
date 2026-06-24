<p align="center">
  <img src="assets/icon.png" width="168" alt="One source of truth radiating to every agent runtime" />
</p>

<h1 align="center">Cross-Runtime Agent-Platform Interoperability</h1>

<p align="center"><b>One source of truth for your skills, hooks, and plugins — on every AI coding agent you run.</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

You don't run one AI agent anymore. Codex, Claude Code, Grok, Hermes, Antigravity, Cursor — each has its own idea of what a "skill" is, where hooks register, which instruction file it reads, how sessions resume, and how billing actually works. Ship the same tooling to all of them by hand, and they drift apart within a week. Ask "can I even do X on runtime Y?" and the answer is buried in seven different doc sites — or documented nowhere at all.

This repo is the map and the method:

1. **A compatibility wiki, refreshed daily from official vendor docs.** Seven runtimes — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor, and Kuma Studio — compared across skills, hooks, plugins/extensions, project-instruction & memory files, CLI spawn (interactive vs headless), session resume, and billing.
2. **A methodology for shipping one repo-owned source of truth** — skills, hooks, commands, scripts, references, assets, MCP/app wiring, plugin metadata — installed across every runtime without drift: one canonical package root, symlink installs, explicit retire/rename procedures, and a validation checklist.

## What it answers

Questions you'd otherwise burn an afternoon on, answered with citations:

| You ask | The wiki answers |
|---|---|
| "Can I toggle a skill off on Grok or Hermes?" | No official per-skill disable exists on either — so a toggle must move the skill out of the discovery root. That fact is the difference between shipping a real toggle and shipping a lie. |
| "Which instruction file does each agent read?" | `AGENTS.md` vs `CLAUDE.md` vs `GEMINI.md` vs `.hermes.md` — who reads what, in which priority, and how to share one file across all of them. |
| "How do I resume a session from a script?" | The Session Resume table: resume command, session store location, and session-id format for every runtime. |
| "Will my nightly `claude -p` cron cost me money?" | On a subscription it draws from your plan's usage limits — the same pool as interactive use, with no separate per-run credit (the 2026-06-15 separately-billed-credit change was paused and is not in effect; `ANTHROPIC_API_KEY` accounts stay pay-as-you-go). The billing rows carry the current verified status and date. |
| "Is `/<skill-name>` a thing on Codex?" | No — Codex uses `$<skill-name>`. The Skill Invocation matrix records each runtime's real invocation token, so you stop assuming one token works everywhere. |

**This is the layer you build management tooling on.** Kuma Studio's skill/hook toggle system — flip any skill or hook on/off across Claude, Codex, Grok, and Hermes from one GUI — was built directly on these facts: the wiki says where each runtime's real on/off switch is (`skillOverrides`, `[[skills.config]]`, hook state keys), and where no switch officially exists, it says that too, so the tooling compensates deliberately instead of guessing. Whatever cross-agent dashboard, sync tool, or fleet manager you're building, this wiki is the ground truth it needs.

## Why trust it

- **Every claim cites the vendor's own documentation.** No vibes, no folklore, no "it worked on my machine".
- **Absence is recorded, not inferred.** Where a runtime doesn't document a capability, the wiki says `not documented` instead of assuming parity — knowing a switch *doesn't exist* is as valuable as knowing where it is.
- **It re-verifies itself daily.** A scheduled cloud agent re-fetches every source in `docs/official-sources.json` and opens a PR when the evidence changed; a deterministic gate auto-merges docs-only changes that pass the source check. Stale compatibility tables are how cross-runtime tooling rots — this one doesn't sit still.

## What This Repo Owns

- `SKILL.md` — the skill entrypoint and the authoring/interoperation methodology.
- `docs/compatibility-matrix.md` — the cross-runtime comparison (Skills/Hooks/Plugins/Instructions, Session Resume, Skill Invocation).
- `docs/cli-invocation.md` — per-runtime CLI spawn (interactive vs headless) and resume syntax.
- `docs/plugin-packaging.md` — how plugin/extension packaging differs by platform.
- `docs/official-sources.json` — the source manifest the daily refresh re-verifies.
- `docs/cloud-automation.md` — the daily update automation, and why it runs in the cloud.
- `docs/kuma-studio-patterns.md` — public Kuma Studio operating patterns.
- `CHANGELOG.md` plus the git tag — the version record. History stays here, not in the doc bodies.

## Daily Wiki Refresh

A daily agent keeps the wiki current: it reads `docs/official-sources.json`, fetches the official vendor URLs, and opens a pull request when the evidence changed. It never pushes to `main`.

The recommended path is **Claude Routines** — a scheduled Claude Code session that runs in Anthropic's cloud on a Claude subscription, with no API key and no GitHub Actions, and keeps running when your laptop is closed. Running the refresh **locally** via `claude -p` is discouraged mainly for **reliability**: a local cron fires only while the machine is awake, while a cloud Routine runs regardless of laptop state. (On billing: `claude -p` and Agent SDK usage on a subscription draw from your plan's usage pool — the separate-monthly-credit change announced for 2026-06-15 was paused and is not in effect; `ANTHROPIC_API_KEY` users remain pay-as-you-go. `docs/cli-invocation.md` carries the current verified status and date.) See `docs/cloud-automation.md`.

1. In Claude Code, run `/schedule` (or open <https://claude.ai/code/routines>).
2. Point the routine at this repository and use the prompt in `prompts/daily-official-doc-update.md`.
3. Schedule it once a day. It opens a PR, then runs an auto-merge gate that squash-merges docs-only changes passing the source check; anything else waits for your review (see `docs/cloud-automation.md`).

Codex users can run the same flow with a Codex App Automation instead. See `docs/cloud-automation.md` for both paths.

## Local Checks

```bash
node scripts/check-official-sources.mjs --write-report
```

The script validates source IDs, allowed official hosts, URL reachability, the required source categories, and the `SKILL.md` line budget.
