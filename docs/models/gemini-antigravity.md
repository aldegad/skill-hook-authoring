# Google Antigravity CLI (`agy`) / Gemini — model lineup

Official source: https://ai.google.dev/gemini-api/docs/models (the official Google
Gemini model page; render dynamically — page last-updated 2026-08-05), plus
https://antigravity.google (JS-rendered SPA — a static fetch returns an empty
shell; render dynamically before claiming a change).
Last reviewed: 2026-08-12 (verified live against the official Google Gemini model
page; Antigravity SPA re-rendered this run)

## Current shipping models

| Model | Status | Notes |
|---|---|---|
| `gemini-3.6-flash` | **Stable** | "Our latest model that balances speed with intelligence to deliver strong performance in agentic and multimodal tasks." Now also the page's canonical naming example of a stable model id. |
| `gemini-3.5-flash` | Stable | Google's **most intelligent model** — "sustained frontier performance on agentic and coding tasks". The frontier tier. |
| `gemini-3.5-flash-lite` | Stable | new on the page this pass. |
| `gemini-3.1-flash-lite` | Stable | "frontier-class performance rivaling larger models at a fraction of the cost". |
| `gemini-3.1-pro-preview` | **Preview** | Advanced intelligence for complex problem-solving and agentic + vibe coding. Preview ids carry an explicit `-preview` suffix. |
| `gemini-3-flash-preview` | **Preview** | current Flash-generation preview. |
| Antigravity Agent (`antigravity-preview-05-2026`) | **Preview** | managed general-purpose agent model that plans, reasons, and executes code in an isolated Linux sandbox. |

- **Antigravity CLI** (`agy`) is the Gemini CLI successor; Gemini CLI itself
  stopped serving individual Pro/Ultra/free users as of **2026-06-18** (enterprise
  / Google Cloud keeps it). Keep legacy Gemini references in past tense.
- The Antigravity site is a **JS-rendered SPA**: treat a 200 with an empty shell
  as `unverified this run` and render it dynamically before recording a model
  change.
- The Antigravity CLI's own `agy models` sample output (headless-mode page) lists
  `gemini-3.6-flash-high`, `gemini-3.6-flash-medium`,
  `gemini-3.5-flash-medium`, `gemini-3.1-pro-high`, and `claude-sonnet-4-6`
  ("Claude Sonnet 4.6 (Thinking)") — effort-suffixed CLI slugs and a Claude model
  that are **not** API model ids on this page. The base `gemini-3.6-flash` id
  itself is now on the API page (Stable, above).
- The API page also lists (beyond this table's scope): Preview — Gemini 3.5 Live
  Translate, Gemini 3.1 Flash Live, Gemini 3.1 Flash TTS, Gemini Omni Flash,
  Lyria 3 Pro/Clip; GA — Nano Banana 2 / 2 Lite, Gemini Embedding 2; plus Deep
  Research / Deep Research Max, Computer Use, Robotics-ER 2 / 1.6, Nano Banana
  Pro, and Lyria RealTime.

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
