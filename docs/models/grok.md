# Grok / xAI — model lineup

Official source: https://docs.x.ai/developers/models
(moved from `docs.x.ai/docs/models`, which now 308-redirects here; model detail
links live under `/developers/models/<id>`) plus the CLI reference at
https://docs.x.ai/build/cli/reference
Last reviewed: 2026-08-21 (verified live against the official xAI models page,
the reasoning capability page, the may-15-retirement page, and the CLI reference)

## Current shipping models

Chat / coding models:

| Model id | Context | Notes |
|---|---|---|
| `grok-4.6` | 500k | Current flagship for code and general agentic work. Configurable reasoning, February 1, 2026 knowledge cutoff, and `low` / `medium` / `high` / `xhigh` effort. |
| `grok-4.5` | 500k | Listed in the Text API pricing table; the reasoning page documents `low` / `medium` / `high` effort. The models overview no longer calls it the flagship. |
| `grok-4.3` | 1M | Listed in the Text API pricing table. |
| `grok-4.20-0309-reasoning` | 1M | Listed in the Text API pricing table. |
| `grok-4.20-0309-non-reasoning` | 1M | Listed in the Text API pricing table. |
| `grok-4.20-multi-agent-0309` | 1M | Listed in the Text API pricing table. On `grok-4.20-multi-agent` the reasoning page documents `low` / `medium` / `high` / `xhigh`, where `reasoning.effort` controls how many agents collaborate rather than reasoning depth. |
| `grok-build-0.1` | 256k | Listed in the Text API pricing table. |

Specialized APIs:

- **Imagine API** (image/video generation and editing) — five documented ids under
  "Imagine Pricing": `grok-imagine-image`, `grok-imagine-image-2.0`,
  `grok-imagine-image-quality`, `grok-imagine-video`, `grok-imagine-video-1.5`.
- **Grok Voice API** (real-time conversations, speech-to-text, text-to-speech) —
  now **id-bearing**: the "Voice Pricing" section names
  `grok-voice-think-fast-2.0`, with `grok-voice-think-fast-1.0` marked
  **Deprecated**. The earlier id-less framing (unit pricing only) is retired.

Alias rule, verbatim from the models page: "`<modelname>` is aliased to the latest
stable version. `<modelname>-latest` is aliased to the latest version.
`<modelname>-<date>` refers directly to a specific model release."

- The official models overview recommends Grok 4.6 for code and chat and calls it the most intelligent and fastest model xAI has built.
- The models overview is organized as "Text API Pricing", "Imagine Pricing", "Voice Pricing", and "Which model should I choose?". The Text API table carries two rows per model (below and at/above a 200k-token prompt), so an id appearing twice is a pricing tier, not two models.
- Reasoning effort is documented at **both layers**. The CLI reference lists `--effort <LEVEL>` ("Reasoning effort"), and the reasoning capability page (`/developers/model-capabilities/text/reasoning`) documents the API parameter for both `grok-4.6` and `grok-4.5`. Both default to `high` and cannot disable reasoning; `grok-4.6` adds `xhigh`, while `grok-4.5` treats `xhigh` as `high`. For `grok-4.20-multi-agent`, the same parameter controls collaborator count rather than reasoning depth.
- **Kuma-catalog note:** downstream Kuma catalog ids such as `grok-build` or
  `grok-composer-2.5-fast` are not owned here. Catalog sync happens in the
  kuma-studio repo, not in this compatibility wiki.

## Retired / superseded

A dedicated retirement page now exists:
`https://docs.x.ai/developers/migration/may-15-retirement` ("Grok Model Retirement
on May 15, 2026" — not linked from the models overview, but in the docs corpus).
Retired effective 2026-05-15 12:00 PM PT, with documented redirects:

| Retired id | Redirects to |
|---|---|
| `grok-4-1-fast-reasoning`, `grok-4-fast-reasoning` | `grok-4.3` with `low` reasoning effort |
| `grok-4-1-fast-non-reasoning`, `grok-4-fast-non-reasoning` | `grok-4.3` with `none` reasoning effort |
| `grok-code-fast-1` | `grok-build-0.1` |
| `grok-imagine-image-pro` | `grok-imagine-image-quality` |
| `grok-4-0709` | `grok-4.3` with `low` reasoning effort |
| `grok-3` | `grok-4.3` with `none` reasoning effort |

All eight retired ids now carry an explicit per-id redirect target. The page also
notes that redirected requests bill at $1.25 per 1M input tokens and $2.50 per 1M
output tokens.

Ids absent from both the models page and this retirement page stay
`not documented` — do not infer retirement from absence alone.

## Boundaries

- **Pricing / limits:** xAI pricing docs (the models page lists per-token /
  per-unit pricing) — not duplicated here.
- **Spawnable catalog:** kuma-studio `team.json` is the downstream consumer.
