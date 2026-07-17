# OpenAI Codex — model lineup

Official source: https://learn.chatgpt.com/docs/models
(moved 2026-07-16 — `developers.openai.com/codex/models` now 308-redirects here,
along with the rest of the Codex doc set)
Last reviewed: 2026-07-18 (verified live against the official Codex models page)

## Current shipping models

| Model id | Selection | Notes |
|---|---|---|
| `gpt-5.6` | `codex --model gpt-5.6`; `model = "gpt-5.6"` | The bare family id. Shown by the models page only as a CLI example (`codex -m gpt-5.6`) — the page does not label it a default selector, so do not assert that. |
| `gpt-5.6-sol` | `codex -m gpt-5.6-sol` | Flagship GPT-5.6 model for complex coding, computer use, research, and cybersecurity; default Power uses Sol with medium reasoning. |
| `gpt-5.6-terra` | `codex -m gpt-5.6-terra` | Balanced GPT-5.6 model for everyday work; the page says it is a natural starting point for work previously given to GPT-5.5. |
| `gpt-5.6-luna` | `codex -m gpt-5.6-luna` | Fast, affordable GPT-5.6 model for clear, repeatable tasks such as extraction, classification, transformation, and structured summaries. |
| `gpt-5.5` | `codex -m gpt-5.5` | Previous-generation frontier model for complex coding, computer use, knowledge work, and research workflows. |
| `gpt-5.3-codex-spark` | `codex -m gpt-5.3-codex-spark` | Text-only **research preview** optimized for near-instant, real-time coding iteration; available to ChatGPT Pro users. |
| `gpt-5.4` | `codex -m gpt-5.4` | Other model: frontier model for professional work with strong coding, reasoning, tool use, and agentic workflow capabilities. |
| `gpt-5.4-mini` | `codex -m gpt-5.4-mini` | Other model: fast, efficient mini model for responsive coding tasks and subagents. |

- Availability is shown per surface on the models page. Static text extraction
  lists the same surface labels for each model but does not preserve icon state,
  so do not infer an availability matrix from text-only fetches. The page still
  says you cannot change the default model for Codex cloud tasks.
- Reasoning effort is documented as a selector: Low, Medium (default), High,
  Extra High, Max, and Ultra. The page says there is no exact mapping from GPT-5.5
  reasoning efforts to GPT-5.6; try familiar tasks at a lower setting and adjust.
- `model_reasoning_effort` and `service_tier` remain config knobs documented in
  the Codex config docs; service-tier tables are `not documented` on the models
  page.
- The **headless** launch is `codex exec` (see `docs/cli-invocation.md`); model
  selection is `-m <model>` / `codex exec --model` (shown on the models page).

## Retired / superseded

- `gpt-5.2` and `gpt-5.3-codex` are **deprecated** in Codex when signing in with
  ChatGPT. The page gives no one-to-one replacement mapping — its guidance is to
  update scripts, config files, and `codex exec --model` commands to the latest
  models listed above.

## Boundaries

- **Pricing / rate limits:** OpenAI pricing docs — not duplicated here.
- **Spawnable catalog:** kuma-studio `team.json` `modelCatalog` is the downstream
  consumer; note it does not yet carry `gpt-5.4` (new in the vendor lineup) —
  catalog sync happens in the kuma-studio repo, not here.
