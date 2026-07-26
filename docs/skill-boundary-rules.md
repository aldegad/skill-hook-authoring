# Skill Boundary Rules

Last reviewed: 2026-07-26

Where a piece of truth belongs once it stops being a one-off: a skill, or the
knowledge vault. Moved here from the Kuma vault (`operational-rules/memory-vault.md`,
source `memory-migration-2026-04-09`, revised 2026-04-28) when that folder was
dissolved; the memory-vs-vault SSoT decision itself lives in kuma-studio
`DECISIONS.md`.

## Rules

1. Put repeated patterns into skills and knowledge into vault.
   - Why: reusable procedure belongs with executable guidance, while reference material belongs in the vault.
   - How to apply: turn repeated workflows into skills and keep supporting knowledge in vault pages.
2. Use `kuma:` as the prefix for Kuma knowledge skills.
   - Why: the prefix keeps the skill namespace clear and scannable.
   - How to apply: name Kuma knowledge skills with the `kuma:` prefix.
3. Keep plugin terminology clean.
   - Why: plugin, skill, project, and surface labels are easy to blur together.
   - How to apply: describe the actual layer in use and avoid mixing terminology.
4. Do not depend on Claude Code skill icons or image metadata being available.
   - Why: the skill list still needs to function with names alone when icon support is missing.
   - How to apply: use the skill name as the stable identifier and treat icons as optional decoration only.
5. Keep every `SKILL.md` starting with YAML frontmatter.
   - Why: skills without frontmatter are harder to index, harder to validate, and drift from the catalog contract.
   - How to apply: scan both the repo and linked `~/.claude/skills` copies, add `---` metadata blocks where missing, and verify the linked copies stay in sync.
