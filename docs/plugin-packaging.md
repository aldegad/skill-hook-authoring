# Plugin And Extension Packaging

Last reviewed: 2026-05-27

## Shared Rule

Treat each runtime's package format as a separate adapter over the same canonical knowledge. The canonical instructions live in repo-owned source files; generated installs, plugin bundles, and home-directory copies are derived artifacts.

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

The official Claude Code docs (now at code.claude.com as of 2026-05-27) cover hooks, settings, subagents, and a skills system where custom commands are merged into skills (`.claude/commands/` and `.claude/skills/`), following the agentskills.io open standard. Plugin marketplace settings are now documented in official settings sources (`blockedMarketplaces`, `skillOverrides`, `enabledPlugins`, `strictPluginOnlyCustomization`, `pluginTrustMessage`). A dedicated plugin package format equivalent to Codex's `.codex-plugin/plugin.json` is not established in the cited sources, but skills and hooks can be configured through settings.json and skill frontmatter.

## Packaging Decision Gate

Before adding a generated plugin or extension package:

1. Name the canonical source path.
2. Name the generated install path.
3. Decide whether the installed form is a symlink, link-mode extension, or generated copy.
4. Add a validation command that proves the runtime discovers the package.
5. Add a rollback path that removes generated config without editing canonical files.
