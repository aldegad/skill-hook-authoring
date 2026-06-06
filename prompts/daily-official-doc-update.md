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
Code, Grok/xAI, Gemini / Gemini CLI, Cursor, Hermes Agent, Kuma Studio. For each,
review: supported-agent docs, plugin/extension docs, project-instruction /
context-file docs, session-resume docs, compatibility matrix, and Kuma Studio
pattern docs. If an official doc confirms a feature difference or that something
is unavailable, state that explicitly in the docs.

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

**IF THERE ARE CHANGES:** make small, reviewable edits to the repo docs. Cite the
official source URL in the docs or in the PR body. Run
`node scripts/check-official-sources.mjs --write-report`. Do NOT push to main.
Create a pull request from an `aldegad/`-prefixed branch (the `cc-guard` hook
rejects branch names containing `claude` or `codex`).

**IF THERE ARE NO CHANGES:** do not modify any file. Leave a short no-op summary
only.

**HARD CONSTRAINTS:** Do NOT modify `~/.codex`, `~/.claude`, or any local skill
install path. Do NOT modify local machine config. Do NOT push to main. Do NOT use
OpenAI API keys or GitHub Actions secrets. If you need to widen scope beyond
this, stop and ask instead of guessing.
