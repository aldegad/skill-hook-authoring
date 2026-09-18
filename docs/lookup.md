# Looking up a runtime fact

This repository holds **no vendor facts**. What Codex, Claude Code, Grok, Hermes,
Antigravity CLI or Cursor can do — which file it reads, which flag resumes a session,
which hook event can block, which model ids ship — is answered from the vendor's own
page **at the moment the question is asked**, and cited with the URL and the date.

Why not a mirror: this repo kept one for three months and refreshed it daily. The
copy the agents actually read still fell nine weeks behind the copy the refresh was
writing, and the day it mattered (2026-09-18, "can an interrupted turn continue
without a prompt?") the answer had to come from the official pages anyway. A mirror
costs a daily rewrite and is wrong exactly when it is trusted; a link costs one fetch
and is wrong only when the vendor is.

## 1. Pick the sources

`docs/official-sources.json` is the map. Every entry has an `agent`, a `kind`, the
official `url`, and `claims` — the questions that page is known to answer. Filter by
the runtime and the question class:

```bash
# every source for one runtime
node -e 'const m=require("./docs/official-sources.json");for(const s of m.sources.filter(s=>s.agent==="codex"))console.log(s.kind.padEnd(22),s.id.padEnd(40),s.url)'
# every source for one question class, all runtimes
node -e 'const m=require("./docs/official-sources.json");for(const s of m.sources.filter(s=>s.kind==="hooks"))console.log(s.agent.padEnd(16),s.url)'
```

| `kind` | Answers |
|---|---|
| `skills` | skill folder shape, discovery roots, invocation token, frontmatter limits |
| `hooks` | hook events, payload fields, decision output, registration file, what can block |
| `plugins` | plugin/extension manifest, bundling, trust review, marketplaces |
| `project-instructions` | which instruction files a runtime reads, in what order, how deep |
| `cli-invocation` | interactive vs headless launch, output-format flags, exit behaviour |
| `session-resume` | resume command, session store, session-id form |
| `configuration` | settings/config file schema |
| `completion-stack` | goal / verify / review surfaces and what enforces them |
| `model-lineup` | shipping model ids, effort tiers, retirements |
| `billing` | what a subscription covers vs what bills as API |
| `commands`, `automation`, `identity`, `overview`, `cli` | the rest — read the `claims` |

`agent` values: `claude-code`, `codex`, `grok`, `hermes-agent`, `antigravity-cli`,
`cursor-cli`, `gajae-code` (community — see §5), `github` (PR/notification mechanics).
Kuma Studio is not a vendor and has no entries; its patterns are in
`docs/kuma-studio-patterns.md`.

If no entry covers the question, start from the runtime's docs index (the entry with
`kind: overview` or the host in `policy.allowedHosts`) and add the page you end up
using (§6).

## 2. Fetch the page

- Fetch the official URL directly (WebFetch, `curl -sL --compressed <url>`). Some
  vendor sites answer compressed or serve a plain-Markdown twin at `<page>.md`; a 200
  whose body reads as binary garbage or an empty shell is a missing decompression step
  or a rendering path, not an absence — re-request before concluding anything.
- A blocked or empty fetch may be routed through an access helper (a reader proxy, a
  headless browser) **as a transport only**. The cited source stays the vendor URL. A
  blog, a forum thread, or another agent's summary is never the source of a
  capability claim.
- Read the section, not the snippet: capability pages carry their exceptions in the
  next paragraph ("does not intercept all shell calls yet", "background sessions
  excluded"). The exception is usually the fact that matters.

## 3. Decide what kind of answer you have

| Verdict | Means | Write it as |
|---|---|---|
| **documented** | the page states it | the fact + `(source: <url>, verified YYYY-MM-DD)`; quote the sentence for anything that can flip (paused/retired/"currently") |
| **not documented** | you read the relevant page(s) and the site's navigation for that topic and it is not there | `not documented (checked <url>, <url> on YYYY-MM-DD)` |
| **unverified** | the page could not be fetched or rendered | `unverified (<url>, YYYY-MM-DD, <reason>)` — never fill the gap from memory or another runtime |

Absence is a claim about your search, not about the vendor — name the pages you
checked. Never infer one runtime's behaviour from another's; parity is the most common
false fact in cross-runtime work.

## 4. Leave nothing behind here

The answer belongs to the work that asked for it — the plan, the vault page, the code
comment — with its citation and date. Do **not** add it to this repository: a table of
answers is a mirror, and a mirror is what this repo stopped being.

Two exceptions, both about *our* material:

- The answer changes one of **our rules** (`SKILL.md`, `docs/authoring-rules.md`,
  `docs/hook-contract.md`, `docs/skill-lifecycle.md`): edit the rule and put the
  citation and date on the line. Those files carry vendor-adjacent sentences only as
  the premise of a rule we own, each with its source id.
- The URL is dead or moved: fix `docs/official-sources.json` (§6).

## 5. Non-vendor and source-code evidence

- **Community runtimes** (currently `gajae-code`, MIT/beta) are tracked from their own
  README, flagged as non-vendor, and held to the same documented / not-documented
  discipline. Never present their README as a vendor guarantee.
- **A vendor's public source repo** may anchor only (a) source availability and
  licence, and (b) an implementation internal *explicitly labelled* source-verified
  with the file path, where no doc states it. It never overrides a doc-owned
  capability claim. Source-verified facts change without notice; re-verify like any
  other. (`policy.vendorSourceRule` in the manifest is the binding text.)

## 6. Maintaining the map

- **Add** a source when a question needed a page the manifest lacked: `id` (kebab,
  vendor-prefixed), `agent`, `kind` from the table above, the canonical `url` on a host
  in `policy.allowedHosts` (add the host in the same change if it is a vendor's own
  domain), and `claims` = the questions the page answered. Keep `claims` honest — it is
  the search index.
- **Remove** a source when the page is gone and has no successor; **replace** the url
  when it moved. Do not keep dead entries as history — `CHANGELOG.md` records the
  change.
- **Check** with `node scripts/check-official-sources.mjs` (adds `--write-report` for
  `reports/`, `--skip-network` for the shape-only pass). It validates ids, hosts,
  https, the required category anchors (`project-instructions`, `cli-invocation`,
  `session-resume`, `model-lineup` for Codex and Claude Code), and the `SKILL.md`
  500-line budget. The weekly routine (`docs/cloud-automation.md`) runs the same
  command and opens a PR only for a manifest fix.
