# Cursor CLI — model lineup

Official source: https://docs.cursor.com/models
Last reviewed: 2026-07-02 (**`unverified this run`** — Cursor routes to
third-party frontier models rather than shipping its own; the concrete
selectable set must be confirmed against `docs.cursor.com` by the daily refresh.)

## Current model access (seed — verify against official docs)

- Cursor CLI (`cursor-agent`) selects from **third-party frontier models**
  (Anthropic Claude, OpenAI GPT, Google Gemini, xAI Grok families) rather than a
  Cursor-owned model. There is no distinct "Cursor model id" to ship — the
  selectable list mirrors whichever provider models Cursor currently exposes.
- The exact model menu and any "auto" / default selection are
  `unverified this run`; cite `docs.cursor.com` for the current list rather than
  copying another runtime's ids.

## Retired / superseded

- `unverified this run` — track model availability changes from the Cursor docs.

## Boundaries

- **Pricing / limits:** Cursor pricing docs.
- These are the **same upstream models** covered by `claude.md` / `codex.md` /
  `grok.md` / `gemini-antigravity.md`; this file records only Cursor's access to
  them, not a separate lineup.
