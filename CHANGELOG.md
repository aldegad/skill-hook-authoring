# Changelog

All notable changes to the `skill-hook-authoring` package. This repo has no
package manifest, so the **git tag plus this file are the version record**
(the official Claude SKILL.md frontmatter documents only `name` and
`description`, so the version is intentionally not stamped there).

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
