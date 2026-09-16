# Cursor CLI — model lineup

Official source: https://cursor.com/docs/models-and-pricing
(`cursor.com/docs/models` 308-redirects here)
Last reviewed: 2026-09-17 (verified live against the official models & pricing page)

## Current shipping models

The page (now titled "Models & Pricing") documents two usage pools — **Cursor
Models** (Cursor Grok 4.6, Grok 4.5, and Composer 2.5) and **Other Models** (third-party, "charged at the model's API price") —
plus Auto (not available on the Start plan). The pricing table **is** the model list — the page has no
separate lineup section.

| Model | Owner | Notes |
|---|---|---|
| Composer 2.5 (standard / Fast) | **Cursor** | Described on its own per-model page (`docs/models/cursor-composer-2-5`), not on the pricing page: "Composer 2.5 is Cursor's own agentic model. It builds on Composer 2 with stronger intelligence on long agentic tasks, better effort calibration, tool selection, intent understanding, and reliability." The **fast** variant is the product default; the standard tier is the cost-optimized one. (Composer 1 no longer appears anywhere on the pricing page.) |
| Grok 4.6 (standard / Fast) | Cursor + SpaceXAI | Frontier model for complex coding and knowledge work; improves instruction following and long-horizon agentic work over 4.5. 256k context window; supports `low`, `medium`, `high` (default), and `xhigh` effort, and Fast is the default speed tier on Pro and higher plans (per the model's own page). On the Start plan all three Cursor models run in non-fast mode and Grok 4.6 / 4.5 are pinned to a fixed medium effort; the level is changeable on Pro and above. |
| Grok 4.5 (standard / Fast) | Cursor + SpaceXAI | Pricing-page row note (on all four Grok rows): "Jointly trained by Cursor and SpaceXAI". |
| Anthropic Claude family (default-visible rows: Claude Fable 5.1, Opus 5, Sonnet 5) | third-party | Sonnet 5 $2/$10 with no promotional end date on the page (its row notes now read "Requires Max Mode on legacy request-based plans; Up to 1M tokens with extended context at the same per-token rates"; the earlier "through August 31, 2026" launch window is gone); Fable 5 $10/$50 — "Requests that trip a security guardrail are automatically routed to Claude Opus"; Fable 5.1 $10/$50 ("Prompt-cache reads are $0.25/M, 75% below the standard cache-read rate"; see `claude.md`) |
| OpenAI GPT-5 family (GPT-5, GPT-5 Fast, GPT-5 Mini, GPT-5-Codex, GPT-5.1 Codex / Codex Max / Codex Mini, GPT-5.2, GPT-5.2 Codex, GPT-5.3 Codex, GPT-5.4 / Mini / Nano, GPT-5.5, GPT-5.6 Luna / Sol / Terra) | third-party | The table spans the full GPT-5 generation; rows before GPT-5.6 are listed but marked "Hidden by default". GPT-5.6 rows carry cache-write columns ("Cache writes are billed at 1.25x the uncached input rate") |
| Google Gemini family (Gemini 2.5 Flash, Gemini 3 Flash / Pro / Pro Image Preview, Gemini 3.1 Pro, Gemini 3.5 / 3.6 / 3.7 / 3.8 Flash) | third-party | Gemini 3.8 Flash ($0.75 in / $3.5 out) is the newest listed row; Gemini 3.1 Pro and Gemini 3.8 Flash are default-visible, while Gemini 2.5 Flash, Gemini 3 Flash / Pro / Pro Image Preview, and Gemini 3.5 / 3.6 / 3.7 Flash are marked "Hidden by default" (see `gemini-antigravity.md`) |
| GLM 5.2 (Z.ai), Kimi K2.7 Code / Kimi K3 (Moonshot), **Muse Spark 1.3 (Meta)** | third-party | Muse Spark 1.3 ($1.25 in / $4.25 out; "Requires Max Mode on legacy request-based plans") links to its own per-model page (`docs/models/muse-spark-1-3`, not a tracked source); GLM 5.2 and Kimi rows are marked "Hidden by default" |
| Anthropic Claude family, expanded (Claude 4 Sonnet / 4 Sonnet 1M, 4.5 Haiku / Opus / Sonnet, 4.6 Opus / Sonnet, 4.7 Opus (+ fast mode), Opus 4.8, Fable 5 / 5.1, Opus 5, Sonnet 5) | third-party | Claude 4.x and Fable 5 rows are listed but marked "Hidden by default"; Fable 5.1, Opus 5, and Sonnet 5 are default-visible. See the row above for Sonnet 5 / Fable 5 pricing notes |

- `Auto` is still **not a row of the pricing table**; it has its own "Auto modes"
  section: "Auto has three modes: Cost, Balance, and Intelligence." All three now
  bill the same way — "All Auto modes bill at the list price of the model each
  request is routed to" — so there is no flat per-million Auto tier (the former Legacy Enterprise Auto
  per-million rate, which ran until 2026-09-07, no longer appears on the page).
  Auto is not included on the Start plan. On Teams/Enterprise
  plans, **Cursor Router** (`docs/cursor-router.md` on the site) picks the model
  per Auto request "based on your optimization mode", and third-party model
  requests carry "a Cursor Token Rate of $0.25 per million tokens" — first-party
  Cursor models (Grok and Composer) are exempt from that rate.
- Cursor **does ship models of its own** (Composer), so it is not a pure router —
  do not describe it as selecting only upstream provider models.
- **The pricing table is the index, not the description.** Default-visible rows link
  to a per-model page under `cursor.com/docs/models/<slug>` (e.g.
  `cursor-composer-2-5`, `grok-4-6`, `claude-fable-5-1`, `gpt-5-6-sol`), and that is
  where the prose lives — capability description, strengths, tool access, and the
  fast/standard split. Read the per-model page before quoting a description; the
  pricing page carries rates and short caveats only. Rows marked "Hidden by default" appear only in the page's `.md` twin, not the server-rendered HTML — diff the twin.
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
