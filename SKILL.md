---
name: skill-hook-authoring
description: 'Use for shared Codex/Claude skill or hook authoring: skill layout, symlink installs, guard hooks, dangerous-mode guardrails, and ~/.codex vs ~/.claude drift.'
---

# Skill Hook Authoring

Create shared skills and hooks from one repo-owned source of truth.

## Core Rules

- Pick one canonical repo path first. Installed copies under `~/.claude` and `~/.codex` must be symlinks or generated config entries.
- Do not edit home-directory installed copies directly.
- Do not keep separate Claude and Codex versions unless a difference is explicitly documented and tested.
- Keep `SKILL.md` concise. Put deterministic behavior in scripts and reference details only when needed.
- Keep frontmatter `description` under 220 characters; use it only for trigger routing, not procedure.
- Hooks are guardrails, not silent fallback paths. They should block clearly, explain why, and require an explicit operator decision for dangerous actions.

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

## Cross-Agent Install Pattern

1. Symlink every canonical skill folder into `~/.codex/skills/<id>`.
2. Symlink the same folders into `~/.claude/skills/<id>` when that root exists.
3. Patch `~/.claude/settings.json` idempotently for Claude hooks.
4. Patch `~/.codex/hooks.json` idempotently for Codex hooks.
5. Backup mutated JSON config files before writing.
6. Validate by feeding representative JSON payloads into the hook scripts.

## Hook Payload Pattern

Claude Code and Codex CLI use the **same input schema** for `PreToolUse` / `PostToolUse` hooks. A Bash tool call arrives as:

```json
{
  "tool_name": "Bash",
  "tool_input": {
    "command": "npm install foo",
    "description": "Install foo",
    "timeout": 120000
  },
  "cwd": "/Users/me/project",
  "permission_mode": "default",
  "hook_event_name": "PreToolUse"
}
```

Notes:

- `tool_input.command` — the shell command. Use this single field; do not read from `.input.command`, `.arguments.command`, or other variants.
- `cwd` — **top-level**, not under `tool_input`. Reading `tool_input.cwd` returns nothing.
- Codex additionally provides `turn_id`, `session_id`, `model`.

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

`permissionDecision` accepts `"allow" | "deny" | "ask"` (Codex also supports `"defer"`). For **allow**, exit 0 with no output is sufficient; or emit `permissionDecision: "allow"` explicitly.

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

Caveat: Codex hooks fire reliably for the shell (`Bash`) tool. They do **not** currently fire for `apply_patch` or most MCP tools — design block logic accordingly.

## Validation Checklist

- The skill triggers from its frontmatter description.
- The hook allows normal commands and blocks the intended risky command.
- The installer is idempotent and can run twice without duplicate hook entries.
- Config writes are atomic or backup-before-write.
- Dangerous-mode bypasses are never taught to the agent as automatic retry steps.
