# Grok / xAI — model lineup

Official source: https://docs.x.ai/developers/models
(moved from `docs.x.ai/docs/models`, which now 308-redirects here; model detail
links live under `/developers/models/<id>`)
Last reviewed: 2026-07-09 (verified live against the official xAI models page)

## Current shipping models

Chat / coding models:

| Model id | Context | Notes |
|---|---|---|
| `grok-4.5` | 500k | Flagship chat/coding model for code and general agentic work; the official page describes configurable reasoning. |

Specialized APIs: the Grok Voice API (real-time conversations,
speech-to-text, and text-to-speech) and the Imagine API for image/video
generation and editing.

- The official models overview now recommends Grok 4.5 for code and chat.
- The previous `grok-4.3`, `grok-4.20-*`, and `grok-build-0.1` lineup is no
  longer shown on this overview page. Do not infer retirement from absence; use
  a dedicated xAI retirement/deprecation page before asserting removal.
- **Kuma-catalog note:** downstream Kuma catalog ids such as `grok-build` or
  `grok-composer-2.5-fast` are not owned here. Catalog sync happens in the
  kuma-studio repo, not in this compatibility wiki.

## Retired / superseded

- The official models overview links a separate "Model Retirement on May 15"
  migration guide, but the overview itself does **not** mark the former
  `grok-4.3` / `grok-4.20-*` / `grok-build-0.1` ids as retired or deprecated.
  Record absences as `not documented` until a vendor retirement/deprecation doc
  names them.

## Boundaries

- **Pricing / limits:** xAI pricing docs (the models page lists per-token /
  per-unit pricing) — not duplicated here.
- **Spawnable catalog:** kuma-studio `team.json` is the downstream consumer.
