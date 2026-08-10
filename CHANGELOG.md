# Changelog

All notable changes to the `skill-hook-authoring` package. This repo has no
package manifest, so the **git tag plus this file are the version record**
(the official Claude SKILL.md frontmatter documents only `name` and
`description`, so the version is intentionally not stamped there).

## Unreleased — 2026-08-11

Daily refresh (verification fetched 2026-08-11; all 66 sources reachable, none unverified this run). Time-sensitive stamps advanced and two post-cutoff facts reconciled.

### Changed

- **Claude Opus 4.1 retired.** The previously documented 2026-08-05 retirement date has passed; `claude-opus-4-1-20250805` no longer appears on the current models overview, and Opus 5 remains the migration target.
- **Gemini model page advanced.** The official page now reports `Last updated 2026-08-05` and lists Gemini Robotics ER 2 (`gemini-robotics-er-2-preview`); the main Gemini 3 lineup remains unchanged.
- **Billing status remains paused.** The June 15 Agent SDK notice still says Agent SDK, `claude -p`, and third-party app usage draw from subscription limits; the separate monthly credit remains unavailable, and the `ANTHROPIC_API_KEY` API-billing caveat remains present.
- **Model lineups re-verified.** Claude, Codex, Grok, Cursor, and Gemini/Antigravity match their official model pages. Hermes still has no official lineup and remains `unverified this run`; model and billing freshness stamps advanced to 2026-08-11.
- **Antigravity SPA pages re-rendered.** The reference, conversations, resume, migration, plugins, usage, install, headless, and SDK pages retain their documented surfaces; the site banners now show Antigravity CLI v1.1.11 and SDK v0.1.10.

## Unreleased — 2026-08-03

Daily refresh (verification fetched 2026-08-03; all 66 sources reachable, none unverified this run). One announced Codex retirement recorded; remaining claims re-verified.

### Changed

- **Codex: GPT-5.4 / GPT-5.4 mini retire from Codex on 2026-08-31.** When signing in with ChatGPT, replace `gpt-5.4` with `gpt-5.6-terra` and `gpt-5.4-mini` with `gpt-5.6-luna` in saved configurations, custom agents, and scheduled tasks. The OpenAI API and Codex authenticated with an API key are not affected. Mirrored in `docs/models/codex.md`, `SKILL.md`, and the `openai-codex-model-lineup` source claims.
- **Billing status remains paused.** The June 15 Agent SDK support banner still says Agent SDK, `claude -p`, and third-party app usage draw from subscription limits; the separate monthly credit remains unavailable. The `ANTHROPIC_API_KEY` API-billing caveat was re-confirmed. Stamps advanced in `docs/cli-invocation.md` and `docs/cloud-automation.md`.
- **Model lineups re-verified.** Claude, Grok, Cursor, and Gemini/Antigravity remain otherwise unchanged. Hermes still has no official lineup and remains `unverified this run`. `Last reviewed:` stamps advanced across `docs/models/*`.
- **Cursor skills page re-verified** (built-in `/automate` table and frontmatter fields still match).
- **Antigravity SPA pages re-rendered** via `kuma agent-browser` (headless, reference, resume). Sidebar now shows Antigravity CLI **v1.1.9** (was v1.1.8 on 2026-07-31); documented headless flags (`-p`, `--output-format`, `--json-schema`, `--effort`, `--print-timeout`, `--sandbox`, `-c`/`--conversation`, soft-deny, etc.) remain unchanged.
- **Claude Opus 4.1** remains deprecated, retiring 2026-08-05 (unchanged; two days out as of this run).

## Unreleased — 2026-07-31

Daily refresh (verification fetched 2026-07-31; all 66 sources reachable, none unverified this run). One model-summary omission corrected; remaining claims unchanged.

### Changed

- **Antigravity CLI model sample completed.** The dynamically rendered headless-mode page lists `gemini-3.5-flash-medium` and `gemini-3.1-pro-high` alongside the already recorded `gemini-3.6-flash-high`, `gemini-3.6-flash-medium`, and `claude-sonnet-4-6`; the two omitted CLI-surface slugs are now mirrored in `SKILL.md` and `docs/models/gemini-antigravity.md`.
- **Billing status remains paused.** The June 15 notice still says Agent SDK, `claude -p`, and third-party app usage draw from subscription limits, and the separate monthly credit remains unavailable. The API-key billing caveat was re-confirmed.
- **Model lineups re-verified.** Claude, Codex, Grok, Cursor, and Gemini/Antigravity remain otherwise unchanged. Hermes still has no official lineup and remains `unverified this run`; model and billing freshness stamps advanced.
- **Antigravity SPA pages re-rendered.** The CLI v1.1.8 reference, conversations, resume, migration, plugins, usage, install, headless, and SDK pages retain their documented surfaces.

## Unreleased — 2026-07-30

Daily refresh (verification fetched 2026-07-30; all 66 sources re-verified, none unverified this run). No structural drift; freshness stamps only.

### Changed

- **Billing status remains paused.** The official Agent SDK support page still opens with the June 15 pause notice, so `claude -p`, Agent SDK, and third-party app usage continue to draw from subscription usage limits; the separate monthly credit remains unavailable. The `ANTHROPIC_API_KEY` API-billing caveat was also re-confirmed. Stamps advanced in `docs/cli-invocation.md` and `docs/cloud-automation.md`.
- **Model lineups re-verified unchanged.** Claude, Codex, Grok, Cursor, and Gemini/Antigravity still match their official model pages. Hermes still has no official lineup and remains `unverified this run`. `Last reviewed:` stamps advanced across `docs/models/*`.
- **Antigravity SPA pages re-rendered.** The CLI reference, conversations, resume, migration, plugins, settings, install, headless, and SDK pages retain the documented surfaces mirrored by this repo.

## Unreleased — 2026-07-29

Daily refresh (verification fetched 2026-07-29; all 66 sources re-verified, none
unverified this run). No major drifts; a cluster of minor additive ones plus
freshness stamps.

### Changed

- **Gemini 3.6 Flash reached the API models page as a Stable model**
  (`gemini-3.6-flash`, now also the page's stable-id naming example, replacing
  `gemini-3.5-flash` in that role); new Stable `gemini-3.5-flash-lite`; preview
  ids now carry explicit `-preview` suffixes (`gemini-3.1-pro-preview`,
  `gemini-3-flash-preview`, Antigravity Agent `antigravity-preview-05-2026`) —
  this resolves the CLI-vs-API lineup discrepancy flagged 2026-07-21/28: only the
  `-high`/`-medium` effort slugs remain CLI-surface-only. Page last-updated
  2026-07-21. `docs/models/gemini-antigravity.md`, `SKILL.md`, manifest.
- **Codex skills gained a documented per-skill disable toggle**: `[[skills.config]]`
  in `~/.codex/config.toml` with `enabled = false` — Codex split out of the
  no-toggle cell in `docs/skill-lifecycle.md` (Hermes stays).
- **Codex hooks**: event list gained `SessionEnd`, and the page now states "Hooks
  are enabled by default" (disable via `[features] hooks = false`) — the opt-in
  framing is retired. `docs/compatibility-matrix.md`, `docs/completion-stack.md`.
- **Grok May-15 retirement page completed its redirect table**: `grok-4-0709` →
  `grok-4.3` (low effort) and `grok-3` → `grok-4.3` (none) — all eight retired ids
  now have explicit per-id redirects; redirected requests bill $1.25/$2.50 per
  MTok. `docs/models/grok.md`, manifest.
