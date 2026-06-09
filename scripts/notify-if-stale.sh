#!/usr/bin/env bash
# notify-if-stale.sh — SessionStart hook. Repo-scoped, non-blocking, read-only.
#
# Reads the SessionStart JSON payload on stdin. If the session's cwd is a
# skill-hook-authoring checkout and origin/main is ahead of HEAD, it prints a
# one-line heads-up as additionalContext so you know the daily wiki refresh
# landed updates worth a `git pull`. If the checkout is current (or this is not
# the repo), it exits silently with no output. It never pulls, never writes, and
# SessionStart hooks cannot block the session regardless.
#
# Register in ~/.claude/settings.json:
#   { "hooks": { "SessionStart": [ { "hooks": [
#       { "type": "command", "command": "<repo>/scripts/notify-if-stale.sh" } ] } ] } }
set -uo pipefail

input=$(cat)

# Extract cwd: prefer jq, fall back to a minimal sed parse.
if command -v jq >/dev/null 2>&1; then
  cwd=$(printf '%s' "$input" | jq -r '.cwd // empty' 2>/dev/null)
else
  cwd=$(printf '%s' "$input" | sed -n 's/.*"cwd"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')
fi
[ -n "$cwd" ] && cd "$cwd" 2>/dev/null || exit 0

# Scope strictly to this repo; silent everywhere else.
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0
git remote get-url origin 2>/dev/null | grep -q 'skill-hook-authoring' || exit 0

# Network-bounded fetch; on any failure stay silent rather than nag.
timeout 5 git fetch --quiet origin main 2>/dev/null || exit 0
behind=$(git rev-list --count HEAD..origin/main 2>/dev/null) || exit 0
[ "${behind:-0}" -gt 0 ] || exit 0   # current → silent

last=$(git log -1 --format='%cr' origin/main 2>/dev/null)
msg="📡 skill-hook-authoring: origin/main is ${behind} commit(s) ahead (latest ${last}). The daily wiki refresh landed updates — \`git pull\` to sync this checkout."
printf '{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":%s}}\n' \
  "$(printf '%s' "$msg" | { jq -Rs . 2>/dev/null || printf '"%s"' "$msg"; })"
exit 0
