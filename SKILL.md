---
name: skill-hook-authoring
description: 'Use for shared Codex/Claude skill or hook authoring: skill layout, symlink installs, guard hooks, dangerous-mode guardrails, and ~/.codex vs ~/.claude drift.'
---

# Skill Hook Authoring

Create shared skills, hooks, commands, extensions, and plugin packages from one repo-owned source of truth.

## Core Rules

- Pick one canonical repo path first. Installed copies under `~/.claude` and `~/.codex` must be symlinks or generated config entries.
- Do not edit home-directory installed copies directly.
- Do not keep separate Claude and Codex versions unless a difference is explicitly documented and tested.
- Keep `SKILL.md` body under 500 lines (official limit for reliable loading). Put deterministic behavior in scripts; move scenario-specific detail into `reference/*.md` linked **one level deep** from `SKILL.md` (progressive disclosure).
- `name`: max 64 chars, lowercase/numbers/hyphens only, no reserved words (`anthropic`, `claude`); prefer gerund form (`processing-pdfs`). `description`: max 1024 chars, third person, stating both *what* the skill does and *when* to use it (trigger terms) — not the procedure.
- **Quote the `description` if it contains a colon-space (`: `), or the skill silently fails to load.** A `: ` in an unquoted YAML scalar is parsed as a nested mapping → `mapping values are not allowed in this context`. Common trap: `description: ... Korean triggers: 원샷, ...`. Wrap the whole value in single quotes (`description: '...'`); double inner single-quotes, double-quotes are fine inside. Validate frontmatter parses before shipping. (Trial-and-error 2026-05-26: an unquoted description with `Korean triggers:` broke skill loading.)
- Hooks are guardrails, not silent fallback paths. They should block clearly, explain why, and require an explicit operator decision for dangerous actions.
- Cross-agent guidance must be based on official vendor docs. If a platform does not document a feature, record it as `not documented` or `unknown`; do not infer parity from another agent.
- **Make hook scripts executable (`chmod +x`) and give them a shebang.** Claude registers hooks as `command: "<abs-path> --args"` and runs them through `/bin/sh`, so a missing exec bit fails with `Permission denied` on *every* matching event (PreToolUse/Stop) in *every* session — one forgotten `chmod +x` silently breaks all agents at once. Codex registers as `node <path>` so it tolerates a missing bit, but always `chmod +x` for parity and **commit the mode** (git stores `100755`). (Trial-and-error 2026-05-26: a new guard hook shipped `644` → `Permission denied` spam across all live sessions until chmod'd.)

## Recommended Layout

```text
agent-extensions/
  alex-core-invariants/       # standalone repo, own remote
  cmux/                       # standalone repo, cmux skills and hooks
  content-pipeline/           # root-owned skill
  npm-reorg-guard/            # standalone repo, own remote
  skill-hook-authoring/       # root-owned skill
  scripts/install/install-local.mjs
  scripts/test/*
```

Keep the umbrella flat. Do not add a repo-local `skills/` or `hooks/` index unless there is a specific migration plan, because that creates a second source of truth. If a hook belongs to a standalone repo, reference that repo path directly from the installer and agent config.

## Multi-Agent Compatibility Docs

Use these repo documents before changing compatibility claims:

- `docs/official-sources.json` — canonical source manifest for official docs refresh.
- `docs/compatibility-matrix.md` — current cross-agent support matrix.
- `docs/plugin-packaging.md` — plugin/extension packaging boundaries.
- `docs/kuma-studio-patterns.md` — public Kuma Studio operating patterns that can be reused by other agents.
- `docs/codex-cloud-automation.md` — daily Codex Cloud/App/GitHub Actions automation setup.

Daily refresh automation must read the source manifest, fetch only official URLs, update docs only when evidence changed, and leave a PR rather than pushing to `main`.

## Cross-Agent Install Pattern

1. Symlink every canonical skill folder into `~/.codex/skills/<id>`.
2. Symlink the same folders into `~/.claude/skills/<id>` when that root exists.
3. Patch `~/.claude/settings.json` idempotently for Claude hooks.
4. Patch `~/.codex/hooks.json` idempotently for Codex hooks.
5. Backup mutated JSON config files before writing.
6. `chmod +x` every hook script before registering it (Claude runs `command` via `/bin/sh`; no exec bit = `Permission denied` everywhere).
7. Validate by feeding representative JSON payloads into the hook scripts — and run the script **directly** (`./hook.cjs ...`, no `node` prefix) to catch a missing exec bit the way Claude would.

## Hook Payload Pattern

Claude Code and Codex CLI use the **same input schema** for `PreToolUse` / `PostToolUse` hooks. A Bash tool call arrives as:

```json
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../transcript.jsonl",
  "cwd": "/Users/me/project",
  "permission_mode": "default",
  "hook_event_name": "PreToolUse",
  "tool_name": "Bash",
  "tool_use_id": "toolu_...",
  "tool_input": {
    "command": "npm install foo",
    "description": "Install foo",
    "timeout": 120000
  }
}
```

Notes:

- `tool_input.command` — the shell command. Use this single field; do not read from `.input.command`, `.arguments.command`, or other variants.
- `cwd`, `session_id`, `transcript_path`, `permission_mode`, `hook_event_name`, `tool_name`, `tool_use_id` are all **top-level**, not under `tool_input`. Reading `tool_input.cwd` returns nothing.
- `permission_mode` is one of `default`, `plan`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`.
- Both engines share this schema. Codex additionally provides `turn_id` and `model`.

## Hook Decision Output

Claude Code and Codex use the **same decision schema** for `PreToolUse`. Pick one of these to block:

Modern (recommended):

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "safedeps: install not approved — run `safedeps check ...` first"
  }
}
```

Legacy (still supported by both engines):

```json
{"decision": "block", "reason": "safedeps: install not approved ..."}
```

`permissionDecision` accepts `"allow" | "deny" | "ask" | "defer"` on both engines. `hookSpecificOutput` may also carry `updatedInput` (replace the tool input before it runs) and `additionalContext` (inject context for the model). For **allow**, exit 0 with no output is sufficient; or emit `permissionDecision: "allow"` explicitly.

**Do not use `{"continue": false, "stopReason": "..."}` for PreToolUse** — that is the schema for the `Stop` hook (final-exit block), not for PreToolUse. Same applies to `{"continue": true}` as an allow signal. Mixing them up silently fails closed or open depending on the engine version.

For `PostToolUse` block (prevent normal post-processing), use `{"decision": "block", "reason": "..."}` on both engines.

## Codex hook registration

`~/.codex/hooks.json` shape (or inline `[hooks]` in `~/.codex/config.toml`):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "^Bash$",
        "hooks": [
          { "type": "command", "command": "~/.codex/skills/<id>/scripts/<hook>.sh", "timeout": 30 }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "^Bash$",
        "hooks": [
          { "type": "command", "command": "~/.codex/skills/<id>/scripts/<hook>.sh", "timeout": 30 }
        ]
      }
    ]
  }
}
```

Claude `~/.claude/settings.json` uses the same `hooks.PreToolUse[].hooks[]` shape. Idempotent installers should match on the canonical `command` string and skip if already present.

Codex tool coverage (verified 2026-05-26 against <https://developers.openai.com/codex/hooks> + Codex CLI 0.133): PreToolUse now intercepts **Bash, `apply_patch` file edits, and MCP tool calls**, and a denying PreToolUse prevents the blocked `apply_patch` file from being created (`openai/codex#16732` fixed; PR `#18391`). The earlier "Bash only" behavior is obsolete — do **not** assume apply_patch is unhookable. Two things still bite, so design accordingly:

- **Field shape differs per tool.** Bash and apply_patch carry `tool_input.command`; Write/Edit/MultiEdit carry `tool_input.file_path`; MCP tools send their own args. For `apply_patch` the target path lives in the patch body's `*** Add/Update/Delete File: <path>` header lines, **not** a `file_path` field — read the right field and gate on `tool_name`. Scanning the whole `tool_input` blob over-blocks (it matches the path string appearing in *content*, reads, or even the hook script itself).
- **Coverage can still be inconsistent across tool handlers** on some versions (`openai/codex#20204`); very old Codex fired hooks for `Bash` only. Verify on the *target* Codex version rather than assuming.

## Validation Checklist

- The frontmatter YAML parses (quote any `description` containing `: `) — load it and confirm no parse error.
- The skill triggers from its frontmatter description.
- The hook allows normal commands and blocks the intended risky command.
- The hook script is executable (`chmod +x`, committed as `100755`) and runs directly without a `node` prefix — no `Permission denied`.
- The installer is idempotent and can run twice without duplicate hook entries.
- Config writes are atomic or backup-before-write.
- Dangerous-mode bypasses are never taught to the agent as automatic retry steps.
