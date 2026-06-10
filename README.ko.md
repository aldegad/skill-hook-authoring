<p align="center">
  <img src="assets/icon.png" width="168" alt="One source of truth radiating to every agent runtime" />
</p>

<h1 align="center">크로스 런타임 에이전트 플랫폼 상호운영성</h1>

<p align="center"><b>실행하는 모든 AI 코딩 에이전트에서 스킬, 훅, 플러그인에 대한 단일 진실의 원천을 사용하세요.</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

이제는 더 이상 하나의 AI 에이전트만 실행하지 않습니다. Codex, Claude Code, Grok, Hermes, Antigravity, Cursor — 각자 “스킬”의 정의, 훅 등록 위치, 읽는 지시 파일, 세션 재개 방식, 과금 동작이 모두 다릅니다. 같은 도구를 수동으로 모두에 배포하면 일주일도 안 되어 서로 달라집니다. 런타임 Y에서 X를 할 수 있나?”를 물으면 답은 서로 다른 일곱 곳의 문서 사이트에 흩어져 있거나, 아예 문서화되지 않은 채입니다.

이 저장소는 지도이자 방법입니다.

1. **공식 벤더 문서에서 매일 갱신되는 호환성 위키.** 7개 런타임 — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor, Kuma Studio — 을 스킬, 훅, 플러그인/확장, 프로젝트 지시 및 메모리 파일, CLI 스폰(대화형/비대화형), 세션 재개, 과금 항목으로 비교했습니다.
2. **하나의 저장소 기반 단일 진실을 배포하기 위한 방법론** — 스킬, 훅, 명령, 스크립트, 참조 자료, 에셋, MCP/앱 연결, 플러그인 메타데이터를 모든 런타임에 드리프트 없이 설치: 단일 정규 패키지 루트, 심볼릭 링크 설치, 명시적 은퇴/이름 변경 절차, 검증 체크리스트.

## 답하는 질문들

원래라면 한낮을 날릴 수 있는 질문을 근거와 함께 답합니다:

| 질문 | 위키 답변 |
|---|---|
| “Grok이나 Hermes에서 스킬을 끌 수 있나요?” | 둘 다 공식적으로 스킬 단위 비활성화가 없어, 토글은 스킬을 발견 루트에서 이동해 제거해야 합니다. 이 사실은 실제 동작 토글을 만드는지, 거짓을 만들지의 차이를 만듭니다. |
| “각 에이전트는 어떤 지시 파일을 읽나요?” | `AGENTS.md` vs `CLAUDE.md` vs `GEMINI.md` vs `.hermes.md` — 누가 무엇을 어떤 우선순위로 읽는지, 그리고 이를 하나의 파일로 공유하는 방법까지 다룹니다. |
| “세션을 스크립트로 재개하려면?” | 세션 재개 표: 런타임별 재개 명령, 세션 저장 위치, 세션 ID 형식이 정리되어 있습니다. |
| “야간에 `claude -p` 크론을 돌리면 과금이 되나요?” | 과금 행에서 헤드리스/SDK 사용이 어떻게 청구되는지 정확히 추적합니다. 2026-06-15 Agent SDK 크레딧 변경도 포함합니다. |
| “Codex에서 `/<skill-name>`이 동작하나요?” | 아닙니다. Codex는 `$<skill-name>`을 사용합니다. 스킬 호출 매트릭스는 각 런타임의 실제 호출 토큰을 기록하므로, 한 토큰이 모두 통한다는 착각을 막을 수 있습니다. |

**여기가 여러분이 관리 도구를 올리는 기반입니다.** Kuma Studio의 스킬/훅 토글 시스템(Claude, Codex, Grok, Hermes에서 GUI 한 곳으로 스킬이나 훅을 켜고 끄는 기능)은 이 사실을 그대로 바탕으로 만들어졌습니다. 위키는 각 런타임의 실제 온오프 스위치(`skillOverrides`, `[[skills.config]]`, 훅 상태 키) 위치를 알려주고, 공식 스위치가 없는 곳은 그 또한 기록해 도구가 추측이 아니라 고의적으로 대응하도록 합니다. 어떤 크로스 에이전트 대시보드, 동기화 도구, 플릿 관리기를 만들더라도, 이 위키가 필요한 신뢰의 근거입니다. |

