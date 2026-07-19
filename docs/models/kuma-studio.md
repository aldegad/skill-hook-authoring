# Kuma Studio — model lineup

Official source: the Kuma Studio repo `packages/shared/team.json` (`modelCatalog`)
— this is a **downstream consumer**, not a vendor. It syncs the ids that the
vendor lineups (`claude.md`, `codex.md`, `grok.md`, `hermes.md`,
`gemini-antigravity.md`) establish as current.
Last reviewed: 2026-07-20 (reconciled first-party against
`packages/shared/team.json`)

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

## Catalog state vs. the vendor lineups

Reconciled against `packages/shared/team.json` directly:

- **Claude:** `claude-fable-5`, `claude-opus-4-8`, `claude-sonnet-5` (each in
  low / medium / high / xhigh / max / ultracode × plain and `[1m]` entries) and
  `claude-haiku-4-5` (plain and `[1m]`). No `claude-opus-4-7` or
  `claude-sonnet-4-6` entry remains — the catalog matches `claude.md`.
- **Codex:** `gpt-5.6-sol` / `-terra` / `-luna`, `gpt-5.5`, `gpt-5.4-mini`,
  `gpt-5.3-codex-spark`. Bare `gpt-5.4` from the vendor lineup is **not** carried.
- **Grok:** `grok-4.5` (low/medium/high) plus a Kuma-local
  `grok-composer-2.5-fast` entry not owned by `grok.md`.
- **Hermes:** the seven `provider/model` router entries mirrored in `hermes.md`.

Catalog edits happen in the kuma-studio repo; this file records the reconciled
state, not the edit history.

## Boundaries

- **Pricing / limits:** not tracked by Kuma Studio; see each vendor.
- **Naming / phonetic gloss:** owned by the Kuma vault
  (`domains/model-frontier.md`), not this folder.
