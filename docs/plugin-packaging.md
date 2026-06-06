# Plugin And Extension Packaging

Last reviewed: 2026-06-06

## Shared Rule

Treat each runtime's package format as a separate adapter over the same canonical knowledge. The canonical instructions live in repo-owned source files; generated installs, plugin bundles, and home-directory copies are derived artifacts.

## Project Instruction Files

Project instruction filenames are runtime-specific and are not the same thing as skills, hooks, or plugin packaging:

- Codex uses `AGENTS.override.md`, `AGENTS.md`, and configured fallback filenames.
- Claude Code uses `CLAUDE.md` / `.claude/CLAUDE.md` / `CLAUDE.local.md`; when sharing with `AGENTS.md`-based agents, use `@AGENTS.md` import or a symlink.
- Grok documents the `AGENTS.md` instruction-file family: `AGENTS.md`, `Agents.md`, `AGENT.md`.
- Hermes documents `.hermes.md` / `HERMES.md`, `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, and `.cursor/rules/*.mdc`; `SOUL.md` is global identity, not project instructions.
- Gemini CLI uses `GEMINI.md` hierarchical memory.
- Cursor CLI uses `.cursor/rules` plus project-root `AGENTS.md` and `CLAUDE.md`.

For cross-agent repos, prefer one canonical repo instruction source plus thin runtime wrappers/imports. Do not create parallel full copies unless the divergence is explicit and reviewed.

## Codex Plugins

Official Codex plugins have `.codex-plugin/plugin.json` at the plugin root. A plugin can point to bundled `skills`, `mcpServers`, `apps`, and `hooks`. Plugin hooks are not automatically trusted; users must review and trust hook definitions.

Do not migrate this repo into a Codex plugin layout until there is an explicit packaging plan. Moving `SKILL.md` into `skills/<id>/SKILL.md` would change the current root-level skill entrypoint, so it must be done atomically with installer and docs updates.

## Gemini CLI Extensions

Gemini CLI extensions are installed under `~/.gemini/extensions/<name>` and use `gemini-extension.json`. They can package MCP servers, a context file such as `GEMINI.md`, custom commands, and `excludeTools` rules.

Gemini copies installed extensions unless `gemini extensions link` is used. For repo-owned development, use link mode to avoid editing generated copies.

## Grok Plugins

xAI docs describe Grok plugins as bundles of skills, agents, hooks, MCP servers, and LSP servers. Grok also documents user, project, and plugin roots for skills and hooks, marketplace sources, Claude Code compatibility, and AGENTS.md compatibility.

Because Grok claims broad compatibility, keep this repo strict: compatibility text should cite the Grok docs and still verify behavior on the target Grok version before shipping hooks.

## Claude Code

The official Claude Code docs (now at code.claude.com as of 2026-05-27) cover hooks, settings, subagents, and a skills system where custom commands are merged into skills (`.claude/commands/` and `.claude/skills/`), following the agentskills.io open standard. Claude Code extends the standard with invocation control, subagent execution, and dynamic context injection. Plugin marketplace settings are now documented in official settings sources (`blockedMarketplaces`, `allowedChannelPlugins`, `skillOverrides`, `enabledPlugins`, `strictPluginOnlyCustomization`, `pluginTrustMessage`). (`enabledPlugins` appears in official docs as a field within plugin definitions; `allowedChannelPlugins` is the admin-level per-channel plugin allowlist. Skill-related settings include `disableSkillShellExecution`, `maxSkillDescriptionChars` (default 1536), and `skillListingBudgetFraction`. Hook/HTTP settings include `httpHookAllowedEnvVars` (allowlist of env var names HTTP hooks may interpolate into headers) and `allowManagedHooksOnly`. Managed settings include `policyHelper` (admin-deployed executable computing settings dynamically, v2.1.136+) and `parentSettingsBehavior` (v2.1.133+). Auto-memory settings `autoMemoryEnabled` and `autoMemoryDirectory` are documented at code.claude.com/docs/en/memory; `claudeMdExcludes` lets users skip ancestor CLAUDE.md files by glob. Source: https://code.claude.com/docs/en/settings and https://code.claude.com/docs/en/memory, verified 2026-06-06.) A dedicated plugin package format equivalent to Codex's `.codex-plugin/plugin.json` is not established in the cited sources, but skills and hooks can be configured through settings.json and skill frontmatter.

## Packaging Decision Gate

Before adding a generated plugin or extension package:

1. Name the canonical source path.
2. Name the generated install path.
3. Decide whether the installed form is a symlink, link-mode extension, or generated copy.
4. Add a validation command that proves the runtime discovers the package.
5. Add a rollback path that removes generated config without editing canonical files.
