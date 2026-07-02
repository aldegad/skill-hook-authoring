# Model Lineup

This folder is the skill's record of **which models each tracked runtime
currently ships** — the model ids a caller can actually select today, their
reasoning / effort tiers, and which models the vendor has **retired**. The daily
official-docs refresh re-verifies it against each vendor's own model
documentation (`kind: "model-lineup"` sources in `docs/official-sources.json`).

## What this folder owns

- Per-runtime **current shipping model ids** (the exact strings a CLI/API caller
  passes as the model).
- Each model's **reasoning / effort tiers** where the runtime documents them
  (e.g. Claude effort levels, Codex `model_reasoning_effort`).
- **Retired / superseded** models — the id plus the model that replaced it — so a
  stale reference is caught instead of silently spawning a dead model.
- The **official source URL** each runtime's lineup is verified against, plus a
  `Last reviewed:` stamp.

## What this folder does NOT own (link, do not copy)

- **Pricing / rate limits / token costs** — owned by the `claude-api` skill and
  each vendor's pricing page. Reference, never duplicate.
- **The Kuma Studio spawnable catalog** — `packages/shared/team.json`
  (`modelCatalog`) in the kuma-studio repo. That is a **downstream consumer** that
  syncs from these lineups; it is not the source of vendor truth. When a model is
  retired here, the team.json catalog is updated separately (see the kuma-studio
  repo), not the other way around.
- **Naming conventions / Korean phonetic gloss / standard notation** — owned by
  the Kuma vault (`domains/model-frontier.md`). This folder uses the vendor's
  literal model id, not a house style.

## Maintenance policy

- **Current truth only.** State what ships today. Do not append the previous
  lineup in the body — the change narrative goes in `CHANGELOG.md` with its git
  tag. Replace a changed fact rather than stacking the old one beside it.
- **Cite the runtime's own official doc.** Do not infer one runtime's lineup from
  another. If the official docs do not document a model or tier, write
  `not documented` / `unknown`.
- **`unverified this run`.** If a value could not be confirmed against the
  official doc during a refresh (URL 403/unreachable, JS-rendered SPA returning an
  empty shell, or the model simply not yet documented), mark it
  `unverified this run` and leave it for the next daily pass to confirm — never
  substitute a guess or a non-vendor mirror.
- **Provenance stamp.** Each runtime file carries a `Last reviewed:` date and the
  official URL it was checked against. That stamp is the only dated line allowed
  in the body. Advance it when the file is re-verified; a model lineup that reads
  as months-old looks wrong even when still true.

## Files

| File | Runtime | Source of truth |
|---|---|---|
| `claude.md` | Claude / Claude Code | `docs.anthropic.com` models overview |
| `codex.md` | OpenAI Codex | `developers.openai.com/codex/models` |
| `grok.md` | Grok / xAI | `docs.x.ai` models |
| `gemini-antigravity.md` | Google Antigravity CLI (`agy`) / Gemini | official Google docs |
| `cursor.md` | Cursor CLI | `docs.cursor.com` |
| `hermes.md` | Hermes Agent (Nous) | `hermes-agent.nousresearch.com` |
| `kuma-studio.md` | Kuma Studio | downstream catalog note (points at team.json) |
