#!/usr/bin/env bash
# notify-if-stale.sh — stale-checkout notifier for Claude and Codex.
# Repo-scoped, read-only, non-blocking, opt-in (registered by install-local.mjs).
#
# Reads the hook JSON payload on stdin and AUTO-DETECTS the event:
#   - SessionStart (Claude) : fires once per session start/resume.
#   - PreToolUse  (Codex)   : fires per tool call, so it self-throttles (default 6h).
# In both cases: if cwd is a skill-hook-authoring checkout and origin/main is
# ahead of HEAD, it injects a one-line `git pull` heads-up as additionalContext.
# Otherwise (current / not this repo / throttled / any error) it stays silent.
# It never pulls, never writes repo state, and neither event can block a session.
#
# Both Claude Code and Codex share the same hookSpecificOutput.additionalContext
# schema; with no permissionDecision the tool call proceeds normally.
set -uo pipefail

THROTTLE_SECONDS="${STALE_THROTTLE_SECONDS:-21600}"   # 6h; applies to PreToolUse only
STAMP="${TMPDIR:-/tmp}/skill-hook-authoring-stale.stamp"

input=$(cat)
get() {   # get <key> — jq if present, else a minimal sed parse
  if command -v jq >/dev/null 2>&1; then
    printf '%s' "$input" | jq -r --arg k "$1" '.[$k] // empty' 2>/dev/null
  else
    printf '%s' "$input" | sed -n "s/.*\"$1\"[[:space:]]*:[[:space:]]*\"\([^\"]*\)\".*/\1/p"
  fi
}

event=$(get hook_event_name)
cwd=$(get cwd)
[ -n "$cwd" ] && cd "$cwd" 2>/dev/null || exit 0

# Scope strictly to this repo; silent everywhere else.
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0
git remote get-url origin 2>/dev/null | grep -q 'skill-hook-authoring' || exit 0

# PreToolUse fires per tool call: throttle so we fetch at most once per window.
now=$(date +%s 2>/dev/null || echo 0)
if [ "$event" = "PreToolUse" ] && [ -f "$STAMP" ]; then
  mtime=$(stat -f %m "$STAMP" 2>/dev/null || stat -c %Y "$STAMP" 2>/dev/null || echo 0)
  [ $(( now - mtime )) -lt "$THROTTLE_SECONDS" ] && exit 0
fi
: > "$STAMP" 2>/dev/null || true   # refresh the throttle window (also silences a failed fetch for the window)

# Network-bounded fetch; on any failure stay silent rather than nag.
# `timeout` is GNU coreutils and is absent on stock macOS — degrade to gtimeout,
# then to a plain fetch, rather than failing closed and never checking at all.
if command -v timeout >/dev/null 2>&1; then TIMEOUT="timeout 5"
elif command -v gtimeout >/dev/null 2>&1; then TIMEOUT="gtimeout 5"
else TIMEOUT=""; fi
$TIMEOUT git fetch --quiet origin main 2>/dev/null || exit 0
behind=$(git rev-list --count HEAD..origin/main 2>/dev/null) || exit 0
[ "${behind:-0}" -gt 0 ] || exit 0   # current → silent

last=$(git log -1 --format='%cr' origin/main 2>/dev/null)
msg="📡 skill-hook-authoring: origin/main is ${behind} commit(s) ahead (latest ${last}). The daily wiki refresh landed updates — \`git pull\` to sync this checkout."
ev="${event:-SessionStart}"
printf '{"hookSpecificOutput":{"hookEventName":"%s","additionalContext":%s}}\n' \
  "$ev" "$(printf '%s' "$msg" | { jq -Rs . 2>/dev/null || printf '"%s"' "$msg"; })"
exit 0
