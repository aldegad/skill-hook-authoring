# Plugin And Extension Packaging

Last reviewed: 2026-06-16

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

Claude Code now documents both standalone project customization and first-class plugins. Standalone `.claude/` is the project/personal quick-iteration surface: `.claude/skills/`, `.claude/commands/`, `.claude/settings.json`, and `.claude/settings.local.json`. Plugins use `.claude-plugin/plugin.json` and can bundle skills, agents, hooks, MCP servers, LSP servers, monitors, and a `bin/` directory whose executables are added to the Bash tool's `PATH`; plugin hooks live in `hooks/hooks.json` or inline plugin config; a `settings.json` at the plugin root can ship default `agent` and `subagentStatusLine` settings. A skill folder that contains `.claude-plugin/plugin.json` loads as a skills-directory plugin named `<name>@skills-dir`, and project `.claude/skills/` plugins require accepting workspace trust. Use standalone `.claude/` for one project, and a plugin when sharing, versioning, marketplace distribution, or namespaced `/plugin:skill` commands matter.

**Plugin development CLI.** `claude plugin init <name>` scaffolds a skills-directory plugin under `~/.claude/skills/<name>/`. The `--plugin-dir` flag accepts a `.zip` archive as well as a directory (from v2.1.128); `--plugin-url` loads a plugin from a remote URL for that session. Run `/reload-plugins` inside a session to pick up plugin edits without restarting. `claude plugin validate` runs the same structural checks that the marketplace submission pipeline uses.

Settings remain hierarchical: user `~/.claude/settings.json`, project `.claude/settings.json`, and local `.claude/settings.local.json`. Keep managed/plugin-marketplace policy details in the settings docs and this repo's source manifest; do not infer Codex `.codex-plugin` parity where Claude documents its own `.claude-plugin` format.

Current settings claims include `disableBundledSkills`. Older `workflowKeywordTriggerEnabled` and `strictPluginOnlyCustomization` claims are not retained because the current official settings docs no longer show them.

## Hermes Agent

Hermes documents several extension surfaces rather than one Codex-style package. Plugins live under `~/.hermes/plugins/<name>/` with `plugin.yaml` and Python `register(ctx)` code. Plugins can register tools, hooks, slash commands, CLI commands, and namespaced skills with `ctx.register_skill()`. General plugins are opt-in through `plugins.enabled` in `~/.hermes/config.yaml`.

Hermes hooks are split across three documented systems: gateway hooks under `~/.hermes/hooks/<name>/` (each a directory containing `HOOK.yaml` and `handler.py`), shell hooks declared in `hooks:` inside `~/.hermes/config.yaml`, and plugin hooks registered with `ctx.register_hook()`. Plugin hooks include control-flow hooks that can block or rewrite tool/LLM output (`pre_tool_call`, `pre_llm_call`, `transform_tool_result`, `transform_terminal_output`, `transform_llm_output`) and lifecycle observer hooks (`post_tool_call`, `post_llm_call`, `on_session_start`, `on_session_end`, `on_session_finalize`, `on_session_reset`, `subagent_stop`), plus gateway-specific hooks (`pre_gateway_dispatch`, `pre_approval_request`, `post_approval_response`). Shell hooks require an approval dialog the first time each `(event, command)` pair runs; decisions persist to `~/.hermes/shell-hooks-allowlist.json`. In the cited sources, Hermes does not document a repo-walked project-local skill root or project-local hook directory equivalent to `.agents/skills/` plus `.codex/hooks.json`; for one-project custom behavior, use a plugin or explicit config entry and document the install path.

## Cursor CLI

Cursor documents Agent Skills and Hooks as first-class surfaces. Skills load from project `.agents/skills/` and `.cursor/skills/`, user `~/.agents/skills/` and `~/.cursor/skills/`, and compatibility roots for Claude/Codex skills. Skills may be slash-invoked from Agent chat, auto-applied by context, scoped with `paths`, or made explicit-only with `disable-model-invocation: true`.

Hooks are configured at four scopes in priority order: enterprise (MDM-managed system-wide), team (Enterprise cloud dashboard), project (`<project-root>/.cursor/hooks.json`, committable to version control), and user (`~/.cursor/hooks.json`). Cloud agents load project hooks; team and enterprise hooks are distributed via the dashboard. Cursor documents events for sessions, tool-use, subagents, shell/MCP execution, file access, prompt submission, agent responses, Tab inline-completion hooks (`beforeTabFileRead`, `afterTabFileEdit`), compaction, and workspace startup — a broader event set than prior reviews captured; cloud agents do not support `sessionStart`, `sessionEnd`, `beforeSubmitPrompt`, Tab hooks, or `workspaceOpen`. Keep Cursor's hook schema separate from Claude/Codex schemas even when event names look similar.

## Packaging Decision Gate

Before adding a generated plugin or extension package:

1. Name the canonical source path.
2. Name the generated install path.
3. Decide whether the installed form is a symlink, link-mode extension, or generated copy.
4. Add a validation command that proves the runtime discovers the package.
5. Add a rollback path that removes generated config without editing canonical files.
