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

# Merge and clean up WITHOUT touching any local branch or checkout.
# `gh pr merge --delete-branch` switches local HEAD to the base branch (to delete
# the merged local branch). That fails with "fatal: '<base>' is already used by
# worktree ..." when the base branch is checked out in a sibling git worktree —
# which is exactly how the daily routine runs (routine worktree + shared main
# checkout). So merge without --delete-branch (no local branch ops) and delete the
# remote branch explicitly (a remote-only ref delete that never switches HEAD).
# Note: local `main` is intentionally NOT fast-forwarded here — the guard must not
# touch a sibling worktree's checked-out branch; whoever owns that checkout pulls.
head=$(gh pr view "$PR" --json headRefName -q '.headRefName')
gh pr merge "$PR" --squash
# Best-effort: the squash-merge already succeeded, so a failed branch delete
# (e.g. already gone, or protected) must not flip the guard to a failure exit.
git push origin --delete "$head" >/dev/null 2>&1 || \
  echo "guard: PR #$PR merged, but remote branch '$head' delete was skipped/failed (non-fatal)" >&2
echo "guard: PR #$PR merged (docs-only diff + source check passed)"
