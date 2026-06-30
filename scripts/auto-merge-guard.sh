#!/usr/bin/env bash
# auto-merge-guard.sh — deterministic merge gate for the daily wiki refresh.
#
# Usage: scripts/auto-merge-guard.sh <PR_NUMBER> [BASE_REF]
#
# The merge decision is NOT a judgement call. This guard squash-merges the PR
# ONLY when BOTH hold:
#   1. the diff touches docs/prose only (no code, installer, hook, or config), and
#   2. `node scripts/check-official-sources.mjs` passes.
# Otherwise it exits non-zero and leaves the PR open for a human to review.
# A daily-refresh agent calls this after opening the PR and merges on exit 0;
# it must never merge by its own reasoning.
set -euo pipefail

PR="${1:?usage: auto-merge-guard.sh <PR_NUMBER> [BASE_REF]}"
BASE="${2:-origin/main}"

# Files the guard is willing to auto-merge. Anything else → human review.
SAFE='^(docs/|prompts/|reports/|SKILL\.md$|README(\.[A-Za-z-]+)?\.md$|CHANGELOG\.md$)'

changed=$(git diff --name-only "$BASE"...HEAD)
if [ -z "$changed" ]; then
  echo "guard: PR #$PR has no diff against $BASE — nothing to merge" >&2
  exit 1
fi

unsafe=$(printf '%s\n' "$changed" | grep -vE "$SAFE" || true)
if [ -n "$unsafe" ]; then
  echo "guard: PR #$PR changes non-docs files — leaving open for human review:" >&2
  printf '  %s\n' $unsafe >&2
  exit 1
fi

if ! node scripts/check-official-sources.mjs --write-report; then
  echo "guard: official-source check FAILED — leaving PR #$PR open" >&2
  exit 1
fi

gh pr merge "$PR" --squash

# Remote-branch cleanup, done explicitly instead of via `gh pr merge --delete-branch`.
# In a git-worktree layout that flag's post-merge LOCAL step ("switch off the deleted
# branch") fails with `fatal: 'main' is already used by worktree ...` AFTER the remote
# merge has already succeeded — and on that failure it also leaves the remote branch
# stale. Deleting the remote ref directly never touches any local checkout, so the
# routine worktree is left intact and the next run's `git fetch --prune` clears the
# stale remote-tracking ref. The cleanup is best-effort and observable: a failed delete
# logs a note (and the next prune clears it) but does not fail the gate — the merge
# itself is already verified by the line above.
HEAD_BRANCH=$(gh pr view "$PR" --json headRefName -q .headRefName 2>/dev/null || true)
if [ -n "$HEAD_BRANCH" ]; then
  git push origin --delete "$HEAD_BRANCH" \
    || echo "guard: note — remote branch $HEAD_BRANCH not deleted (already gone or push declined); next 'git fetch --prune' clears the stale ref" >&2
fi

echo "guard: PR #$PR merged (docs-only diff + source check passed)"
