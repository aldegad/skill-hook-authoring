# Cursor CLI — model lineup

Official source: https://cursor.com/docs/models-and-pricing
(`cursor.com/docs/models` 308-redirects here)
Last reviewed: 2026-07-16 (verified live against the official models & pricing page)

## Current shipping models

Cursor documents an `Auto` default plus a mixed lineup: **Cursor-owned models**
alongside third-party frontier models. The pricing table **is** the model list —
the page has no separate lineup section.

| Model | Owner | Notes |
|---|---|---|
| `Auto` | Cursor (default) | "Auto allows Cursor to select models that balance intelligence, cost efficiency, and reliability." |
| Composer 2.5 | **Cursor** | "Composer 2.5 is Cursor's own model, trained to be highly capable for agentic coding." |
| Composer 1 | **Cursor** | earlier Composer generation, still listed |
| Grok 4.5 | Cursor + SpaceXAI | "Grok 4.5 is jointly trained by Cursor and SpaceXAI for long-running coding and knowledge work." |
| Anthropic Claude / OpenAI GPT-5 / Google Gemini families | third-party | selectable alongside the above |
| GLM 5.2 (Z.ai), Kimi K2.7 Code (Moonshot) | third-party | also listed |

- Cursor **does ship models of its own** (Composer), so it is not a pure router —
  do not describe it as selecting only upstream provider models.
- `--list-models` on `cursor-agent` reports the live selectable set; prefer it over
  copying ids from this table into automation.

## Retired / superseded

- No retirement or deprecation page is linked from the models page — record
  `not documented` rather than inferring retirement from absence.

## Boundaries

- **Pricing / limits:** the same official page carries per-model pricing; this file
  records ids and ownership only.
- The third-party families are the **same upstream models** covered by `claude.md`
  / `codex.md` / `grok.md` / `gemini-antigravity.md`; this file records Cursor's
  access to them plus Cursor's own Composer line.
