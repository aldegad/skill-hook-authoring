# Google Antigravity CLI (`agy`) / Gemini — model lineup

Official source: https://ai.google.dev/gemini-api/docs/models (the official Google
Gemini model page; render dynamically — page last-updated 2026-07-16), plus
https://antigravity.google (JS-rendered SPA — a static fetch returns an empty
shell; render dynamically before claiming a change).
Last reviewed: 2026-07-20 (verified live against the official Google Gemini model
page)

## Current shipping models

| Model | Status | Notes |
|---|---|---|
| `gemini-3.5-flash` | GA | Google's **most intelligent model** — "sustained frontier performance on agentic and coding tasks". The frontier tier, and the doc's own canonical example of a stable model id. |
| `gemini-3.1-pro` | **Preview** | Advanced intelligence for complex problem-solving and agentic + vibe coding. |
| `gemini-3.1-flash-lite` | GA | "frontier-class performance rivaling larger models at a fraction of the cost". |
| Gemini 3 Flash | **Preview** | current Flash-generation preview. |
| Antigravity Agent | **Preview** | managed general-purpose agent model that plans, reasons, and executes code in an isolated Linux sandbox. |

- **Antigravity CLI** (`agy`) is the Gemini CLI successor; Gemini CLI itself
  stopped serving individual Pro/Ultra/free users as of **2026-06-18** (enterprise
  / Google Cloud keeps it). Keep legacy Gemini references in past tense.
- The Antigravity site is a **JS-rendered SPA**: treat a 200 with an empty shell
  as `unverified this run` and render it dynamically before recording a model
  change.

## Retired / superseded

- Gemini CLI (individual users) retired 2026-06-18, replaced by Antigravity CLI
  (`agy`).
- **Shut down:** Gemini 2.0 Flash, Gemini 2.0 Flash-Lite, Gemini 3.1 Flash-Lite
  Preview, Gemini 3 Pro Preview.
- **Deprecated:** Imagen 4.

## Boundaries

- **Pricing / limits:** Google AI / Gemini pricing docs.
- **Spawnable catalog:** the Gemini ids reach Kuma only through the Hermes/Nous
  router, not a native Antigravity spawn entry.
