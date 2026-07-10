<p align="center">
  <img src="assets/icon.png" width="168" alt="One source of truth radiating to every agent runtime" />
</p>

<h1 align="center">크로스 런타임 에이전트-플랫폼 상호운용성</h1>

<p align="center"><b>실행하는 모든 AI 코딩 에이전트에서 스킬, 훅, 플러그인의 단일 진실 소스를 유지하세요.</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

더 이상 하나의 AI 에이전트만 실행하지 않습니다. Codex, Claude Code, Grok, Hermes, Antigravity, Cursor—각자 “스킬”의 개념, 훅 등록 위치, 읽는 지침 파일, 세션 재개 방식, 실제 과금 방식이 모두 다릅니다. 같은 도구를 하나씩 수동으로 배포하면 일주일도 안 돼서 서로 어긋납니다. “런타임 Y에서 X를 할 수 있나?”라고 물으면 답이 일곱 개의 문서 사이트에 흩어져 있거나, 아예 문서화되어 있지 않을 때도 있습니다.

이 리포지토리는 지도이자 방법론입니다.

1. **공식 공급사 문서로 매일 갱신되는 호환성 위키.** 일곱 개 런타임—Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor, Kuma Studio—를 스킬, 훅, 플러그인/확장, 프로젝트 지침 및 메모리 파일, CLI 실행 방식(인터랙티브/헤드리스), 세션 재개, 과금 방식으로 비교합니다.
2. **리포지토리 단일 진실 소스 기반 배포 방법론** — 스킬, 훅, 명령, 스크립트, 레퍼런스, 에셋, MCP/app 연결, 플러그인 메타데이터를 런타임 간에 드리프트 없이 설치합니다. 단일 정식 패키지 루트, 심볼릭 링크 설치, 명시적 중단/이름 변경 절차, 검증 체크리스트를 포함합니다.

## 해결하는 질문들

원래는 반나절이 걸렸을 문제를 근거와 함께 즉시 확인합니다:

| You ask | The wiki answers |
|---|---|
| "Can I toggle a skill off on Grok or Hermes?" | 공식적으로 Grok나 Hermes 둘 다 스킬 단위 비활성화 기능이 없습니다. 따라서 토글은 발견 루트(discovery root)에서 스킬을 제거하는 방식으로 처리해야 합니다. 이 차이가 “실제 동작하는 토글”과 “거짓 토글”의 경계를 만듭니다. |
| "Which instruction file does each agent read?" | `AGENTS.md` vs `CLAUDE.md` vs `GEMINI.md` vs `.hermes.md`—각 런타임이 어떤 파일을 우선순위로 읽는지, 그리고 이 파일들을 어떻게 하나로 공유할지 설명합니다. |
| "How do I resume a session from a script?" | 세션 재개 표를 통해 각 런타임의 재개 명령, 세션 저장 위치, 세션 ID 형식을 확인할 수 있습니다. |
| "Will my nightly `claude -p` cron cost me money?" | 구독에서는 플랜 사용 한도에서 차감됩니다 — 인터랙티브 사용과 같은 풀이며, 별도의 호출당 크레딧은 없습니다 (2026-06-15에 발표된 별도 청구 크레딧 변경은 일시 중단되어 적용되지 않습니다. `ANTHROPIC_API_KEY` 계정은 기존처럼 pay-as-you-go). 과금 행에 현재 검증된 상태와 날짜가 있습니다. |
| "Is `/<skill-name>` a thing on Codex?" | 아닙니다. Codex는 `$<skill-name>` 형식을 사용합니다. 스킬 호출 매트릭스는 각 런타임의 실제 호출 토큰을 기록해, 어디서든 하나의 토큰이 통한다는 가정을 없애줍니다. |

**이것은 관리형 도구를 구축하는 기반입니다.** Kuma Studio의 스킬/훅 토글 시스템—하나의 GUI에서 Claude, Codex, Grok, Hermes의 스킬이나 훅을 모두 켜고 끌 수 있는 기능—는 바로 이 위키를 바탕으로 만들어졌습니다. 위키는 각 런타임의 실제 온/오프 스위치(`skillOverrides`, `[[skills.config]]`, 훅 상태 키)를 알려주고, 공식적으로 스위치가 없는 경우에도 그 사실을 명시해 툴링이 추측하지 않고 의도적으로 대응하도록 합니다. 어떤 크로스 에이전트 대시보드, 동기화 도구, 플릿 관리자를 만들더라도, 이 위키가 신뢰할 수 있는 기준점이 됩니다.

## 왜 신뢰할 수 있나

