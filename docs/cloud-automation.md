# Cloud Automation

Last reviewed: 2026-07-07

Keep this repo's compatibility docs current by running a daily agent that reads
`docs/official-sources.json`, fetches the official vendor URLs, and opens a pull
request when the evidence changed. The agent must never push to `main`.

## Recommended Path: Claude Routines

Claude Routines run a Claude Code session in Anthropic's cloud on a schedule.
They need only a Claude subscription — no API key, no GitHub Actions — and the
run continues when your laptop is closed.

1. In Claude Code, run `/schedule` (or open <https://claude.ai/code/routines>).
2. Point the routine's git source at this repository.
3. Use the daily prompt in `prompts/daily-official-doc-update.md`.
4. Schedule it once per day. The routine opens a PR from an `aldegad/`-prefixed
   branch (see **Branch prefix policy** below); you review and merge.

Do not set `ANTHROPIC_API_KEY` in the routine environment — Routines bill
against the subscription usage pool, and a present API key suppresses the
`/schedule` path.

**Why not a local `claude -p` cron?** A laptop that is on daily makes a local
`launchd`/`cron` job calling `claude -p` look tempting, but the primary
drawback is **reliability**: a local job fires only when the machine is awake
at the scheduled time, while a cloud Routine runs regardless of laptop state.
Note: as of 2026-07-07 the billing difference described here previously (a
separate monthly Agent SDK credit) remains **paused** — `claude -p` and
Agent SDK usage on subscription plans draw from the same usage pool as
interactive sessions (no separate per-run credit). For `ANTHROPIC_API_KEY` users billing remains
pay-as-you-go API usage. A cloud Routine avoids the reliability gap in either
case; check the current billing status at the `kind: "billing"` entries in
`docs/official-sources.json` before planning large automation budgets.

## Recommended Daily Flow

```text
daily schedule
-> read docs/official-sources.json
-> validate official source reachability
-> fetch only the official vendor URLs
-> re-verify project-instruction file claims (kind=project-instructions)
-> re-verify CLI spawn / headless claims (kind=cli-invocation)
-> re-verify session-resume claims (kind=session-resume)
-> update repo docs only when official evidence changed
-> reconcile Project Instruction Files baseline on drift
   (SKILL.md, compatibility-matrix.md, plugin-packaging.md)
-> reconcile CLI Spawn And Headless Launch baseline on drift
   (SKILL.md section, docs/cli-invocation.md)
-> reconcile Session Resume baseline on drift
   (SKILL.md section, compatibility-matrix.md Session Resume table)
-> run node scripts/check-official-sources.mjs --write-report
-> open a PR from an aldegad/-prefixed branch (never push to main)
-> review and merge
```

The Claude Routine never commits to `main`. It opens a pull request from a
branch instead, so every change — including project-instruction baseline drift —
is reviewed before merge.

**Branch prefix policy.** This repo's local `cc-guard` hook rejects branch names
containing `claude` or `codex` and requires an `aldegad/`-prefixed branch (see the
existing `aldegad/...` branches). Claude Routines, however, default to pushing
`claude/`-prefixed branches, and a configurable custom prefix is not documented
for them. To stay consistent with the local guard, enable **Allow unrestricted
branch pushes** in that repository's routine Permissions and push an
`aldegad/`-prefixed branch (for example `aldegad/daily-doc-refresh-YYYY-MM-DD`).

## Alternative: Codex App Automations

Codex users can run the same daily flow with a Codex App Automation instead. It
can schedule recurring tasks, combine automations with skills, and run repo work
in a dedicated worktree. Project-scoped automations require the Codex app to be
running and the project to exist on disk, so they do not match the laptop-off
behavior of a cloud routine.

Use the same prompt from `prompts/daily-official-doc-update.md`.

## Auto-Merge Gate

After the daily routine opens a PR it runs `scripts/auto-merge-guard.sh
<PR_NUMBER>`, which squash-merges **only when** the diff is docs/prose-only and
`check-official-sources.mjs` passes — otherwise it leaves the PR open. Merge
authority sits on that deterministic shell gate, not on the agent's judgement: a
change that touches code, installers, hooks, or config (or that fails the check)
always waits for a human. This is the lightweight path — the agent triggers the
gate, the gate's exit code decides — and it needs no GitHub Actions or
branch-protection setup.

For manual edits, run `node scripts/check-official-sources.mjs --write-report`
locally before pushing. Native GitHub auto-merge (`gh pr merge --auto` gated on
branch protection + required checks) remains a valid alternative — the `github`
sources in `docs/official-sources.json` cover it — but it is not required for the
gate above.

## Keeping Local Checkouts In Sync

Remote auto-update is handled by the daily refresh plus the auto-merge gate above
— `origin/main` stays current on its own. Local checkouts sync with a plain
`git pull`; since runtime installs are symlinks into the canonical repo, one pull
refreshes every runtime at once. Pull when you start work.

(An earlier opt-in stale-notifier hook — a per-session `git fetch` on Claude
`SessionStart` and a per-tool-call `PreToolUse` on Codex — was removed: its cost
outweighed the convenience for a repo that changes about once a day. Manual
symlink install is documented in `SKILL.md` → Cross-Agent Install Pattern.)
