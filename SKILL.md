---
name: skill-hook-authoring
description: 'Cross-runtime agent-platform interoperability wiki and authoring methodology, refreshed daily from official vendor docs: how Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor, and Kuma Studio compare across skills, hooks, plugins, project-instruction files, CLI spawn, session resume, and billing, plus the rules to ship one source of truth without drifting. Use when authoring, editing, retiring, renaming, disabling/enabling, or debugging a skill / hook / slash-command / plugin; when deciding which engines a skill installs to; or when a skill is not triggering and its description needs fixing. Triggers (KR/EN): 스킬 작성/수정/폐기/삭제/이름변경, 스킬 끄기/비활성/다시 켜기, 안 쓰는 스킬 정리, 특정 엔진에서만, 스킬 발동 안 됨, description 고치기, 훅 작성, 슬래시 커맨드, 플러그인 패키징, 크로스런타임 호환; skill authoring/retire/rename/disable/enable, prune unused skills, scope a skill to one engine, skill not triggering, hook authoring, plugin packaging, cross-runtime comparison.'
---

# Cross-Runtime Agent-Platform Interoperability

This package is two things at once:

1. **A compatibility wiki**, refreshed daily from official vendor docs, recording how today's agent runtimes — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor, and Kuma Studio — compare across skills, hooks, plugins/extensions, project-instruction files, CLI spawn (interactive vs headless), session resume, and billing. Every claim cites the vendor's own docs; absent docs are recorded as `not documented`, never inferred.
2. **A methodology** for *interoperating and managing* those runtimes: how to ship one repo-owned source of truth — skills, hooks, commands, scripts, references, assets, MCP/app wiring, or runtime-specific plugin metadata — without drifting between agents.

The detailed comparison lives in `docs/` (start with `docs/compatibility-matrix.md`); the daily refresh keeps it current (`docs/cloud-automation.md`). The rest of this file is the authoring/interoperation methodology that turns that wiki into shippable, non-drifting packages.

## Taxonomy

Use these words precisely:

- **Skill**: instructions the model reads when the task matches. Usually `SKILL.md` plus optional `scripts/`, `docs/`, and `assets/` (`references/` only for genuine lookup material — see Skill Document Topology). A skill can tell the model what to do, but it does not enforce tool behavior by itself.
- **Hook**: a harness-level guard or automation invoked around lifecycle events such as tool calls. A hook can allow, deny, ask, mutate input, or add context depending on runtime support. Hooks must be registered in the runtime config or plugin metadata; putting a hook script inside a skill folder is not enough.
- **Plugin / extension**: a runtime-specific packaging and trust boundary that can bundle skills, hooks, MCP servers, apps, commands, agents, or metadata. Per-runtime package shapes (Codex `.codex-plugin/plugin.json`, Claude `.claude-plugin/plugin.json`, Antigravity native plugins, Hermes `plugin.yaml`) are in [`docs/plugin-packaging.md`](docs/plugin-packaging.md).
- **Package root**: the repo-owned canonical source directory we maintain. Most local "skills" in this workspace are actually plugin-like package roots because they include `SKILL.md`, scripts, docs, installers, and policy.

If the task changes discovery, installation, trust, hook behavior, bundled scripts, or cross-runtime compatibility, treat it as **package authoring**, not just skill text editing.

## Runtime Coverage

Eight runtimes are tracked — seven vendor runtimes plus one community project (**gajae-code**, `gjc`, MIT/beta, GitHub README as the only source; flagged the way Kuma Studio is). The source-cited truth for **every** cross-runtime claim — skill/hook/plugin surfaces, skill invocation tokens, session resume, project-instruction filenames and their loading mechanics — lives in [`docs/compatibility-matrix.md`](docs/compatibility-matrix.md) and [`docs/plugin-packaging.md`](docs/plugin-packaging.md). Read it there; this file does not restate it.

Two consequences an author must not get wrong:

- **When a runtime capability is not documented, write `not documented` or `unknown`** and require live verification before shipping behavior that depends on it. Never infer parity from another agent.
- **Explicit skill invocation is not the same token across runtimes** — Claude/Grok/Cursor `/<skill-name>`, Codex `/skills` or `$<skill-name>` (typed `/<skill-name>` is not a documented Codex form), Antigravity `/<skill-name>`, gajae-code `/skill:<name>`, Hermes none documented. For cross-engine commands, rely on **description-triggered** invocation as the portable layer and treat the typed token as per-engine sugar.

