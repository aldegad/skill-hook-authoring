# Plugin And Extension Packaging

Last reviewed: 2026-06-09

## Shared Rule

Treat each runtime's package format as a separate adapter over the same canonical knowledge. The canonical instructions live in repo-owned source files; generated installs, plugin bundles, and home-directory copies are derived artifacts.

## Project Instruction Files

Project instruction filenames are runtime-specific and are not the same thing as skills, hooks, or plugin packaging:

- Codex uses `AGENTS.override.md`, `AGENTS.md`, and configured fallback filenames.
- Claude Code uses `CLAUDE.md` / `.claude/CLAUDE.md` / `CLAUDE.local.md`; when sharing with `AGENTS.md`-based agents, use `@AGENTS.md` import or a symlink.
- Grok documents the `AGENTS.md` instruction-file family: `AGENTS.md`, `Agents.md`, `AGENT.md`.
- Hermes documents `.hermes.md` / `HERMES.md`, `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, and `.cursor/rules/*.mdc`; `SOUL.md` is global identity, not project instructions.
- Antigravity CLI (the Gemini CLI successor, `agy`) reads `GEMINI.md` and `AGENTS.md`; global `~/.gemini/GEMINI.md`.
- Cursor CLI uses `.cursor/rules` plus project-root `AGENTS.md` and `CLAUDE.md`.

For cross-agent repos, prefer one canonical repo instruction source plus thin runtime wrappers/imports. Do not create parallel full copies unless the divergence is explicit and reviewed.

## Codex Plugins

Official Codex plugins have `.codex-plugin/plugin.json` at the plugin root. A plugin can point to bundled `skills`, `mcpServers`, `apps`, and `hooks`. Plugin hooks are not automatically trusted; users must review and trust hook definitions.

Do not migrate this repo into a Codex plugin layout until there is an explicit packaging plan. Moving `SKILL.md` into `skills/<id>/SKILL.md` would change the current root-level skill entrypoint, so it must be done atomically with installer and docs updates.

## Antigravity CLI (formerly Gemini CLI extensions)

**Gemini CLI is retiring** — for AI Pro/Ultra and free individual users it stops serving requests 2026-06-18 (enterprise/Google Cloud retained), and Antigravity CLI (`agy`) is the successor. The legacy Gemini extension model below is kept only to explain the migration.

Legacy Gemini CLI extensions installed under `~/.gemini/extensions/<name>` use `gemini-extension.json`. They can package MCP servers, a context file such as `GEMINI.md`, custom commands, and `excludeTools` rules. Gemini copies installed extensions unless `gemini extensions link` is used.

**Transition to Antigravity CLI.** Antigravity converts legacy Gemini extensions to native plugins via `agy plugin import gemini`, moves workspace skills from `.gemini/skills/` to `.agents/skills/`, and moves MCP servers out of `~/.gemini/settings.json` into a standalone `mcp_config.json` (global `~/.gemini/config/mcp_config.json`, workspace `.agents/mcp_config.json`) with the server URI key `url`/`httpUrl` renamed to `serverUrl`. Context files are unchanged: it still reads `GEMINI.md` and `AGENTS.md`. See `docs/cli-invocation.md` for the CLI surface and citations.

## Grok Plugins

xAI docs describe Grok plugins as bundles of skills, agents, hooks, MCP servers, and LSP servers. Grok also documents user, project, and plugin roots for skills and hooks, marketplace sources, Claude Code compatibility, and AGENTS.md compatibility.

Because Grok claims broad compatibility, keep this repo strict: compatibility text should cite the Grok docs and still verify behavior on the target Grok version before shipping hooks.

## Claude Code

The official Claude Code docs (now at code.claude.com as of 2026-05-27) cover hooks, settings, subagents, and a skills system where custom commands are merged into skills (`.claude/commands/` and `.claude/skills/`), following the agentskills.io open standard. Claude Code extends the standard with invocation control, subagent execution, and dynamic context injection. Plugin marketplace settings are now documented in official settings sources (`blockedMarketplaces`, `allowedChannelPlugins`, `skillOverrides`, `enabledPlugins`, `strictPluginOnlyCustomization`, `pluginTrustMessage`). (`enabledPlugins` appears in official docs as a field within plugin definitions; `allowedChannelPlugins` is the admin-level per-channel plugin allowlist. Skill-related settings include `disableSkillShellExecution`, `maxSkillDescriptionChars` (default 1536), and `skillListingBudgetFraction`. Hook/HTTP settings include `httpHookAllowedEnvVars` (allowlist of env var names HTTP hooks may interpolate into headers) and `allowManagedHooksOnly`. Managed settings include `policyHelper` (admin-deployed executable computing settings dynamically, v2.1.136+) and `parentSettingsBehavior` (v2.1.133+). Additional managed settings (verified 2026-06-08): `forceRemoteSettingsRefresh`, `allowManagedPermissionRulesOnly`, `allowManagedMcpServersOnly`, `requiredMinimumVersion`, `requiredMaximumVersion`. MCP approval settings (any scope): `enableAllProjectMcpServers`, `enabledMcpjsonServers`, `disabledMcpjsonServers`. Granular MCP server access (managed only): `allowedMcpServers` (allowlist), `deniedMcpServers` (denylist, takes precedence over allowlist). The `claudeMd` key (managed only) lets operators put managed CLAUDE.md content directly inside managed-settings.json instead of deploying a separate file. Auto-memory settings `autoMemoryEnabled` and `autoMemoryDirectory` are documented at code.claude.com/docs/en/memory; `claudeMdExcludes` lets users skip ancestor CLAUDE.md files by glob. Additional settings verified 2026-06-09: `channelsEnabled` (admin channels), `workflowKeywordTriggerEnabled` (v2.1.157+), `disableRemoteControl` (v2.1.128+), `attribution` (git attribution, replaces deprecated `includeCoAuthoredBy`), `minimumVersion` (non-managed downgrade guard). Source: https://code.claude.com/docs/en/settings and https://code.claude.com/docs/en/memory, verified 2026-06-09.) A dedicated plugin package format equivalent to Codex's `.codex-plugin/plugin.json` is not established in the cited sources, but skills and hooks can be configured through settings.json and skill frontmatter.

## Packaging Decision Gate

Before adding a generated plugin or extension package:

1. Name the canonical source path.
2. Name the generated install path.
3. Decide whether the installed form is a symlink, link-mode extension, or generated copy.
4. Add a validation command that proves the runtime discovers the package.
5. Add a rollback path that removes generated config without editing canonical files.
