# Kuma Studio Public Operating Patterns

Last reviewed: 2026-05-26

This document captures public, reusable Kuma Studio methodology. It intentionally excludes private vault content and machine-local secrets.

## SSoT Boundaries

- Shared agent rules live in repo-owned files such as `AGENTS.md`, `CLAUDE.md`, skills, and operation docs.
- Agent-specific preferences stay out of shared SSoT unless they are promoted deliberately.
- Installed home-directory copies should be symlinks or generated config, not separately edited truth.

## Plan And Close Gates

- Non-trivial work starts with a plan.
- Plan completion requires every open checklist item to be dispositioned.
- Parent and child plans must be checked together so unfinished work does not hide in another file.

## Dispatch Delivery

- Saying that another worker should review something is not delivery.
- Delivery means a real dispatch, task, or message reaches the target worker surface.
- Completion reports must use the canonical terminal path for the work request.

## Visible Worker Surfaces

- When a user asks for a teammate or parallel worker, use a visible worker or session by default.
- Internal subagents are only the default when explicitly requested or when visibility is not required.
- Long-lived infrastructure surfaces are treated as managed slots, not disposable shells.

## No Silent Fallback

- A fallback that hides a primary failure is not acceptable.
- Explicit failover can be acceptable when it is observable and does not change canonical truth.
- Hooks should block clearly and explain the operator decision needed to continue.

## Public Reuse Rule

When exporting Kuma Studio patterns to other agent runtimes, preserve the principle and adapt only the runtime-specific mechanism. For example, real delivery may map to a dispatch CLI, a GitHub issue assignment, or a PR review request, but it must remain observable.
