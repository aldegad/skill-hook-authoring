# 크로스 런타임 에이전트-플랫폼 상호운용성

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

하나의 저장소에 두 가지 요소가 포함됩니다.

1. **호환성 위키**: 공식 벤더 문서에서 매일 갱신되어 오늘의 에이전트 런타임( Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor, Kuma Studio )이 skills, hooks, plugins/extensions, project-instruction 파일, CLI 실행(인터랙티브 vs 헤드리스), 세션 재개, 결제 측면에서 어떻게 비교되는지를 기록합니다.
2. **런타임 상호운용 및 관리 방법론**: 하나의 저장소 소유 진실 원천( skills, hooks, commands, scripts, references, assets, MCP/app 연결, 런타임별 플러그인 메타데이터 )을 배포하되 에이전트 간에 드리프트가 생기지 않도록 관리합니다.

모든 호환성 주장에는 벤더의 공식 문서를 인용합니다. 어떤 런타임이 특정 기능을 문서화하지 않은 경우에는 동등성을 추측하지 않고 위키에 `not documented`로 기록합니다.

## 이 저장소가 관리하는 내용

- `SKILL.md`는 skill 진입점이자 작성/상호운용 방법론입니다.
- `docs/compatibility-matrix.md`는 런타임 간 비교표입니다(Session Resume 표 포함).
- `docs/cli-invocation.md`는 런타임별 CLI 실행 방식(인터랙티브 vs 헤드리스)과 재개 문법을 기록합니다.
- `docs/plugin-packaging.md`는 플랫폼별 플러그인/확장 패키징 차이를 설명합니다.
- `docs/official-sources.json`은 매일 재검증되는 소스 매니페스트입니다.
- `docs/cloud-automation.md`는 매일 갱신 자동화와 로컬이 아닌 클라우드에서 실행하는 이유를 설명합니다.
- `docs/kuma-studio-patterns.md`는 공개된 Kuma Studio 운영 패턴을 수집합니다.
- `CHANGELOG.md`와 git tag가 버전 기록을 담당합니다. 이력은 문서 본문이 아니라 여기에서 관리됩니다.

## 일일 위키 갱신

매일 실행되는 에이전트가 위키를 최신 상태로 유지합니다. `docs/official-sources.json`을 읽고 공식 벤더 URL을 가져온 뒤, 근거가 변경되면 풀 리퀘스트를 엽니다. `main`에는 직접 푸시하지 않습니다.

권장 경로는 **Claude Routines**입니다. 이는 Anthropic 클라우드에서 Claude 구독으로 실행되는 예약 Claude Code 세션으로, API 키가 필요 없고 GitHub Actions도 사용하지 않으며, 노트북이 꺼져 있어도 계속 실행됩니다. `claude -p`로 로컬에서 갱신을 실행하는 것은 권장되지 않습니다. 헤드리스 `claude -p`는 구독이 아닌 토큰 기반 API 요금으로 과금되며, 2026-06-15 이후 Agent SDK / `claude -p` 사용은 Claude 플랜 사용량으로 전혀 집계되지 않습니다. 자세한 내용은 `docs/cloud-automation.md`를 참고하세요.

1. Claude Code에서 `/schedule`을 실행하거나 <https://claude.ai/code/routines>를 엽니다.
2. 이 저장소를 대상으로 지정하고 `prompts/daily-official-doc-update.md`의 프롬프트를 사용합니다.
3. 하루에 한 번 예약합니다. 예약 실행은 PR을 열고, 소스 체크를 통과한 문서 전용 변경만 squash-merge하는 자동 병합 게이트를 실행합니다. 다른 변경사항은 검토가 필요합니다(자세한 내용은 `docs/cloud-automation.md` 참고).

Codex 사용자도 동일한 흐름을 Codex App Automation으로 실행할 수 있습니다. 두 경로 모두 `docs/cloud-automation.md`에서 확인할 수 있습니다.

## 로컬 체크

```bash
node scripts/check-official-sources.mjs --write-report
```

이 스크립트는 소스 ID, 허용된 공식 호스트, URL 접근 가능성, 필수 소스 카테고리, 그리고 `SKILL.md` 라인 예산을 검증합니다.