## 왜 신뢰할 수 있나

- **모든 주장에 벤더 자체 문서가 인용됩니다.** 느낌이나 경험적 추측, “내 환경에서는 됐습니다”가 아닙니다.
- **부재는 추론하지 않고 기록합니다.** 런타임이 특정 기능을 문서화하지 않은 경우, 위키는 이를 `not documented`로 명시합니다. 스위치의 존재 여부만큼 “스위치가 없다”는 사실도 중요합니다.
- **매일 자동으로 재검증됩니다.** 예약된 클라우드 에이전트가 `docs/official-sources.json`의 모든 출처를 다시 가져와 근거가 바뀌면 PR을 열고, 출처 검사를 통과한 문서 변경은 결정적 게이트가 자동 병합합니다. 크로스 런타임 도구가 노후화되는 가장 큰 원인은 오래된 호환성 표인데, 이 위키는 가만히 있지 않습니다.

## 이 저장소가 관리하는 항목

- `SKILL.md` — 스킬 진입점과 작성/상호운영성 방법론.
- `docs/compatibility-matrix.md` — 크로스 런타임 비교(스킬/훅/플러그인/지시문, 세션 재개, 스킬 호출).
- `docs/cli-invocation.md` — 런타임별 CLI 스폰(대화형 vs 비대화형) 및 재개 구문.
- `docs/plugin-packaging.md` — 플랫폼별 플러그인/확장 패키징 차이.
- `docs/official-sources.json` — 매일 재검증되는 소스 매니페스트.
- `docs/cloud-automation.md` — 일일 업데이트 자동화와 클라우드에서 실행되는 이유.
- `docs/kuma-studio-patterns.md` — 공개 Kuma Studio 운영 패턴.
- `CHANGELOG.md` 및 git 태그 — 버전 기록. 이력은 문서 본문이 아니라 여기에 남습니다.

## 일일 위키 갱신

일일 에이전트가 위키를 최신 상태로 유지합니다. `docs/official-sources.json`을 읽고 공식 벤더 URL을 가져온 뒤, 근거가 바뀌면 PR을 엽니다. `main`에는 직접 푸시하지 않습니다.

권장 경로는 **Claude Routines**입니다. 이는 Anthropic 클라우드에서 실행되는 예약된 Claude Code 세션으로, Claude 구독만으로 동작하며 API 키와 GitHub Actions가 필요 없습니다. 노트북을 닫은 상태에서도 계속 실행됩니다. 로컬에서 `claude -p`로 갱신을 돌리는 방식은 권장되지 않습니다. 2026-06-15부터 해당 구독 플랜에서 Agent SDK / `claude -p` 사용은 인터랙티브 플랜 풀 대신 매월 갱신되는 사용자별 별도 월간 Agent SDK 크레딧에서 차감되며 이월되지 않습니다. 또한 로컬 크론은 시스템이 깨어 있을 때만 동작합니다. 자세한 내용은 `docs/cloud-automation.md`를 참고하세요.

1. Claude Code에서 `/schedule`을 실행하거나 <https://claude.ai/code/routines> 를 여세요.
2. 루틴을 이 저장소로 지정하고 `prompts/daily-official-doc-update.md`의 프롬프트를 사용하세요.
3. 하루에 한 번 실행되도록 예약하세요. PR을 연 뒤 문서 변경만 통과한 항목은 자동 병합 게이트가 스쿼시 병합하고, 나머지는 검토를 기다립니다(`docs/cloud-automation.md` 참고).

Codex 사용자도 Codex App Automation으로 동일한 흐름을 실행할 수 있습니다. 두 경로 모두 `docs/cloud-automation.md`에서 확인할 수 있습니다.

## 로컬 점검

```bash
node scripts/check-official-sources.mjs --write-report
```

이 스크립트는 소스 ID, 허용된 공식 호스트, URL 접근성, 필수 소스 카테고리, `SKILL.md` 라인 예산을 검증합니다.