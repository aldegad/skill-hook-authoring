# Grok / xAI — model lineup

Official source: https://docs.x.ai/developers/models
(moved from `docs.x.ai/docs/models`, which now 308-redirects here; model detail
links live under `/developers/models/<id>`) plus the CLI reference at
https://docs.x.ai/build/cli/reference
Last reviewed: 2026-08-15 (verified live against the official xAI models page,
the reasoning capability page, the may-15-retirement page, and the CLI reference)

## Current shipping models

Chat / coding models:

| Model id | Context | Notes |
|---|---|---|
| `grok-4.6` | 500k | Current flagship for code and general agentic work. Configurable reasoning, February 1, 2026 knowledge cutoff, and `low` / `medium` / `high` / `xhigh` effort. |
| `grok-4.5` | not restated | Still documented on the official reasoning page with `low` / `medium` / `high` effort; the models overview no longer lists it as the flagship. |
| `grok-4.20-multi-agent` | not restated | Still documented on the official reasoning page; `reasoning.effort` controls agent count rather than reasoning depth. |

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

- The official models overview recommends Grok 4.6 for code and chat and calls it the most intelligent and fastest model xAI has built.
- The models overview now lists only Grok 4.6 plus the Voice and Imagine APIs. The previously listed `grok-4.3`, `grok-4.20-0309-reasoning`, `grok-4.20-0309-non-reasoning`, `grok-4.20-multi-agent-0309`, and `grok-build-0.1` pricing rows are absent. Their status is `not documented`; absence is not a retirement claim.
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
