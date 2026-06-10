# 크로스 런타임 에이전트 플랫폼 상호운용성

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

이 저장소에는 두 가지가 포함됩니다.

1. **호환성 위키**: 공식 공급업체 문서에서 매일 갱신되며, 오늘날의 에이전트 런타임인 Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor, Kuma Studio가 스킬, 훅, 플러그인/확장, 프로젝트 지침 파일, CLI 스폰(인터랙티브/헤드리스), 세션 재개, 과금 측면에서 어떻게 비교되는지 기록합니다.
2. **상호운용 및 관리 방법론**: 런타임 간에 에이전트를 운영하기 위한 방법으로, 하나의 저장소 소유 진실 원천(skills, hooks, commands, scripts, references, assets, MCP/app 연결, 또는 런타임별 플러그인 메타데이터)을 사용하면서 에이전트 간 편차 없이 유지합니다.

모든 호환성 주장은 공급업체의 공식 문서에 근거합니다. 런타임이 특정 기능을 문서화하지 않은 경우, 위키에는 동등성 추정을 하지 않고 `not documented`로 기록합니다.

## 이 저장소의 범위

- `SKILL.md`는 스킬 진입점이며 저작 및 상호운용 방법론입니다.
- `docs/compatibility-matrix.md`는 크로스 런타임 비교표(세션 재개 테이블 포함)입니다.
- `docs/cli-invocation.md`는 런타임별 CLI 스폰(인터랙티브 vs 헤드리스)과 재개 문법을 기록합니다.
- `docs/plugin-packaging.md`는 플랫폼별 플러그인/확장 패키징 방식의 차이를 설명합니다.
- `docs/official-sources.json`은 매일 갱신 시 재검증되는 출처 매니페스트입니다.
- `docs/cloud-automation.md`는 일일 업데이트 자동화 및 로컬이 아닌 클라우드에서 실행되는 이유를 설명합니다.
- `docs/kuma-studio-patterns.md`는 공개된 Kuma Studio 운영 패턴을 정리합니다.
- `CHANGELOG.md`와 git 태그가 버전 기록입니다. 이력은 여기에는 남지 않고 문서 본문은 보관하지 않습니다.

## 일일 위키 갱신

매일 실행되는 에이전트가 위키를 최신 상태로 유지합니다. `docs/official-sources.json`을 읽고 공식 공급업체 URL을 가져온 뒤, 근거가 변경되면 PR을 엽니다. `main`에는 직접 푸시하지 않습니다.

권장 경로는 **Claude Routines**입니다. 즉, Anthropic 클라우드에서 구독형 Claude Code 세션으로 예약 실행되며 API 키 없이 GitHub Actions도 필요 없습니다. 노트북이 꺼져 있어도 계속 동작합니다. `claude -p`로 **로컬**에서 갱신을 실행하는 것은 권장되지 않습니다. 2026-06-15부터 eligible 구독 플랜에서 Agent SDK / `claude -p` 사용은 기존 대화형 플랜 풀 대신 별도의 월간 Agent SDK 크레딧(사용자별, 매월 갱신, 이월 불가)을 사용하며, 로컬 크론은 컴퓨터가 깨어 있을 때만 실행됩니다. 자세한 내용은 `docs/cloud-automation.md`를 참고하세요.

1. Claude Code에서 `/schedule`를 실행합니다(또는 <https://claude.ai/code/routines>를 열어).
2. 이 저장소를 루틴 대상으로 지정하고 `prompts/daily-official-doc-update.md`의 프롬프트를 사용합니다.
3. 하루에 한 번 예약합니다. PR을 연 다음 소스 점검을 통과한 문서 전용 변경은 스쿼시 머지되는 자동 병합 게이트를 통과하고, 그 외 변경은 검토 대기 상태가 됩니다(자세한 내용은 `docs/cloud-automation.md`).

Codex 사용자도 동일한 흐름을 Codex App Automation으로 실행할 수 있습니다. 두 경로 모두 `docs/cloud-automation.md`에서 확인하세요.

## 로컬 검사

```bash
node scripts/check-official-sources.mjs --write-report
```

이 스크립트는 소스 ID, 허용된 공식 호스트, URL 접근 가능성, 필수 소스 카테고리, 그리고 `SKILL.md` 라인 예산을 검증합니다.