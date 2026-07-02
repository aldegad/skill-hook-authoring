# Claude / Claude Code — model lineup

Official source: https://docs.anthropic.com/en/docs/about-claude/models/overview
Last reviewed: 2026-07-02

## Current shipping models

| Family | Model id | Reasoning / effort | Notes |
|---|---|---|---|
| Claude Opus 4.8 | `claude-opus-4-8` | extended thinking; Claude Code exposes effort tiers (`high` / `medium` / `xhigh`, plus `max`) | Most capable tier. `[1m]` long-context variant selectable in Claude Code. |
| Claude Sonnet 5 | `claude-sonnet-5` | extended thinking / effort | Balanced tier; supersedes Sonnet 4.6. |
| Claude Haiku 4.5 | `claude-haiku-4-5` | fast tier | Low-latency / low-cost tier. |
| Claude Fable 5 | `claude-fable-5` | effort tiers as above | Ships across effort tiers in Claude Code. |

- The Claude 5 family, Opus 4.8, and Haiku 4.5 are the current generation.
- Reasoning is delivered via **extended thinking**; the numeric `effort` /
  `ultracode` labels are a **Claude Code / caller-layer** selector, not a distinct
  vendor model — keep effort tiers described here as "as the CLI exposes them" and
  do not present them as separate model ids.

## Retired / superseded

| Retired model | Replaced by | Notes |
|---|---|---|
| `claude-opus-4-7` (Claude Opus 4.7) | `claude-opus-4-8` | Fully removed from the Kuma Studio spawnable catalog 2026-07-02. |
| `claude-sonnet-4-6` (Claude Sonnet 4.6) | `claude-sonnet-5` | Superseded by Sonnet 5. |

## Boundaries

- **Pricing / limits:** see the `claude-api` skill and Anthropic pricing docs — not
  duplicated here.
- **Spawnable catalog:** `packages/shared/team.json` in kuma-studio is the
  downstream consumer that syncs these ids; it is not the vendor source of truth.
- **Exact model id suffixes** (dated snapshots such as `-20251001`) are documented
  in the Anthropic models overview; when a caller needs a pinned snapshot, cite the
  official page rather than assuming a suffix here.
