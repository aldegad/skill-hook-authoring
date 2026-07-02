# Grok / xAI — model lineup

Official source: https://docs.x.ai/docs/models
Last reviewed: 2026-07-02 (**`unverified this run` against the official xAI models
page** — ids below are seeded from the Kuma Studio / Grok CLI catalog and must be
confirmed against `docs.x.ai/docs/models` by the daily refresh.)

## Current shipping models (seed — verify against official page)

| Model id | Notes |
|---|---|
| `grok-build` | Grok CLI build model in the Kuma catalog; ships an Imagine skill (image/video gen). |
| `grok-composer-2.5-fast` | Composer 2.5 fast tier. |
| `grok-4.3` | Available via the Hermes/Nous router (`x-ai/grok-4.3`); confirm the native xAI id and tier against the official page. |

- xAI documents its model list and reasoning options at `docs.x.ai`; the reasoning
  / effort taxonomy is `unverified this run` and must be sourced from the official
  page, not inferred from another runtime.

## Retired / superseded

- `unverified this run` — do not assert Grok model retirements without the vendor
  doc.

## Boundaries

- **Pricing / limits:** xAI pricing docs.
- **Spawnable catalog:** kuma-studio `team.json` (`grok-build`,
  `grok-composer-2.5-fast`) is the downstream consumer.
