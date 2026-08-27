# Cursor CLI — model lineup

Official source: https://cursor.com/docs/models-and-pricing
(`cursor.com/docs/models` 308-redirects here)
Last reviewed: 2026-08-28 (verified live against the official models & pricing page)

## Current shipping models

The page (now titled "Models & Pricing") documents two usage pools — **Cursor
Models** (Cursor Grok 4.6, Grok 4.5, and Composer 2.5) and **Other Models** (third-party, "charged at the model's API price") —
plus an `Auto` default. The pricing table **is** the model list — the page has no
separate lineup section.

| Model | Owner | Notes |
|---|---|---|
| Composer 2.5 (standard / Fast) | **Cursor** | Described on its own per-model page (`docs/models/cursor-composer-2-5`), not on the pricing page: "Composer 2.5 is Cursor's own agentic model. It builds on Composer 2 with stronger intelligence on long agentic tasks, better effort calibration, tool selection, intent understanding, and reliability." The **fast** variant is the product default; the standard tier is the cost-optimized one. (Composer 1 no longer appears anywhere on the pricing page.) |
| Grok 4.6 (standard / Fast) | Cursor + SpaceXAI | Frontier model for complex coding and knowledge work; improves instruction following and long-horizon agentic work over 4.5. Supports `low`, `medium`, `high` (default), and `xhigh` effort (per the model's own page). On the Start plan all three Cursor models run in non-fast mode and Grok 4.6 / 4.5 are pinned to a fixed medium effort; the level is changeable on Pro and above. |
| Grok 4.5 ("Cursor Grok 4.5") | Cursor + SpaceXAI | "Grok 4.5 is jointly trained by Cursor and SpaceXAI for long-running coding and knowledge work." |
| Anthropic Claude family (Claude Fable 5 / Opus 5 / Opus 4.8 / Opus 4.7 / Sonnet 5) | third-party | Sonnet 5 $2/$10 with no promotional end date on the page (its row notes now read "Requires Max Mode on legacy request-based plans; Up to 1M tokens with extended context at the same per-token rates"; the earlier "through August 31, 2026" launch window is gone); Fable 5 $10/$50 — "Requests that trip a security guardrail are automatically routed to Claude Opus" |
| OpenAI GPT-5 family (GPT-5.6 Luna / Sol / Terra, GPT-5.5, GPT-5.4/Mini/Nano, plus the Codex line) | third-party | GPT-5.6 rows carry cache-write columns ("Cache writes are billed at 1.25x the uncached input rate") |
| Google Gemini family (Gemini 3.5 / 3.6 / 3.7 Flash, 3.1 Pro) | third-party | selectable alongside the above; Gemini 3.7 Flash is the newest listed row |
| GLM 5.2 (Z.ai), Kimi K2.7 Code / Kimi K3 (Moonshot) | third-party | also listed |

- `Auto` is still **not a row of the pricing table**; it has its own "Auto modes"
  section: "Auto has three modes: Cost, Balance, and Intelligence." All three now
  bill the same way — "All Auto modes bill at the list price of the model each
  request is routed to" — so there is no longer a flat per-million Auto tier on
  the current plans. The per-million-regardless-of-model rate survives only as
  **Legacy Enterprise Auto**: "Until September 7, 2026, Enterprise Auto pricing is
  set per million tokens, regardless of which model is used." On Teams/Enterprise
  plans, **Cursor Router** (`docs/cursor-router.md` on the site) picks the model
  per Auto request "based on your optimization mode", and third-party model
  requests carry "a Cursor Token Rate of $0.25 per million tokens" — first-party
  Cursor models (Grok and Composer) are exempt from that rate.
- Cursor **does ship models of its own** (Composer), so it is not a pure router —
  do not describe it as selecting only upstream provider models.
- **The pricing table is the index, not the description.** Every model row links
  to a per-model page under `cursor.com/docs/models/<slug>` (e.g.
  `cursor-composer-2-5`, `grok-4-6`, `claude-fable-5`, `gpt-5-6-sol`), and that is
  where the prose lives — capability description, strengths, tool access, and the
  fast/standard split. Read the per-model page before quoting a description; the
  pricing page carries rates and short caveats only.
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
