# OpenAI Codex — model lineup

Official source: https://learn.chatgpt.com/docs/models
(moved 2026-07-16 — `developers.openai.com/codex/models` now 308-redirects here,
along with the rest of the Codex doc set)
Last reviewed: 2026-08-24 (verified live against the official Codex models page)

## Current shipping models

| Model id | Selection | Notes |
|---|---|---|
| `gpt-5.6-sol` | `codex -m gpt-5.6-sol` | Flagship GPT-5.6 model for complex coding, computer use, research, and cybersecurity; default Power uses Sol with medium reasoning. |
| `gpt-5.6-terra` | `codex -m gpt-5.6-terra` | Balanced GPT-5.6 model for everyday work; the page says it is a natural starting point for work previously given to GPT-5.5. |
| `gpt-5.6-luna` | `codex -m gpt-5.6-luna` | Fast, affordable GPT-5.6 model for clear, repeatable tasks such as extraction, classification, transformation, and structured summaries. |
| `gpt-5.5` | `codex -m gpt-5.5` | Previous-generation frontier model for complex coding, computer use, knowledge work, and research workflows. |
| `gpt-5.3-codex-spark` | `codex -m gpt-5.3-codex-spark` | Text-only **research preview** optimized for near-instant, real-time coding iteration; available to ChatGPT Pro users. |
| `gpt-5.4` | `codex -m gpt-5.4` | Other model: frontier model for professional work with strong coding, reasoning, tool use, and agentic workflow capabilities. **Retires from Codex on 2026-08-31** when signing in with ChatGPT. |
| `gpt-5.4-mini` | `codex -m gpt-5.4-mini` | Other model: fast, efficient mini model for responsive coding tasks and subagents. **Retires from Codex on 2026-08-31** when signing in with ChatGPT. |

- The models page lists exactly the seven ids above. The bare family id `gpt-5.6`
  appears only as example shorthand (`codex --model gpt-5.6`,
  `codex exec -m gpt-5.6`, and config `model = "gpt-5.6"`), not as a listed
  model id — do not treat it as a documented selector.
- Availability is shown per surface on the models page. Static text extraction
  lists the same surface labels for each model but does not preserve icon state,
  so do not infer an availability matrix from text-only fetches. The page still
  says you can't change the default model for Codex cloud chats.
- Reasoning effort is documented as a selector: Low, Medium (default), High,
  Extra High, Max, and Ultra. The page says there is no exact mapping from GPT-5.5
  reasoning efforts to GPT-5.6; try familiar tasks at a lower setting and adjust.
  The lowest tier is surface-named: "Light" in the ChatGPT desktop app / web /
  IDE extension, "Low" in the CLI. Max must be enabled in app settings; Ultra
  "uses subagents" behind a Settings > Configuration toggle.
- `model_reasoning_effort` and `service_tier` remain config knobs documented in
  the Codex config docs; service-tier tables are `not documented` on the models
  page.
- The **headless** launch is `codex exec` (see `docs/cli-invocation.md`); model
  selection is `-m <model>` / `codex exec --model` (shown on the models page).

## Retired / superseded

- **`gpt-5.4` and `gpt-5.4-mini` retire from Codex on August 31, 2026** when
  signing in with ChatGPT. Replace `gpt-5.4` with `gpt-5.6-terra` and
  `gpt-5.4-mini` with `gpt-5.6-luna` in saved configurations, custom agents, and
  scheduled tasks. The OpenAI API and Codex authenticated with an API key are
  not affected by this Codex-with-ChatGPT retirement.
- `gpt-5.2` and `gpt-5.3-codex` are **already deprecated** in Codex when signing
  in with ChatGPT. The page gives no one-to-one replacement mapping for those —
  its guidance is to update scripts, config files, and `codex exec --model`
  commands to the latest models listed above.

## Boundaries

- **Pricing / rate limits:** OpenAI pricing docs — not duplicated here.
- **Spawnable catalog:** kuma-studio `team.json` `modelCatalog` is the downstream
  consumer; catalog sync happens in the kuma-studio repo, not here.
