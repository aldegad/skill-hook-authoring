# Cloud Automation

Last reviewed: 2026-05-27

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
4. Schedule it once per day. The routine opens a PR from a `claude/`-prefixed
   branch; you review and merge.

Do not set `ANTHROPIC_API_KEY` in the routine environment — Routines bill
against the subscription usage pool, and a present API key suppresses the
`/schedule` path.

## Recommended Daily Flow

```text
daily schedule
-> read docs/official-sources.json
-> validate official source reachability
-> fetch only the official vendor URLs
-> update repo docs only when official evidence changed
-> run node scripts/check-official-sources.mjs --write-report
-> open a PR from a claude/-prefixed branch (never push to main)
-> review and merge
```

## Alternative: Codex App Automations

Codex users can run the same daily flow with a Codex App Automation instead. It
can schedule recurring tasks, combine automations with skills, and run repo work
in a dedicated worktree. Project-scoped automations require the Codex app to be
running and the project to exist on disk, so they do not match the laptop-off
behavior of a cloud routine.

Use the same prompt from `prompts/daily-official-doc-update.md`.

## Editing And Review

- Review the daily PR diff in the repository's Pull Requests tab before merging.
- Run `node scripts/check-official-sources.mjs --write-report` locally before
  pushing any manual edits.
- Optionally enable GitHub auto-merge once branch protection and required checks
  are in place (the `github` sources in `docs/official-sources.json` cover the
  official auto-merge and notification docs).
