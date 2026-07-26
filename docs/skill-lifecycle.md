# Skill Lifecycle — Disable / Scope / Retire

Three operations that all make a skill stop appearing, with three different mechanisms.
Picking the wrong one either drifts from the manifest or destroys something meant to be kept.
Decide by asking **why** it should stop.

| Why | Operation | Mechanism | Reversal |
|---|---|---|---|
| "I don't use it right now" | **Disable** | Keep `skills.json` and the symlinks; turn it off per engine | Undo that one entry/move |
| "It cannot work on that engine" | **Scope** | `engines: { <engine>: "<path>" }` in the `skills.json` entry — an omitted engine key means *not installed there* | Delete the `engines` key |
| "It should not exist" | **Retire** | `SKILL.md` → *Retiring Or Renaming Artifacts* checklist | Git history |

## Disable — per-engine, never the manifest

| Engine | Mechanism |
|---|---|
| Claude Code | `skillOverrides: { "<id>": "off" }` in `~/.claude/settings.json` |
| Grok | move `~/.grok/skills/<id>` → `~/.grok/skills-disabled/<id>` |
| Codex / Hermes | no documented per-skill toggle — scope via `engines`, or retire |

- **Disable is not `engines: {}`.** Emptying `engines` deregisters the skill from every
  engine, which asserts in the manifest that the skill has **no valid runtime** — a false
  statement about the skill, and it drops the record of why it is off. Enablement is a user
  preference and belongs in the engine's own settings; `skills.json` stays a pure
  registration record of *what exists and where it can run*.
- **Hand-deleting a symlink is not a disable.** The next `install-local.mjs` run recreates it.
  Disabling leaves the installer in charge of the link and costs nothing to reverse.

## Scope — a claim about the skill, not about you

Use `engines` only when the skill genuinely cannot function elsewhere: it reads an
engine-native path, requires that engine's feature, or ships an engine-specific flavor.
Installing it elsewhere would register a skill that can never fire. Record the reason in
the entry `note`.

## Verify

`node scripts/install/install-local.mjs --dry-run` prints exactly which engine roots each
entry lands in. Check it before shipping any of the three operations, and after a retire
confirm the installer does not recreate the artifact.
