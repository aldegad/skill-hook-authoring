#!/usr/bin/env node
// install-local.mjs — install this skill into Claude and/or Codex, with an
// opt-in stale-checkout notifier hook.
//
// The wiki tracks seven runtimes, but local install automation covers the two
// with documented, stable install + hook surfaces: Claude Code and Codex. The
// stale-hook event is matrix-gated per runtime (Claude=SessionStart,
// Codex=PreToolUse); runtimes without a documented session-start hook are not
// auto-installed — use a shell-profile cwd guard or a manual `git pull` there.
//
// Usage:
//   node scripts/install-local.mjs [--runtime claude|codex|both]
//                                  [--link symlink|copy]
//                                  [--with-stale-hook] [--dry-run]
// All JSON patches are idempotent and back up the file first.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKILL_ID = "skill-hook-authoring";
const notifyHook = path.join(repoRoot, "scripts", "notify-if-stale.sh");

const opts = { runtime: "both", link: "symlink", staleHook: false, dryRun: false };
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--runtime") opts.runtime = argv[++i];
  else if (a === "--link") opts.link = argv[++i];
  else if (a === "--with-stale-hook") opts.staleHook = true;
  else if (a === "--dry-run") opts.dryRun = true;
  else if (a === "--help" || a === "-h") { usage(); process.exit(0); }
  else { console.error(`unknown arg: ${a}`); usage(); process.exit(1); }
}
function usage() {
  console.log(`Usage: node scripts/install-local.mjs [options]
  --runtime claude|codex|both   runtime(s) to install into (default both)
  --link symlink|copy           install the skill as a symlink or a copy (default symlink)
  --with-stale-hook             also register the opt-in stale-checkout notifier
  --dry-run                     print actions without changing anything
  -h, --help                    this help

Stale-hook event per runtime: claude -> SessionStart, codex -> PreToolUse ("*", self-throttled).`);
}
if (!["claude", "codex", "both"].includes(opts.runtime)) { console.error('--runtime must be claude|codex|both'); process.exit(1); }
if (!["symlink", "copy"].includes(opts.link)) { console.error('--link must be symlink|copy'); process.exit(1); }
const RUNTIMES = opts.runtime === "both" ? ["claude", "codex"] : [opts.runtime];

const tag = opts.dryRun ? "[dry-run]" : "[install]";
const log = (...m) => console.log(tag, ...m);

function isSymlink(p) { try { return fs.lstatSync(p).isSymbolicLink(); } catch { return false; } }
function exists(p) { try { fs.lstatSync(p); return true; } catch { return false; } }

function backup(file) {
  if (!fs.existsSync(file)) return;
  const bak = `${file}.bak`;
  if (opts.dryRun) { log(`would back up ${file} -> ${bak}`); return; }
  fs.copyFileSync(file, bak);
  log(`backed up ${file} -> ${bak}`);
}
function readJson(file) {
  if (!fs.existsSync(file)) return {};
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (e) { console.error(`refusing to patch malformed JSON: ${file} (${e.message})`); process.exit(1); }
}
function writeJson(file, obj) {
  if (opts.dryRun) { log(`would write ${file}`); return; }
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + "\n");
  log(`wrote ${file}`);
}
function hasCommand(groups, cmd) {
  return Array.isArray(groups) && groups.some((g) => Array.isArray(g.hooks) && g.hooks.some((h) => h.command === cmd));
}

function installSkill(rt) {
  const rtRoot = path.join(os.homedir(), `.${rt}`);
  if (!fs.existsSync(rtRoot)) { log(`~/.${rt} not found — skipping ${rt} (runtime not installed)`); return false; }
  const skillsDir = path.join(rtRoot, "skills");
  const dest = path.join(skillsDir, SKILL_ID);

  if (exists(dest)) {
    if (isSymlink(dest)) {
      const resolved = path.resolve(skillsDir, fs.readlinkSync(dest));
      if (resolved === repoRoot) { log(`${rt}: skill symlink already correct (${dest})`); return true; }
      log(`${rt}: ${dest} symlinks to ${resolved}, not this repo — leaving as-is, resolve manually`); return false;
    }
    log(`${rt}: ${dest} exists and is not a symlink — leaving as-is, resolve manually`); return false;
  }
  if (opts.dryRun) { log(`would ${opts.link === "symlink" ? "symlink" : "copy"} ${dest} <- ${repoRoot}`); return true; }
  fs.mkdirSync(skillsDir, { recursive: true });
  if (opts.link === "symlink") { fs.symlinkSync(repoRoot, dest); log(`${rt}: symlinked ${dest} -> ${repoRoot}`); }
  else { fs.cpSync(repoRoot, dest, { recursive: true }); log(`${rt}: copied repo -> ${dest}`); }
  return true;
}

function registerStaleHook(rt) {
  const rtRoot = path.join(os.homedir(), `.${rt}`);
  if (!fs.existsSync(rtRoot)) { log(`~/.${rt} not found — cannot register hook for ${rt}`); return; }
  const event = rt === "claude" ? "SessionStart" : "PreToolUse";
  const file = path.join(rtRoot, rt === "claude" ? "settings.json" : "hooks.json");
  const cfg = readJson(file);
  cfg.hooks = cfg.hooks || {};
  cfg.hooks[event] = cfg.hooks[event] || [];
  if (hasCommand(cfg.hooks[event], notifyHook)) { log(`${rt}: ${event} notifier already registered — skip`); return; }
  backup(file);
  const entry = rt === "claude"
    ? { hooks: [{ type: "command", command: notifyHook }] }
    : { matcher: "*", hooks: [{ type: "command", command: notifyHook, timeout: 30 }] };
  cfg.hooks[event].push(entry);
  writeJson(file, cfg);
  log(`${rt}: registered ${event} stale-checkout notifier`);
}

console.log(`skill-hook-authoring local installer`);
console.log(`repo: ${repoRoot}`);
console.log(`runtime(s): ${RUNTIMES.join(", ")} | link: ${opts.link} | stale-hook: ${opts.staleHook} | dry-run: ${opts.dryRun}\n`);
for (const rt of RUNTIMES) {
  const ok = installSkill(rt);
  if (ok && opts.staleHook) registerStaleHook(rt);
}
console.log(`\ndone.${opts.dryRun ? " (dry-run — nothing changed)" : ""}`);
if (opts.staleHook) console.log(`stale notifier script: ${notifyHook}`);