## CLI Spawn, Headless Launch, Session Resume

Per-runtime spawn commands, headless forms, output-format flags, and resume invocation live in
[`docs/cli-invocation.md`](docs/cli-invocation.md); the deeper resume semantics (session store, id form,
capture timing) live in [`docs/compatibility-matrix.md`](docs/compatibility-matrix.md) → **Session Resume**.

Three shape facts that trip orchestrators:

- **The mode switch is not the same shape.** Claude/Grok/Cursor/Hermes reach headless by adding a flag to the bare interactive command; **Codex** uses a separate subcommand (`codex exec`) — its `-p` is `--profile`, not a prompt flag. **Antigravity** (`agy`) is TUI-only with no documented headless one-shot; drive it through the Antigravity SDK.
- **Capture the resume locator before the worker exits**, keyed by `cwd`. Session stores differ — Hermes keeps history in SQLite (`~/.hermes/state.db`), so scanning `~/.hermes/sessions/` finds nothing resumable.
- **Cross-engine resume** (resuming one engine's session under another) is a different, harder problem — keep it off the same-platform path.

## Model Lineup

Which models each runtime currently ships, their effort tiers, and what the vendor retired drifts on its
own cadence. The source-cited record is [`docs/models/`](docs/models/) — one file per runtime, each with a
`Last reviewed:` stamp and its official URL.

**SSoT boundary — this folder does not own everything model-shaped.** It owns *current shipping ids +
tiers + retirement status*, verified against each vendor's official model page. It does **not** own
**pricing/limits** (the `claude-api` skill and vendor pricing pages), the **Kuma Studio spawnable
catalog** (`packages/shared/team.json` `modelCatalog` — a downstream consumer that syncs from these
lineups, never the reverse), or **naming/phonetic-gloss standards** (the Kuma vault
`domains/model-frontier.md`). Link to those; do not duplicate. A value that cannot be confirmed against
the official doc in a run is `unverified this run` — never a guess or a non-vendor mirror.

## Project Instruction Files

Do not assume every non-Claude runtime reads `AGENTS.md`. The per-runtime filenames **and** their loading
mechanics (ancestor walk-up, subdirectory discovery, eager vs on-demand, size caps) are owned by
[`docs/compatibility-matrix.md`](docs/compatibility-matrix.md) → **Project Instruction File Loading**.

Two authoring consequences:

- **Placement follows the weakest reader.** A module-specific instruction in a deep subdirectory is seen eagerly by Gemini/Antigravity, lazily by Claude/Hermes, and **never** by Codex (it does not read below cwd). Keep anything Codex must obey at or above the launch directory. Hermes is single-file first-match and does not merge, so the canonical content must live in the file Hermes actually picks.
- **Symlink the wrapper, edit only the canonical file.** When `CLAUDE.md`/`GEMINI.md` are symlinks to a repo-owned `AGENTS.md`, every runtime reads the canonical content and git stores mode `120000` (a pointer, not a copy). Claude Code's Edit/Write **refuses to write through a symlink** (verified 2026-06-05), which is the feature: an atomic save cannot silently replace the link with a divergent regular file, so the SSoT cannot drift. Use **relative** links (`ln -s AGENTS.md CLAUDE.md`) so they survive clone/move. A Windows checkout without `core.symlinks` materializes the link as a plain file — use a one-line stub+pointer instead when a Windows runtime is in scope.

## Core Rules

Each rule's rationale, measured evidence, and the failure it was written against live in
[`docs/authoring-rules.md`](docs/authoring-rules.md). The rules themselves:

- **One canonical repo path.** Installed copies under `~/.claude/skills` / `~/.agents/skills` are symlinks or generated config entries. Never edit an installed home copy.
- **Registration goes through the umbrella manifest `skills.json`, and nothing else.** Adding a skill = one entry there plus a re-run of `scripts/install/install-local.mjs`. Hand-symlinking into an engine root, or adding an engine-config entry (Codex `[[skills.config]]`), is a second registration channel and it drifts.
- **A repo that also builds artifacts registers its skill subfolder, not its repo root** (`<repo>/skills/<name>/`). Runtimes scan the skill root recursively under a traversal budget — a `target/`/`node_modules/`/`dist/` swept into the scan can starve discovery of *other* skills.
- **No separate Claude and Codex versions** unless the difference is explicitly documented and tested.
- **Name the package layer before editing** — skill-only, hook-only, plugin-like package, or generated runtime plugin. A `SKILL.md` entrypoint must not hide installer, hook, or trust-boundary changes.
- **Keep the `SKILL.md` body under 500 lines** — a performance guideline, not a loading cap. Deterministic behavior goes in scripts; scenario-specific detail goes into `docs/*.md` linked one level deep.
- **Frontmatter limits.** `name`: ≤64 chars, lowercase/numbers/hyphens, no XML tags, no reserved words (`anthropic`, `claude`), gerund preferred. `description`: ≤1024 chars, no XML tags, third person, stating both *what* and *when* (trigger terms) — not the procedure.
- **Quote a `description` containing a colon-space (`: `) or the skill silently fails to load** — unquoted YAML parses `: ` as a nested mapping. Wrap the value in single quotes and confirm the frontmatter parses before shipping.
- **Hooks are guardrails, not silent fallback paths.** Block clearly, explain why, require an explicit operator decision for dangerous actions.
- **Do not re-implement a slash surface above the engine.** A host wrapper faking `/command` builds a second input path that must re-derive session context, and it standardizes one invocation token where runtimes differ. Forward typed input verbatim; ship the capability as skill + CLI.
- **Cross-agent claims come from official vendor docs.** Undocumented = `not documented` / `unknown`, never inferred parity.
- **`chmod +x` every hook script and give it a shebang**, and commit the mode (`100755`). A missing exec bit fails with `Permission denied` on every matching event in every session.
- **Hook scripts must not assume GNU coreutils.** macOS ships neither `timeout` nor `stat -c`; a fail-closed `|| exit 0` turns that into a silent no-op that looks green. Detect and degrade (`command -v timeout || gtimeout`), use portable forms (`stat -f %m || stat -c %Y`).
- **Keep history out of doc bodies.** Changelog narrative belongs in `CHANGELOG.md` plus the git tag; a doc body states the current truth only. The one exception is a *verification* stamp (`Last reviewed: YYYY-MM-DD`) — provenance for a live claim. **A freshness stamp must advance when a time-sensitive status claim is re-verified even if the wording is unchanged**; a blanket "no content change → touch nothing" refresh rots exactly those claims.

## Skill Document Topology

**A `SKILL.md` body is a topology, not a manual.** It carries what the model needs in order to *route*:
what the skill is for, the command surface, and one pointer per concern to the sub-document that owns it.

- **Must not accrete in the body:** history (changelog narrative, incident write-ups, dated decisions → `CHANGELOG.md`), architecture and rationale (→ `docs/<topic>.md`), per-feature procedure (→ `docs/<feature>.md`).
- **Stays in the body:** purpose and trigger scope, the command/verb surface, rules short enough to state once and never expand, and one pointer line per sub-document.
- **Sub-documents go in `docs/`, not `references/`.** A reference is material you look things up in — vendor tables, payload schemas, source-cited matrices. Instruction prose telling an agent what to do is not a reference, and naming it one makes the folder lie.
- **Split by feature, not by line count.** Splitting on size alone produces `part-1.md`/`part-2.md`, a worse index than the un-split original. The trigger is a *second* concern's procedure landing in the body.
- **A split must shrink the body.** What remains is a **one-line pointer, not a summary** — a condensed restatement is a second source of truth that drifts on the next edit. Judge by the body's line count, not the total: an honest split grows the total by one header per new file. **The discriminator is whether a moved line now exists in two places** — diff the moved lines against what stayed: zero lost, zero duplicated.

## Recommended Layout

```text
agent-extensions/
 skills.json # the manifest: each skill's id -> canonical path (single registration record)
 scripts/install/install-local.mjs # reads skills.json, generates the engine-root symlinks
 scripts/test/*
 alex-core-invariants/ # standalone repo, own remote
 safedeps/ # standalone repo, own remote
 sprite-gen/ # standalone repo, own remote
 skill-hook-authoring/ # root-owned skill (these conventions)
 katok/ # standalone repo that ALSO builds a binary
 skills/katok/SKILL.md # skills.json path -> this subfolder, so target/ stays out of the scan root
 target/ # build cache (gitignored); never the link target
 ../my-agent-girlfriend/ # sibling repo installed via a `../` path (source owned by its own remote)
```

Three layers, one direction: **conventions** (this skill) → **manifest** (`skills.json`) → **installer** (`install-local.mjs`) → generated symlinks. A canonical source may live outside the umbrella (a sibling repo); register it with a `../` path so `skills.json` stays the one registration record.

Keep the umbrella flat. Do not add a repo-local `skills/` or `hooks/` index **in the umbrella root** unless there is a specific migration plan, because that creates a second registration source competing with `skills.json`. This is separate from a standalone repo's *own* internal `skills/` layout (e.g. `katok/skills/katok/`), which is that repo's upstream structure and a valid link target. If a hook belongs to a standalone repo, reference that repo path directly from the installer and agent config.

## Authoring Flow

Before adding or changing a package:

1. Classify the change: skill instruction, hook guard, plugin/extension package, installer/config, or docs-only compatibility claim.
2. Pick the canonical package root and the generated install paths. For a repo that also builds artifacts, the registered `path` is the skill subfolder, not the repo root (see Core Rules).
3. Decide whether each installed artifact is a symlink, generated config entry, copied file, or runtime-native plugin package.
4. Update the canonical source first, then its entry in the umbrella manifest `skills.json` (which `install-local.mjs` reads), then docs. Do not add a second registration channel alongside it.
5. Validate discovery in every claimed runtime. For undocumented runtimes, mark support as unknown until live verification exists.

Do not move a root-level `SKILL.md` into a plugin subdirectory, or convert a skill folder into a runtime plugin, unless the installer, docs, validation, and rollback path change in the same commit.

## Disable / Scope / Retire

Three operations, three mechanisms — disabling is **per engine** (Claude `skillOverrides`,
Grok `skills-disabled/`) and never touches `skills.json`; scoping to one engine is
`engines:` in the manifest and is a claim that the skill *cannot run* elsewhere; retiring is
the checklist below. Full decision table and per-engine mechanics:
[`docs/skill-lifecycle.md`](docs/skill-lifecycle.md).

## Retiring Or Renaming Artifacts

Deleting a hook, skill, command, or plugin-like package means removing every active ownership path, not just the visible file:

1. Delete or rename the canonical source file/folder.
2. Remove active installer registration and generated config writes.
3. Remove active overlay/settings entries.
4. Add the old id/path/command to the relevant retired list so future installer runs clean existing symlinks or copies.
5. Remove live home-directory symlinks/copies if they are repo-owned.
6. Update docs and plans that describe the artifact in present tense.
7. Search repo and live config for the old id. Remaining hits should be retired lists or historical notes only.
8. Run syntax/config checks and prove the installer no longer recreates the retired artifact.
9. Sweep *instructions* that point at the old name, not just code: agent-executed
 docs (`AGENTS.md`/`CLAUDE.md`-class files, operating doctrine, skill bodies)
 referencing a renamed/retired CLI verb or moved doc path fail at runtime the
 moment an agent follows them. Concretely: grep doc corpora for backticked
 command mentions (e.g. launcher subcommands like `kuma <verb>`) and for
 relative links to the old path. Prefer a CI guard that re-checks this on
 every test run (kuma-studio: `docs-reference-integrity.test.mjs` — relative
 `.md` links must resolve; backticked launcher verbs must map to a real bin).

This rule exists because deleting only `~/.claude/hooks/<id>` or only `scripts/hooks/<id>` can let the artifact reappear on the next setup run — and because instructions pointing at the old name keep *re-teaching* agents the broken path long after the code is gone.

## Multi-Agent Compatibility Docs

Use these repo documents before changing compatibility claims:

- `docs/official-sources.json` — canonical source manifest for official docs refresh.
- `docs/compatibility-matrix.md` — current cross-agent support matrix (includes the Session Resume table).
- `docs/cli-invocation.md` — per-runtime CLI spawn (interactive vs headless) and resume invocation syntax.
- `docs/plugin-packaging.md` — plugin/extension packaging boundaries.
- `docs/completion-stack.md` — native completion/verification stacks (Claude Code `/goal` · Stop hook · `/verify`; Codex Goals · Stop hook · `/review`), enforcement grades, and verified misreading corrections.
- `docs/kuma-studio-patterns.md` — public Kuma Studio operating patterns that can be reused by other agents.
- `docs/cloud-automation.md` — daily cloud automation setup (Claude Routines, with a Codex App alternative).

Daily refresh automation must read the source manifest, fetch only official URLs, update docs only when evidence changed, and leave a PR rather than pushing to `main`.

## Cross-Agent Install Pattern

1. Prefer repo-local skill roots when the runtime documents them (`.agents/skills/`, `.claude/skills/`, `.grok/skills/`, `.cursor/skills/`) and the workflow is project-specific.
2. Symlink user-wide canonical skill folders into the runtime's documented user skill root only when the workflow should apply outside one repo.
3. Patch project-local hook config for project guardrails; patch user-level hook config only for personal/global guardrails.
4. Backup mutated JSON config files before writing.
5. `chmod +x` every hook script before registering it (Claude either spawns the executable directly (`args` form) or passes `command` to a shell; either way no exec bit = `Permission denied` everywhere).
6. Validate by feeding representative JSON payloads into the hook scripts — and run the script **directly** (`./hook.cjs ...`, no `node` prefix) to catch a missing exec bit the way Claude would.
7. **Land the change on EVERY engine AND every routed home, then prove it with a machine.** See the contract below — this step is not satisfied by remembering.

## Engine × Home Is A Product, And It Must Be Enumerated By A Machine

A hook policy change is never done on one engine, and never on one *home*: the registration surface is
`engine × home`, and the second factor is the one people drop. This skill already said "cover every
engine" and the drift kept happening anyway (수홍 2026-07-23) — so it is no longer a rule an author
follows, it is a check a machine runs. Prose cannot enumerate a product that changes when an account is
added. Full rationale and the measured incidents: [`docs/authoring-rules.md`](docs/authoring-rules.md).

- **Enumerate homes by DERIVATION, never a hand-kept list.** A home is a hook surface **iff the spawner points the engine at it**. In Kuma Studio that source is `ENGINE_ACCOUNT_ENV` (`packages/shared/engine-resume-provider.mjs`): Codex → `CODEX_HOME`, Grok → `GROK_HOME`.
- **An engine's absence from that map is itself a claim, and it must be read.** Claude is deliberately absent — its account switch swaps the global credential and `CLAUDE_CONFIG_DIR` is stripped from the spawn env, so the per-account directories are credential stores, not hook surfaces. Scanning the filesystem instead would invent phantom homes.
- **An isolated account home IS the config root** — `CODEX_HOME`/`GROK_HOME` hold `hooks.json` directly, with no `.codex`/`.grok` segment to join.
- **The same policy means different things per engine.** Grok's Stop hook is passive ("Only PreToolUse can block"), so a Stop-based guard that blocks on Claude/Codex only *observes* on Grok. Registration parity and enforcement parity are two different claims.
- **A home you could not read is `unknown`, never "matches."** Not measured is not equal.
- **Drift fails loudly.** A parity check that passes quietly on a surface it skipped is worse than no check.

**The machine (Kuma Studio).** `npm run hooks:parity` judges every discovered `engine × home` against the
canonical policy; `npm run skill:doctor` runs it on every sweep, and commits touching `scripts/hooks/` or
`scripts/install/` are gated on it. Its oracle is the installer itself — the canonical policy is applied
to a throwaway copy and the config is canonical iff nothing moved — so there is no second description of
"canonical" to drift from. Other runtimes should copy the *shape*, not the paths.

## Hook Payload And Decision Contract

The shared Claude/Codex `PreToolUse`/`PostToolUse` input schema, the decision output schema (modern
`hookSpecificOutput` and the legacy form), the Codex fields that are parsed-but-unsupported and which
failure mode each has, and Codex hook registration shape are all in
[`docs/hook-contract.md`](docs/hook-contract.md).

The three that cause silent breakage: `tool_input.command` is the only command field (`cwd`,
`session_id`, `tool_name` are **top-level**, not under `tool_input`); `{"continue": false, "stopReason"}`
is the **Stop** hook schema and fails open or closed if used for `PreToolUse`; and on Codex a Bash
`PreToolUse` guard is best-effort — the docs say it intercepts "only the simple ones" — so never treat it
as a complete shell gate.

## Validation Checklist

- The frontmatter YAML parses (quote any `description` containing `: `) — load it and confirm no parse error.
- The skill triggers from its frontmatter description.
- The hook allows normal commands and blocks the intended risky command.
- The hook script is executable (`chmod +x`, committed as `100755`) and runs directly without a `node` prefix — no `Permission denied`.
- The installer is idempotent and can run twice without duplicate hook entries.
- Config writes are atomic or backup-before-write.
- Dangerous-mode bypasses are never taught to the agent as automatic retry steps.
