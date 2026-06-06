#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, "docs", "official-sources.json");
const reportPath = path.join(root, "reports", "official-source-check.md");
const shouldWriteReport = process.argv.includes("--write-report");
const skipNetwork = process.argv.includes("--skip-network");

const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const allowedHosts = new Set(manifest.policy?.allowedHosts ?? []);
const ids = new Set();
const failures = [];
const checks = [];

function fail(message) {
  failures.push(message);
}

function assertArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    fail(`${label} must be a non-empty array`);
  }
}

assertArray(manifest.sources, "sources");
assertArray(manifest.policy?.allowedHosts, "policy.allowedHosts");

for (const source of manifest.sources ?? []) {
  if (!source.id || typeof source.id !== "string") {
    fail("source missing string id");
    continue;
  }
  if (ids.has(source.id)) {
    fail(`duplicate source id: ${source.id}`);
  }
  ids.add(source.id);

  let url;
  try {
    url = new URL(source.url);
  } catch {
    fail(`${source.id}: invalid URL`);
    continue;
  }

  if (url.protocol !== "https:") {
    fail(`${source.id}: URL must use https`);
  }
  if (!allowedHosts.has(url.hostname)) {
    fail(`${source.id}: host ${url.hostname} is not in policy.allowedHosts`);
  }
  assertArray(source.claims, `${source.id}.claims`);
}

// Guard the Project Instruction Files baseline so a future edit cannot silently
// drop the category that the daily refresh must keep verifying. Codex and Claude
// Code are the anchor runtimes with dedicated official memory/AGENTS.md pages.
const projectInstructionAgents = new Set(
  (manifest.sources ?? [])
    .filter((source) => source.kind === "project-instructions")
    .map((source) => source.agent)
);
if (projectInstructionAgents.size === 0) {
  fail(
    "no source has kind=project-instructions; the Project Instruction Files baseline must stay covered"
  );
}
for (const requiredAgent of ["codex", "claude-code"]) {
  if (!projectInstructionAgents.has(requiredAgent)) {
    fail(`missing kind=project-instructions source for ${requiredAgent}`);
  }
}

// Guard the CLI Spawn (headless launch) and Session Resume baselines the same
// way: a future edit must not silently drop either category that the daily
// refresh re-verifies. Codex and Claude Code are the anchor runtimes with
// dedicated official CLI / session pages.
function guardCategory(kind, label) {
  const agents = new Set(
    (manifest.sources ?? [])
      .filter((source) => source.kind === kind)
      .map((source) => source.agent)
  );
  if (agents.size === 0) {
    fail(`no source has kind=${kind}; the ${label} baseline must stay covered`);
  }
  for (const requiredAgent of ["codex", "claude-code"]) {
    if (!agents.has(requiredAgent)) {
      fail(`missing kind=${kind} source for ${requiredAgent}`);
    }
  }
}
guardCategory("cli-invocation", "CLI Spawn And Headless Launch");
guardCategory("session-resume", "Session Resume");

if (!skipNetwork) {
  for (const source of manifest.sources ?? []) {
    const started = Date.now();
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const response = await fetch(source.url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "user-agent": "skill-hook-authoring-official-source-check/1.0"
        }
      });
      clearTimeout(timeout);
      const elapsed = Date.now() - started;
      const ok = response.status >= 200 && response.status < 400;
      checks.push({ id: source.id, status: response.status, ok, elapsed });
      if (!ok) {
        fail(`${source.id}: HTTP ${response.status}`);
      }
      await response.arrayBuffer();
    } catch (error) {
      checks.push({ id: source.id, status: "error", ok: false, elapsed: Date.now() - started });
      fail(`${source.id}: fetch failed: ${error.message}`);
    }
  }
}

const skillPath = path.join(root, "SKILL.md");
const skillLines = (await fs.readFile(skillPath, "utf8")).split(/\r?\n/).length;
if (skillLines > 500) {
  fail(`SKILL.md has ${skillLines} lines; keep it at or below 500`);
}

if (shouldWriteReport) {
  const now = new Date().toISOString();
  const lines = [
    "# Official Source Check",
    "",
    `Generated: ${now}`,
    "",
    "Manifest: `docs/official-sources.json`",
    `Network: ${skipNetwork ? "skipped" : "checked"}`,
    `SKILL.md lines: ${skillLines}`,
    "",
    "## Sources",
    "",
    "| Source | Status | Time |",
    "|---|---:|---:|"
  ];

  if (checks.length === 0) {
    for (const source of manifest.sources ?? []) {
      lines.push(`| ${source.id} | not checked | - |`);
    }
  } else {
    for (const check of checks) {
      lines.push(`| ${check.id} | ${check.status} | ${check.elapsed}ms |`);
    }
  }

  lines.push("", "## Result", "");
  if (failures.length === 0) {
    lines.push("PASS");
  } else {
    lines.push("FAIL", "");
    for (const failure of failures) {
      lines.push(`- ${failure}`);
    }
  }

  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, `${lines.join("\n")}\n`);
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure);
  }
  process.exit(1);
}

console.log(`official source check passed (${manifest.sources.length} sources, SKILL.md ${skillLines} lines)`);
