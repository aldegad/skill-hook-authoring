# Cursor CLI — model lineup

Official source: https://cursor.com/docs/models-and-pricing
(`cursor.com/docs/models` 308-redirects here)
Last reviewed: 2026-07-30 (verified live against the official models & pricing page)

## Current shipping models

The page (now titled "Models & Pricing") documents two usage pools — **Cursor
Models** ("Significantly more included usage for Cursor Grok 4.5 and Composer
2.5") and **Other Models** (third-party, "charged at the model's API price") —
plus an `Auto` default. The pricing table **is** the model list — the page has no
separate lineup section.

| Model | Owner | Notes |
|---|---|---|
| Composer 2.5 | **Cursor** | "Composer 2.5 is Cursor's own model, trained to be highly capable for agentic coding." (Composer 1 no longer appears on the page.) |
| Grok 4.5 ("Cursor Grok 4.5") | Cursor + SpaceXAI | "Grok 4.5 is jointly trained by Cursor and SpaceXAI for long-running coding and knowledge work." |
| Anthropic Claude family (Claude Fable 5 / Opus 5 / Opus 4.8 / Opus 4.7 / Sonnet 5) | third-party | Sonnet 5 launch promo "$2/M input and $10/M output through August 31, 2026"; Fable 5 $10/$50 — "Requests that trip a security guardrail are automatically routed to Claude Opus" |
| OpenAI GPT-5 family (GPT-5.6 Luna / Sol / Terra, GPT-5.5, GPT-5.4/Mini/Nano, plus the Codex line) | third-party | GPT-5.6 rows carry cache-write columns ("Cache writes are billed at 1.25x the uncached input rate") |
| Google Gemini family (Gemini 3.5 / 3.6 Flash, 3.1 Pro) | third-party | selectable alongside the above |
| GLM 5.2 (Z.ai), Kimi K2.7 Code / Kimi K3 (Moonshot) | third-party | also listed |

- `Auto` is still **not a row of the pricing table**, but it is no longer a single
  prose sentence either — the page now documents an "Auto modes" section: "Auto
  has three modes: Auto Cost, Auto Balance, and Auto Intelligence." Auto Cost is
  priced "per million tokens, regardless of which model is used"; Auto
  Balance/Intelligence are "charged at Model API rates for the model used". On
  Teams/Enterprise plans, **Cursor Router** (`docs/cursor-router.md` on the site)
  picks the model per Auto request.
- Cursor **does ship models of its own** (Composer), so it is not a pure router —
  do not describe it as selecting only upstream provider models.
- The docs now document the CLI binary as `agent`: `agent --list-models` reports
  the live selectable set, and an `agent models` subcommand is documented. Prefer
  either over copying ids from this table into automation. (The rename is what the
  docs show; it is not evidence that an older binary name was removed.)

## Retired / superseded

- No retirement or deprecation page exists in the docs corpus (full-sitemap check)
  — record `not documented` rather than inferring retirement from absence.
  Composer 1's disappearance from the pricing table is an *absence*, not a
  documented retirement.

## Boundaries

- **Pricing / limits:** the same official page carries per-model pricing; this file
  records ids and ownership only.
- The third-party families are the **same upstream models** covered by `claude.md`
  / `codex.md` / `grok.md` / `gemini-antigravity.md`; this file records Cursor's
  access to them plus Cursor's own Composer line.
