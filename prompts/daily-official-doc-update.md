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
review: supported-agent docs, plugin/extension docs, compatibility matrix, and
Kuma Studio pattern docs. If an official doc confirms a feature difference or
that something is unavailable, state that explicitly in the docs.

**IF THERE ARE CHANGES:** make small, reviewable edits to the repo docs. Cite the
official source URL in the docs or in the PR body. Run
`node scripts/check-official-sources.mjs --write-report`. Do NOT push to main.
Create a pull request from a `claude/`-prefixed branch.

**IF THERE ARE NO CHANGES:** do not modify any file. Leave a short no-op summary
only.

**HARD CONSTRAINTS:** Do NOT modify `~/.codex`, `~/.claude`, or any local skill
install path. Do NOT modify local machine config. Do NOT push to main. Do NOT use
OpenAI API keys or GitHub Actions secrets. If you need to widen scope beyond
this, stop and ask instead of guessing.
