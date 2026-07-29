# agent-extensions 운영 룰

## Summary

알렉스가 own 한 reusable agent skill 과 fork 떠둔 marketplace skill 의 SSoT 는
`~/Documents/workspace/personal/agent-extensions/` 다.
이 폴더가 엄브렐러(umbrella, 우산 컨테이너) 역할을 하고, 안에 자체 git remote 를
가진 fork 들과 own 한 skill 들이 nested 로 들어 있다.
글로벌 `~/.claude/skills/` / `~/.codex/skills/` 는 install 스크립트가 거기로
심볼릭 링크(symlink, 별칭) 만 거는 미러일 뿐이다.

### Why

- marketplace skill 본문에 우리 운영 룰을 박아야 invoke 시점에 시스템 프롬프트로
  inject 된다. 도메인 페이지나 vault learning 만으론 호출 시점에 자동 inject 보장이 약함.
- 하지만 marketplace skill 본문을 우리 vault/repo 안으로 복사하면 SSoT 가 둘이 되고,
  upstream 업뎃을 따라잡지 못한다.
- 따라서 fork 떠서 우리 GitHub repo 로 owned 화하고, 우리 patch 만 우리가 관리하며,
  upstream 업뎃은 `git fetch upstream && git merge upstream/main` 로 따라잡는다.
- 알렉스가 안 기억해도 다음 세션 / 다른 머신의 작업원이 본 룰 + `skills.json` 을 읽고
  새 보강을 어디 박을지 자동 라우팅하게 한다.

### How to apply

새 skill 보강이 필요할 때, 글로벌 `~/.claude/skills` 를 직접 수정하지 말고,
아래 라우팅 표에 따라 agent-extensions 안 적절한 sub repo 로 박는다.

## Rules

1. SSoT = `~/Documents/workspace/personal/agent-extensions/`.
   - Why: 한 폴더가 모든 own / fork skill 의 단일 진실의 출처(single source of truth).
   - How to apply: 새 보강 패치는 항상 이 폴더 안에서 한다. 다른 위치에 사본 만들지 않는다.

2. 글로벌 `~/.claude/skills/` / `~/.codex/skills/` 직접 수정 금지.
   - Why: install 스크립트가 만든 symlink 미러일 뿐이라, 직접 수정하면 SSoT 가 둘로 갈라짐.
   - How to apply: agent-extensions 안에서 수정 후 `npm run install:local` 으로 다시 깐다.

3. boundary: kuma-studio 자체 운영 skill 은 `kuma-studio/skills/`, 그 외는 agent-extensions.
   - Why: kuma-studio 는 GitHub public 이라 외부 fork 코드 들어가면 어색하고 노이즈.
     반면 ElevenLabs / cmux 같은 cross-project 자산은 kuma-studio 의 자식이 아니다.
   - How to apply: skill 이 kuma-studio 한 프로젝트에만 쓰이면 `kuma-studio/skills/`,
     여러 프로젝트 가로지르거나 외부 도구 운영이면 agent-extensions.

4. 새 보강 위치 라우팅.
   - Why: 어디 박을지 헷갈릴 때 1번 결정 트리로 빠르게 라우팅.
   - How to apply (결정 트리):
     - (a) marketplace skill 의 본문 강제 필요 →
           해당 fork (`agent-extensions/<fork>/SKILL.md`) 에 patch.
           예: ElevenLabs TTS 호출 룰 → `elevenlabs-skills/text-to-speech/SKILL.md`.
     - (b) alex 만의 신규 절차 →
           agent-extensions 의 새 own 디렉토리 + `skills.json` 등록.
     - (c) 도메인 어휘 / 카탈로그 (voice_id 리스트, model 비교 등) →
           `~/.kuma/vault/domains/<topic>.md`.
     - (d) 1회성 사건 카드 (trigger / symptom / cause / procedure) →
           `~/.kuma/vault/learnings/` (kuma-lesson promote --to vault 로).
     - (e) 운영 룰 본문 (이 페이지처럼) →
           결정이면 kuma-studio `DECISIONS.md`, 절차면 그 스킬 (`SKILL.md` 또는 그 스킬 `docs/`).

