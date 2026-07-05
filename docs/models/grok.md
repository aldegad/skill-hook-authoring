# Grok / xAI — model lineup

Official source: https://docs.x.ai/developers/models
(moved from `docs.x.ai/docs/models`, which now 308-redirects here; model detail
links live under `/developers/models/<id>`)
Last reviewed: 2026-07-06 (verified live against the official xAI models page)

## Current shipping models

Chat / coding models:

| Model id | Context | Notes |
|---|---|---|
| `grok-4.3` | 1M | Frontier chat/coding model. |
| `grok-4.20-0309-reasoning` | 1M | 4.20 family, reasoning variant. |
| `grok-4.20-0309-non-reasoning` | 1M | 4.20 family, non-reasoning variant. |
| `grok-4.20-multi-agent-0309` | 1M | 4.20 family, multi-agent variant. |
| `grok-build-0.1` | 256k | Build/coding model (the Grok CLI build model; ships an Imagine skill for image/video gen). |

Specialized models: `grok-imagine-image`, `grok-imagine-image-quality` (image
generation), `grok-imagine-video`, `grok-imagine-video-1.5` (video generation),
plus the Grok Voice API (audio).

- The reasoning taxonomy is expressed as **model variants** (`-reasoning` /
  `-non-reasoning` ids in the 4.20 family), not a per-model effort knob.
- **Kuma-catalog note:** `grok-composer-2.5-fast` does **not** appear on the
  official models page (`not documented` there), and the catalog's `grok-build`
  is listed officially as `grok-build-0.1`. The downstream catalog sync is
  handled in the kuma-studio repo, not here.

## Retired / superseded

- The official models page has **no retired/deprecated section**. Absences (e.g.
  `grok-composer-2.5-fast`) are recorded as `not documented`, not asserted as
  retirements — do not assert a Grok retirement without the vendor doc.

## Boundaries

- **Pricing / limits:** xAI pricing docs (the models page lists per-token /
  per-unit pricing) — not duplicated here.
- **Spawnable catalog:** kuma-studio `team.json` (`grok-build`,
  `grok-composer-2.5-fast`) is the downstream consumer.
