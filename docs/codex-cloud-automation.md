# Codex Cloud Automation

Last reviewed: 2026-05-26

## Supported Paths

There are two supported automation paths for this repo:

1. Codex App Automations for local or app-managed projects.
2. GitHub Actions with `openai/codex-action@v1` for a cloud runner attached to this GitHub repo.

Codex App Automations can schedule recurring tasks, combine automations with skills, and run Git repository work in a local project or a dedicated background worktree. Project-scoped automations require the app to be running and the selected project to exist on disk.

GitHub Actions does not require the user's computer to be online. It runs from the GitHub repository and needs an `OPENAI_API_KEY` repository secret.

## Recommended Daily Flow

```text
daily cron
-> fetch docs/official-sources.json
-> validate official source reachability
-> run Codex with prompts/daily-official-doc-update.md
-> update docs only when official evidence changed
-> run validation
-> open PR
-> request reviewer
-> optionally enable auto-merge after checks/review
```

## Editing And Review

- GitHub: open the Pull Requests tab and review the daily PR diff.
- GitHub Actions: open the Actions tab and run `Daily official docs update` manually when testing.
- Local: run `node scripts/check-official-sources.mjs --write-report` before pushing manual edits.
- Codex App: create a standalone automation with the prompt in `prompts/daily-official-doc-update.md`.

## Required GitHub Settings

- Repository secret: `OPENAI_API_KEY`.
- Workflow permissions: contents write and pull requests write are declared in the workflow.
- Optional repository variable: `DAILY_DOCS_REVIEWER`, a GitHub username to request for review.
- Optional repository variable: `ENABLE_DAILY_DOCS_AUTO_MERGE=true`.

Auto-merge only works when the repository allows it and all configured branch requirements are satisfied. Keep required checks and review rules visible in GitHub branch protection or rulesets.

## Codex App Automation Prompt

Use this when creating the automation inside the Codex App:

```text
$skill-hook-authoring
Run the daily official-docs refresh for this repository. Use only docs/official-sources.json. Fetch official vendor docs, update compatibility docs only when official evidence changed, run node scripts/check-official-sources.mjs --write-report, and leave changes in a branch or PR. Do not push directly to main. Do not edit installed ~/.codex, ~/.claude, ~/.grok, ~/.gemini, or other home-directory copies.
```