5. fork 떠진 marketplace skill 의 upstream 업뎃 따라잡기.
   - Why: upstream 이 새 기능 / 버그 픽스 push 하면 우리도 받아야 함.
   - How to apply:
     ```
     cd agent-extensions/<fork>
     git fetch upstream
     git merge upstream/main      # 또는 git rebase upstream/main
     # 충돌 시 우리 patch 의도 우선
     git push origin main
     ```

6. fork patch 작성 패턴 — 머지(merge, 합치기) 충돌 줄이기.
   - Why: upstream 파일을 많이 건드릴수록 다음 머지 충돌 폭증.
   - How to apply:
     - patch 는 작은 commit 으로 분리한다 (squash 안 함). cherry-pick / 재적용 쉽게.
     - upstream 파일을 큰 폭으로 리팩터(refactor, 구조 개편) 하지 않는다.
     - 우리 only 추가 파일은 prefix (`SKILL.kuma.md`, `notes.kuma.md` 같이) 로 두면 충돌 0%.

7. 메타 SSoT = `agent-extensions/skills.json`.
   - Why: 어떤 sub 가 fork 인지 own 인지, upstream / origin 이 어디인지, 우리 patch 가
     무엇인지를 한 파일에서 본다. 알렉스 안 기억해도 grep 한 번이면 답.
   - How to apply: 각 entry 에 다음 필드 유지.
     - `path`: 디렉토리 상대 경로.
     - `owned_remote`: 우리 GitHub repo (예: `github.com/aldegad/elevenlabs-skills`).
     - `upstream_remote`: 원본 marketplace repo (own only 면 비움).
     - `patches`: 우리가 박은 보강 한 줄 요약 리스트. lesson promote 시 한 줄 추가.
     - `note`: 자유 메모.

8. install 은 항상 `npm run install:local`.
   - Why: 자동 backup + 멱등(idempotent) symlink. 디렉토리 위치가 바뀌어도 자동 재계산.
   - How to apply: agent-extensions 의 위치 / 이름이 바뀌거나 새 sub 추가 후 한 번 돌린다.
     글로벌 symlink 들이 새 path 로 다시 깔린다.

## Current sub roster (2026-05-11)

| sub | 종류 | upstream | owned remote |
|---|---|---|---|
| `alex-core-invariants` | own (standalone repo) | - | `aldegad/alex-core-invariants` |
| `cmux/` | own (standalone repo) | - | `aldegad/cmux-skills` |
| `npm-reorg-guard` | own (standalone repo) | - | `aldegad/npm-reorg-guard` |
| `security-release-gates` | own (standalone repo) | - | `aldegad/security-release-gates` |
| `elevenlabs-skills/` | fork | `elevenlabs/skills` | `aldegad/elevenlabs-skills` (private) |
| `k-skill-hwp/` | cherry-picked (nested) | `NomaDamas/k-skill` | umbrella git only |
| `deep-research-skills/` | nested clone (upstream-tracked) | `Weizhena/Deep-Research-skills` (MIT) | umbrella git only |
| `content-pipeline` | own (umbrella sub-dir) | - | umbrella git only |
| `insane-search` | own (umbrella sub-dir) | - | umbrella git only |
| `skill-hook-authoring` | own (umbrella sub-dir) | - | umbrella git only |

`skills.json` 의 entry 가 본 표의 SSoT 다. 본 페이지의 표는 가독성용 미러이며,
변경이 잦은 상세는 `skills.json` 을 신뢰한다 (`byteplus-seedance` / `tenstorrent` /
`tripo-3d-asset` / `gdrive` / `image-gen` 등 추가 sub 포함).

`skills.json` entry 의 optional 필드 (2026-05-11 추가):

- `engines: {claude, codex}` — 엔진별로 다른 skill flavor 를 ship 하는 repo 용 (예:
  `deep-research-skills` 는 Claude→`research-en`, Codex→`research-codex-en`). 없으면 `path` 를
  양 엔진에 동일 심링크 (기존 동작).
- `agents: {claude: [...], codex: [...]}` — skill 이 의존하는 sub-agent 파일/디렉토리를
  `~/.claude/agents/` / `~/.codex/agents/` 로 심링크. `install-local.mjs` 가 처리.
