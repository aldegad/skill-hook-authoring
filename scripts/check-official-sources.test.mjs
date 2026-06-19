import test from "node:test";
import assert from "node:assert/strict";

import { validateManifest } from "./check-official-sources.mjs";

function validManifest() {
  return {
    policy: {
      allowedHosts: ["developers.openai.com", "code.claude.com"]
    },
    sources: [
      {
        id: "codex-project-instructions",
        agent: "codex",
        kind: "project-instructions",
        url: "https://developers.openai.com/codex/guides/agents-md",
        claims: ["Codex project instruction source"]
      },
      {
        id: "claude-project-instructions",
        agent: "claude-code",
        kind: "project-instructions",
        url: "https://code.claude.com/docs/en/memory",
        claims: ["Claude project instruction source"]
      },
      {
        id: "codex-cli-invocation",
        agent: "codex",
        kind: "cli-invocation",
        url: "https://developers.openai.com/codex/cli",
        claims: ["Codex CLI invocation source"]
      },
      {
        id: "claude-cli-invocation",
        agent: "claude-code",
        kind: "cli-invocation",
        url: "https://code.claude.com/docs/en/cli-reference",
        claims: ["Claude CLI invocation source"]
      },
      {
        id: "codex-session-resume",
        agent: "codex",
        kind: "session-resume",
        url: "https://developers.openai.com/codex/cli/reference",
        claims: ["Codex session resume source"]
      },
      {
        id: "claude-session-resume",
        agent: "claude-code",
        kind: "session-resume",
        url: "https://code.claude.com/docs/en/sessions",
        claims: ["Claude session resume source"]
      }
    ]
  };
}

test("valid manifest shape passes deterministic checks", () => {
  assert.deepEqual(validateManifest(validManifest()), []);
});

test("claims must be non-empty strings", () => {
  const manifest = validManifest();
  manifest.sources[0].claims = ["kept", "", "  ", 42];

  const failures = validateManifest(manifest);

  assert.match(failures.join("\n"), /codex-project-instructions\.claims\[1\] must be a non-empty string/);
  assert.match(failures.join("\n"), /codex-project-instructions\.claims\[2\] must be a non-empty string/);
  assert.match(failures.join("\n"), /codex-project-instructions\.claims\[3\] must be a non-empty string/);
});

test("allowed host policy entries must be bare hostnames", () => {
  const manifest = validManifest();
  manifest.policy.allowedHosts = [
    "https://developers.openai.com",
    " code.claude.com ",
    "Developers.OpenAI.com"
  ];

  const failures = validateManifest(manifest);

  assert.match(failures.join("\n"), /policy\.allowedHosts entry must be a bare hostname/);
  assert.match(
    failures.join("\n"),
    /policy\.allowedHosts entry must not include surrounding whitespace/
  );
  assert.match(failures.join("\n"), /policy\.allowedHosts entry must be lowercase/);
});

test("source entries require explicit agent, kind, and URL strings", () => {
  const manifest = validManifest();
  delete manifest.sources[0].agent;
  manifest.sources[1].kind = "";
  manifest.sources[2].url = 12;

  const failures = validateManifest(manifest);

  assert.match(failures.join("\n"), /codex-project-instructions\.agent must be a non-empty string/);
  assert.match(failures.join("\n"), /claude-project-instructions\.kind must be a non-empty string/);
  assert.match(failures.join("\n"), /codex-cli-invocation\.url must be a non-empty string/);
});

test("required baseline categories stay guarded", () => {
  const manifest = validManifest();
  manifest.sources = manifest.sources.filter((source) => source.kind !== "session-resume");

  const failures = validateManifest(manifest);

  assert.match(
    failures.join("\n"),
    /no source has kind=session-resume; the Session Resume baseline must stay covered/
  );
});

test("non-array sources fail loudly without throwing", () => {
  const manifest = validManifest();
  manifest.sources = {};

  assert.doesNotThrow(() => validateManifest(manifest));
  assert.match(validateManifest(manifest).join("\n"), /sources must be a non-empty array/);
});
