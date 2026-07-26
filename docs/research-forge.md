# Research Forge

## Summary

Research Forge is the workflow for making document-based skills, operational doctrine, external-tool adoption decisions, or long-lived knowledge pages where a wrong document can be worse than no document.

## When to use

Use this when the work has at least one of these traits:

- Official documentation and community practice may disagree.
- Tool behavior is version-sensitive.
- A skill or doctrine will steer future agents without the user watching.
- The output may become a knowledge SSoT.
- The user asks for deep research, cross-validation, validator, or "properly forge this".

Do not use it for trivial one-step edits.

## Roles

- Orchestrator: owns the plan, scope, canonical-owner decision, and final write. The orchestrator must not create truth alone.
- Researcher-A: official docs plus local empirical evidence. Primary-source and local-output claims must be separated from inference.
- Researcher-B: ecosystem/tooling scan. Community tools are classified by officialness, maintenance, license, trust boundary, mutation/write authority, and real benefit over existing primitives.
- Adversarial reviewer: looks only for how the proposed skill/process can harm future work.

## Required plan fields

The Kuma plan must state:

- Goal and out-of-scope.
- Canonical files that may be edited.
- Truth hierarchy.
- Worker/reviewer task ids.
- Done criteria.
- Exit gate.

## Exit gate

Before writing or finalizing:

1. Canonical owner is defined. Do not duplicate the same rule in `SKILL.md`, references, plan history, and vault pages.
2. Primary-source claims, local empirical claims, and inferences are labeled.
3. Version-sensitive commands have local evidence or are marked untested.
4. Failure and unknown states are explicit. No silent fallback.
5. Mutation boundaries are named before any command that can write cache, project metadata, generated files, external state, or live editor state.
6. Reviewer findings are applied, modified, or rejected with a reason.
7. Dated absence claims, such as "no official integration exists", include search scope and date. "Not found" and "does not exist" are not the same claim.
8. Automated green results state what they prove and what they do not prove.

## Output topology

Preferred layout for skills:

- `SKILL.md`: invocation, non-negotiable stop signs, links to canonical references/scripts.
- `references/*.md`: long-form procedure SSoT by concern.
- `scripts/*`: executable or repeatable checks. Scripts own machine-enforced classifiers when possible.
- Plan: historical evidence and dispatch trail only.
- Vault domain page: pointer catalog only unless it is the canonical owner.

## Anti-patterns

- Treating a community README as truth for platform behavior.
- Copying the same rule into every output file.
- Replacing evidence with "known pattern" language.
- Letting a helper script silently fallback to a different source of truth.
- Calling a mutating tool as a "smoke test" without naming the mutation scope.

## Related

- [Kuma Vault Schema](~/.kuma/vault/schema.md) — page and slot contract for knowledge SSoT output.
