# OpenAI Codex — model lineup

Official source: https://developers.openai.com/codex/models
Last reviewed: 2026-07-02 (model ids seeded from the Kuma Studio spawnable
catalog; **the exact set below is `unverified this run` against the official
Codex models page** — the daily refresh must confirm ids and tiers against
`developers.openai.com/codex/models`.)

## Current shipping models (seed — verify against official page)

| Model id | Reasoning / effort | Service tier | Notes |
|---|---|---|---|
| `gpt-5.5` | `model_reasoning_effort` = `medium` / `high` / `xhigh` | standard, plus `fast` (`service_tier=fast`) | Primary Codex model in the Kuma catalog. |
| `gpt-5.4-mini` | `model_reasoning_effort` = `high` | `fast` | Smaller / cheaper tier. |
| `gpt-5.3-codex-spark` | `high` | `fast` | Codex Spark low-latency tier. |

- Codex exposes reasoning as `model_reasoning_effort` (a `-c` config value) and a
  `service_tier` (e.g. `fast`), not as separate model ids — describe them as
  config knobs on the model, not distinct models.
- The **headless** launch is `codex exec` (see `docs/cli-invocation.md`); model
  selection is `-m <model>` / a config profile.

## Retired / superseded

- `unverified this run` — the official page must confirm which prior gpt-5.x /
  codex models are retired. Do not assert a retirement without the vendor doc.

## Boundaries

- **Pricing / rate limits:** OpenAI pricing docs — not duplicated here.
- **Spawnable catalog:** kuma-studio `team.json` `modelCatalog` is the downstream
  consumer; the ids above were seeded from it and must be re-confirmed against the
  official Codex models page.
