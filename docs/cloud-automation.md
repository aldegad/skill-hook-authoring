# Cloud Automation

Last reviewed: 2026-08-18

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
Note: as of 2026-08-18 the billing difference described here previously (a
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

## Alternative: Codex scheduled tasks

Codex users can run the same daily flow with a Codex scheduled task instead (the
docs no longer use the "Automations" product name). It can schedule recurring
tasks (RRULE recurrence), combine them with skills, and run repo work in a
dedicated worktree. Project-scoped scheduled tasks require the Codex app to be
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

When the gate declines and leaves a PR open, the reviewer learns about it by
watching the repository with a custom notification setting for pull requests;
GitHub delivers those notifications to the web inbox, GitHub Mobile, and
verified email addresses.

For manual edits, run `node scripts/check-official-sources.mjs --write-report`
locally before pushing. Native GitHub auto-merge remains a valid alternative — the
`github-auto-merge` source in `docs/official-sources.json` covers it — but it is
not required for the gate above, and it has its own prerequisites: auto-merge
must be **enabled for the repository** before it can be used on a pull request
(a repo-level setting, not just branch protection), the option to enable it is
**shown only on pull requests that cannot be merged immediately**, and write
permission is required. GitHub disables auto-merge again if someone without
write permission pushes to the head branch, or if the base branch is switched.
The `gh pr merge --auto` invocation is a GitHub CLI surface, not something the
`github-auto-merge` docs page documents.

## Keeping Local Checkouts In Sync

Remote auto-update is handled by the daily refresh plus the auto-merge gate above
— `origin/main` stays current on its own. Local checkouts sync with a plain
`git pull`; since runtime installs are symlinks into the canonical repo, one pull
refreshes every runtime at once. Pull when you start work.

(An earlier opt-in stale-notifier hook — a per-session `git fetch` on Claude
`SessionStart` and a per-tool-call `PreToolUse` on Codex — was removed: its cost
outweighed the convenience for a repo that changes about once a day. Manual
symlink install is documented in `SKILL.md` → Cross-Agent Install Pattern.)
