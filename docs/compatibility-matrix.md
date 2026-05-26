# Cross-Agent Compatibility Matrix

Last reviewed: 2026-05-26

This matrix records only official documentation claims from `docs/official-sources.json`. If a feature is absent from official docs, write `not documented` instead of inferring support.

| Platform | Skills or equivalent | Hooks or guardrails | Plugins/extensions | Project instructions | Automation path |
|---|---|---|---|---|---|
| OpenAI Codex | Official Skills use a `SKILL.md` manifest in a versioned bundle. | Codex has lifecycle hooks and plugin-bundled hooks. | Codex plugins bundle skills, apps, MCP servers, hooks, and marketplace metadata through `.codex-plugin/plugin.json`. | `AGENTS.md`, config, rules, skills, and plugins. | Codex App Automations and `openai/codex-action@v1`. |
| Claude Code | Official docs show settings, subagents, slash commands, MCP prompts, and hooks. A separate official `SKILL.md` system is not recorded here unless added to sources. | Official hooks in `settings.json` support tool and session lifecycle events and blocking behavior. | Plugin marketplace support is not documented in the cited official sources. | `CLAUDE.md`, `.claude/settings.json`, `.claude/commands`, `.claude/agents`. | Daily update behavior should be implemented externally unless official scheduler docs are added. |
| Grok / xAI | Official xAI docs describe reusable skill folders. | Official xAI docs describe hooks from user, project, and plugin roots. | Official xAI docs describe plugins and marketplaces. | Official xAI docs state Claude Code and AGENTS.md compatibility. | Not documented in the cited source set. |
| Gemini CLI | Uses extensions to package prompts, MCP servers, custom commands, and context files. | `excludeTools` supports tool exclusion in extension config; lifecycle hook parity is not documented in the cited source set. | Official extensions use `gemini-extension.json` under `~/.gemini/extensions`. | `GEMINI.md` hierarchical memory and extension context files. | Extension update commands exist; scheduler behavior is external unless official automation docs are added. |
| Hermes Agent | Official docs describe a skills system and skills preloading. | Hook parity is not documented in the cited source set. | Official docs describe MCP integration and toolsets; plugin packaging parity is not documented here. | SOUL, context, and memory systems are documented in the overview links. | Official overview describes scheduled tasks; exact cron/update semantics must be verified from a deeper source before implementation claims. |
| Cursor CLI | Official docs describe CLI agent usage. | Hook parity is not documented in the cited source set. | MCP, skills, and rules support must stay source-backed by Cursor docs; do not infer Codex plugin parity. | Official docs mention `AGENTS.md`, `CLAUDE.md`, and `.cursor/rules` support. | External scheduler or CI unless official Cursor automation docs are added. |
| Kuma Studio | Public repo methodology uses repo SSoT, dispatch delivery, plan close gates, and visible worker surfaces. | Hooks are guardrails and must fail loudly. | Kuma skills live in canonical repo paths and may be installed by symlink or generated config. | `AGENTS.md` and `CLAUDE.md` are parallel SSoT for shared rules. | Use project-specific dispatch, plan, and server workflows; public docs should not depend on private vault content. |

## Update Rule

When official docs change:

1. Update `docs/official-sources.json` first if a source URL or claim category changes.
2. Update this matrix only with source-backed wording.
3. Keep differences explicit. Do not map `plugin`, `extension`, `skill`, and `command` to one shared term unless the vendor docs do so.
4. Leave a PR so the diff is reviewable before merge.
