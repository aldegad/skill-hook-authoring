# Plugin And Extension Packaging

Last reviewed: 2026-07-07

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
- gajae-code (`gjc`, community) documents **no** project-instruction-file loader; its config is `~/.gjc/config.yml` (user) plus a per-project `.gjc/` state dir. Do not assume it reads `AGENTS.md`/`CLAUDE.md`.

For cross-agent repos, prefer one canonical repo instruction source plus thin runtime wrappers/imports. Do not create parallel full copies unless the divergence is explicit and reviewed.

## Codex Plugins

Official Codex plugins have `.codex-plugin/plugin.json` at the plugin root. A plugin can point to bundled `skills`, `mcpServers`, `apps`, and `hooks` (the `hooks` field accepts a single path, an array of paths, an inline hooks object, or an array of inline hooks objects; the default hook file is `hooks/hooks.json`, and `${PLUGIN_ROOT}` substitution is available in hook commands). Plugin hook commands receive the Codex-specific environment variables `PLUGIN_ROOT` (installed plugin root) and `PLUGIN_DATA` (writable data directory); Codex also sets `CLAUDE_PLUGIN_ROOT` and `CLAUDE_PLUGIN_DATA` "for compatibility with existing plugin hooks". Plugin hooks are not automatically trusted; users must review and trust hook definitions. Marketplace files are read from repo `$REPO_ROOT/.agents/plugins/marketplace.json`, a legacy-compatible `$REPO_ROOT/.claude-plugin/marketplace.json`, and personal `~/.agents/plugins/marketplace.json`; `codex plugin marketplace add/list/upgrade/remove` manages tracked sources, and installs land in `~/.codex/plugins/cache/<marketplace>/<plugin>/<version>/` (`local` as the version for local plugins).

Do not migrate this repo into a Codex plugin layout until there is an explicit packaging plan. Moving `SKILL.md` into `skills/<id>/SKILL.md` would change the current root-level skill entrypoint, so it must be done atomically with installer and docs updates.

## Antigravity CLI (formerly Gemini CLI extensions)

**Gemini CLI is retired** — for AI Pro/Ultra and free individual users it has stopped serving requests as of 2026-06-18 (enterprise/Google Cloud retained), and Antigravity CLI (`agy`) is the successor. The native Antigravity plugin format below is the current packaging surface; the legacy Gemini extension model is kept only to explain the migration.

**Native Antigravity plugins.** A plugin is a namespaced bundle staged under `~/.gemini/antigravity-cli/plugins/<name>/`:

```text
~/.gemini/antigravity-cli/plugins/<name>/
├── plugin.json        # required package marker
├── mcp_config.json    # optional MCP servers
├── hooks.json         # optional pre/post tool event hooks
├── skills/            # optional skills (compile to /<skill-name> slash commands)
├── agents/            # optional subagent templates
└── rules/             # optional codebase rules
```

Manage plugins with `agy plugin list`, `agy plugin install <path>`, `agy plugin enable`/`disable <name>`, and `agy plugin uninstall <name>`. Hooks are pre/post-tool (e.g. a pre-flight check or a post-write formatter), declared either in a plugin's `hooks.json` or the primary `~/.gemini/antigravity-cli/settings.json`, and browsable in the TUI with `/hooks`. Workspace-local skills live in `.agents/skills/` (global `~/.gemini/antigravity-cli/skills/`) and compile to typed `/<skill-name>` slash commands on launch; MCP servers live in a standalone `mcp_config.json` (workspace `.agents/mcp_config.json`) using the `serverUrl` key (`url`/`httpUrl` unsupported — paths and key per the migration page; the plugins page now defers MCP config to a dedicated MCP docs page). `plugin.json` documents a `$schema` (`https://antigravity.google/schemas/v1/plugin.json`) with only `name` required. (Verified by dynamic render of the JS-rendered docs, 2026-07-04.)

