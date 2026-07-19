# Cursor CLI — model lineup

Official source: https://cursor.com/docs/models-and-pricing
(`cursor.com/docs/models` 308-redirects here)
Last reviewed: 2026-07-20 (verified live against the official models & pricing page)

## Current shipping models

Cursor documents an `Auto` default plus a mixed lineup: **Cursor-owned models**
alongside third-party frontier models. The pricing table **is** the model list —
the page has no separate lineup section.

| Model | Owner | Notes |
|---|---|---|
| Composer 2.5 | **Cursor** | "Composer 2.5 is Cursor's own model, trained to be highly capable for agentic coding." |
| Composer 1 | **Cursor** | earlier Composer generation, still listed |
| Grok 4.5 | Cursor + SpaceXAI | "Grok 4.5 is jointly trained by Cursor and SpaceXAI for long-running coding and knowledge work." |
| Anthropic Claude family (through Claude Fable 5 / Opus 4.8 / Sonnet 5) | third-party | selectable alongside the above |
| OpenAI GPT-5 family (through GPT-5.6 Luna / Sol / Terra, plus the Codex line) | third-party | selectable alongside the above |
| Google Gemini family (through Gemini 3.5 Flash / 3.1 Pro) | third-party | selectable alongside the above |
| GLM 5.2 (Z.ai), Kimi K2.7 Code (Moonshot) | third-party | also listed |

- `Auto` is described in the page's **prose**, not as a pricing-table row:
  "Auto allows Cursor to select models that balance intelligence, cost
  efficiency, and reliability."
- Cursor **does ship models of its own** (Composer), so it is not a pure router —
  do not describe it as selecting only upstream provider models.
- The docs now document the CLI binary as `agent`: `agent --list-models` reports
  the live selectable set, and an `agent models` subcommand is documented. Prefer
  either over copying ids from this table into automation. (The rename is what the
  docs show; it is not evidence that an older binary name was removed.)

## Retired / superseded

- No retirement or deprecation page is linked from the models page — record
  `not documented` rather than inferring retirement from absence.

## Boundaries

- **Pricing / limits:** the same official page carries per-model pricing; this file
  records ids and ownership only.
- The third-party families are the **same upstream models** covered by `claude.md`
  / `codex.md` / `grok.md` / `gemini-antigravity.md`; this file records Cursor's
  access to them plus Cursor's own Composer line.
