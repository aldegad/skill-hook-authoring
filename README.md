# Skill Hook Authoring

Shared methodology for authoring agent skills, hooks, commands, extensions, plugins, and repo-owned guardrails without drifting between agent runtimes.

## What This Repo Owns

- `SKILL.md` is the skill entrypoint.
- `docs/official-sources.json` is the source manifest for official vendor documentation.
- `docs/compatibility-matrix.md` records what each agent officially supports.
- `docs/plugin-packaging.md` explains how plugin or extension packaging differs by platform.
- `docs/kuma-studio-patterns.md` captures public Kuma Studio operating patterns.
- `docs/codex-cloud-automation.md` explains the daily update automation.

## Daily Official-Docs Update

The preferred cloud path is GitHub Actions plus `openai/codex-action@v1`.

1. Add `OPENAI_API_KEY` as a repository secret.
2. Optional: set repository variable `DAILY_DOCS_REVIEWER` to the GitHub username that should receive review requests.
3. Optional: set repository variable `ENABLE_DAILY_DOCS_AUTO_MERGE` to `true` after branch protection and checks are in place.
4. Enable GitHub Actions for the repository.
5. Run `.github/workflows/daily-official-doc-update.yml` manually once from the Actions tab.

The workflow fetches official docs, asks Codex to update the repo docs when evidence changed, validates the result, opens a PR, and optionally enables auto-merge.

## Local Checks

```bash
node scripts/check-official-sources.mjs --write-report
```

The script validates source IDs, allowed official hosts, URL reachability, and the `SKILL.md` line budget.
