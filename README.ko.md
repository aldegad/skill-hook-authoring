<p align="center">
  <img src="assets/icon.png" width="168" alt="모든 에이전트 런타임으로 퍼져 나가는 하나의 진실된 출처" />
</p>

# 크로스 런타임 에이전트 플랫폼 상호운용성

[영어](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

이 저장소에는 두 가지가 있습니다.

1. **호환성 위키**: 공식 벤더 문서를 기반으로 매일 갱신되며, 오늘날의 에이전트 런타임(Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor, Kuma Studio)이 스킬, 훅, 플러그인/확장, 프로젝트 지침 파일, CLI 스폰(대화형 vs 비대화형), 세션 재개, 과금 항목에서 어떻게 비교되는지 기록합니다.
2. **런타임 상호운용 및 운영 방법론**: skills, hooks, commands, scripts, references, assets, MCP/app 연결, 또는 런타임별 플러그인 메타데이터를 하나의 저장소 소유 원천에서 관리하며, 에이전트 간 편차 없이 배포합니다.

모든 호환성 주장은 벤더의 공식 문서를 근거로 인용합니다. 어떤 런타임이 특정 기능을 문서화하지 않은 경우, 위키에는 추측 없이 `not documented`로 기록됩니다.

## 이 저장소의 범위

- `SKILL.md`는 스킬 진입점이며 저자/상호운용 방법론입니다.
- `docs/compatibility-matrix.md`는 크로스 런타임 비교표입니다(세션 재개 테이블 포함).
- `docs/cli-invocation.md`는 런타임별 CLI 스폰(대화형 vs 비대화형)과 재개 구문을 기록합니다.
- `docs/plugin-packaging.md`는 플랫폼별 플러그인/확장 패키징 차이점을 설명합니다.
- `docs/official-sources.json`은 일일 갱신이 재검증하는 소스 매니페스트입니다.
- `docs/cloud-automation.md`는 왜 자동 갱신이 로컬이 아니라 클라우드에서 실행되는지 설명합니다.
- `docs/kuma-studio-patterns.md`는 공개된 Kuma Studio 운영 패턴을 정리합니다.
- `CHANGELOG.md`와 git tag가 버전 기록입니다. 변경 이력은 문서 본문이 아니라 여기 남습니다.

## 일일 위키 갱신

하루에 한 번 실행되는 에이전트가 위키를 최신 상태로 유지합니다. 이 에이전트는 `docs/official-sources.json`을 읽고 공식 벤더 URL을 가져온 뒤, 증거가 변경되면 pull request를 엽니다. `main`에는 직접 push하지 않습니다.

권장 방식은 **Claude Routines**입니다. 즉, Anthropic의 클라우드에서 구독 기반 Claude 세션으로 실행되는 예약 작업으로, API 키가 필요 없고 GitHub Actions도 필요 없으며, 노트북이 꺼져 있어도 계속 동작합니다. `claude -p`로 **로컬에서 갱신을 실행하는 것은 권장되지 않습니다**. 2026-06-15부터는 해당 대상 구독 요금제의 Agent SDK / `claude -p` 사용량이 인터랙티브 요금 풀과 분리된 별도 월별 Agent SDK 크레딧(사용자별, 매월 갱신, 이월 없음)으로 측정되며, 로컬 cron은 기기가 깨어 있을 때만 실행되기 때문입니다. 자세한 내용은 `docs/cloud-automation.md`를 참고하세요.

1. Claude Code에서 `/schedule`을 실행하거나 <https://claude.ai/code/routines>에 접속합니다.
2. 루틴을 이 저장소에 연결하고 `prompts/daily-official-doc-update.md`의 프롬프트를 사용합니다.
3. 하루에 한 번 실행되도록 예약합니다. PR을 열고 나서 소스 검사에 통과한 문서 전용 변경사항은 자동 병합 게이트를 통해 스쿼시 병합되며, 그 외 변경은 리뷰 대기 상태로 유지됩니다(`docs/cloud-automation.md` 참조).

Codex 사용자는 Codex App Automation을 이용해 동일한 흐름을 실행할 수 있습니다. 두 경로 모두에 대한 내용은 `docs/cloud-automation.md`에 정리되어 있습니다.

## 로컬 검사

```bash
node scripts/check-official-sources.mjs --write-report
```

이 스크립트는 소스 ID, 허용된 공식 호스트, URL 접근 가능 여부, 필수 소스 카테고리, 그리고 `SKILL.md` 라인 예산을 검증합니다.