- **모든 주장은 공급사 공식 문서에서 인용했습니다.** 감(感)에 기반하지 않고, 전설이나 “내 환경에서 잘 됐다” 같은 추측이 아닙니다.
- **부재는 추론하지 않고 기록합니다.** 런타임이 특정 기능을 문서화하지 않았으면 동등성을 가정하지 않고 `not documented`로 표시합니다. 스위치가 없다는 사실을 아는 것도 어디에 있는지 아는 것만큼 중요합니다.
- **매일 자체 재검증합니다.** 예약된 클라우드 에이전트가 `docs/official-sources.json`의 각 소스를 다시 가져와 증거가 바뀌면 PR을 열고, 근거 검증을 통과한 문서 전용 변경은 결정론적 게이트를 통해 자동 병합합니다. 오래된 호환성 테이블이 축적되면 크로스 런타임 도구는 부패합니다. 이 시스템은 그 상태를 방지합니다.

## 이 리포지토리가 담당하는 것

- `SKILL.md` — 스킬 진입점 및 작성/상호운용 방법론.
- `docs/compatibility-matrix.md` — 런타임 간 비교(스킬/훅/플러그인/지침, 세션 재개, 스킬 호출).
- `docs/cli-invocation.md` — 런타임별 CLI 실행 방식(인터랙티브 vs 헤드리스)과 재개 구문.
- `docs/plugin-packaging.md` — 플랫폼별 플러그인/확장 패키징 차이.
- `docs/official-sources.json` — 일일 갱신이 재검증하는 출처 매니페스트.
- `docs/cloud-automation.md` — 일일 업데이트 자동화 및 클라우드 실행 사유.
- `docs/completion-stack.md` — 네이티브 완료/검증 스택(Claude Code `/goal`·Stop hook·`/verify`, Codex Goals·Stop hook·`/review`)과 검증된 정정.
- `docs/kuma-studio-patterns.md` — 공개 Kuma Studio 운영 패턴.
- `CHANGELOG.md`와 git tag — 버전 기록. 변경 이력은 문서 본문이 아니라 이곳에 남깁니다.

## 일일 위키 갱신

전담 에이전트가 위키를 최신 상태로 유지합니다. `docs/official-sources.json`을 읽고 공식 공급사 URL을 다시 가져온 뒤, 근거가 바뀐 경우 PR을 엽니다. `main`에는 직접 푸시하지 않습니다.

권장 방식은 **Claude Routines**입니다. Anthropic 클라우드에서 Claude 구독 기반으로 동작하는 예약 Claude Code 세션을 사용하면, API 키 없이도 GitHub Actions 없이 운영할 수 있으며, 노트북이 꺼져 있어도 계속 실행됩니다. 반면 `claude -p`로 로컬에서 갱신을 실행하는 방식은 주로 **신뢰성** 때문에 권장되지 않습니다. 로컬 cron은 기기가 깨어 있을 때만 동작하는 반면, 클라우드 Routine은 노트북 상태와 무관하게 실행됩니다. (과금 관련: 구독에서 `claude -p` 및 Agent SDK 사용은 플랜 사용 풀에서 차감됩니다 — 2026-06-15로 발표된 월별 별도 크레딧 변경은 일시 중단되어 적용되지 않습니다. `ANTHROPIC_API_KEY` 사용자는 기존처럼 pay-as-you-go입니다. 현재 검증된 상태와 날짜는 `docs/cli-invocation.md`에 있습니다.) 자세한 내용은 `docs/cloud-automation.md`를 참고하세요.

1. Claude Code에서 `/schedule`을 실행하거나 <https://claude.ai/code/routines>를 엽니다.
2. 이 리포지토리를 대상으로 설정하고 `prompts/daily-official-doc-update.md`의 프롬프트를 사용합니다.
3. 하루에 한 번 예약합니다. 예약 작업은 PR을 열고, 소스 검증을 통과한 문서 전용 변경은 자동 병합 게이트를 통해 squash-merge됩니다. 그 외 변경은 검토 대기열로 갑니다(자세한 내용: `docs/cloud-automation.md`).

Codex 사용자는 Codex App Automation으로 같은 흐름을 실행할 수 있습니다. 두 경로 모두 `docs/cloud-automation.md`를 참조하세요.

## 로컬 점검

```bash
node scripts/check-official-sources.mjs --write-report
```

이 스크립트는 출처 ID, 허용된 공식 호스트, URL 도달 가능성, 필수 출처 카테고리, 그리고 `SKILL.md` 라인 예산을 검증합니다.