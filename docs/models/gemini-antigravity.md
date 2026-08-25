# Google Antigravity CLI (`agy`) / Gemini — model lineup

Official source: https://ai.google.dev/gemini-api/docs/models (the official Google
Gemini model page — page last-updated 2026-08-14; **a plain `curl` no longer
returns it at all**: following redirects lands in a Google OAuth `auto_signin`
loop, and not following them returns a bodyless `302`. Render it with a headless
browser instead — `kuma agent-browser render --url … --settle-ms 6000
--scroll-passes 25` returns the full model tables. Append `?hl=en` unless you want
the browser-locale translation), plus https://antigravity.google (server-rendered
docs site).
Last reviewed: 2026-08-26 (verified live against the official Google Gemini model
page and the Antigravity docs pages)

## Current shipping models

| Model | Status | Notes |
|---|---|---|
| `gemini-3.7-flash` | **Stable** | New latest and most capable Flash model, built for complex coding, agentic workflows, and reliable multi-step execution. |
| `gemini-3.6-flash` | Stable | Previous-generation Flash model balancing speed and multimodal capabilities. It remains the page's canonical naming example of a stable model id. |
| `gemini-3.5-flash` | Stable | Legacy Flash model for baseline speed and routine, high-throughput workloads. |
| `gemini-3.5-flash-lite` | Stable | Fast, cost-effective 3.5 model for high-throughput execution. |
| `gemini-3.1-flash-lite` | Stable | "frontier-class performance rivaling larger models at a fraction of the cost". |
| `gemini-3.1-pro-preview` | **Preview** | Advanced intelligence for complex problem-solving and agentic + vibe coding. Preview ids carry an explicit `-preview` suffix. |
| `gemini-3-flash-preview` | **Preview** | current Flash-generation preview. |
| Antigravity Agent (`antigravity-preview-05-2026`) | **Preview** | managed general-purpose agent model that plans, reasons, and executes code in an isolated Linux sandbox. |

- **Antigravity CLI** (`agy`) is the Gemini CLI successor; Gemini CLI itself
  stopped serving individual Pro/Ultra/free users as of **2026-06-18** (enterprise
  / Google Cloud keeps it). Keep legacy Gemini references in past tense.
- **Fetching the Antigravity docs (verified 2026-08-22).** The docs site is
  **server-rendered** (Astro/Starlight): a plain `curl --compressed` returns the
  full page content, and every page also serves a plain-Markdown twin at
  `<page>.md` (e.g. `/docs/cli/headless.md`), which is the most robust form to
  diff. The failure that used to read as "empty shell" is a **missing
  `--compressed`** — the server answers with a compressed body that an
  undecoded fetch renders as binary garbage. Do not record `unverified this run`
  on that symptom; re-request with decompression, or take the `.md` twin.
- The Antigravity CLI's own `agy models` sample output (headless-mode page) now
  leads with `gemini-3.7-flash-high` and `gemini-3.7-flash-medium`, followed by
  `gemini-3.6-flash-high`, `gemini-3.6-flash-medium`, `gemini-3.5-flash-medium`,
  `gemini-3.1-pro-high`, and `claude-sonnet-4-6` ("Claude Sonnet 4.6 (Thinking)")
  — effort-suffixed CLI slugs and a Claude model that are **not** API model ids on
  this page. The base `gemini-3.7-flash` and `gemini-3.6-flash` ids are on the API
  page (Stable, above).
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
