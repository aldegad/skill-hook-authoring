# OpenAI Codex — model lineup

Official source: https://developers.openai.com/codex/models
Last reviewed: 2026-07-04 (verified live against the official Codex models page)

## Current shipping models

| Model id | Selection | Notes |
|---|---|---|
| `gpt-5.5` | `codex -m gpt-5.5` | OpenAI's newest frontier model for complex coding, computer use, knowledge work, and research workflows in Codex. |
| `gpt-5.4` | `codex -m gpt-5.4` | Flagship frontier model for professional work with strong coding, reasoning, tool use, and agentic workflows. |
| `gpt-5.4-mini` | `codex -m gpt-5.4-mini` | Fast, efficient mini model for responsive coding tasks and subagents. |
| `gpt-5.3-codex-spark` | `codex -m gpt-5.3-codex-spark` | Text-only **research preview** optimized for near-instant, real-time coding iteration; available to ChatGPT Pro users. |

- All four are listed as available across Codex CLI & SDK, the Codex app & IDE
  extension, Codex Cloud, ChatGPT Credits, and API access.
- The models page does **not** document per-model reasoning-effort values or
  service tiers. `model_reasoning_effort` and `service_tier` remain config knobs
  (see the Codex config docs) — config values on a model, not distinct model
  ids; per-model tier tables are `not documented` on the models page.
- The **headless** launch is `codex exec` (see `docs/cli-invocation.md`); model
  selection is `-m <model>` / `codex exec --model` (shown on the models page).

## Retired / superseded

- `gpt-5.2` and `gpt-5.3-codex` are **deprecated** in Codex when signing in with
  ChatGPT. The page gives no one-to-one replacement mapping — its guidance is to
  update scripts, config files, and `codex exec --model` commands to the latest
  models listed above.

## Boundaries

- **Pricing / rate limits:** OpenAI pricing docs — not duplicated here.
- **Spawnable catalog:** kuma-studio `team.json` `modelCatalog` is the downstream
  consumer; note it does not yet carry `gpt-5.4` (new in the vendor lineup) —
  catalog sync happens in the kuma-studio repo, not here.