**Legacy Gemini extensions and migration.** Legacy Gemini CLI extensions installed under `~/.gemini/extensions/<name>` use `gemini-extension.json` and can package MCP servers, a context file such as `GEMINI.md`, custom commands, and `excludeTools` rules (copied unless `gemini extensions link` is used). `agy plugin import gemini` converts them to native plugins — parsing the extension manifests, converting legacy commands to skills, and migrating MCP server definitions — and first launch offers the same auto-conversion. Workspace skills move `.gemini/skills/` → `.agents/skills/`; MCP moves out of `~/.gemini/settings.json` into a standalone `mcp_config.json` (workspace `.agents/mcp_config.json`, global `~/.gemini/config/mcp_config.json` per the migration page — the earlier cross-page global-path inconsistency is resolved now that the plugins page defers MCP paths to a dedicated MCP docs page) with `url`/`httpUrl` renamed to `serverUrl`. Context files are unchanged: it still reads `GEMINI.md` and `AGENTS.md`. See `docs/cli-invocation.md` for the CLI surface and citations.

## Grok Plugins

xAI docs describe Grok plugins as bundles of skills, agents, hooks, MCP servers, and LSP servers. Grok also documents user, project, and plugin roots for skills and hooks, marketplace sources, Claude Code compatibility, and AGENTS.md compatibility. Marketplaces are configured via `[[marketplace.sources]]` in `~/.grok/config.toml`, `~/.grok/plugins/known_marketplaces.json`, and the `--plugin-dir <path>` flag; hooks receive `GROK_HOOK_EVENT`, `GROK_HOOK_NAME`, `GROK_SESSION_ID`, `GROK_WORKSPACE_ROOT` (plus `GROK_PLUGIN_ROOT`/`GROK_PLUGIN_DATA` for plugin hooks), and project `.grok/hooks/` requires `/hooks-trust`.

Because Grok claims broad compatibility, keep this repo strict: compatibility text should cite the Grok docs and still verify behavior on the target Grok version before shipping hooks.

## Claude Code

Claude Code now documents both standalone project customization and first-class plugins. Standalone `.claude/` is the project/personal quick-iteration surface: `.claude/skills/`, `.claude/commands/`, `.claude/settings.json`, and `.claude/settings.local.json`. Plugins use `.claude-plugin/plugin.json` and can bundle skills, agents, hooks, MCP servers, LSP servers, monitors, and a `bin/` directory whose executables are added to the Bash tool's `PATH`; plugin hooks live in `hooks/hooks.json` or inline plugin config; a `settings.json` at the plugin root can ship default `agent` and `subagentStatusLine` settings. A skill folder that contains `.claude-plugin/plugin.json` loads as a skills-directory plugin named `<name>@skills-dir`, and project `.claude/skills/` plugins require accepting workspace trust. Use standalone `.claude/` for one project, and a plugin when sharing, versioning, marketplace distribution, or namespaced `/plugin:skill` commands matter.

**Plugin development CLI.** `claude plugin init <name>` scaffolds a skills-directory plugin under `~/.claude/skills/<name>/`. The `--plugin-dir` flag accepts a `.zip` archive as well as a directory (from v2.1.128); `--plugin-url` loads a plugin from a remote URL for that session. Run `/reload-plugins` inside a session to pick up plugin edits without restarting. `claude plugin validate` runs the same structural checks that the marketplace submission pipeline uses.

Settings remain hierarchical: user `~/.claude/settings.json`, project `.claude/settings.json`, and local `.claude/settings.local.json`. Keep managed/plugin-marketplace policy details in the settings docs and this repo's source manifest; do not infer Codex `.codex-plugin` parity where Claude documents its own `.claude-plugin` format.

Current settings claims include `disableBundledSkills`. Older `workflowKeywordTriggerEnabled` and `strictPluginOnlyCustomization` claims are not retained because the current official settings docs no longer show them.

## Hermes Agent

Hermes documents several extension surfaces rather than one Codex-style package. Plugins live under `~/.hermes/plugins/<name>/` with `plugin.yaml` and Python `register(ctx)` code. Plugins can register tools, hooks, slash commands, CLI commands, and namespaced skills with `ctx.register_skill()`. General plugins are opt-in through `plugins.enabled` in `~/.hermes/config.yaml`.

