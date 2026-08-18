# Hermes Agent (Nous Research) — model lineup

Official source: https://hermes-agent.nousresearch.com
Last reviewed: 2026-08-19 — **reviewed, not verified.** The lineup below stays
**`unverified this run`**: the official Hermes docs document **no model lineup**.
Concrete ids appear only as illustrative config examples (e.g.
`anthropic/claude-opus-4.6`, `openai/gpt-5`, `google/gemini-3-flash-preview`
under `auxiliary:` / `reasoning_overrides:` on the configuration page), never as
a Hermes-owned catalog, and none of the router ids below appear in the docs —
the surrounding prose is "Works with Nous Portal, OpenRouter, OpenAI, or any
endpoint" plus unversioned references to Nous models (Hermes, Nomos, Psyche).
The router ids here are therefore Kuma-catalog-seeded and
**vendor-unverifiable** — re-checking the vendor doc cannot promote them to
verified.

## Current router models (seed — verify against official docs)

Hermes runs as a **multi-provider router** (`--provider nous`): the model id is a
`provider/model` path, not a Hermes-owned model. Seeded from the Kuma catalog:

| Router model id | Upstream |
|---|---|
| `deepseek/deepseek-v4-pro` | DeepSeek V4 Pro |
| `openai/gpt-5.5-pro` | OpenAI GPT-5.5 Pro |
| `google/gemini-3.1-pro-preview` | Google Gemini 3.1 Pro (preview) |
| `google/gemini-3.5-flash` | Google Gemini 3.5 Flash |
| `qwen/qwen3.7-max` | Qwen 3.7 Max |
| `moonshotai/kimi-k2.6` | Moonshot Kimi K2.6 |
| `x-ai/grok-4.3` | xAI Grok 4.3 |

- The reasoning / effort taxonomy is per-upstream and `not documented` at the
  Hermes router layer beyond the provider's own; do not infer it.
- Headless launch is `hermes chat -q` (see `docs/cli-invocation.md`); history is
  in SQLite `~/.hermes/state.db` (see **Session Resume**).

## Retired / superseded

- `unverified this run` — the router list changes as providers rotate; confirm
  additions/removals against the official Hermes docs each run.

## Boundaries

- **Pricing / limits:** per-provider via the Nous router; see Hermes docs.
- **Spawnable catalog:** kuma-studio `team.json` `hermes-*` entries are the
  downstream consumer of this router list.
