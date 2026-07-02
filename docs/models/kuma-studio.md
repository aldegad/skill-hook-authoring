# Kuma Studio — model lineup

Official source: the Kuma Studio repo `packages/shared/team.json` (`modelCatalog`)
— this is a **downstream consumer**, not a vendor. It syncs the ids that the
vendor lineups (`claude.md`, `codex.md`, `grok.md`, `hermes.md`,
`gemini-antigravity.md`) establish as current.
Last reviewed: 2026-07-02

## What Kuma Studio ships as spawnable

Kuma Studio does **not** own or ship models. Its `team.json` `modelCatalog`
exposes a per-tier selection of the upstream models above so a Studio member can
be spawned on them (Claude / Codex / Grok / Hermes runtimes). When an upstream
model is retired here, the catalog is edited in the kuma-studio repo — this file
is not the source of that truth, it points at it.

- **SSoT for the spawnable catalog:** `packages/shared/team.json` in kuma-studio
  (a symlink target at `~/.kuma/team.json` for the runtime).
- **Per-member model pin:** `~/.kuma/member-runtime-profiles.json` owns a member's
  local spawn model (the `model` field), separate from the catalog.

## Sync direction

vendor official docs → this `docs/models/*` record → kuma-studio `team.json`
(downstream). Never the reverse: do not treat team.json as evidence of what a
vendor ships.

## Recent catalog change

- **2026-07-02:** Claude Opus 4.7 (`claude-opus-4-7`, 9 catalog entries) removed
  and Sonnet 4.6 (`claude-sonnet-4-6`) bumped to Sonnet 5 (`claude-sonnet-5`) in
  the kuma-studio catalog. Fable 5 was already present. See `claude.md` for the
  vendor lineup; the change narrative lives in the kuma-studio repo history, not
  here.

## Boundaries

- **Pricing / limits:** not tracked by Kuma Studio; see each vendor.
- **Naming / phonetic gloss:** owned by the Kuma vault
  (`domains/model-frontier.md`), not this folder.
