# OpenAI Codex — model lineup

Official source: https://learn.chatgpt.com/docs/models
(moved 2026-07-16 — `developers.openai.com/codex/models` now 308-redirects here,
along with the rest of the Codex doc set)
Last reviewed: 2026-09-18 (verified live against the official Codex models page)

## Current shipping models

| Model id | Selection | Notes |
|---|---|---|
| `gpt-6-astra` | `codex -m gpt-6-astra` | GPT-6 generation flagship, positioned above the GPT-5.6 family: "Our most capable model for complex work across code, apps, and research, combining advanced reasoning, computer use, and stronger judgment." Available on ChatGPT desktop/web, Codex CLI, Codex IDE extension, ChatGPT Credits, and API access — **not** Codex cloud ("Availability depends on the rollout, your sign-in method, and your client."). |
| `gpt-5.6-sol` | `codex -m gpt-5.6-sol` | "The most capable GPT-5.6 model for complex coding, computer use, research, and cybersecurity." |
| `gpt-5.6-terra` | `codex -m gpt-5.6-terra` | Balanced GPT-5.6 model for everyday work; the page says it is a natural starting point for work previously given to GPT-5.5. |
| `gpt-5.6-luna` | `codex -m gpt-5.6-luna` | Fast, affordable GPT-5.6 model for clear, repeatable tasks such as extraction, classification, transformation, and structured summaries. |
| `gpt-5.5` | `codex -m gpt-5.5` | Other model: "Previous-generation flagship model. Retires from ChatGPT, ChatGPT Work, and Codex on October 14, 2026; remains available on the OpenAI API." See Retired / superseded below. Like `gpt-5.4` / `gpt-5.4-mini` it sits under **Other models**, behind the page's "View other models" toggle — not among the five Recommended models. |
| `gpt-5.3-codex-spark` | `codex -m gpt-5.3-codex-spark` | Text-only **research preview** optimized for near-instant, real-time coding iteration; available to ChatGPT Pro users. |
| `gpt-5.4` | `codex -m gpt-5.4` | Other model: flagship model for professional work with strong coding, reasoning, tool use, and agentic workflow capabilities. The page's stated ChatGPT-sign-in retirement date (2026-08-31) has passed, but the id is still listed. |
| `gpt-5.4-mini` | `codex -m gpt-5.4-mini` | Other model: fast, efficient mini model for responsive coding tasks and subagents. The page's stated ChatGPT-sign-in retirement date (2026-08-31) has passed, but the id is still listed. |

- The models page lists exactly the eight ids above, split into two groups: five
  under **Recommended models** (`gpt-6-astra`, `gpt-5.6-sol`, `gpt-5.6-terra`,
  `gpt-5.6-luna`, `gpt-5.3-codex-spark`) and three under **Other models**
  (`gpt-5.5`, `gpt-5.4`, `gpt-5.4-mini`). The bare family id `gpt-5.6`
  appears only as example shorthand (`codex --model gpt-5.6`,
  `codex exec -m gpt-5.6`, and config `model = "gpt-5.6"`), not as a listed
  model id — do not treat it as a documented selector.
- Availability is shown per surface on the models page. Static text extraction
  lists the same surface labels for each model but does not preserve icon state,
  so do not infer an availability matrix from text-only fetches — read the page's `.md` twin (`https://learn.chatgpt.com/docs/models.md`), whose per-surface `value: true|false` flags carry it. The page still
  says you can't change the default model for Codex cloud chats.
- Reasoning effort is documented as a selector: Low, Medium, High,
  Extra High, Max, and Ultra (the page says to "Start with the default effort"
  but does not name which tier is the default). The page says there is no exact mapping from GPT-5.5
  reasoning efforts to GPT-5.6; try familiar tasks at a lower setting and adjust.
  The lowest tier is surface-named: "Light" in the ChatGPT desktop app / web /
  IDE extension, "Low" in the CLI. Max must be enabled in app settings; Ultra
  "uses subagents" behind a Settings > Configuration toggle.
- Power settings: the page says to "Start with the default Power setting available to your account"; for eligible Pro, Business ($100), and Enterprise accounts the Astra rollout updates the Power options to Terra Light, Sol Light, Sol Medium, Astra Light, Astra Medium, and Astra Extra High ("Options can differ by plan and rollout stage").
- Experimental context management (Astra keeps notes across context windows):
  opt in with `features.context_management.experimental_mode = true` in
  `config.toml`; off by default, ChatGPT Plus/Pro sign-in only, not available
  with Business, Enterprise, or API-key sign-in at launch.
- `model_reasoning_effort` and `service_tier` remain config knobs documented in
  the Codex config docs; service-tier tables are `not documented` on the models
  page.
- The **headless** launch is `codex exec` (see `docs/cli-invocation.md`); model
  selection is `-m <model>` / `codex exec --model` (shown on the models page).

## Retired / superseded

- **`gpt-5.5`** (retiring): "On October 14, 2026, GPT-5.5 will retire from ChatGPT,
  ChatGPT Work, and Codex on all plans" (consumer, Business, Enterprise, and
  Edu). Before that date, Codex with ChatGPT sign-in should switch to
  `gpt-5.6-sol` — replace `gpt-5.5` in workspace defaults, saved model settings,
  managed configurations, custom agents, scheduled tasks, and scripts that
  select a model. The retirement does not apply to the OpenAI API. The id stays
  listed under Other models until then.
- **`gpt-5.4` and `gpt-5.4-mini`**: the page still states they "retire from Codex
  on August 31, 2026" with ChatGPT sign-in; that date has passed and both ids
  remain listed under Other models (as of 2026-09-18). Replace `gpt-5.4` with `gpt-5.6-terra` and
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
