# Daily Official Docs Update

Use `$skill-hook-authoring`.

Update this repository's agent compatibility documentation from official vendor documentation only.

## Sources

Read `docs/official-sources.json`. Treat it as the source manifest. Do not use unofficial docs, blog summaries, Reddit, generated mirrors, or general web search results for compatibility claims.

## Tasks

1. Run `node scripts/check-official-sources.mjs --write-report`.
2. Fetch the official URLs listed in `docs/official-sources.json`.
3. Compare the current docs against the fetched official evidence.
4. Update only repo-owned canonical docs when evidence changed:
   - `docs/compatibility-matrix.md`
   - `docs/plugin-packaging.md`
   - `docs/kuma-studio-patterns.md` only when public Kuma methodology changed in this repo
   - `SKILL.md` only for stable entrypoint guidance
5. Preserve explicit differences between platforms. Do not force one platform's terminology onto another.
6. If a feature is not documented by the vendor source, write `not documented` or `unknown`.
7. Do not edit installed home-directory copies such as `~/.codex`, `~/.claude`, `~/.grok`, `~/.gemini`, or `~/.cursor`.
8. Run `node scripts/check-official-sources.mjs --write-report` again after edits.

## Output

If no evidence changed, leave no file edits.

If files changed, summarize:

- official sources checked
- changed claims
- validation result
- any claims left as unknown
