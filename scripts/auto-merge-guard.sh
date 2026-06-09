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
SAFE='^(docs/|prompts/|reports/|SKILL\.md|README\.md|CHANGELOG\.md)$'

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

gh pr merge "$PR" --squash --delete-branch
echo "guard: PR #$PR merged (docs-only diff + source check passed)"
