# Grok / xAI — model lineup

Official source: https://docs.x.ai/developers/models
(moved from `docs.x.ai/docs/models`, which now 308-redirects here; model detail
links live under `/developers/models/<id>`) plus the CLI reference at
https://docs.x.ai/build/cli/reference
Last reviewed: 2026-07-20 (verified live against the official xAI models page and
CLI reference)

## Current shipping models

Chat / coding models:

| Model id | Context | Notes |
|---|---|---|
| `grok-4.5` | 500k | Flagship chat/coding model for code and general agentic work. Its detail page states `Reasoning: Yes`. Knowledge cutoff February 1, 2026. |
| `grok-4.3` | 1M | listed in the pricing table |
| `grok-4.20-0309-reasoning` | 1M | pre-built **reasoning** variant |
| `grok-4.20-0309-non-reasoning` | 1M | pre-built **non-reasoning** variant |
| `grok-4.20-multi-agent-0309` | 1M | multi-agent variant |
| `grok-build-0.1` | 256k | listed in the pricing table |

Specialized APIs:

- **Imagine API** (image/video generation and editing) — four documented ids:
  `grok-imagine-image`, `grok-imagine-image-quality`, `grok-imagine-video`,
  `grok-imagine-video-1.5`.
- **Grok Voice API** (real-time conversations, speech-to-text, text-to-speech) —
  **id-less**: the models page exposes it only by unit pricing (realtime-minute,
  TTS characters, STT hour), naming no model id.

Alias rule, verbatim from the models page: "`<modelname>` is aliased to the latest
stable version. `<modelname>-latest` is aliased to the latest version.
`<modelname>-<date>` refers directly to a specific model release."

- The official models overview recommends Grok 4.5 for code and chat: "It is the
  most intelligent and fastest model we've built."
- The page has **no model-list section separate from pricing** — the ids above are
  stated via the pricing table plus the recommendation prose.
- Reasoning effort is documented at the **CLI layer only**: the CLI reference
  common-flags table lists `--effort <LEVEL>` ("Reasoning effort"), and the docs
  do not enumerate the levels. It is **not** a model/API parameter — the models
  page documents no `effort` / `reasoning_effort` API field. At the model level
  the only documented split remains the pre-built `grok-4.20-0309-reasoning` /
  `-non-reasoning` variant pair.
- **Kuma-catalog note:** downstream Kuma catalog ids such as `grok-build` or
  `grok-composer-2.5-fast` are not owned here. Catalog sync happens in the
  kuma-studio repo, not in this compatibility wiki.

## Retired / superseded

- **Not documented.** The models overview links no retirement or deprecation guide
  and marks no id as retired or superseded. Record absences as `not documented`
  until a vendor retirement/deprecation doc names them.

## Boundaries

- **Pricing / limits:** xAI pricing docs (the models page lists per-token /
  per-unit pricing) — not duplicated here.
- **Spawnable catalog:** kuma-studio `team.json` is the downstream consumer.
