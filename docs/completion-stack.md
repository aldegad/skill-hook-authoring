# Native Completion & Verification Stacks (Claude Code · Codex)

Last reviewed: 2026-07-29 (claims verified against official docs and vendor
source 2026-06-15; migrated into this skill from operator research pages
2026-07-10; Codex goal claims re-anchored 2026-07-17 after the follow-goals
page was slimmed to a use-case walkthrough)

How Claude Code and Codex natively force work to finish **with evidence** —
the built-in goal gates, Stop hooks, and verification skills — and where each
stack is soft. This is the **baseline you must know before evaluating any
external "finish-the-work" harness**: most such harnesses repackage the
built-ins described here. It also records several **verified corrections**
that are easy to get wrong from memory and are *not* all recoverable from the
official docs alone (some were verified against vendor source code); the
[Misreading traps](#misreading-traps-verified-corrections) section preserves
them explicitly.

Sources: [Claude Code /goal](https://code.claude.com/docs/en/goal) ·
[Claude Code hooks](https://code.claude.com/docs/en/hooks) ·
[Claude Code commands](https://code.claude.com/docs/en/commands) ·
[Claude Code checkpointing](https://code.claude.com/docs/en/checkpointing) ·
[Claude Code subagents](https://code.claude.com/docs/en/sub-agents) ·
[Codex follow-goals](https://learn.chatgpt.com/use-cases/follow-goals) ·
[Codex goals cookbook](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex) ·
[Codex hooks](https://learn.chatgpt.com/docs/hooks) ·
[Codex config reference](https://learn.chatgpt.com/docs/config-file/config-reference) ·
[Codex CLI](https://learn.chatgpt.com/docs/codex/cli) ·
[openai/codex source](https://github.com/openai/codex)

## Claude Code

### `/goal` — session-scoped completion gate (HARD, built-in)

[docs/en/goal](https://code.claude.com/docs/en/goal) · v2.1.139+

**`/goal` is a Claude Code (Anthropic) built-in slash command.** It does not
appear in skill/bin listings, which makes it easy to misjudge as "not
installed" — it is there.

- `/goal <condition>` sets a completion condition; Claude then progresses
  toward it autonomously. Official: *"After each turn, a small fast model
  checks whether the condition holds. If not, Claude starts another turn
  instead of returning control to you."*
- **The evaluator is a separate fresh model** (default Haiku) returning yes/no
  plus a short reason. Official: *"completion is decided by a fresh model
  rather than the one doing the work."* — independent judgment, not the
  agent's own completion claim.
- Implementation: *"`/goal` is a wrapper around a session-scoped prompt-based
  Stop hook."* — the same primitive as the Hooks section below.
- One goal per session. **Typing a new `/goal <condition>` over an active goal
  replaces it** — there is no edit verb (contrast: Codex has `/goal edit`,
  a usage-preserving in-place edit; see the Codex section — goal steerability
  favors Codex). `/goal` with no argument shows status/turns/tokens;
  `/goal clear` (aliases `stop`/`off`/`reset`/`none`/`cancel`) clears it.
  `--resume`/`--continue` restores an active goal (turn/timer/token baselines
  reset). Works headless (`-p "/goal ..."`), in desktop, and via Remote
  Control. Conditions max 4,000 chars; turn/time bound clauses are allowed
  ("or stop after 20 turns").
- **Decisive limitation (official, verbatim):** *"The evaluator judges your
  condition against what Claude has surfaced in the conversation. It doesn't
  run commands or read files independently."* The evaluator is
  **transcript-based and tool-less** — not an independent oracle. Vague
  conditions fool it; embed verification commands plus expected output in the
  condition itself ("`npm test` exits 0", "`git status` is clean").
- In a Claude goal loop, the actual edit/run work is done by the **working
  model** each turn (not the evaluator); the evaluator only sees what got
  surfaced in the transcript.
- **Session-persistence siblings** (official comparison): `/goal` (until the
  condition holds) · `/loop` (fixed time interval) · a direct Stop hook
  (config-resident; script = deterministic, prompt = model-judged) ·
  **auto mode** (auto-approves tools *within* a turn but never starts a new
  turn). `/goal` + auto mode are complementary: the former removes the
  per-turn prompt, the latter the per-tool prompt. Outside a session:
  scheduled tasks / cloud routines.
- Requirements: accepted workspace trust and hooks enabled — with
  `disableAllHooks` or `allowManagedHooksOnly` the goal is inactive and Claude
  Code says why (no silent failure).

### Hooks — Stop / SubagentStop (HARD) and the full lifecycle

[docs/en/hooks](https://code.claude.com/docs/en/hooks)

- **Stop hook**: fires when Claude is about to end its response. Returning
  `{"decision":"block","reason":"..."}` or exit code 2 (+stderr) **prevents
  the stop and forces continuation**. `stop_hook_active` is the infinite-loop
  guard. A **prompt-type Stop hook** sends condition + transcript to a small
  model for an `{"ok":true|false}` verdict — this is exactly the primitive
  `/goal` wraps.
- **SubagentStop hook**: same block/continue at subagent termination.
- Both Stop and SubagentStop also support
  `hookSpecificOutput.additionalContext` — non-error feedback injected for
  Claude while the conversation **continues** (as opposed to `decision:"block"`
  / exit 2, which forces continuation).
- Completion-relevant events: `Stop` · `SubagentStop` (blockable) /
  `PostToolUse` (e.g. lint-after-edit verification triggers) /
  `UserPromptSubmit` · `PreToolUse` (policy enforcement) / `SessionStart` ·
  `PreCompact` · `Notification` (non-blocking).

### `/verify` · `/run` — render/execute verification (built-in skills)

[docs/en/commands](https://code.claude.com/docs/en/commands)

- **`/verify`** (v2.1.145+): *"Confirm a code change does what it should by
  building your project's app, running it, and observing the result, rather
  than relying on tests or type checks."* Verification grounding is a
  **built-in skill**, not something an external harness has to add.
- **`/run`**: launches the project app to observe a change live
  (`/run-skill-generator` teaches it the build/run recipe). Produces the
  observable-behavior evidence a `/goal` condition can then check.

### Supporting primitives — plan mode · subagents · TodoWrite · checkpoints

- **Plan mode** — read-only with an approval gate: edit/destructive
  permissions blocked until the user approves execution.
- **Subagents / Task** — isolated context, tool restrictions, own hooks
  (Stop → SubagentStop automatically).
  [sub-agents](https://code.claude.com/docs/en/sub-agents)
- **TodoWrite / task lists** — **display-only, not a gate** (official).
  [todo-tracking](https://code.claude.com/docs/en/agent-sdk/todo-tracking)
- **Checkpoints / `/rewind`** — automatic edit tracking and rollback (soft;
  bash-made changes are not tracked).
  [checkpointing](https://code.claude.com/docs/en/checkpointing)

### Enforcement grades (per official docs)

| Primitive | Grade | Notes |
|---|---|---|
| `/goal` + Haiku evaluator | **HARD** | session-scoped, fresh-model verdict — but transcript-based |
| Stop hook (exit 2 / `decision:block`) | **HARD** | the primitive under `/goal` |
| Plan mode | **HARD** (permissions) + approval gate | |
| `/verify` · `/run` skills | SOFT | produce evidence; do not gate stopping |
| TodoWrite · checkpoints · output styles | SOFT | display / rollback / tone |

## Codex

Codex ships a stack **almost 1:1 parallel** to Claude Code's: Goals (`/goal`)
+ a full hooks system (Stop/SubagentStop block) + `/review`. Goal gates are
native to **both** major runtimes — not the property of any single product.

### Goals (`/goal`) — active edit·run·verify completion loop (built-in, feature-flagged)

[use-cases/follow-goals](https://learn.chatgpt.com/use-cases/follow-goals) ·
[cookbook](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex)

**Codex Goals is not a passive checker — it is an active agentic loop.**
Official verbatim: *"Once the Goal is active, Codex can inspect the code, run
the relevant commands, make changes, test the result, and continue until it
reaches a stopping condition."* The goal loop itself edits files, runs
commands, and tests — the decisive contrast with Claude's `/goal` evaluator
(tool-less, transcript-only; see above).

- **A goal definition is a 6-element contract** (cookbook): ① outcome (what
  must be true at the end) ② **verification surface** (the tests / benchmarks
  / reports / artifacts / command output that prove it) ③ constraints (no
  regressions along the way) ④ **boundaries** (which files/tools/data/repos
  may be touched) ⑤ iteration policy (how to decide the next attempt)
  ⑥ blocked stop (stop and report when defensible paths are exhausted).
- **Evidence-based completion** (official verbatim): *"A Goal should not be
  marked complete because the model believes it is probably done. It should be
  complete only after the objective is checked against the relevant files,
  tests, logs, benchmark output, generated artifacts, or other concrete
  evidence."*
- **The completion judge is the working model itself** (implementation
  analysis): "The model can start a goal and **declare it complete**" — there
  is **no separate independent evaluator**. Claude's `/goal` is judged by a
  separate fresh Haiku instead. See
  [the cross-engine asymmetry](#the-cross-engine-asymmetry) below.
- **Controls**: `/goal <objective>` set · `/goal` status · **`/goal edit`** ·
  `/goal pause` · `/goal resume` · `/goal clear`. Official usage string
  (openai/codex `codex-rs/tui/src/goal_display.rs`):
  `Usage: /goal [<objective>|clear|edit|pause|resume]`. The progress row's
  buttons also expose edit/pause/resume/clear
  ([developer-commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli),
  the registered source — it states *"`/goal` | Set, edit, pause, resume, view,
  or clear a task goal."*; the narrower sentence *"Use `/goal edit` to revise the
  objective."* is `unverified this run`).
  There is no `/goal set` subcommand — setting is the bare `/goal <objective>`.
- **`/goal edit` — in-place edit of a running goal (source-verified in
  openai/codex):** loads the current objective into the editor
  (`objective_text_for_edit`), then applies it via
  `ThreadGoalSetMode::UpdateExisting` in `thread_goal_set` (distinct from
  `ReplaceExisting`; `thread_goal_actions.rs`). **Usage/timer are preserved**:
  in the `ThreadGoal` schema `{objective, status, tokenBudget, tokensUsed,
  timeUsedSeconds, createdAt, updatedAt}` only `objective` + `updatedAt`
  change; `tokensUsed`, `timeUsedSeconds`, `createdAt` carry over. Right after
  the edit, a hidden prompt (`ext/goal/templates/goals/objective_updated.md`)
  is injected: *"The active thread goal objective was edited by the user. The
  new objective below supersedes any previous thread goal objective...
  Adjust the current turn to pursue the updated objective. Avoid continuing
  work that only served the previous objective..."* plus the remaining token
  budget. Net effect: **re-aim a goal mid-flight without resetting
  progress** (the follow-goals page's "tighten the goal rather than adding more
  one-off instructions" without losing usage; the cookbook's own tightening
  advice applies to a *draft before activation*, not mid-flight).
  Typing a fresh `/goal <objective>` over an active goal is the *other* path:
  `ReplaceExisting` (reset, with a "replace" confirmation).
- **vs Claude**: Claude's `/goal` is **replace-only** (a new `/goal` swaps the
  goal; `--resume` resets turn/timer/token baselines) — it has no
  usage-preserving in-place edit (per docs/en/goal). Goal steerability favors
  Codex.
- **Lifecycle/persistence** (implementation analysis): states
  `active` → `paused` → `complete` | `budget_limited` (terminal). SQLite
  `thread_goals` records tokens and wall-clock atomically. User interrupt
  auto-pauses; thread resume auto-reactivates. On budget exhaustion the goal
  stops substantive work and summarizes progress/blockers.
- **Activation**: the `features.goals` flag in `config.toml` (or
  `codex features enable goals`). Also exposed in Codex Mobile
  (changelog 2026-06-09).
- Grade: **MEDIUM (active verification) + SOFT (self-declared completion)** —
  it manufactures real evidence via edit/run/test, but the done verdict is the
  working model's own. External hard enforcement is the Stop hook below.

### Hooks — Stop / SubagentStop (HARD)

[codex hooks](https://learn.chatgpt.com/docs/hooks)

- Codex has a **full lifecycle hooks system** (modeled on Claude Code's).
  Events: `SessionStart` · `SessionEnd` · `SubagentStart` · `PreToolUse` ·
  `PermissionRequest` · `PostToolUse` · `PreCompact` · `PostCompact` ·
  `UserPromptSubmit` · `SubagentStop` · `Stop`.
- **The Stop hook is a real hard gate**:
  `{"decision":"block","reason":"Run one more pass over the failing tests."}`
  or exit code 2 (+stderr) blocks turn termination and forces another pass.
  `stop_hook_active` is the loop guard; a matching Stop hook with
  `continue:false` takes precedence. Functionally identical to Claude Code's
  Stop hook.
- Config: `[hooks]` in `config.toml` or `hooks.json`. Hooks are **enabled by
  default** — disable with `[features] hooks = false`. Hook trust is enforced (hash-pinned; trust via `/hooks`;
  `--dangerously-bypass-hook-trust` to override). Managed restriction:
  `allow_managed_hooks_only`.

### `/review` and the soft surfaces

- **`/review`** (in-session): *"a dedicated reviewer that reads the diff you
  select and reports prioritized, actionable findings without touching your
  working tree."* Report-shaped — **not a pass/fail gate**.
  [codex/cli](https://learn.chatgpt.com/docs/codex/cli)
- **`update_plan`** (plan tool) — display/tracking surface, not a gate.
- **AGENTS.md** — soft instructions (e.g. "Always run `npm test` after
  modifying JS"); merged into the prompt, not an enforced checkpoint.
  [agent-configuration/agents-md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- **Approval/sandbox modes** (read-only / workspace-write /
  danger-full-access; on-request/never/untrusted/granular) — **safety and
  permission** gates, not completion gates.
  [agent-approvals-security](https://learn.chatgpt.com/docs/agent-approvals-security)
- **`notify`** — fire-and-forget JSON side channel to an external program
  (`agent-turn-complete`); not a gate.
- `codex exec` (non-interactive/CI, JSONL), `codex apply` (`unverified this
  run`), `codex mcp`
  (MCP client + server). [developer-commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli)

### Enforcement grades (per official docs)

| Primitive | Grade | Notes |
|---|---|---|
| Stop / SubagentStop hooks | **HARD** | block/continue · exit 2 · loop guard (same as Claude Code) |
| Goals (`/goal`, `features.goals`) | SOFT–MEDIUM | evidence-based done, model-judged, safety-bounded auto-continue |
| Approval/sandbox modes | HARD (permissions) | safety gate, not completion |
| `/review` · `update_plan` · AGENTS.md · `notify` | SOFT | report / display / instruction / notification |

## The cross-engine asymmetry

The two goal gates are weak on **opposite axes** — neither dominates:

1. **Judgment independence: Claude > Codex.** Claude's `/goal` verdict comes
   from a separate fresh model (Haiku); Codex's working model declares its own
   goal complete.
2. **Verification activeness: Codex > Claude.** Codex's goal loop itself
   edits, runs, and tests (active evidence manufacture); Claude's evaluator
   only reads the transcript and runs nothing.

Practical consequence: on Claude, put executable checks with expected output
*inside* the goal condition (the transcript is all the judge sees); on Codex,
treat the completion declaration with suspicion and back it with a Stop hook
if you need hard enforcement.

## Misreading traps (verified corrections)

Corrections verified 2026-06-15 against official docs and the openai/codex
source. These are the claims most often gotten wrong from memory; several are
**not stated in any single official page**, so they are preserved here
explicitly.

1. **`/goal` is a Claude Code built-in** (Anthropic, v2.1.139+). It does not
   show up in skill/bin listings, which repeatedly causes a false "it doesn't
   exist" conclusion. Verified live in-session.
2. **ZCode is not a Claude-Code-family runtime, and no "ZCode `/goal`" has
   been independently verified.** The claim "ZCode inherited `/goal` because
   it is a Claude-Code-like runtime" was an unsupported guess — retracted.
   Verified: **ZCode (Z Code) is Z.AI (Zhipu)'s Agentic Development
   Environment** — a separate desktop product (integrated file manager,
   terminal, Git, browser preview, agent chat; GLM plus
   Anthropic/OpenAI-compatible endpoints; home directory `~/.agents/`). Any
   third-party harness citing "ZCode's `/goal`" is repeating that project's
   README claim, not an independently verified mechanism, and there is no
   evidence it matches Claude Code's `/goal`. "Goal gates are not one
   runtime's property" stands on Claude Code + Codex (each independently
   verified) — do not recruit ZCode as the comparison axis.
3. **Codex Goals is not a soft model-judgment checker.** An earlier assessment
   downgraded it as "soft model judgment" — wrong. The official docs describe
   an active loop that inspects code, runs commands, makes changes, and tests
   the result (verbatim quote in the Codex section above).
4. **Codex `/goal edit` exists and preserves usage** (twice misjudged as "no
   edit verb"). Source-confirmed in openai/codex: `goal_display.rs` usage
   string, `ThreadGoalSetMode::UpdateExisting` vs `ReplaceExisting` in
   `thread_goal_actions.rs`, usage-carrying `ThreadGoal` schema. Claude's
   `/goal` is the replace-only one.
5. **Claude's `/goal` evaluator is a soft oracle**: it judges the transcript
   only and *"doesn't run commands or read files independently"* (official).
   Independent-looking, but it can be fooled by whatever the working model
   surfaces — hence executable checks belong inside the condition text.

## Implications for external completion harnesses

Findings from evaluating two external "finish-the-work" harnesses (fablize,
prometheus) against this native baseline — kept here because the pattern
generalizes to any harness that promises completion discipline:

- **fablize's four axes all overlap the native stack**: ① a `goals.py`
  multi-story gate ↔ native `/goal` (runtime-enforced, fresh evaluator — and
  **`/goal` is stronger**: `goals.py` only fires if the agent calls it, the
  exact weakness prometheus criticized); ② a `UserPromptSubmit` router ↔
  native hooks; ③ a finish-the-work Stop hook ↔ the **native Stop hook
  primitive** (an earlier read called this "the one genuine addition" — wrong:
  Stop hooks are built-in, and `/goal` itself *is* a session-scoped Stop
  hook); ④ a verification-grounding pack ↔ the native `/verify` skill. Net
  increment over stock Claude Code: one early-stop heuristic script plus two
  pack texts — marginal.
- **prometheus's headline ("retire `goals.py`, delegate to `/goal`")** reduces
  to "use the built-in instead of a worse reimplementation" — self-evident
  once you know `/goal` is built-in. Its remaining pieces overlap plan mode,
  subagents, and `/verify`. And in **either** major runtime, "delegate
  completion to the `/goal` runtime" is built-in usage, not a new insight.
- **The irony**: prometheus elevates `/goal` to an "un-gameable runtime gate,"
  but officially the evaluator runs nothing and reads only the transcript —
  so `/goal` itself carries the self-deception risk prometheus warned about.
  The gate is softer than such harnesses imply.
- Codex's official Goals language ("should not be marked complete because the
  model believes it is probably done" — concrete evidence only) is **the
  vendor productizing exactly the discipline these harnesses tried to enforce
  via prompts**.
