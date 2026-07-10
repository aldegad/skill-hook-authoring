# Claude / Claude Code — model lineup

Official source: https://docs.anthropic.com/en/docs/about-claude/models/overview
(301-redirects to `platform.claude.com/docs/en/about-claude/models/overview` — same official doc)
Last reviewed: 2026-07-11 (verified live against the official models overview)

## Current shipping models

| Family | Model id | Reasoning | Notes |
|---|---|---|---|
| Claude Fable 5 | `claude-fable-5` | adaptive thinking (always on) | Most capable widely released model; next-generation intelligence for long-running agents. 1M context. |
| Claude Opus 4.8 | `claude-opus-4-8` | adaptive thinking; `effort` defaults to `high` on all surfaces (API, Claude Code, claude.ai) | Complex agentic coding / enterprise tier. 1M context. `[1m]` long-context variant selectable in Claude Code. |
| Claude Sonnet 5 | `claude-sonnet-5` | adaptive thinking; `effort` defaults to `high` on the API and Claude Code | Balanced tier; supersedes Sonnet 4.6. 1M context. |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` (alias `claude-haiku-4-5`) | extended thinking | Low-latency / low-cost tier. 200k context. |

- The current generation uses **adaptive thinking** (Fable 5: always on); Haiku
  4.5 is the one current model still on **extended thinking**. The numeric
  `effort` / `ultracode` labels remain a **Claude Code / caller-layer** selector,
  not distinct vendor model ids — describe effort tiers as "as the CLI exposes
  them".
- **Documented but not generally available:** Claude Mythos 5 (`claude-mythos-5`)
  and Claude Mythos Preview (`claude-mythos-preview`) — invitation-only, limited
  availability to approved customers in Project Glasswing (defensive cybersecurity
  workflows; no self-serve sign-up). Mythos 5 shares Fable 5's specs. Do not list
  these as spawnable ids in downstream catalogs.
- Every current model id is a **pinned snapshot**: from the 4.6 generation onward
  the ids use a dateless format that is still a pinned snapshot, not an evergreen
  pointer (Haiku 4.5 keeps its dated `-20251001` form).

## Retired / superseded

| Model | Status | Replaced by |
|---|---|---|
| `claude-opus-4-7` (Opus 4.7) | legacy (still available, migration recommended) | `claude-opus-4-8`. Fully removed from the Kuma Studio spawnable catalog 2026-07-02. |
| `claude-sonnet-4-6` (Sonnet 4.6) | legacy | `claude-sonnet-5` |
| `claude-opus-4-6`, `claude-sonnet-4-5-20250929`, `claude-opus-4-5-20251101` | legacy | current-generation equivalents |
| `claude-opus-4-1-20250805` (Opus 4.1) | **deprecated — retires 2026-08-05** | current Opus |

## Boundaries

- **Pricing / limits:** see the `claude-api` skill and Anthropic pricing docs — not
  duplicated here.
- **Spawnable catalog:** `packages/shared/team.json` in kuma-studio is the
  downstream consumer that syncs these ids; it is not the vendor source of truth.