Hermes hooks are split across three documented systems: gateway hooks under `~/.hermes/hooks/<name>/` (each a directory containing `HOOK.yaml` and `handler.py`), shell hooks declared in `hooks:` inside `~/.hermes/config.yaml`, and plugin hooks registered with `ctx.register_hook()`. Plugin hooks include control-flow hooks that can block or rewrite tool/LLM output (`pre_tool_call`, `pre_llm_call`, `transform_tool_result`, `transform_terminal_output`, `transform_llm_output`, plus `pre_verify`, which fires once per turn when the agent edited code, just before it verifies/finishes — related config `agent.verify_guidance: false`) and lifecycle observer hooks (`post_tool_call`, `post_llm_call`, `on_session_start`, `on_session_end`, `on_session_finalize`, `on_session_reset`, `subagent_start`, `subagent_stop`), plus gateway-specific hooks (`pre_gateway_dispatch`, `pre_approval_request`, `post_approval_response`). Shell hooks require an approval dialog the first time each `(event, command)` pair runs; decisions persist to `~/.hermes/shell-hooks-allowlist.json`. In the cited sources, Hermes does not document a repo-walked project-local skill root or project-local hook directory equivalent to `.agents/skills/` plus `.codex/hooks.json`; for one-project custom behavior, use a plugin or explicit config entry and document the install path.

## Cursor CLI

Cursor documents Agent Skills and Hooks as first-class surfaces. Skills load from project `.agents/skills/` and `.cursor/skills/`, user `~/.agents/skills/` and `~/.cursor/skills/`, and compatibility roots for Claude/Codex skills. Skills may be slash-invoked from Agent chat, auto-applied by context, scoped with `paths`, or made explicit-only with `disable-model-invocation: true`.

Hooks are configured at four scopes in priority order: enterprise (MDM-managed system-wide), team (Enterprise cloud dashboard), project (`<project-root>/.cursor/hooks.json`, committable to version control), and user (`~/.cursor/hooks.json`). Cloud agents load project hooks; team and enterprise hooks are distributed via the dashboard. Cursor documents events for sessions, tool-use, subagents, shell/MCP execution, file access, prompt submission, agent responses, Tab inline-completion hooks (`beforeTabFileRead`, `afterTabFileEdit`), compaction, and workspace startup — a broader event set than prior reviews captured; cloud agents do not support `sessionStart`, `sessionEnd`, `beforeSubmitPrompt`, `beforeMCPExecution`, `afterMCPExecution`, `afterAgentResponse`, `afterAgentThought`, `stop`, Tab hooks, or `workspaceOpen` (the docs mark these "Not yet wired for cloud agents" or unavailable due to VM-timing). `failClosed` defaults to `false`; `loop_limit` defaults to `5` on Cursor (`null` = no cap on Claude Code). Keep Cursor's hook schema separate from Claude/Codex schemas even when event names look similar.

## gajae-code (community, non-vendor)

gajae-code (`gjc`, MIT/beta by Yeachan-Heo; GitHub README is the only source, verified 2026-07-05) is a coding-agent harness that runs *adjacent* to other CLIs, not a packaging host. It documents **no plugin/extension format and no hooks** — the README explicitly says it is "not a hidden plugin for Codex CLI, Claude Code, OpenCode, or Claw Code." The one extension surface it does document is **skills**: `SKILL.md`-format bundled skills installed into the user `.gjc` directory by `gjc setup defaults` (the exact `~/.gjc/skills/` path is no longer literally stated in the README; bundled defaults `deep-interview`, `ralplan`, `ultragoal`, `team`), inspected with `gjc skills list` / `gjc skills read <name>` and invoked in-session as `/skill:<name>` (colon form — not the `/<skill-name>` other runtimes use). Install with `bun install -g gajae-code` (scoped package `@gajae-code/coding-agent`); user config is `~/.gjc/config.yml` (provider retry budgets), per-project state lives in `.gjc/`. Treat any plugin/hook claim for gajae as `not documented` until the project documents one.

## Packaging Decision Gate

Before adding a generated plugin or extension package:

1. Name the canonical source path.
2. Name the generated install path.
3. Decide whether the installed form is a symlink, link-mode extension, or generated copy.
4. Add a validation command that proves the runtime discovers the package.
5. Add a rollback path that removes generated config without editing canonical files.
