# Claude / Claude Code — model lineup

Official source: https://docs.anthropic.com/en/docs/about-claude/models/overview
(301-redirects to `platform.claude.com/docs/en/models/overview` — same official doc)
Last reviewed: 2026-09-14 (verified live against the official models overview)

## Current shipping models

| Family | Model id | Reasoning | Notes |
|---|---|---|---|
| Claude Fable 5.1 | `claude-fable-5-1` | adaptive thinking (always on) | "For demanding reasoning and long-horizon agentic work, or when your evals on Claude Opus 5 at higher effort still fall short." $10/$50 per MTok; 1M context; knowledge cutoff Jun 2026. Supersedes Fable 5, which moved to the legacy row below (2026-09-11). |
| Claude Opus 5 | `claude-opus-5` | adaptive thinking; `effort` defaults to `high` on the Claude API and Claude Code | The page's start-here recommendation "for most workloads" (updated wording — previously "for complex agentic coding and enterprise work", still the per-model description on the compare table). $5/$25 per MTok; knowledge cutoff May 2026. Supersedes Opus 4.8 (see the page's "Migrating to Claude Opus 5" guide). |
| Claude Sonnet 5 | `claude-sonnet-5` | adaptive thinking; `effort` defaults to `high` on the Claude API and Claude Code | Balanced tier; supersedes Sonnet 4.6. 1M context. $2/$10 per MTok on the models overview (no promotional end date is stated there). |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` (alias `claude-haiku-4-5`) | extended thinking | Low-latency / low-cost tier. 200k context. |

- The current generation uses **adaptive thinking** (Fable 5.1: always on); Haiku
  4.5 is the one current model still on **extended thinking**. The
  `effort` / `ultracode` labels remain a **Claude Code / caller-layer** selector,
  not distinct vendor model ids — the CLI reference documents `--effort` with the
  named options `low`, `medium`, `high`, `xhigh`, `max`, `ultracode`.
- **Documented but not generally available:** Claude Mythos 5.1
  (`claude-mythos-5-1`), "the current Mythos model" — Project Glasswing's
  invitation-only defensive-cybersecurity model, no self-serve sign-up, access via
  an Anthropic, AWS, or Google Cloud account team; it "shares Claude Fable 5.1's
  specifications and pricing"
  (<https://platform.claude.com/docs/en/models/mythos-5-1/overview>). Claude
  Mythos 5 (`claude-mythos-5`) keeps its own page
  (<https://platform.claude.com/docs/en/models/mythos-5/overview>), which names
  Mythos 5.1 as current. Claude Mythos Preview (`claude-mythos-preview`) is
  **deprecated**, with `claude-mythos-5` as its migration target
  (model-deprecations page). Do not list any Mythos id as a spawnable id in
  downstream catalogs.
- Every current model id is a **pinned snapshot**: from the 4.6 generation onward
  the ids use a dateless format that is still a pinned snapshot, not an evergreen
  pointer (Haiku 4.5 keeps its dated `-20251001` form).

## Retired / superseded

| Model | Status | Replaced by |
|---|---|---|
| `claude-fable-5` (Fable 5) | legacy (still available, 2026-09-11) | `claude-fable-5-1` |
| `claude-opus-4-8` (Opus 4.8) | legacy (still available; `effort` defaults to `high` on the Claude API) | `claude-opus-5` |
| `claude-opus-4-7` (Opus 4.7) | legacy (still available, migration recommended) | current Opus. Fully removed from the Kuma Studio spawnable catalog 2026-07-02. |
| `claude-sonnet-4-6` (Sonnet 4.6) | legacy | `claude-sonnet-5` |
| `claude-opus-4-6`, `claude-sonnet-4-5-20250929`, `claude-opus-4-5-20251101` | legacy | current-generation equivalents |
| `claude-opus-4-1-20250805` (Opus 4.1) | **retired 2026-08-05** | `claude-opus-4-8` (the model-deprecations page's recommended replacement; Opus 4.8 is itself legacy → `claude-opus-5`) |

## Boundaries

- **Pricing / limits:** see the `claude-api` skill and Anthropic pricing docs — not
  duplicated here.
- **Spawnable catalog:** `packages/shared/team.json` in kuma-studio is the
  downstream consumer that syncs these ids; it is not the vendor source of truth.
