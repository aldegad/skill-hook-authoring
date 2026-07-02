# Google Antigravity CLI (`agy`) / Gemini — model lineup

Official source: https://antigravity.google (JS-rendered SPA — a static fetch
returns an empty shell; render dynamically before claiming a change) plus the
Google Gemini model docs.
Last reviewed: 2026-07-02 (**`unverified this run`** — Antigravity's site is a
SPA and the Gemini model ids below are seeded from the Nous router catalog, not
confirmed against an official Google model page this run.)

## Current shipping models (seed — verify against official docs)

| Model id (seed) | Notes |
|---|---|
| `gemini-3.1-pro` | Available via the Hermes/Nous router as `google/gemini-3.1-pro-preview`; confirm the native Gemini id, `-preview` status, and tier. |
| `gemini-3.5-flash` | Router id `google/gemini-3.5-flash`; low-latency flash tier. |

- **Antigravity CLI** (`agy`) is the Gemini CLI successor; Gemini CLI itself
  stopped serving individual Pro/Ultra/free users as of **2026-06-18** (enterprise
  / Google Cloud keeps it). Keep legacy Gemini references in past tense.
- The Antigravity site is a **JS-rendered SPA**: treat a 200 with an empty shell
  as `unverified this run` and render it dynamically before recording a model
  change.

## Retired / superseded

- Gemini CLI (individual users) retired 2026-06-18, replaced by Antigravity CLI
  (`agy`). Specific Gemini model retirements are `unverified this run`.

## Boundaries

- **Pricing / limits:** Google AI / Gemini pricing docs.
- **Spawnable catalog:** the Gemini ids reach Kuma only through the Hermes/Nous
  router, not a native Antigravity spawn entry.