- **Cursor Automations are now officially referenced**: the skills page carries a
  ~19-row built-in-skills table including `/automate` ("Creates Cursor Automations
  triggered by schedules, Slack messages, GitHub events, and other sources") —
  the matrix automation cell's external-scheduler hedge is retired.
- **Claude Code**: `claude setup-token` is now documented on the CLI reference
  (the "unverified this run" caveat in `docs/cli-invocation.md` is cleared);
  `skillOverrides` now has three states (`"off"`, `"name-only"`), cycled via the
  `/skills` menu into `.claude/settings.local.json`, with plugin skills excluded
  (`docs/skill-lifecycle.md`); the models page adds that Mythos 5 shares Fable 5's
  pricing as well as specs.
- **Antigravity headless page** gained `--sandbox` (default false; launch override
  of `enableTerminalSandbox`). `docs/cli-invocation.md`, `SKILL.md`, manifest.
- Minor: Hermes gateway hooks gained `reaction:added`/`reaction:removed`;
  `docs/cloud-automation.md` section retitled to "Codex scheduled tasks" to match
  the vendor's dropped "Automations" name.
- Freshness stamps: billing still **paused** (banner verbatim-unchanged,
  re-verified 2026-07-29); Codex/Claude/Cursor model lineups unchanged — stamps
  advanced across `docs/cli-invocation.md`, `docs/cloud-automation.md`,
  `docs/compatibility-matrix.md`, `docs/completion-stack.md`, `docs/models/*`.

## Unreleased — 2026-07-28

Daily refresh (verification fetched 2026-07-28; first pass since 2026-07-21 — the
routine's worktree branch had been held by a stale pre-move worktree, removed this
run). Four major drifts, several minor, plus freshness stamps.

### Changed

- **Claude Opus 5 shipped** (`claude-opus-5`, $5/$25 MTok, adaptive thinking,
  knowledge cutoff May 2026): replaces Opus 4.8 in the current lineup ("start with
  Claude Opus 5 for complex agentic coding and enterprise work"); Opus 4.8 → legacy;
  Opus 4.1's retirement (2026-08-05) now targets Opus 5; Sonnet 5 intro pricing
  $2/$10 through 2026-08-31. `docs/models/claude.md`, `SKILL.md`, manifest.
- **Antigravity CLI gained an official headless mode** — new dedicated page
  `/docs/cli/headless` (registered as `antigravity-cli-headless`): `agy -p/--print/
  --prompt`, `--output-format text|json|stream-json`, `--json-schema`, `--effort`,
  `--print-timeout`, headless `-c`/`--conversation` resume, `agy models`/`agy
  agents`, `permissions.allow` `action(target)` rules, soft-deny semantics. The
  long-standing "TUI-only, SDK for unattended runs" verdict is retired across
  `SKILL.md`, `docs/cli-invocation.md`, `docs/compatibility-matrix.md`, and the
  reference/resume/SDK entry notes. Its `agy models` sample surfaces
  `gemini-3.6-flash-high/-medium` and `claude-sonnet-4-6` — CLI-surface ids not on
  the Gemini API models page.
- **Grok reasoning effort reached the API layer**: the reasoning capability page
  documents `reasoning_effort` for `grok-4.5` (`low`/`medium`/`high`, default
  `high`, cannot be disabled) and the overview now says "configurable reasoning" —
  the old CLI-flag-only distinction is retired. A dedicated retirement page
  (`/developers/migration/may-15-retirement`) lists eight ids retired 2026-05-15
  with redirects (`grok-code-fast-1` → `grok-build-0.1`, …). `--no-auto-update` is
  now documented on the headless-scripting page (flip of the 07-19 removal).
  `docs/models/grok.md`, `docs/cli-invocation.md`, manifest.
- **Cursor models page restructured** as "Models & Pricing" with two usage pools;
  Auto is now three modes (Cost/Balance/Intelligence, Cursor Router on
  Teams/Enterprise) and its old one-sentence description is gone; **Composer 1 no
  longer appears**; lineup extended (Claude Fable 5/Opus 5/Sonnet 5, Gemini
  3.1 Pro/3.5/3.6 Flash, GPT-5.4/5.5, Kimi K3); still no retirement page.
  `docs/models/cursor.md`, `SKILL.md`, manifest.
- **Codex plugin-build page stubbed**: `learn.chatgpt.com/docs/build-plugins` now
  defers to `developers.openai.com/plugins/build/plugins`, where the marketplace
  paths (legacy `.claude-plugin/marketplace.json` still documented — anchor moved,
  not a third flip), cache path, `PLUGIN_ROOT`/`PLUGIN_DATA`, and manifest fields
  (`skills`/`mcpServers`/`hooks` + compatibility `apps`) now live; the plugins
  overview dropped the apps cross-reference ("MCP servers … are the services
  behind connectors"). New `@plugin-creator`/`$plugin-creator` skill.
  `docs/plugin-packaging.md`, manifest.
- **Codex CLI reference flips**: "Use `/goal edit` to revise the objective."
  reproduces again (flip #2 — verified 07-17, gone 07-19, back 07-28); interactive
  `PROMPT` positional typing reverted to plain `string` (stdin `-` only on
  exec/review); `codex fork` positional now typed `uuid` only.
- Minor: GitHub auto-merge page rewritten (repo-enable quote reworded; both
  disable triggers now scoped to a non-write actor in one sentence); Hermes plugin
  discovery table gained a fifth source (Nix `services.hermes-agent.extraPlugins`);
  Hermes overview cron line reworded ("Scheduled automations — …"); Claude
  sessions page dropped `/rewind` (routed to Checkpointing; claim retired);
  `--safe-mode` lost its v2.1.169 tie; `--advisor fable` documented as an error;
  the `@skills-dir` no-walk-up footgun moved from the plugins page to
  plugins-reference (re-anchored); Cursor cli/using resume surface slimmed
  ("thread id" wording; `create-chat`/`--resume=-1` now parameters-page-only);
  bare `gpt-5.6` shorthand now appears in three example shapes; Gemini API models
  page bumped to 2026-07-20 with new Live/TTS/Omni/Nano-Banana/Lyria/Embedding
  entries.
- Freshness stamps advanced to 2026-07-28 on the time-sensitive claims: Agent SDK
  billing change **still paused** (banner verbatim-unchanged; dateline "June 16,
  2026"), `ANTHROPIC_API_KEY` API-billing caveat re-confirmed, G1-credits note,
  and the five model-lineup mirrors re-verified (gajae-code README re-verified:
  MCP absent for the third consecutive reading).

## Unreleased — 2026-07-26

- **New `docs/skill-lifecycle.md`: Disable / Scope / Retire.** The methodology documented
  *registration* (`skills.json`) and *retirement* (full removal) but never **enablement** —
  so "stop showing me this skill" had no documented mechanism and got improvised as
  `engines: {}`, which asserts in the manifest that the skill has no valid runtime. The new
  doc separates the three operations, states the per-engine disable mechanics (Claude
  `skillOverrides: off`, Grok `skills-disabled/`, Codex/Hermes none documented), and records
  that hand-deleting a symlink is not a disable because the installer recreates it.
  `SKILL.md` carries a four-line pointer, not the table.
- **`description` now routes on disable/enable/scope.** Added triggers (스킬 끄기/비활성,
  안 쓰는 스킬 정리, 특정 엔진에서만 / prune unused skills, scope a skill to one engine) and
  trimmed the description from 1176 to 926 chars — it had exceeded the documented 1024 cap,
  which is itself a load failure this package warns about.
- **Stripped six incident narratives from `SKILL.md` bodies** (`Trial-and-error <date>: …`
  parentheticals) per this package's own "Keep history out of doc bodies" rule. The rules
  they annotated are unchanged; the incidents live here.

  Removed narratives, for the record: 2026-07-24 fourteen hand-registered skills plus 21
  Codex `[[skills.config]]` entries had become a second registration channel and were folded
  back into `skills.json`. 2026-05-26 an unquoted `description` containing `Korean triggers:`
  broke skill loading. 2026-06-10 kuma-studio's WorkspaceTerminal `/kuma-plan` interception
  (parser, popover, server route, i18n ×4, tests) shipped validator-passed and was removed the
  same day for the engine-native skill. 2026-05-26 a guard hook shipped `644` and spammed
  `Permission denied` across every live session until chmod'd. 2026-06-09 a `timeout 5 git
  fetch` in a SessionStart/PreToolUse hook silently `command not found`-failed on macOS, so
  the hook never fired. 2026-06-10 `kuma read` / `kuma vault` / `kuma spawn-all` doc mentions
  all outlived their bins.

## Unreleased — 2026-07-24

Umbrella-convention edit (not a vendor-doc refresh): the doc governed skill
registration but never named where the registration data lives, which let two
readers lose the thread three times in one session.

### Added

- **Named the three-layer topology explicitly:** conventions (this skill) →
  manifest (`skills.json`) → installer (`install-local.mjs`) → generated
  symlinks. `skills.json` now appears in Recommended Layout and Core Rules as
  *the* single registration record; hand-symlinking or engine-config entries are
  called out as a second channel that drifts.
- **New Core Rule for build-producing skill repos:** point the manifest `path`
  at the skill subfolder (`<repo>/skills/<name>/`), not the repo root, so a
  build cache (`target/`, `node_modules/`, `dist/`) stays out of the runtime
  skill-scan root. Codex aborts with `skills scan reached its traversal limit`
  when a skill folder is oversized; `kordoc` is the standing precedent, `katok`
  the case that surfaced it.
- Refreshed the Recommended Layout tree examples (dropped retired
  `content-pipeline` / `npm-reorg-guard`, added `safedeps` / `sprite-gen` /
  `katok` / a `../` sibling-repo entry).

## v1.40 — 2026-07-21

Daily refresh: low-noise, freshness-stamps only. All 65 manifest sources
re-fetched (all 200, no source went `unverified this run`) across six runtimes;
re-verified the two time-sensitive claim classes and advanced their stamps. No
structural fact changed, nothing added or retired.

### Changed

- **Billing (Claude Agent SDK / `claude -p`) — still paused, stamp advanced to
  2026-07-21.** Re-fetched the support page; the "Update June 15" pause banner is
  verbatim-unchanged (Agent SDK, `claude -p`, and third-party app usage still
  draw from the subscription usage limits; the announced monthly credit remains
  unavailable). Also re-confirmed verbatim that a present `ANTHROPIC_API_KEY`
  switches Claude Code to API billing. Bumped the `as of`/`verified` dates in
  `cli-invocation.md` (billing caveat, status line, footer, Antigravity G1
  billing), `cloud-automation.md`, and the manifest billing note + claim + Pro/Max
  note.
- **Model lineups — re-verified clean, `Last reviewed:` advanced to 2026-07-21.**
  Claude (`platform.claude.com`), Codex (`learn.chatgpt.com/docs/models`), Grok
  (`docs.x.ai/developers/models`), and Cursor (`cursor.com/docs/models-and-pricing`)
  all match the recorded ids/tiers/retirement status with no drift (Fable 5 /
  Opus 4.8 / Sonnet 5 / Haiku 4.5; GPT-5.6 sol/terra/luna + 5.5/5.4/5.4-mini/
  5.3-codex-spark; Grok 4.5; Composer 2.5). Advanced those four `docs/models/*.md`
  stamps and their matching manifest `Verified live` dates per the time-sensitive
  freshness-stamp rule.

### Verified unchanged (no edit)

- Spot-checked the highest-churn mandatory-category pages across all six runtimes
  — Codex `AGENTS.md` discovery + CWD-first skill-root walk + 10 hook events, the
  `.claude-plugin/marketplace.json` legacy path, Claude memory (`CLAUDE.md`
  loading) + expanded hook taxonomy, Grok project-rules (six-name family + walk)
  + `grok` binary (not renamed), Cursor `agent` binary + `-p`/`--print` headless,
  Hermes three-system hook taxonomy + `.hermes.md → AGENTS.md → CLAUDE.md →
  .cursorrules` chain, and gajae-code (community/non-vendor — `--mode rpc` still
  gone, no headless one-shot, no MCP). All match baseline; structural stamps left
  as-is.

### Flagged for next pass (unverified this run — no edit made)

- **Gemini model page discrepancy.** A dynamic render of
  `ai.google.dev/gemini-api/docs/models` this run surfaced the 2.5 family
  (`gemini-2.5-pro`/`-flash`/`-flash-lite`) as current and showed no non-preview
  GA `gemini-3-pro`/`gemini-3.5-pro` id — conflicting with the recorded
  `docs/models/gemini-antigravity.md` lineup (`gemini-3.1-pro` Preview, Gemini 3
  Flash Preview, Antigravity Agent Preview). Single ambiguous extraction; per the
  model-lineup rule (never substitute a guess) the lineup is **left unchanged**
  and its `Last reviewed:` stamp is **not** advanced, pending a clean confirming
  re-verify next pass.
- **Antigravity docs prerendered this run.** `antigravity.google/docs/*` returned
  full crawlable content (static + Playwright-confirmed) rather than an empty JS
  shell. The defensive SPA-caution baseline is **retained** — one run of
  prerendered content is not enough to retire a safety discipline.

## v1.39 — 2026-07-20

`unverified this run`, including the Antigravity SPA pages (Playwright
real-Chrome render) and the JS-heavy Cursor docs. Four of six runtimes were
clean; the drift is concentrated in Codex, which **reversed two facts we had
recorded only yesterday**, plus a batch of Hermes mirror corrections that were
our own errors rather than vendor movement.

### Changed

- **Codex skill roots are a cwd-upward walk again (reversal of v1.38).** The
  build-skills page states: "For repositories, Codex scans `.agents/skills` in
  every directory from your current working directory up to the repository
  root." The location list is six entries — `$CWD/.agents/skills`,
  `$CWD/../.agents/skills`, `$REPO_ROOT/.agents/skills`, `$HOME/.agents/skills`,
  `/etc/codex/skills`, built-in. v1.38 recorded the opposite ("flat four-level
  hierarchy, not a cwd-upward walk"). This claim has now flipped twice, so the
  manifest note tells the next run to re-read the live sentence rather than
  trust either shape.
- **Codex documents the legacy `.claude-plugin/marketplace.json` again
  (reversal).** "The app can read marketplace files from:" now lists four
  locations including "a legacy-compatible marketplace at
  `$REPO_ROOT/.claude-plugin/marketplace.json`" and the curated marketplace
  behind the official Plugins Directory. v1.38 had it as `not documented`.
- **`${PLUGIN_ROOT}` hook-command substitution lost its `unverified this run`
  hedge** — reproduced live on the Codex plugin-build page.
- **Hermes has no control-flow-vs-lifecycle hook taxonomy.** All three Hermes
  pages now present one flat `Hook | Fires when` table, and the plugins page
  calls the whole set "lifecycle events". The "vendor's own two pages disagree"
  caveat we carried is stale — they no longer disagree, because neither
  categorizes. Replaced with the per-invocation vs. once-per-turn reading.
- **`.cursor/rules/*.mdc` removed from the Hermes priority chain (our error).**
  The docs state the chain twice, verbatim: "`.hermes.md` → `AGENTS.md` →
  `CLAUDE.md` → `.cursorrules`". `.mdc` files are recognized (CWD only) but sit
  outside the first-match chain. The compatibility matrix already had this
  right; `SKILL.md` and `docs/plugin-packaging.md` did not.
- **Grok's instruction-file family corrected to six names in
  `plugin-packaging.md` (our error).** That line still carried the old
  three-name list from the skills-plugins aside while every other mirror was
  fixed on 2026-07-17; the dedicated project-rules page is canonical.
- **gajae-code's Coordinator MCP server is undocumented again.** `grep -ci mcp`
  over the README returns 0. It has now appeared and vanished twice (absent
  2026-07-07, present 2026-07-16, absent 2026-07-20).
- **`docs/models/hermes.md` justification corrected.** It claimed the docs "name
  no model ids at all"; the configuration page does name ids, but only as
  illustrative `auxiliary:` / `reasoning_overrides:` config examples, never as a
  Hermes-owned catalog. The `unverified this run` status is unchanged — only the
  reasoning was overstated.

### Added

- **Antigravity billing (G1 credits).** The skill claims billing coverage across
  runtimes but had nothing for Antigravity. `docs/cli-invocation.md` now records
  the `useG1Credits` setting ("Uses personal AI credits for model calls once
  plan quotas are exhausted") and in-session `/credits`, and notes that with no
  headless flag there is no per-run cost capture equivalent to
  `claude --output-format json`.

### Verified unchanged

Claude Code (14 sources), Cursor (6), Grok (7), Antigravity/Gemini (11), and
GitHub (2) produced zero drift. The **2026-06-15 Agent SDK billing change is
still paused** — banner verbatim-unchanged, no newer date on the page — and the
Claude, Codex, Grok, Cursor, and Gemini model lineups all match their mirrors
exactly. Freshness stamps advanced to 2026-07-20 accordingly.

## v1.38 — 2026-07-19

Daily refresh: 65 manifest sources (1 added this run), all fetched successfully.
The opposite of yesterday's stamps-only pass — a heavy drift day across every
runtime. The headline is a **reversal we had been carrying as a hard rule**:
Codex now special-cases the `"*"` matcher exactly like Claude, so the
matcher-syntax divergence that used to silently break a ported hook is gone.
Antigravity's model lineup also came off `unverified this run` for the first
time, and Cursor's CLI binary is now documented under a different name.

### Added

- **Google Gemini model-lineup source — `ai.google.dev/gemini-api/docs/models`.**
  `docs/models/gemini-antigravity.md` had been stamped `unverified this run` with
  ids seeded from a downstream router catalog, because no official Google model
  page was registered. One exists (page last-updated 2026-07-16); registering it
  lifted the unverified status and immediately corrected the file. Same failure
  mode as the Grok gaps closed 2026-07-17 and the `cursor-model-lineup` gap
  caught 2026-07-16 — an official page sitting outside the loop.
- **Cursor row in the Session Resume table.** Cursor resume is fully documented
  (`agent --resume [chatId]`, `--continue` as an alias for `--resume=-1`,
  `agent resume|ls|create-chat`, in-session `/resume`) but the table had no
  Cursor row at all. Store path and chatId format remain `not documented`.
- **A consumer for the orphaned `github-notifications` source.** It was verified
  live every run while no prose in the repo cited it. `cloud-automation.md` now
  uses it for how a reviewer learns the gate left a PR open.

### Changed

- **Codex hook matchers — `"*"` now matches everything (reversal).** The docs
  state verbatim: "Use `"*"`, `""`, or omit `matcher` entirely to match every
  occurrence of a supported event." We had documented the opposite — that a
  literal `"*"` is an invalid regex on Codex that silently matches nothing, so a
  Claude-style hook never fires and you must write `".*"`. That advice and its
  dated 2026-06-09 trial-and-error note are retired. The still-live divergence is
  narrower: `UserPromptSubmit` and `Stop` ignore `matcher` entirely on Codex.
- **Codex hook gap list — two distinct failure modes, not one.** PreToolUse
  `permissionDecision: "ask"` (plus legacy `approve`, `continue: false`,
  `stopReason`, `suppressOutput`) and PostToolUse `updatedMCPToolOutput` mark the
  hook run failed and continue; PermissionRequest's reserved `updatedInput` /
  `updatedPermissions` / `interrupt` **fail closed**. Both were collapsed before.
- **Cursor CLI binary is documented as `agent`, not `cursor-agent`.** The string
  `cursor-agent` no longer appears on the overview or parameters pages. Recorded
  as what the docs document — the rename does not prove the old binary was
  removed. Added `--mode`, `--plan`, worktree flags, `--sandbox`, and the
  `agent acp` / `agent worker` subcommands.
- **Antigravity Gemini lineup — `unverified this run` lifted.** `gemini-3.5-flash`
  was recorded as a low-latency flash tier; it is GA and Google's most intelligent
  model (frontier tier). `gemini-3.1-pro` confirmed Preview. Added
  `gemini-3.1-flash-lite` (GA), Gemini 3 Flash (Preview), and Antigravity Agent
  (Preview). Retirements are now verifiable: Gemini 2.0 Flash, 2.0 Flash-Lite,
  3.1 Flash-Lite Preview, 3 Pro Preview shut down; Imagen 4 deprecated.
- **Grok documents a reasoning-effort flag.** We claimed Grok had no
  caller-configurable effort setting and that the reasoning split was pre-built
  variants only. The CLI reference now lists `--effort <LEVEL>`. The distinction
  that survives: it is a **CLI-layer flag** (levels not enumerated), not a
  model/API parameter — the models page still documents no `reasoning_effort`.
  Also added `--fork-session`, the UUID session-id form, and the cross-runtime
  fact that Grok accepts Claude Code flag names as aliases where they overlap.
  Removed `--no-auto-update`, which no official page documents.
- **Claude `--effort` is named, not numeric** (`low`/`medium`/`high`/`xhigh`/
  `max`/`ultracode`), and **`--from-pr` does not resume** — it opens the session
  picker filtered to PR-linked sessions. Also: hook commands have an exec form
  (`args` set, no shell) and a shell form (`args` omitted), so the flat
  "runs through `/bin/sh`" claim was wrong on Windows; payloads carry `prompt_id`;
  `.claude-plugin/plugin.json` is now optional; resume-by-id searches only the
  current project directory and its git worktrees.
- **Hermes documents a project-local plugin root.** `./.hermes/plugins/` (gated by
  `HERMES_ENABLE_PROJECT_PLUGINS=true`) joins the user, bundled, and pip-entry-point
  roots. Since plugin hooks register via `ctx.register_hook()`, project-local hooks
  now have a documented path — the matrix cell moves off `Partial`. Also added the
  kanban hook events, the `plugin.yaml` field set, six further `ctx.register_*`
  APIs, and the 20,000-char context-file truncation rule.
- **Codex corrections.** Skill roots are a flat four-level hierarchy, not a
  cwd-upward walk. The legacy `.claude-plugin/marketplace.json` path is no longer
  documented (the `CLAUDE_PLUGIN_*` env aliases remain). Sessions resolve by ID
  **or name**, IDs winning. Bare `gpt-5.6` is CLI-example shorthand, not a listed
  model id. Cloud default-model wording is "chats", not "tasks".
- **GitHub auto-merge prerequisites were understated.** Auto-merge must be enabled
  at the **repository** level, the option appears only on PRs that cannot merge
  immediately, and it is disabled if a non-write user pushes to the head branch or
  the base branch is switched. `gh pr merge --auto` is not on that page at all —
  reattributed to `gh` CLI surface rather than to the `github-auto-merge` source.
- **Billing — still paused, stamp advanced to 2026-07-19.** The pause banner is
  verbatim-unchanged (Agent SDK, `claude -p`, and third-party app usage still draw
  from subscription usage limits; the announced monthly credit remains
  unavailable), as is the `ANTHROPIC_API_KEY` caveat. Stamps bumped per the
  time-sensitive freshness rule.
- **`docs/models/kuma-studio.md` reconciled against first-party `team.json`.** The
  file recorded Opus 4.7's removal but never whether `claude-opus-4-8` landed in
  the spawnable catalog — a 17-day gap. It is present (12 entries across the effort
  tiers and `[1m]`). Replaced the dated change-narrative section, which also
  violated the no-history-in-doc-bodies rule, with a catalog-vs-lineup
  reconciliation.

### Verified unchanged (no edit)

- **Every mandatory category re-fetched.** Project-instruction files (Codex
  `AGENTS.md` precedence and 32 KiB cap, Claude `CLAUDE.md` layering, Grok's
  six-name family, Hermes first-match-wins, Cursor's no-walk-up), session resume,
  CLI spawn, billing, and model lineups all re-verified against their own
  runtime's page. Claude's lineup matches the official table exactly.
- **Antigravity has no headless flag.** Re-confirmed by grep across all eight
  dynamically-rendered pages: zero hits for `headless`, `--print`, `-p`, or
  `--output-format`. The SDK remains the documented programmatic path.
- **gajae-code stays community/non-vendor** with every `not documented` verdict
  intact (hooks, plugins, project-instruction loading, session-id resume). Added
  only what the README actually documents: four bundled role agents, and that
  `--worktree` takes a branch-like name rather than a filesystem path.
- **Hermes model lineup stays `unverified this run`** — the official docs name no
  model ids at all, so the router-seeded table cannot be vendor-verified. The stamp
  now says "reviewed, not verified" and records why, so a bare date bump can never
  read as verification.
- `check-official-sources.mjs` PASS (65 sources, all 200).

## v1.37 — 2026-07-18

Daily refresh: low-noise, freshness-stamps only. Re-verified the two
time-sensitive claim classes against their official pages and advanced their
stamps to today; no structural fact changed, nothing added or retired.

### Changed

- **Billing (Claude Agent SDK / `claude -p`) — still paused, stamp advanced to
  2026-07-18.** Re-fetched the support page; the "Update June 15" pause banner is
  verbatim-unchanged (Agent SDK, `claude -p`, and third-party app usage still
  draw from the subscription usage limits; the announced monthly credit remains
  unavailable). Bumped the `as of`/`verified` dates in `cli-invocation.md`,
  `cloud-automation.md`, and the manifest billing note + claim.
- **Model lineups — re-verified, `Last reviewed:` advanced to 2026-07-18.**
  Claude (`platform.claude.com`), Codex (`learn.chatgpt.com/docs/models`), Grok
  (`docs.x.ai/developers/models`), and Cursor (`cursor.com/docs/models-and-pricing`)
  all match the recorded ids/tiers/retirement status with no drift (Fable 5 /
  Opus 4.8 / Sonnet 5 / Haiku 4.5; GPT-5.6 sol/terra/luna; Grok 4.5; Composer 2.5).
  Advanced the four `docs/models/*.md` stamps and the matching manifest
  `Verified live` dates per the time-sensitive freshness-stamp rule.

### Verified unchanged (no edit)

- Spot-checked the highest-churn mandatory-category pages — Codex `AGENTS.md`
  discovery, Grok project-rules (six-name family + walk), Claude memory
  (`CLAUDE.md` loading mechanics) — all match baseline. Structural stamps
  (e.g. `completion-stack.md`) left as-is, since re-confirming a stable fact does
  not advance its stamp. `check-official-sources.mjs` PASS (64 sources, all 200).

Daily refresh: 63 manifest sources (2 added this run) fetched successfully; all
200. Antigravity re-rendered dynamically (code blocks hydrated correctly again).
Billing still paused. The big one: **Grok's two mandatory categories had no
source at all**, and closing that gap corrected a factual error we had been
carrying.

### Added

- **Grok project-instructions source — `docs.x.ai/build/features/project-rules`.**
  Grok was the only tracked runtime with **no `project-instructions` source**, a
  category the daily prompt marks mandatory. Its instruction-file claims had been
  riding on a one-line "Agents.md compatibility" aside on the skills/plugins page.
  A dedicated official page exists and was simply never registered.
- **Grok cli-invocation source — `docs.x.ai/build/cli/reference`.** Grok also had
  **no `cli-invocation` source**; its launch/headless claims rode on
  `headless-scripting`, which is registered under `session-resume`, so the
  mandatory CLI-spawn category had no anchor of the right kind for this runtime.
  Adds the subcommand surface: `grok sessions|export|import|worktree|mcp|dashboard|wrap`,
  `--allow`/`--deny`, `--sandbox <PROFILE>`. Same failure mode as the
  `cursor-model-lineup` gap caught 2026-07-16 — an official page outside the loop.

### Changed

- **Grok reads six instruction filenames, not three (correction).** We recorded
  `AGENTS.md`, `Agents.md`, `AGENT.md`. The official project-rules page states
  Grok also reads **`CLAUDE.md`, `Claude.md`, and `CLAUDE.local.md`** as
  first-class project rules, plus `*.md` in `.grok/rules/` (`.claude/rules/`,
  `.cursor/rules/` for compat). Fixed in `SKILL.md` and `compatibility-matrix.md`.
- **Grok's tree/merge semantics are documented — retired "unknown, verify live".**
  The matrix told readers to verify against the live engine before depending on
  ancestor behavior. It is now officially documented: global `~/.grok/` rules,
  then every directory from repo root down to cwd (cwd only outside a git repo),
  **every** matching file loads (no first-match-wins, unlike Hermes), deeper files
  take precedence on conflicts. Grok is also the one runtime that **honors
  `.gitignore` for rules** — the stated reason `CLAUDE.local.md` stays personal.
- **Codex plugin overview renamed `apps` → `connectors`.** Vocabulary change on
  the overview only: *"They can include skills, connectors, or both."* `apps`
  survives there as a cross-reference and the `plugin.json` manifest **field** is
  still literally `apps` on the build page — so `plugin-packaging.md` and the
  matrix stay correct for the field name. Still six components.
- **Codex `follow-goals` was slimmed to a use-case walkthrough; 3 claims
  re-anchored, not deleted.** The active-verification sentence and the goal-state
  list are now verbatim on the goals cookbook, which becomes their anchor. The
  cookbook also documents a **4th goal state, `budget-limited`** ("Reaching a
  budget limit is not the same as completing the objective").
- **`/goal set` never existed.** Setting is the bare `/goal <objective>`;
  `/goal edit` is anchored on developer-commands. Claim corrected.
- **"Tighten the goal mid-flight" was mis-anchored to the cookbook.** The cookbook
  only tightens a *draft before activation*; the mid-flight advice is on
  follow-goals. Fixed the attribution in `completion-stack.md`.
- **Codex automations: "schedule work from a task" is gone** (zero hits). The
  capability survives re-framed around the chat: *"You can create and update
  scheduled tasks from a ChatGPT or Codex chat."* Vocabulary moved task → chat.
- **`antigravity-cli-reference` no longer names `keybindings.json`** (zero hits).
  Its keybinding content is a *default-keybindings* reference (Key → TUI command),
  not a config-key table for the file. Claim split; `keybindings.json` stays
  anchored on `cli/using`, which already anchors `settings.json` for the same reason.
- **`completion-stack.md` cited an unregistered URL.** `learn.chatgpt.com/docs/reference/commands`
  was outside the verification loop; re-anchored onto the registered
  developer-commands source, which documents `/goal edit` today.

### Verified (stamps advanced, status unchanged)

- **Agent SDK billing still paused.** The 2026-06-15 change remains paused; the
  live banner is a verbatim match against the recorded quote. Per the
  freshness-stamp rule the date advanced 2026-07-11 → 2026-07-17 across the
  manifest claim, `cli-invocation.md`, and `cloud-automation.md`.
- **Claude model lineup unchanged** — Fable 5 / Opus 4.8 / Sonnet 5 / Haiku 4.5;
  Mythos still invitation-only; `claude-opus-4-1-20250805` retiring 2026-08-05.
  `models/claude.md` stamp advanced 2026-07-11 → 2026-07-17.
- **Zero drift** across all Grok (docs.x.ai), Hermes, gajae-code, GitHub, and
  Cursor sources, and 9 of 10 Antigravity sources.

### Notes

- **Grok Build was open-sourced (2026-07-14, Apache-2.0, `github.com/xai-org/grok-build`)
  — recorded, with a deliberately narrow scope.** xAI's docs never say so: a
  full-corpus check of their own `llms.txt` (1.29 MB) returns **zero** hits for
  "open source", "Apache", or "MIT", and every `github.com` link in the corpus
  points to `xai-sdk-python`, `xai-cookbook`, or `xai-proto`. The docs-only rule
  therefore *structurally cannot* record this fact, so `xai-grok-build-repo` was
  registered under a new `source-availability` kind and a new
  `policy.vendorSourceRule` was added to name the exception — the manifest's own
  `sourceRule` would otherwise contradict the source sitting under it.
  **Scope guard:** the repo owns only licensing/source-availability;
  `docs.x.ai` stays canonical for every behavior claim, so no claim gets two
  owners. The repo's 24 bundled user-guide docs were **deliberately not
  registered** for the same reason — `docs.x.ai` already covers that ground, and
  registering them would split the SSoT. The precedent for a vendor-source tier
  already existed (`completion-stack.md` source-verifies Codex goal internals
  against `openai/codex`); this run just made the rule explicit.

## v1.35 — 2026-07-16

Daily refresh: 61 manifest sources (2 added this run) fetched successfully; all
200. Antigravity re-rendered dynamically (code blocks hydrated correctly this
run). Billing still paused. The big one: **the entire Codex doc set moved host**.

### Changed

- **Codex docs moved to `learn.chatgpt.com`.** 14 of 16 `developers.openai.com/codex/*`
  sources now 308-redirect to `learn.chatgpt.com` (the Agent-Skills API guide and
  the goals cookbook did not move). Rewrote every affected manifest URL and every
  citation in `SKILL.md`, `cli-invocation.md`, `compatibility-matrix.md`,
  `completion-stack.md`, `models/codex.md`, and `models/README.md`, and added
  `learn.chatgpt.com` to `policy.allowedHosts` — the manifest's own policy had
  begun contradicting its URLs. Two slug renames beyond the host swap:
  `/codex/cli/reference` → `/docs/developer-commands?surface=cli`, and
  follow-goals sits at `/use-cases/`, not `/docs/use-cases/`. Content survived
  the move intact; this was citation rot, not knowledge loss.
- **Codex "Automations" is now "scheduled tasks".** The page is retitled and
  broadened to ChatGPT-wide (`?surface=app`); the Thread / Standalone /
  Project-Scoped category names are gone. Recurrence is RRULE-based.
- **Codex plugin components: 3 → 6.** The plugins overview now lists browser
  extensions, hooks, and scheduled task templates alongside skills, apps, and MCP
  servers. The build page still documents only the first four as `plugin.json`
  fields, so `plugin-packaging.md` was left as-is.
- **Antigravity documents a session store for the first time.** A new dedicated
  Resume Command Guide (`/docs/cli/commands/resume`) — registered as a new
  `session-resume` source — documents the `agy -c` short flag and a workspace-keyed
  cache at `~/.gemini/antigravity-cli/cache/last_conversations.json` mapping
  absolute workspace path → conversation id. The conversations page was slimmed to
  workspace scoping and `/fork` and now defers picker/`--conversation` detail
  there; `F2` rename is back (documented on the new page) and `Ctrl+Delete` delete
  is new.
- **Cursor cloud agents gained four hooks.** `beforeSubmitPrompt`,
  `afterAgentResponse`, `afterAgentThought`, and `stop` are now supported in cloud
  agents (previously "Not yet wired"). The unavailable list is down to
  `sessionStart`, `sessionEnd`, `beforeMCPExecution`/`afterMCPExecution`, Tab
  hooks, and `workspaceOpen`.
- **Cursor ships its own models — the "pure router" claim was wrong.** Registered a
  new `cursor-model-lineup` source (`cursor.com/docs/models-and-pricing`);
  `models/cursor.md` had no manifest entry at all, which is why its stale
  "no Cursor-owned model" claim survived outside the verification loop. Cursor
  documents Composer 2.5 ("Cursor's own model"), Composer 1, and Grok 4.5 (jointly
  trained with SpaceXAI), with `Auto` as default.
- **gajae-code dropped `--mode rpc`.** The community README documents no headless
  one-shot mode at all now; external control is the SDK loopback WebSocket, a
  Coordinator MCP server (MCP is back after its 2026-07-07 absence), or
  `gjc daemon session`.
- **Grok's older ids are shown again.** `grok-4.3`, the `grok-4.20-0309-reasoning`
  / `-non-reasoning` / `-multi-agent-0309` trio (1M), and `grok-build-0.1` (256k)
  are back in the pricing table — which is now the page's only model list. Removed
  the unsupported "configurable reasoning" claim (the detail page says only
  `Reasoning: Yes`; the reasoning/non-reasoning split is pre-built variants, not an
  effort knob) and the retirement-guide link, which no longer exists.
- **Claude session store is a sanitized path, not a hash.** The sessions page
  defines `<project>` in `~/.claude/projects/<project>/<session-id>.jsonl` as the
  working-directory path with non-alphanumeric characters replaced by `-`.
  `<cwd-hash>` was wrong and would misdirect anyone locating a transcript.
- **Billing re-verified live 2026-07-16, still paused.** Banner unchanged; advanced
  the time-sensitive stamps in `cli-invocation.md` and `cloud-automation.md`.
- Softened the Codex `gpt-5.6` "default selector" claim (the page shows the bare id
  only as a CLI example) and widened the `--effort` claim to include `ultracode`.

## v1.34 — 2026-07-11

Daily refresh: all 59 manifest source URLs fetched successfully. Billing still
paused; Claude/Codex/Grok model lineups and the three completion-stack sources
re-verified unchanged.

### Changed

- **Billing status re-verified live 2026-07-11, still paused.** The official
  support banner still says Agent SDK, `claude -p`, and third-party Agent SDK
  app usage draw from subscription usage limits, while the separate monthly
  credit remains unavailable. Advanced the time-sensitive billing stamps in
  `cli-invocation.md`, `cloud-automation.md`, and the manifest.
- **Model lineup stamps advanced for Claude, Codex, and Grok** after live
  verification against their official model pages; no lineup/content drift was
  found.
- **Completion-stack sources re-verified unchanged.** Claude `/goal` remains a
  transcript-only independent evaluator, while Codex Goals remains an active
  inspect/run/change/test loop with self-declared completion.
- **Antigravity dynamic render unavailable in this worker.** The static source
  check passed for the seven `antigravity.google` URLs, but no Chrome browser
  backend was available, so Antigravity content claims were not changed.

## v1.33 — 2026-07-10

### Added

- **`docs/completion-stack.md`** — native completion/verification stacks for
  Claude Code (`/goal` · Stop hook · `/verify`) and Codex (Goals · Stop hook ·
  `/review`), the cross-engine judgment-independence vs
  verification-activeness asymmetry, enforcement-grade tables, and a
  **Misreading traps** section preserving source-verified corrections that
  official docs alone don't state (ZCode is a separate Z.AI product with no
  independently verified `/goal`; Codex Goals is an active edit·run·test loop,
  not a soft checker; Codex `/goal edit` preserves usage via
  `ThreadGoalSetMode::UpdateExisting`; Claude's `/goal` evaluator is
  transcript-only). Migrated from operator vault research pages (verified
  2026-06-15) so this skill is the single owner of cross-engine completion
  knowledge.
- **Three goal sources registered in `docs/official-sources.json`** under a
  new `completion-stack` kind, so the daily refresh re-verifies the mirror
  doc's load-bearing claims: `anthropic-claude-goal`
  (code.claude.com/docs/en/goal — transcript-only evaluator),
  `openai-codex-follow-goals` (active inspect·run·change·test loop,
  self-declared completion), and `openai-codex-goals-cookbook` (6-element
  goal contract, evidence-based completion verbatim). Hooks pages were
  already registered (`anthropic-claude-hooks`, `openai-codex-hooks`).
  `node scripts/check-official-sources.mjs` passes (59 sources).
- **Navigation surfaces updated for the new doc** (blast-radius review):
  `docs/completion-stack.md` added to the doc lists in `SKILL.md`
  (Multi-Agent Compatibility Docs), `README.md` and all six README
  translations, and the daily prompt's WHAT-TO-CHECK category list now names
  completion/goal-gate docs (`kind: "completion-stack"`).

## v1.32 — 2026-07-10

Daily refresh: all 56 manifest source URLs fetched successfully. Billing still
paused; Claude/Grok model lineups re-verified unchanged; Codex model lineup
drifted to GPT-5.6 Sol/Terra/Luna.

### Changed

- **Codex model lineup drift recorded.** The official Codex models page now
  recommends the GPT-5.6 family/default selector (`gpt-5.6`) with explicit
  `gpt-5.6-sol`, `gpt-5.6-terra`, and `gpt-5.6-luna` ids. `gpt-5.5` is now
  previous-generation, while `gpt-5.4` and `gpt-5.4-mini` remain under Other
  models. Updated `docs/models/codex.md`, `SKILL.md`, and manifest claims.
- **Billing status re-verified live 2026-07-10, still paused.** Advanced the
  time-sensitive billing stamps in `cli-invocation.md`, `cloud-automation.md`,
  and the manifest.
- **Model lineup stamps advanced for Claude and Grok** after live verification
  against their official model pages; no content drift found.
- **Antigravity dynamic render unavailable in this worker.** The static source
  check passed for the seven `antigravity.google` URLs, but no in-app/Chrome
  browser backend was available, so Antigravity content claims were not changed.

## v1.31 — 2026-07-09

Daily refresh: all 56 manifest source URLs fetched successfully. Billing still
paused; Claude/Codex model lineups unchanged with fresh `Last reviewed` stamps;
xAI's official models overview now centers Grok 4.5. Antigravity SPA pages still
return an empty static shell here, and no browser backend was available in this
worker, so no Antigravity claim changes were made this run.

### Changed

- **Billing status re-verified live 2026-07-09, still paused.** The support-page
  banner remains unchanged: Agent SDK, `claude -p`, and third-party Agent SDK app
  usage still draw from subscription usage limits; the previously announced
  separate monthly credit remains unavailable. Advanced the time-sensitive
  billing stamps in `cli-invocation.md`, `cloud-automation.md`, and the manifest.
- **Model lineup stamps advanced for Claude and Codex** after live verification
  against their official model pages; no lineup/content drift found.
- **Grok model lineup drift recorded.** xAI's official models overview now
  highlights `grok-4.5` (500k context, configurable reasoning) for code/chat,
  plus the Voice and Imagine APIs. The previous `grok-4.3` / `grok-4.20-*` /
  `grok-build-0.1` lineup is no longer shown on the overview; the docs record
  absence as `not documented`, not as a retirement claim.
- **Antigravity dynamic render unavailable in this worker.** The seven
  `antigravity.google` URLs remained reachable but returned an empty SPA shell to
  static fetch; the in-app browser and Chrome control surfaces were unavailable,
  so this run did not update Antigravity claims.

## v1.30 — 2026-07-07

Daily refresh: all 56 manifest sources re-verified live. Billing still paused
(banner verbatim-unchanged); the Hermes plugin-build guide moved to
`/docs/developer-guide/plugins`; the Codex plugin `hooks` manifest field now
also accepts inline hooks objects, and Codex documents marketplace file
locations (including a legacy `.claude-plugin/marketplace.json` compat path);
`codex fork` lands as a CLI session-fork subcommand; Claude's PreToolUse hook
documents a fourth `defer` outcome.

### Changed

- **Billing status re-verified live 2026-07-07, still paused.** The support-page
  banner is verbatim-unchanged from 07-06 (change paused; monthly credit not
  available; any update announced before taking effect; API-key accounts stay
  pay-as-you-go); the manifest now also records the line under the banner ("The
  content below reflects the page before June 15…"). Advanced the billing
  time-sensitive stamps 07-06 → 07-07 (`cli-invocation.md`,
  `cloud-automation.md`, `official-sources.json`).
- **Hermes plugin-build guide URL moved** to
  `hermes-agent.nousresearch.com/docs/developer-guide/plugins`. The old
  `/docs/guides/build-a-hermes-plugin` now serves an HTTP-200 meta-refresh stub
  (no server-side redirect, so plain `curl -L` does not follow it); all claims
  verified at the new location (title still "Build a Hermes Plugin"). Manifest
  URL updated.
- **Codex plugin `hooks` manifest field widened** (plugins/build page): a single
  path, an array of paths, an inline hooks object, or an array of inline hooks
  objects (previously recorded as path-or-array). The page also documents
  marketplace file locations — repo `.agents/plugins/marketplace.json`, a
  legacy-compatible `.claude-plugin/marketplace.json`, personal
  `~/.agents/plugins/marketplace.json` — the
  `codex plugin marketplace add/list/upgrade/remove` CLI, and the
  `~/.codex/plugins/cache/<marketplace>/<plugin>/<version>/` install cache.
  Updated `plugin-packaging.md`, `compatibility-matrix.md`, and the manifest.
- **`codex fork` documented on the CLI reference** — forks a previous
  interactive session into a **new** thread (the CLI analogue of app-server
  `thread/fork`), alongside `codex archive` / `codex delete` /
  `codex unarchive` and remote-mode support. Session Resume mirrors updated
  (`SKILL.md`, `compatibility-matrix.md`). Caveat recorded: `~/.codex/sessions`
  now appears once inside a user-example prompt on the automations page — an
  example, not normative path documentation, so the not-documented discipline
  stands.
- **Claude PreToolUse documents a fourth decision outcome, `defer`** ("exits
  gracefully so the tool can be resumed later"; single tool calls only), plus a
  10,000-character cap on hook output strings (`additionalContext`,
  `systemMessage`, stdout). Claims added; `SKILL.md` already recorded `defer`
  in the shared decision schema.
- **Model lineups re-verified live, unchanged** (Claude / Codex / Grok pages
  match the `docs/models/` mirrors) — advanced the three `Last reviewed:`
  stamps to 07-07.
- **Note-level refreshes:** Antigravity pages re-verified by dynamic render
  07-07 — fenced code blocks hydrated empty on *every* docs page this run
  (code-block-only literals held via prose/tables), a CMD install option now
  appears alongside PowerShell on Windows, and the plugin subcommand documents
  a plural `plugins` alias; gajae-code README no longer mentions MCP (external
  control is stated as RPC/ACP/Bridge) nor any 0.x version marker; Claude
  sessions' "same session id reused" re-anchored to the two-terminals
  interleave sentence; Claude settings' v2.1.119 parenthetical corrected (it
  also renders on two notification-setting rows).

## v1.29 — 2026-07-06

Daily refresh: all 56 manifest sources re-verified live. Billing still paused
(banner verbatim-unchanged); Codex plugin hooks gain documented env vars
(including Claude-compat names); the Codex interactive seed-prompt is
re-anchored on the CLI reference; Cursor's `stop` hook is back in the
cloud-unavailable table; Hermes adds a `pre_verify` plugin hook event; the Grok
models page moved to `/developers/models`.

### Changed

- **Billing status re-verified live 2026-07-06, still paused.** The support-page
  banner is verbatim-unchanged from 07-05 (change paused; monthly credit not
  available; any update announced before taking effect; API-key accounts stay
  pay-as-you-go). Advanced the billing time-sensitive stamps 07-05 → 07-06
  (`cli-invocation.md`, `cloud-automation.md`, `official-sources.json`).
- **Codex plugin-hook env vars now documented** (plugins/build page): plugin
  hook commands receive `PLUGIN_ROOT` (installed plugin root) and `PLUGIN_DATA`
  (writable data directory), and Codex also sets `CLAUDE_PLUGIN_ROOT` /
  `CLAUDE_PLUGIN_DATA` "for compatibility with existing plugin hooks"; the
  `plugin.json` `hooks` field accepts a single path or an array (default
  `hooks/hooks.json`, `${PLUGIN_ROOT}` substitution). Added to
  `plugin-packaging.md`, `compatibility-matrix.md`, and the manifest claims.
- **Codex interactive seed-prompt re-anchored:** the CLI reference documents a
  top-level optional `PROMPT` positional ("Optional text instruction to start
  the session. Omit to launch the TUI without a pre-filled message."),
  resolving the 07-04 `unverified` state — `codex "<prompt>"` is official again
  (`SKILL.md`, `cli-invocation.md`; still absent from the CLI overview page).
- **Cursor hooks:** `stop` is **back** in the cloud-agent unavailable table as
  "Not yet wired for cloud agents" (on 07-05 it was briefly unstated). Restored
  `stop` to the cloud-unsupported lists in `compatibility-matrix.md` and
  `plugin-packaging.md`.
- **Hermes hooks:** new plugin control-flow hook event **`pre_verify`** — fires
  once per turn when the agent edited code, just before it verifies/finishes
  (related config `agent.verify_guidance: false`). Added to both hook mirrors
  and the manifest claims.
- **Grok models page moved:** `docs.x.ai/docs/models` now 308-redirects to
  `docs.x.ai/developers/models` (model detail links under
  `/developers/models/<id>`); manifest URL and `docs/models/grok.md` source line
  updated — all model ids/claims unchanged.
- **Claude settings page:** `fileCheckpointingEnabled` still documents default
  `true`, but its v2.1.119 version tie is no longer stated — claim weakened in
  the manifest (the v2.1.119 note survives only for `autoCompactEnabled` on the
  config-preference-keys storage list).
- **Antigravity (7 SPA pages re-rendered dynamically, claude-in-chrome):** all
  prose/table/inline-code claims verified unchanged; the conversations page no
  longer mentions the picker's F2 rename (note updated). This run the fenced
  code blocks hydrated empty under automation, so code-block-only command
  literals were held via surrounding prose (noted in the manifest).
- **Model lineup stamps:** Claude/Codex/Grok `docs/models/*.md` re-verified
  live, `Last reviewed` 07-05 → 07-06; Claude/Codex lineups and the Codex
  availability matrix unchanged.

## v1.28 — 2026-07-05

Daily refresh: all 56 manifest sources re-verified live (55 prior + 1 added).
Billing still paused (banner now longer); Codex availability matrix drops Codex
Cloud for all models; Codex `~/.codex/history.jsonl` re-anchored (documented on
config-advanced); Grok hook env vars moved to a dedicated hooks page (new
manifest source); several no-longer-stated anchor moves on Claude/Codex/Cursor
pages; gajae-code README weakened its skills path.

### Added

- **New manifest source `xai-grok-hooks`** (https://docs.x.ai/build/features/hooks):
  the skills-plugins-marketplaces page now states only the plugin-hook env vars
  (`GROK_PLUGIN_ROOT`, `GROK_PLUGIN_DATA`) and defers events/JSON/script contract
  to the dedicated hooks page, so `GROK_HOOK_EVENT`, `GROK_HOOK_NAME`,
  `GROK_SESSION_ID`, `GROK_WORKSPACE_ROOT` are re-anchored there (56 sources).

### Changed

- **Billing status re-verified live 2026-07-05, still paused.** The banner now
  carries two additional sentences: the previously announced monthly credit
  "isn't available", and any updated plan will be shared "before anything takes
  effect". The paused credit table also splits Enterprise into usage-based ($20)
  and seat-based Premium seats ($200, Standard seats not eligible). Advanced all
  billing time-sensitive stamps 07-04 → 07-05 (`cli-invocation.md`,
  `cloud-automation.md`, `official-sources.json`).
- **Codex models availability matrix:** **Codex Cloud is now marked unavailable
  for all four models** (consistent with "you can't change the default model for
  Codex cloud tasks"); `gpt-5.3-codex-spark` is CLI & SDK + app & IDE only (no
  ChatGPT Credits, no API access). Model ids/deprecations unchanged
  (`docs/models/codex.md`).
- **Codex session store re-anchored:** `~/.codex/history.jsonl` is documented
  again — the config-advanced page states "Codex saves local session transcripts
  under `CODEX_HOME` (for example, `~/.codex/history.jsonl`)" with
  `[history] persistence = "none"` / `history.max_bytes`; the rollout/sessions
  directory (`~/.codex/sessions/`) remains not documented. Session Resume
  mirrors updated (`compatibility-matrix.md`, manifest claims).
- **Codex noninteractive page keeps thinning:** `--cd`/`-C` and the `-s` short
  alias are no longer stated there (only long `--sandbox` remains); both stay
  documented on the CLI reference — claims re-anchored, `cli-invocation.md`
  headless table unchanged (it already cites the reference).
- **Claude sessions page anchor moves:** the `-c` short form and the URL-accepting
  `--from-pr` forms are no longer stated on the sessions page (URL pasting
  survives as a picker search feature); both remain on the CLI reference, which
  now anchors them. New on the CLI reference: `--permission-mode manual` (alias
  of `default`, v2.1.200) — added to `cli-invocation.md`. The headless page is
  retitled "Run Claude Code programmatically" (the literal word "headless" left
  the body; same URL and behavior).
- **Grok headless page:** the ACP example now uses camelCase `sessionId`
  (`session/new`); the snake_case `session_id` token is gone — Session Resume
  id-form cell updated.
- **Cursor hooks:** `stop` no longer appears in either cloud-agent support
  table — its cloud status is now *not stated* (previously listed as
  unsupported). Removed `stop` from the cloud-unsupported lists in
  `compatibility-matrix.md` and `plugin-packaging.md`.
- **gajae-code README (non-vendor):** the exact `~/.gjc/skills/` path is no
  longer literally stated — bundled skills install "into your user `.gjc`
  directory" via `gjc setup defaults`. Weakened the path claim in `SKILL.md`,
  `compatibility-matrix.md`, `plugin-packaging.md`; README verified stamps
  2026-06-27 → 2026-07-05. New 0.6/0.7 README content (rlm mode, notifications
  daemon) noted in the manifest, outside claim scope.
- **Antigravity (7 SPA pages re-rendered dynamically, Playwright):** the
  gcli-migration page no longer states the `~/.local/bin/agy` install path (the
  install page remains the anchor) and now states the global skills path pair
  (`~/.gemini/skills/` → `~/.gemini/antigravity-cli/skills/`) — claims updated;
  the other six pages are unchanged.
- **Hermes overview:** the feature is phrased "Scheduled automations —
  built-in cron" (claim wording aligned; concept unchanged).
- **Model lineup stamps:** Claude/Codex/Grok `docs/models/*.md` re-verified live,
  `Last reviewed` 07-04 → 07-05; fixed the Claude mirror's redirect-URL note
  (actual target is `platform.claude.com/docs/en/about-claude/models/overview`,
  no doubled `/docs/` segment).

## v1.27 — 2026-07-04

Daily refresh: all 56 manifest sources re-verified live. Billing still paused;
model lineups verified against the official Claude/Codex/Grok model pages for
the first time (Codex adds `gpt-5.4`, deprecates `gpt-5.2`/`gpt-5.3-codex`);
Codex CLI docs dropped the session-store paths; Antigravity docs moved to
`/docs/cli/<page>` URLs and resolved the MCP-path inconsistency.

### Changed

- **Billing status re-verified live 2026-07-04, still paused.** The Agent SDK
  support page banner is character-identical to the 07-03 snapshot ("Update June
  15: We're pausing the changes…"). Advanced every billing time-sensitive stamp
  07-03 → 07-04 (`cli-invocation.md`, `cloud-automation.md`,
  `official-sources.json`).
- **Model Lineup verified live for Claude, Codex, and Grok** (first live pass
  since the category shipped in v1.25); `docs/models/claude.md`, `codex.md`,
  `grok.md` rewritten from the official pages and their `unverified this run`
  seed caveats cleared:
  - **Claude:** current = Fable 5, Opus 4.8, Sonnet 5, Haiku 4.5 (id
    `claude-haiku-4-5-20251001`, alias `claude-haiku-4-5`). Reasoning is
    **adaptive thinking** on the current generation (Haiku 4.5: extended
    thinking) — corrected from the earlier blanket "extended thinking". Newly
    documented, **not GA**: `claude-mythos-5` / `claude-mythos-preview`
    (invitation-only, Project Glasswing). `claude-opus-4-1-20250805` is
    deprecated, retiring 2026-08-05. `docs.anthropic.com` now 301-redirects to
    `platform.claude.com` (same doc; URL kept, redirect noted).
  - **Codex:** current = `gpt-5.5`, **`gpt-5.4` (new)**, `gpt-5.4-mini`,
    `gpt-5.3-codex-spark` (text-only research preview, ChatGPT Pro);
    **deprecated: `gpt-5.2`, `gpt-5.3-codex`** (no one-to-one replacement
    mapping documented). The models page documents `codex -m <id>` selection but
    no per-model reasoning/service tiers.
  - **Grok:** current = `grok-4.3` (1M), `grok-4.20-0309`
    reasoning/non-reasoning/multi-agent (1M), `grok-build-0.1` (256k), plus
    Imagine image/video models and the Voice API. Kuma-catalog id
    `grok-composer-2.5-fast` is **not documented** on the official page (no
    retired section — recorded as absence, not retirement).
- **Codex session-store paths no longer documented.** The CLI reference dropped
  `~/.codex/sessions/` and `~/.codex/history.jsonl`; rollout files survive only
  indirectly via `--ephemeral`, and the app-server doc adds `thread/archive`
  (JSONL thread logs, archived-sessions directory, exact paths unstated).
  Session Resume mirrors updated (`compatibility-matrix.md` Codex rows +
  implementer note) to `not documented` per the source discipline.
- **Codex CLI overview no longer states the seed-prompt arg** (`codex
  "<prompt>"`); marked `unverified this run` in the spawn tables (SKILL.md,
  `cli-invocation.md`) pending re-anchoring. The noninteractive page also
  dropped its `--model`/`-m` listing (defers to the CLI reference; the flag
  remains official via the models page) — manifest note only.
- **Antigravity docs re-verified by dynamic render (Playwright); all tracked
  claims hold.** Structural changes: every page moved from `/docs/cli-<page>` to
  `/docs/cli/<page>` (and `/docs/sdk-overview` → `/docs/sdk/overview`) — old
  URLs redirect; manifest + doc citations updated to the canonical paths. The
  plugins page no longer states MCP config paths (defers to a dedicated MCP
  docs page), which **resolves the previously recorded global-MCP-path
  inconsistency** — the migration page's `~/.gemini/config/mcp_config.json`
  (global) / `.agents/mcp_config.json` (workspace) is now the only stated pair.
  New on the reference page: `/statusline`, `/fast`, `/planning`, `/btw`,
  `/add-dir`, `/diff`, `/usage` etc.; `plugin.json` now documents a `$schema`
  with only `name` required.
- **Claude Code doc drift (3 claims):** `CLAUDE_CONFIG_DIR` left the memory page
  (sessions page remains the anchor); `maxSkillDescriptionChars` was renamed
  `skillListingMaxDescChars` (default 1536 unchanged);
  `CLAUDE_CODE_SYNC_PLUGIN_INSTALL` left the plugins page (headless page remains
  the anchor). Manifest claims updated; no doc-body mirrors were affected.
- **Cursor overview no longer mentions the worktree flag** (still documented on
  cli/using and cli/reference/parameters) — manifest claim moved to those
  anchors.

## v1.26 — 2026-07-03

Daily refresh: billing re-verified live, still paused; Antigravity SPA re-rendered; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-07-03, still paused.** The Agent SDK
  support page (`support.claude.com/.../15036540`) was fetched this run and its
  banner still reads *"Update June 15: We're pausing the changes to Claude Agent
  SDK usage described below. For now, nothing has changed: Claude Agent SDK,
  `claude -p`, and third-party app usage still draw from your subscription's usage
  limits."* No structural drift. Advanced every billing time-sensitive stamp
  07-02 → 07-03 (`cli-invocation.md`, `cloud-automation.md`,
  `official-sources.json` `updated` + billing notes/claim).
- **Antigravity CLI docs re-verified by dynamic render.** The `antigravity.google`
  SPA (a static fetch returns an empty shell) was rendered dynamically and the
  `cli-reference` page still lists every tracked slash command (`/resume` +
  `/switch`/`/conversation`, `/fork`/`/branch`, `/model`, `/mcp`, `/skills`,
  `/permissions`, `/hooks`, `/config`/`/settings`, `/keybindings`, `/rewind`,
  `/agents`, `/tasks`) plus the `settings.json` config-key table
  (`toolPermission` request-review/proceed-in-sandbox/always-proceed/strict,
  `artifactReviewPolicy`, `enableTerminalSandbox`). No drift; the structural
  verification stamp (06-22) is left as-is per the freshness rule.
- Model-lineup stamps (07-02) left untouched — structural, not re-verified this
  run — as were the other stable structural stamps (06-22 / 06-27 / the settled
  06-18 Gemini cutoff). Only time-sensitive billing stamps advance.

## v1.25 — 2026-07-02

New **Model Lineup** category: track each runtime's current shipping model ids, reasoning/effort tiers, and retired models against the official vendor model pages, re-verified by the daily refresh.

### Added

- **`docs/models/` folder** — one file per runtime (`claude`, `codex`, `grok`,
  `gemini-antigravity`, `cursor`, `hermes`, `kuma-studio`) plus a `README.md`
  documenting the SSoT boundary, maintenance policy, and provenance-stamp rule.
  Each file records current shipping model ids, reasoning/effort tiers, retired
  models, its official source URL, and a `Last reviewed:` stamp. Seed lineup
  (2026-07-02): Claude = Opus 4.8 / Sonnet 5 / Haiku 4.5 / Fable 5 current, Opus
  4.7 + Sonnet 4.6 retired; Codex/Grok/others seeded from the Kuma catalog and
  marked `unverified this run` pending official-page confirmation.
- **Three `kind: "model-lineup"` sources** in `docs/official-sources.json`
  (`anthropic-model-lineup` / `openai-codex-model-lineup` / `xai-grok-model-lineup`),
  anchored on the official model pages (`docs.anthropic.com`,
  `developers.openai.com/codex/models`, `docs.x.ai`) — all reachable (HTTP 200) in
  the check run; no new `allowedHosts` needed.
- **`guardCategory("model-lineup", "Model Lineup")`** in
  `scripts/check-official-sources.mjs` so a future edit cannot silently drop the
  category or its codex + claude-code anchors, with two covering tests in
  `check-official-sources.test.mjs` (drop-entirely and missing-anchor).
- **`## Model Lineup`** section in `SKILL.md` and a **MODEL LINEUP — do not skip
  this category** paragraph in `prompts/daily-official-doc-update.md`, both stating
  the SSoT boundary (owns current ids/tiers/retirement; links out to pricing =
  `claude-api`, spawnable catalog = kuma-studio `team.json` downstream, naming =
  Kuma vault) and the `unverified this run` discipline.

### Boundary

- `docs/models/` is a **vendor-truth record**; the Kuma Studio `team.json`
  `modelCatalog` is a **downstream consumer** that syncs from it, never the
  reverse. Pricing stays with the `claude-api` skill; naming/phonetic-gloss stays
  with the Kuma vault. This category links to those, does not duplicate them.

## v1.24 — 2026-07-02

Daily refresh: billing re-verified live, still paused; Antigravity SPA re-rendered; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-07-02, still paused.** The Agent SDK
  support page was fetched this run and its banner still reads *"Update June 15:
  We're pausing the changes to Claude Agent SDK usage described below. For now,
  nothing has changed: Claude Agent SDK, `claude -p`, and third-party app usage
  still draw from your subscription's usage limits."* No structural drift.
  Advanced every billing time-sensitive stamp 07-01 → 07-02 (`cli-invocation.md`,
  `cloud-automation.md`, `official-sources.json` `updated` + billing notes/claim).
- **Antigravity CLI docs re-verified by dynamic render.** The `antigravity.google`
  SPA (a static fetch returns an empty shell) was rendered dynamically and the
  `cli-reference` page still lists every tracked slash command (`/resume` +
  `/switch`/`/conversation`, `/fork`/`/branch`, `/model`, `/mcp`, `/skills`,
  `/permissions`, `/hooks`, `/config`/`/settings`, `/keybindings`, `/rewind`,
  `/agents`, `/tasks`) plus the `settings.json` config-key table. No drift; the
  structural verification stamp (06-22) is left as-is per the freshness rule.
- Stable structural stamps (06-22 / 06-27 / the settled 06-18 Gemini cutoff) left
  untouched.

## v1.23 — 2026-07-01

Daily refresh: billing re-verified live, still paused; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-07-01, still paused.** Both official
  support pages were fetched this run. The Agent SDK page banner still reads
  *"Update June 15: We're pausing the changes to Claude Agent SDK usage described
  below. For now, nothing has changed: Claude Agent SDK, `claude -p`, and
  third-party app usage still draw from your subscription's usage limits."* The
  Pro/Max page still confirms the subscription covers Claude Code, a present
  `ANTHROPIC_API_KEY` switches to pay-as-you-go API billing, and `/status`
  monitors remaining plan allocation. No structural drift. Advanced every billing
  time-sensitive stamp 06-30 → 07-01 (`cli-invocation.md`, `cloud-automation.md`,
  `official-sources.json` `updated` + billing notes/claim). Stable structural
  stamps (06-22 / 06-27 / the settled 06-18 Gemini cutoff) left untouched.

## v1.22 — 2026-06-30

Fix the auto-merge guard's post-merge branch cleanup for git-worktree layouts.

### Fixed

- **`auto-merge-guard.sh` no longer fails on `gh pr merge --delete-branch` in a
  worktree checkout.** When the daily refresh runs from a linked git worktree (the
  routine's own `aldegad/routine1` worktree) while `main` is checked out in the
  shared canonical worktree, `--delete-branch`'s post-merge *local* step ("switch
  off the just-deleted branch") aborts with `fatal: 'main' is already used by
  worktree ...` — **after** the remote squash-merge has already succeeded, and it
  leaves the remote branch stale on that failure. The guard now runs
  `gh pr merge "$PR" --squash` and then deletes the remote ref explicitly
  (`git push origin --delete <headRefName> || true`), which never touches a local
  checkout. The routine worktree is left intact for reuse and the next run's
  `git fetch --prune` clears the stale remote-tracking ref. The merge gate's
  docs-only + source-check policy is unchanged; only the cleanup mechanics changed.

## v1.21 — 2026-06-30

Daily refresh: billing re-verified live, still paused; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-06-30, still paused.** The official
  support page banner still reads *"Update June 15: We're pausing the changes to
  Claude Agent SDK usage described below. For now, nothing has changed: Claude
  Agent SDK, `claude -p`, and third-party app usage still draw from your
  subscription's usage limits."* The Pro/Max page still confirms the subscription
  covers interactive Claude Code, a present `ANTHROPIC_API_KEY` switches to
  pay-as-you-go API billing, and `/status` monitors plan allocation. Advanced
  every billing time-sensitive stamp 06-29 → 06-30 (`cli-invocation.md`,
  `cloud-automation.md`, `official-sources.json`, the daily prompt) per the
  freshness-stamp carve-out. No structural facts changed. (Source:
  https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan)

### Notes

- **No structural drift this run.** Both `kind: "billing"` sources re-verified
  live with no material drift; all tracked claims still hold. A minor wording
  clarification on the Pro/Max page (Claude Code's credit prompt and Claude
  Console's auto-reload are "separate systems") does not contradict any tracked
  claim, so no doc body changed. The other structural sources (Codex, Claude
  hooks/settings/plugins, Grok, Hermes, Cursor, GitHub, gajae-code) were carried
  forward without claimed drift; their structural stamps were left as-is per the
  low-noise freshness rule.
- **Antigravity SPA unverified this run.** The `antigravity.google` docs are a
  JS-rendered SPA; dynamic render via `claude-in-chrome` requires the interactive
  browser-selection gate, which is not available in this scheduled (ephemeral) job,
  so the six Antigravity sources could not be rendered. Recorded as *unverified
  this run* and their structural render stamps (06-22) left untouched (no change
  claimed).

## v1.20 — 2026-06-29

Daily refresh: billing re-verified live, still paused; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-06-29, still paused.** The official
  support page banner still reads *"Update June 15: We're pausing the changes to
  Claude Agent SDK usage described below. For now, nothing has changed: Claude
  Agent SDK, `claude -p`, and third-party app usage still draw from your
  subscription's usage limits."* The Pro/Max page still confirms the subscription
  covers interactive Claude Code, a present `ANTHROPIC_API_KEY` switches to
  pay-as-you-go API billing, and `/status` monitors plan allocation. Advanced
  every billing time-sensitive stamp 06-28 → 06-29 (`cli-invocation.md`,
  `cloud-automation.md`, `official-sources.json`, the daily prompt) per the
  freshness-stamp carve-out. No structural facts changed. (Source:
  https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan)

### Notes

- **No structural drift this run.** Codex, Claude, Grok, Hermes, Cursor, and
  GitHub sources re-verified with no material drift; the two facts recorded
  yesterday (plugins-reference experimental `themes/` + `channels` field; headless
  10-minute background-subagent wait cap since v2.1.182) were re-confirmed still
  present and accurate. The gajae-code README re-verified, no drift; its
  structural `verified 2026-06-27` stamp was left as-is per the low-noise freshness
  rule.
- **Antigravity SPA unverified this run.** The `antigravity.google` docs are a
  JS-rendered SPA and `claude-in-chrome` was not connected this run, so the six
  Antigravity sources could not be dynamically rendered; recorded as *unverified
  this run* and their structural render stamps (06-22) left untouched (no change
  claimed).

## v1.19 — 2026-06-28

Daily refresh: billing re-verified live (still paused); two verified Claude doc
drifts recorded in the source manifest; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-06-28, still paused.** The official
  support page banner still reads *"Update June 15: We're pausing the changes to
  Claude Agent SDK usage described below. For now, nothing has changed: Claude
  Agent SDK, `claude -p`, and third-party app usage still draw from your
  subscription's usage limits."* The Pro/Max page still confirms the subscription
  covers interactive Claude Code, a present `ANTHROPIC_API_KEY` switches to
  pay-as-you-go API billing, and `/status` monitors plan allocation. Advanced
  every billing time-sensitive stamp 06-27 → 06-28 (`cli-invocation.md`,
  `cloud-automation.md`, `official-sources.json`, the daily prompt) per the
  freshness-stamp carve-out. (Source:
  https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan)

### Added

- **Claude plugins-reference: themes + channels components recorded.** The
  official plugins-reference now documents two components beyond the core six
  (skills, agents, hooks, MCP servers, LSP servers, monitors): an **experimental
  `themes/`** component (JSON `base` preset + sparse `overrides`, surfaced in
  `/theme`) and a **`channels`** manifest field declaring MCP-backed
  message-injection channels. The page also moves `themes` and `monitors` under an
  `experimental` manifest key (top-level still works with a `claude plugin
  validate` warning, a future release will require `experimental.*`). Added these
  as claims to `anthropic-claude-plugins-reference` in `docs/official-sources.json`.
  (Source: https://code.claude.com/docs/en/plugins-reference)
- **Claude headless: background-subagent wait cap recorded.** `claude -p` waits
  for background subagents/workflows (exempt from the 5s grace); since **v2.1.182**
  that wait is **capped at 10 minutes by default**, tunable via
  `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS` (`0` = no limit). Added as claims to
  `anthropic-claude-headless` in `docs/official-sources.json`. (Source:
  https://code.claude.com/docs/en/headless)

### Notes

- **Antigravity SPA unverified this run.** The `antigravity.google` docs are a
  JS-rendered SPA and `claude-in-chrome` was not connected this run, so the six
  Antigravity sources could not be dynamically rendered; they are recorded as
  *unverified this run* and their structural render stamps (06-22) were left
  untouched (no change claimed). All other vendor sources (Codex, Grok, Hermes,
  Cursor, GitHub) and the gajae-code README re-verified with no drift; their
  structural stamps were left as-is per the low-noise freshness rule.

## v1.18 — 2026-06-27

Added **gajae-code** (`gjc`) as an eighth tracked runtime — the first
**non-vendor** entry alongside Kuma Studio.

### Added

- **gajae-code coverage across the wiki.** gajae-code (community/MIT beta by
  Yeachan-Heo, binary `gjc`) is a coding-agent harness that runs adjacent to other
  CLIs. Added rows/sections to every comparison surface: SKILL.md (Runtime Coverage,
  CLI Spawn, Session Resume, Project Instruction Files, Skill Invocation, plus a
  trigger keyword `가재`/`gjc`), `docs/compatibility-matrix.md` (all five tables),
  `docs/cli-invocation.md` (interactive/headless/resume tables + sources), and
  `docs/plugin-packaging.md` (a dedicated section). Documented facts: install
  `bun install -g gajae-code`; interactive `gjc` / `--tmux` / `--worktree`; headless
  `gjc --mode rpc` (no JSON flag); skills in `~/.gjc/skills/` via `gjc skills
  list/read`, invoked as `/skill:<name>` (colon form — the only runtime that differs
  from `/<skill-name>`), defaults `deep-interview`/`ralplan`/`ultragoal`/`team`;
  config `~/.gjc/config.yml` + per-project `.gjc/`. Hooks, plugins, session-id
  resume, and project-instruction-file loading are all recorded as `not documented`.
- **Non-vendor source discipline.** Added `policy.nonVendorRule` and a
  `kind: "community-runtime"` source (`gajae-code-readme`) to
  `docs/official-sources.json`, and `github.com` to `policy.allowedHosts` so the
  daily refresh can fetch the README. The daily prompt
  (`prompts/daily-official-doc-update.md`) now lists gajae-code in WHAT TO CHECK and
  carries a NON-VENDOR note: re-verify it from its README every run, keep it flagged
  as community/non-vendor, never present it as a vendor guarantee.

## v1.17 — 2026-06-27

Daily refresh: billing status re-verified live, unchanged; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-06-27, still paused.** The official
  support page banner still reads *"Update June 15: We're pausing the changes to
  Claude Agent SDK usage described below. For now, nothing has changed: Claude
  Agent SDK, `claude -p`, and third-party app usage still draw from your
  subscription's usage limits."* API-key accounts remain pay-as-you-go (no Agent
  SDK monthly credit). Advanced every billing time-sensitive stamp 06-26 → 06-27
  (`cli-invocation.md`, `cloud-automation.md`, `official-sources.json`, the daily
  prompt) per the freshness-stamp carve-out. No structural facts changed; the
  Gemini cutoff (2026-06-18, a settled past event) and the Antigravity SPA render
  stamps (06-22, structural) were left untouched.

## v1.16 — 2026-06-26

Daily refresh: billing status re-verified live, unchanged; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-06-26, still paused.** The official
  support page banner still reads *"Update June 15: We're pausing the changes to
  Claude Agent SDK usage described below. For now, nothing has changed: Claude
  Agent SDK, `claude -p`, and third-party app usage still draw from your
  subscription's usage limits."* The Pro/Max page (subscription covers interactive
  Claude Code; a present `ANTHROPIC_API_KEY` switches to pay-as-you-go API billing;
  `/status` monitors allocation) is also unchanged. Advanced every billing
  time-sensitive stamp 06-25 → 06-26 (`cli-invocation.md`, `cloud-automation.md`,
  `official-sources.json`, the daily prompt) per the freshness-stamp carve-out. No
  structural facts changed; the Gemini cutoff (2026-06-18, a settled past event)
  and the Antigravity SPA render stamps (06-22, structural — re-rendered live this
  run via Playwright + system Chrome, slash commands/conversation scoping
  unchanged) were left untouched.

## v1.15 — 2026-06-25

Daily refresh: billing status re-verified live, unchanged; freshness stamps advanced.

### Changed

- **Billing status re-verified live 2026-06-25, still paused.** The official
  support page banner still reads *"Update June 15: We're pausing the changes to
  Claude Agent SDK usage described below. For now, nothing has changed: Claude
  Agent SDK, `claude -p`, and third-party app usage still draw from your
  subscription's usage limits."* The Pro/Max page (subscription covers interactive
  Claude Code; a present `ANTHROPIC_API_KEY` switches to pay-as-you-go API billing;
  `/status` monitors allocation) is also unchanged. Advanced every billing
  time-sensitive stamp 06-24 → 06-25 (`cli-invocation.md`, `cloud-automation.md`,
  `official-sources.json`, the daily prompt) per the freshness-stamp carve-out. No
  structural facts changed; the Gemini cutoff (2026-06-18, a settled past event)
  and the Antigravity SPA render stamps (06-22, structural) were left untouched.

## v1.14 — 2026-06-24

Fixed the daily refresh's blind spot for **time-sensitive status claims** and
re-verified the Claude billing status live.

### Fixed

- **Stale freshness stamps were rotting a still-true claim.** The daily prompt's
  `IF THERE ARE NO CHANGES: do not modify any file` rule suppressed verification-date
  bumps, so the billing "paused" status kept its stamp across the no-op 06-23 and
  06-24 runs even though it was re-checked — making a correct claim read as
  stale/wrong. Added a **freshness-stamp carve-out**: a *time-sensitive status
  claim* (billing paused/resumed/cancelled, an announced-but-not-yet-effective
  cutoff, any "currently X" status) MUST advance its `verified` / `as of` date and
  the doc-level `Last reviewed:` on every successful re-verification, even with no
  wording change — that date bump *is* a legitimate edit, not "no changes". Stable
  structural facts keep their stamp until the fact itself changes (no new churn).
  Codified in `prompts/daily-official-doc-update.md` and the SKILL.md "Keep history
  out of doc bodies" rule.

### Changed

- **Billing status re-verified live 2026-06-24, unchanged.** The official support
  page banner still reads *"Update June 15: We're pausing the changes… nothing has
  changed: Claude Agent SDK, `claude -p`, and third-party app usage still draw from
  your subscription's usage limits."* Advanced every billing freshness stamp
  06-22 → 06-24 (`cli-invocation.md`, `cloud-automation.md`, `official-sources.json`,
  the daily prompt) and led the wording with the practical outcome (draws from the
  subscription pool, no separate per-run credit). The Antigravity SPA render stamps
  (06-22) were deliberately left untouched — they are structural, not re-rendered
  this run.
- **README billing made durable across all 7 editions.** Removed the self-rotting
  inline `as of <date>` from the human-facing READMEs (English + six translations),
  which were the source of per-day translation churn; they now state the durable
  fact and defer the dated verified status to `docs/cli-invocation.md` (the SSoT
  stamp).

## v1.13 — 2026-06-22

Daily re-verification of all 51 official sources (six WebFetch-able runtimes
fact-checked in parallel; all seven Antigravity SPA pages re-rendered
dynamically; both billing pages re-fetched live). Two real drifts corrected, the
Agent SDK billing change confirmed **still paused**, and verification stamps
refreshed.

### Fixed

- **Hermes `subagent_start` hook was missing.** The official hooks doc documents
  both `subagent_start` and `subagent_stop` plugin hooks; the repo enumerations
  listed only `subagent_stop`. Added `subagent_start` in `compatibility-matrix.md`,
  `plugin-packaging.md`, and the `nous-hermes-hooks` claims in
  `official-sources.json`.
- **Gemini "origin-path separators" was unsourced.** The official `gemini-md`
  page states only that it "concatenates the contents of all found files" and
  documents no separator/origin-marker format. Reworded to "separator format not
  documented" in `compatibility-matrix.md` and the `gemini-cli-gemini-md` claim in
  `official-sources.json`.

### Verified (no content change)

- **Agent SDK / `claude -p` billing still paused.** The 2026-06-15 change remains
  paused per the live support-page banner; subscription usage limits still cover
  Agent SDK, `claude -p`, and third-party app usage. Status dates moved
  2026-06-18 → 2026-06-22 in `cli-invocation.md` and `cloud-automation.md`.
- **All seven Antigravity SPA pages re-rendered with zero drift** (cli-reference,
  conversations, sdk-overview, plugins, using, install, gcli-migration); the
  documented MCP global-path inconsistency (`~/.gemini/config/` per migration vs
  `~/.gemini/antigravity-cli/` per plugins) still stands. Render stamps refreshed
  to 2026-06-22.
- Codex (13), Claude Code (10), Grok (2), Cursor (5), GitHub (2), and the Gemini
  transition blog re-verified against official docs with no drift.

## v1.12 — 2026-06-18

Full adversarial re-verification of every source against the official vendor docs
(7 WebFetch-able runtimes fact-checked in parallel; all 7 Antigravity SPA pages
re-rendered dynamically). The Antigravity surface confirmed with **zero drift**
from the 2026-06-16 render. Corrections and currency updates:

### Fixed

- **Grok session store was fabricated.** The Session Resume table claimed
  `~/.grok/active_sessions.json` with a `[{session_id, pid, cwd, opened_at}]`
  schema; the official headless-scripting doc documents only `~/.grok/sessions`
  and no such index. Corrected to `~/.grok/sessions` and the index marked
  `not documented`.
- **Unsourced "Apache 2.0" claim removed.** The Google transition blog does
  **not** mention Apache-2.0, the OSS repo's fate, or the `agy` binary name; those
  were attributed to the blog URL. De-attributed in `official-sources.json` and
  `cli-invocation.md` (the binary name stays sourced to the antigravity.google docs).
- **Gemini CLI cutoff shifted future → present.** 2026-06-18 (the individual
  cutoff) is today; `SKILL.md`, `cli-invocation.md`, `compatibility-matrix.md`,
  and `plugin-packaging.md` now read in present/past tense.
- **`check-official-sources.mjs` was failing since v1.11.** The `gemini-cli-gemini-md`
  source's host `google-gemini.github.io` was never added to `policy.allowedHosts`.
  Added it; the check passes (51 sources).
- **README billing was stale.** v1.10 paused the 2026-06-15 Agent SDK credit
  change everywhere except `README.md`, which still described it as in effect.
  Corrected (English + all six translations regenerated). The daily prompt's
  billing/cutoff instructions were likewise updated.
- **SKILL.md self-contradiction.** The taxonomy still said Claude documents "no
  Codex-style `.codex-plugin/plugin.json` equivalent"; Claude documents
  `.claude-plugin/plugin.json`. Fixed.
- **`/status` over-claimed.** The Pro/Max page references `/status` only for
  remaining-plan-allocation, not for revealing the active auth method. Reworded in
  `official-sources.json` and `cli-invocation.md`.
- **Codex plugins-overview claims trimmed.** The overview page lists only
  skills/apps/MCP servers; `marketplaces`/`hooks` were moved to the `plugins/build`
  source where they are actually documented.

### Changed (currency)

- **Cursor cloud-agent unsupported hook set expanded** to include
  `beforeMCPExecution`/`afterMCPExecution`, `afterAgentResponse`/`afterAgentThought`,
  and `stop` ("Not yet wired for cloud agents"); recorded `failClosed` default
  `false`, `loop_limit` default `5` (Cursor) / `null` (Claude Code), and the
  per-OS enterprise `hooks.json` paths.
- **Hermes:** added the `session:reset` gateway event and the
  `HERMES_ACCEPT_HOOKS=1` shell-hook bypass; appended `.cursor/rules/*.mdc` to the
  SKILL.md precedence summaries.
- **Codex:** documented the PreToolUse "only the simple ones" shell-coverage
  caveat, the lifecycle event set in the matrix, the `behavior`-field
  `PermissionRequest` hook (and `ask`/`approve` as "parsed but not yet supported"),
  and the `codex exec` automation flags (`--ephemeral`, `--output-schema`,
  `--ignore-rules`, `--ignore-user-config`, `CODEX_API_KEY`).
- **Grok:** documented hook env vars (`GROK_HOOK_*`), marketplace config sources
  (`[[marketplace.sources]]`, `known_marketplaces.json`, `--plugin-dir`).
- **Claude:** noted `claude setup-token` and `--output-format json` `total_cost_usd`
  for scripted/CI billing, the `--bare` API-key auth requirement, and the
  `skillOverrides` value set (`on`/`name-only`/`user-invocable-only`/`off`).
- All `Last reviewed:` / `verified` / dynamic-render stamps refreshed to
  2026-06-18; manifest `updated` → 2026-06-18.

## v1.11 — 2026-06-17

### Added — Project Instruction File Loading mechanics

The compat matrix recorded project-instruction *filenames* per engine but not how
each engine **discovers, merges, and times** those files. Added a dedicated
`docs/compatibility-matrix.md` → **Project Instruction File Loading** section (and
a condensed working model in `SKILL.md` → Project Instruction Files), source-cited
per engine along two axes — ancestor walk-up and subdirectory discovery
(upfront vs on-demand):

- **Claude Code** — ancestor chain (cwd → fs root) loaded **in full at launch**,
  concatenated root → cwd (closer wins); nested subdir `CLAUDE.md` loaded
  **on-demand** and not re-injected after `/compact` until touched again.
- **Codex** — walks *root → down to cwd*, ≤ 1 file/dir, closer overrides, built
  once per run under a 32 KiB cap, **no subdirectory lookahead**.
- **Gemini / Antigravity** — global + ancestor + **entire subtree below cwd
  concatenated upfront** (`.gitignore`-aware); `/memory show|reload`.
- **Hermes** — **single** project file, first-match (`.hermes.md` → `AGENTS.md`
  → `CLAUDE.md` → `.cursorrules`), no merge; on-demand dir + 5-parent discovery
  during file ops; `SOUL.md` always separate.
- **Cursor** — project-root `AGENTS.md`/`CLAUDE.md` only; tree-walk/merge
  **not documented**. **Grok** — Claude-compat claimed, tree semantics **unknown**.

New source `gemini-cli-gemini-md` added to `official-sources.json`; codex and
claude entries' claims augmented with the loading-mechanics keywords.

## v1.10 — 2026-06-16

### Changed

- **Agent SDK billing change paused.** The 2026-06-15 separate-monthly-credit
  change is paused; `claude -p` and Agent SDK usage still draw from the regular
  subscription limits. Corrected in `docs/cli-invocation.md`,
  `docs/cloud-automation.md`, and the `anthropic-*` billing sources.
- **Claude/Cursor refresh claims** folded in: new Claude hooks/settings/memory/
  sessions/plugins claims, Cursor tab hooks + cloud-agent hook restrictions, and
  the `/migrate-to-skills` command.

### Added — Antigravity CLI gathered by dynamic render

The daily automation marks `antigravity.google/docs/*` unreachable (JS-rendered
SPA → static fetch returns an empty shell). Rendered the pages dynamically and
folded in the verified truth, correcting drift:

- **Hooks now documented** (was "config format not verified"): pre/post-tool
  hooks live in a plugin's `hooks.json` or the primary `settings.json`, browsed
  via `/hooks`.
- **Native plugin layout documented**: `~/.gemini/antigravity-cli/plugins/<name>/`
  with `plugin.json` (required), `hooks.json`, `mcp_config.json`, `skills/`,
  `agents/`, `rules/`; managed by `agy plugin list/install/enable/disable/uninstall`.
- **Skill invocation corrected** (was "no typed invocation token"): registered
  skills auto-compile to typed `/<skill-name>` slash commands in the TUI.
- **Antigravity SDK** is the programmatic/headless path: `pip install
  google-antigravity`, Python `Agent`/`LocalAgentConfig`.
- New official sources tracked: `antigravity-cli-plugins`, `antigravity-cli-using`,
  `antigravity-cli-install`, `antigravity-sdk-overview`; existing three Antigravity
  sources stamped "verified by dynamic render 2026-06-16". Recorded the global
  `mcp_config.json` path inconsistency between Google's migration and plugins pages.

## v1.9 — 2026-06-13

### Changed

- **Project-local skills/hooks matrix refreshed.** Added a direct
  `docs/compatibility-matrix.md` table for project-specific skills and hooks:
  Codex, Claude Code, Grok, and Cursor are documented as project-local
  skills+hooks; Antigravity and Hermes are recorded as partial where official
  docs do not establish the same repo-local pair.
- **Claude Code packaging updated.** Claude now has documented
  `.claude-plugin/plugin.json` plugins, skills-directory plugins, plugin hooks,
  and project `.claude/skills/`; older "no cited Codex-style package format"
  wording was replaced with Claude's own plugin format.
- **Hermes and Cursor surfaces updated.** Hermes now records gateway hooks,
  shell hooks, plugin hooks, and `plugin.yaml` plugins with bundled skills.
  Cursor now records Agent Skills and project `.cursor/hooks.json` hooks.
- **Daily refresh PRs absorbed.** Folded in open PR #26, #27, and #28 factual
  updates: Codex hook gaps, Claude hook capabilities, Claude Agent SDK credit
  amounts, and corrected Claude settings claims.

### Added

- New official source entries for Codex skills/config, Claude plugins/reference,
  Hermes hooks/plugins/build-plugin, and Cursor skills/hooks.

## v1.8 — 2026-06-11

### Added

- **Multilingual README.** `README.ko/ja/zh-Hans/es/fr/de.md` generated from
  the English source (the SSoT) with a language switcher; regenerate via
  `kuma translate README.md --lang <code>` after editing the English file.
- **Identity icon.** `assets/icon.png` (hub-cube: one source-of-truth core
  radiating to seven runtime nodes) at the top of every README edition.

### Fixed

- **Auto-merge gate never fired.** `scripts/auto-merge-guard.sh` SAFE regex was
  whole-string anchored (`^(docs/|...)$`), so `docs/<file>` never matched and
  every daily-refresh PR stalled for human review. Regex fixed; PR #18 and
  #25 then merged through the gate.
- **Agent SDK billing claim corrected** (via PR #25): from 2026-06-15,
  `claude -p` / Agent SDK usage on eligible plans draws from a separate
  monthly Agent SDK credit — not plain per-token API billing. README and
  `docs/cloud-automation.md` aligned.

## v1.7 — 2026-06-10

### Added

- **Skill Invocation matrix.** New `docs/compatibility-matrix.md` → **Skill
  Invocation** section: per-runtime explicit (user-typed) invocation token and
  model-triggered invocation, source-cited (verified 2026-06-10). Key fact:
  Claude Code and Grok expose skills as `/<skill-name>`; Codex uses `/skills`
  or `$<skill-name>` — typed `/<skill-name>` is not a documented Codex form.
  `SKILL.md` Runtime Coverage gained the short working model.
- **Core rule: no host-layer slash surface.** Don't intercept keystrokes in a
  GUI/terminal wrapper to fake `/command` above the engine — it duplicates the
  engine-side skill's context resolution and assumes one invocation token
  across runtimes. (Trial-and-error 2026-06-10: kuma-studio WorkspaceTerminal
  `/kuma-plan` popover shipped and was removed the same day.)

## v1.6 — 2026-06-09

### Removed

- **Stale-checkout notifier + local installer rolled back.** Removed
  `scripts/notify-if-stale.sh` and `scripts/install-local.mjs`. The per-session
  `git fetch` (Claude `SessionStart`) and per-tool-call process fork (Codex
  `PreToolUse`) cost more than the convenience was worth for a repo that changes
  about once a day. **Remote auto-update stays** via the daily refresh +
  auto-merge gate; sync local checkouts with a plain `git pull`. The matcher and
  macOS-`timeout` lessons from v1.5 are kept in `SKILL.md` as runtime-compat
  knowledge, and manual symlink install remains in the Cross-Agent Install
  Pattern.

## v1.5 — 2026-06-09

### Fixed

- **Codex stale-hook never fired — matcher bug.** `install-local.mjs` registered
  the Codex `PreToolUse` hook with a Claude-style `"*"` matcher, but Codex
  matchers are **regex**, where `"*"` is invalid and matches nothing — so the hook
  silently never ran (confirmed with a probe hook: the event was never invoked).
  Changed to `".*"`. Documented the Claude (`"*"`/omit = all) vs. Codex (regex)
  matcher difference in `SKILL.md`. Claude `SessionStart` path was unaffected.
- **Stale notifier never fetched on macOS — `timeout` bug.** `notify-if-stale.sh`
  wrapped the fetch in `timeout 5`, but `timeout` (GNU coreutils) is absent on
  stock macOS, so it `command not found`-failed and `|| exit 0` made the hook
  silently skip every fetch — it never fired regardless of staleness. Now degrades
  `timeout` → `gtimeout` → plain `git fetch`.

## v1.4 — 2026-06-09

Local install automation for the two runtimes with stable install/hook surfaces
(Claude + Codex), and the stale notifier extended to cover Codex.

### Added

- **`scripts/install-local.mjs`** — local installer. `--runtime claude|codex|both`,
  `--link symlink|copy`, `--with-stale-hook`, `--dry-run`. Symlinks (or copies)
  the skill into `~/.<runtime>/skills/`, is idempotent, backs up any JSON it
  patches, and skips a runtime whose `~/.<runtime>` root is absent.

### Changed

- **Stale-checkout notifier now covers Codex.** `scripts/notify-if-stale.sh`
  auto-detects the hook event: Claude `SessionStart` (once per session) and Codex
  `PreToolUse` (per tool call, self-throttled ~6h via a stamp file). It injects
  `additionalContext` with no `permissionDecision`, so the tool call proceeds
  normally and nothing blocks. `install-local.mjs --with-stale-hook` registers it
  on the matrix-correct event per runtime. The `docs/cloud-automation.md` install
  section was rewritten around the installer; the notifier stays opt-in.

## v1.3 — 2026-06-09

Closes the daily-refresh loop: the routine can now merge its own docs-only PRs
behind a deterministic gate, and local checkouts get a nudge when they fall behind.

### Added

- **Auto-merge gate** (`scripts/auto-merge-guard.sh`): squash-merges a refresh PR
  **only when** the diff is docs/prose-only and `check-official-sources.mjs`
  passes; otherwise it leaves the PR open for human review. Merge authority sits
  on the shell gate's exit code, not the agent's judgement. Wired into
  `prompts/daily-official-doc-update.md` and documented in
  `docs/cloud-automation.md` (the lightweight "Option A" path — no GitHub Actions
  or branch protection required).
- **Stale-checkout notifier** (`scripts/notify-if-stale.sh`): a repo-scoped,
  read-only, non-blocking Claude Code `SessionStart` hook. Silent when the
  checkout is current or you are not in this repo; injects a one-line `git pull`
  heads-up as `additionalContext` when `origin/main` is ahead. Registered in
  `~/.claude/settings.json` (machine config, not in-repo).

### Changed

- Daily prompt + `README.md`: "you review and merge" → the auto-merge gate handles
  docs-only passes and everything else waits for review. `Do NOT push to main`
  softened to "no direct push; merge only via the gate after a PR".

## v1.2 — 2026-06-09

Repositioning release: the package is now framed as what it had already grown
into — a cross-runtime interoperability wiki plus the methodology to manage it.

### Changed

- **Repositioned as a cross-runtime agent-platform interoperability wiki +
  methodology.** `SKILL.md` and `README.md` now lead with the daily-refreshed
  7-runtime compatibility wiki (Codex, Claude Code, Grok, Hermes, Antigravity
  CLI, Cursor, Kuma Studio); the old "Four-Runtime Baseline" became "Runtime
  Coverage" listing all seven. The skill `name` stays `skill-hook-authoring`
  (install symlinks and the `cc-guard` hook depend on the id).

### Added

- **Billing capability domain.** New `kind: "billing"` sources in
  `docs/official-sources.json`: Claude Code subscription vs. API billing, and the
  **2026-06-15** change after which Agent SDK / `claude -p` (headless) usage no
  longer counts toward the Claude plan. Mirrored as a Billing caveat in
  `docs/cli-invocation.md` and a "Why not a local cron" block in
  `docs/cloud-automation.md`; the daily refresh now re-verifies the billing
  category.
- **History-out-of-bodies rule** in `SKILL.md` Core Rules and the daily prompt:
  changelog narrative lives in `CHANGELOG.md` + git tag, doc bodies state current
  truth only (a `Last reviewed:` / `verified` stamp is the lone dated exception).

### Fixed

- `README.md` daily-refresh branch prefix corrected `claude/` → `aldegad/` (the
  `cc-guard` hook rejects branch names containing `claude` or `codex`).

## v1.1 — 2026-06-06

A large doc release adding two capability domains (CLI spawn and session resume),
the Gemini CLI → Antigravity CLI transition, and stronger baseline guards.

### Added

- **CLI spawn & headless launch** — new `docs/cli-invocation.md`: per-runtime
  interactive launch vs non-interactive/headless run for Codex, Claude Code,
  Grok, Hermes, Antigravity CLI, and Cursor, including the mode-switch shape
  difference (flag `-p` vs separate subcommand `codex exec` vs SDK-only) and how
  to pin a specific session. Tracked as `kind: "cli-invocation"` sources.
- **Session Resume** — `SKILL.md` section + `docs/compatibility-matrix.md`
  Session Resume table: same-platform resume invocation, session store, and id
  form for Codex (CLI + app-server `thread/resume`), Claude, Grok, Hermes, and
  Antigravity. Tracked as `kind: "session-resume"` sources.
- **Google Antigravity CLI (`agy`)** as the Gemini CLI successor: interactive
  launch, `--continue` / `--conversation <uuid>` resume, and the
  `agy plugin import gemini` migration, all verified against `antigravity.google`
  (a JS-rendered SPA that needs dynamic rendering).
- **Baseline guards** in `scripts/check-official-sources.mjs` for the
  `cli-invocation` and `session-resume` source categories (codex + claude-code
  anchors), mirroring the existing project-instructions guard.
- Daily refresh (`prompts/daily-official-doc-update.md`) now re-verifies the CLI
  spawn and session-resume categories every run, with an Antigravity SPA-render
  caveat and a 2026-06-18 cutoff note.

### Changed

- **Gemini CLI removed as a tracked runtime** — it is retiring for AI Pro/Ultra
  and free individual users on **2026-06-18** (enterprise/Google Cloud retained;
  OSS repo stays Apache 2.0). Replaced by Antigravity CLI across `SKILL.md`,
  `docs/compatibility-matrix.md`, `docs/plugin-packaging.md`, and the manifest.
  The headless `agy -p` flag and a `GEMINI_API_KEY → AV_API_KEY` env swap are
  **excluded** as officially unconfirmed (third-party only).
- Claude Code settings/memory claims refreshed (auto-memory, `policyHelper`,
  `parentSettingsBehavior`, `httpHookAllowedEnvVars`, `forceLoginMethod`, …);
  skill `name`/`description` "no XML tags" constraint added; OpenAI skill bundle
  size limits recorded.
- Project Instruction Files baseline is now tracked by the daily refresh; the
  symlink-wrapper rule (edit the canonical `AGENTS.md`, treat `CLAUDE.md`
  symlinks as read-only) is documented.
- Cloud automation branch policy: `aldegad/`-prefixed branches (the `cc-guard`
  hook rejects branch names containing `claude` or `codex`).

## v1.0

Baseline: skill/hook authoring rules aligned with official Claude Code + Codex
specs — four-runtime baseline, plugin/extension packaging boundaries, project
instruction files, the `docs/official-sources.json` manifest, and the daily
official-docs refresh automation (Claude Routines, Codex App alternative).
