# Daily Official Docs Update

Use `$skill-hook-authoring`.

You are maintaining the skill-hook-authoring knowledge-base skill so it stays
accurate against official vendor documentation. This runs daily and starts with
zero context, so follow these steps exactly.

**SOURCE OF TRUTH:** Read `docs/official-sources.json` in this repo. ONLY fetch
the official vendor docs URLs listed there. Do NOT use blogs, Reddit, unofficial
mirrors, or guesses. No speculation. If a URL in that file 403s or is
unreachable from this environment, record it as `unverified this run` in your
summary rather than substituting another source.

**WHAT TO CHECK** across these agents/products: OpenAI Codex, Claude / Claude
Code, Grok/xAI, Google Antigravity CLI (`agy`, the Gemini CLI successor; Gemini
CLI itself retires for individual users 2026-06-18), Cursor, Hermes Agent, Kuma
Studio. For each, review: supported-agent docs, plugin/extension docs,
project-instruction / context-file docs, CLI spawn (interactive vs headless
launch) docs, session-resume docs, compatibility matrix, and Kuma Studio pattern
docs. If an official doc confirms a feature difference or that something is
unavailable, state that explicitly in the docs.

**PROJECT INSTRUCTION FILES — do not skip this category.** It is not skills,
hooks, or plugin packaging, so it is easy to miss. Every source in
`docs/official-sources.json` with `"kind": "project-instructions"` — and any
instruction-file claims such as `AGENTS.override.md`, `AGENTS.md`, `CLAUDE.md`,
`GEMINI.md`, `.hermes.md` / `HERMES.md`, or `.cursor/rules` — MUST be fetched and
re-verified every run. If the official docs changed which filenames a runtime
reads, their priority order, or which file is project vs. global identity, treat
the **Project Instruction Files** baseline as drifted and update all three
mirrors so they stay consistent: the `## Project Instruction Files` sections in
`SKILL.md` and `docs/plugin-packaging.md`, plus the **Project instructions**
column of `docs/compatibility-matrix.md`. Do not infer a filename for one runtime
from another — cite the runtime's own official doc.

**SESSION RESUME — do not skip this category.** Like project-instruction files,
it is a capability domain that is easy to miss because it is not skills, hooks,
or plugin packaging. Every source in `docs/official-sources.json` with
`"kind": "session-resume"` MUST be fetched and re-verified every run. For each
runtime confirm the resume invocation (e.g. `--resume`/`resume`/`thread/resume`),
the session-store location, and the session-id form. If the official docs changed
any of these, treat the **Session Resume** baseline as drifted and update both
mirrors so they stay consistent: the `## Session Resume` section of `SKILL.md` and
the `## Session Resume` table in `docs/compatibility-matrix.md`. Cite the
runtime's own official doc; do not infer one runtime's resume mechanism from
another.

**CLI SPAWN (HEADLESS LAUNCH) — do not skip this category.** Every source in
`docs/official-sources.json` with `"kind": "cli-invocation"` MUST be fetched and
re-verified every run: the interactive launch command, the non-interactive /
headless command (`claude -p`, `codex exec`, `grok -p`, `hermes chat -q`,
`cursor-agent -p`, or for Antigravity the lack of a headless flag), and the
output-format flags. If the official docs changed a spawn flag or output format,
treat the **CLI Spawn And Headless Launch** baseline as drifted and update both
mirrors: the `## CLI Spawn And Headless Launch` section of `SKILL.md` and the
launch/headless tables in `docs/cli-invocation.md`. The Antigravity docs
(`antigravity.google`) are a JS-rendered SPA — a static fetch returns an empty
shell, so treat a 200 with no content as `unverified this run` and render it
dynamically before claiming a change. The **2026-06-18 Gemini CLI individual
cutoff** has now passed (reached 2026-06-18), so keep legacy Gemini references in
past tense and retire any that are stale; record any capability the official docs
do not cover as `not documented`.

**BILLING / PLAN USAGE — do not skip this category.** Every source in
`docs/official-sources.json` with `"kind": "billing"` MUST be fetched and
re-verified every run: which usage the Pro/Max subscription covers vs. what bills
as API, whether a present `ANTHROPIC_API_KEY` switches Claude Code to API billing,
and the status of the **2026-06-15** Agent SDK / `claude -p` plan-usage change.
As of 2026-06-25 that change is **paused** (Agent SDK and `claude -p` still draw
from the subscription usage limits, same as interactive use — no separate per-run
credit). Confirm each run whether it is still paused, resumed, or cancelled, and
keep the status + date current. This is a **time-sensitive status claim**: advance
its `verified` / `as of` date on every successful re-verification even when the
status word is unchanged (see the freshness-stamp rule under **IF THERE ARE NO
CHANGES**), because a "paused" status that reads as months-old looks wrong even
when it is still true. If the official docs change any of this, update the billing caveat in
both mirrors so they stay consistent: the **Billing caveat** note in
`docs/cli-invocation.md` and the **"Why not a local cron"** block in
`docs/cloud-automation.md`.

**IF THERE ARE CHANGES:** make small, reviewable edits to the repo docs. Cite the
official source URL in the docs or in the PR body. Run
`node scripts/check-official-sources.mjs --write-report`. Do NOT push to `main`
directly. Create a pull request from an `aldegad/`-prefixed branch (the `cc-guard`
hook rejects branch names containing `claude` or `codex`). **Keep history out of
the doc bodies:** record the change narrative in `CHANGELOG.md` (with the git tag)
— `SKILL.md` and `docs/*` state current truth only, so replace a changed fact
rather than appending the old one. A `Last reviewed:` / `verified` stamp is the
only dated line allowed in a doc body.

**AUTO-MERGE GATE.** After opening the PR, run
`scripts/auto-merge-guard.sh <PR_NUMBER>`. The guard squash-merges the PR **only
if** the diff is docs/prose-only and `check-official-sources.mjs` passes;
otherwise it exits non-zero and leaves the PR open. Merge **only** on the guard's
exit 0 — never by your own judgement. If the guard declines (it touched code,
installers, hooks, or config, or a check failed), stop and leave the PR for a
human to review. This keeps merge authority on a deterministic gate, not on the
agent's reasoning.

**IF THERE ARE NO CHANGES:** do not modify any file — **with one exception, the
freshness-stamp rule.** A `verified` / `Last reviewed:` / `as of <date>` stamp is
provenance for a *live* claim, not static prose: its whole job is to say "this was
re-checked on this date." So when you re-fetch a **time-sensitive status claim**
(a status that can flip between runs — billing paused/resumed/cancelled, an
announced-but-not-yet-effective cutoff, any "currently X" / "as of <date>" status)
and it is unchanged, you MUST still advance that claim's date stamp to today and
the doc-level `Last reviewed:` to today. That date bump *is* a legitimate content
change — open the small PR for it; it is not "no changes". Do NOT advance stamps on
stable structural facts (e.g. `codex exec` is the headless command) — those keep
their stamp until the fact itself changes, so the refresh stays low-noise. The
billing **paused** status and any dated cutoff are the canonical time-sensitive
claims; keep their stamps current every run so a still-true status never rots into
looking wrong. Outside that exception, leave a short no-op summary only.

**HARD CONSTRAINTS:** Do NOT modify `~/.codex`, `~/.claude`, or any local skill
install path. Do NOT modify local machine config. Do NOT push to `main` directly — merge only
via `scripts/auto-merge-guard.sh` after a PR. Do NOT use OpenAI API keys or
GitHub Actions secrets. If you need to widen scope beyond
this, stop and ask instead of guessing.
