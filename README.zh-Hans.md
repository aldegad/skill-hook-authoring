# 跨运行时 Agent 平台互操作性

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

一个仓库中的两件事：

1. **兼容性维基**，每日从官方厂商文档刷新，记录当下的 Agent 运行时——Codex、Claude Code、Grok、Hermes、Antigravity CLI、Cursor 和 Kuma Studio——在 skills、hooks、plugins/extensions、project-instruction 文件、CLI 启动方式（交互式 vs 无头）、会话恢复和计费方面的对比。
2. **一种互操作与管理这些运行时的方法论**：托管一个由仓库统一维护的真相来源（skills、hooks、commands、scripts、references、assets、MCP/app 接线方式，或运行时特定的插件元数据），并避免在不同 Agent 间漂移。

每一条兼容性声明都引用供应商自身文档；若某运行时未在文档中说明某项能力，维基会记录为 `not documented`，而不是推断能力等同。

## 本仓库拥有的内容

- `SKILL.md` 是 skill 入口点，也是创作/互操作方法论。
- `docs/compatibility-matrix.md` 是跨运行时对照表（包含 Session Resume 表）。
- `docs/cli-invocation.md` 记录各运行时的 CLI 启动方式（交互式 vs 无头）与恢复语法。
- `docs/plugin-packaging.md` 说明不同平台下插件/扩展打包方式的差异。
- `docs/official-sources.json` 是每日刷新时会复核的来源清单。
- `docs/cloud-automation.md` 说明每日更新自动化以及为何它在云端运行而非本地。
- `docs/kuma-studio-patterns.md` 记录了公开的 Kuma Studio 运行模式。
- `CHANGELOG.md` 和 git tag 是版本记录。历史记录在这里，而不是写在文档正文中。

## 每日维基刷新

一个每日运行的 Agent 会保持维基更新：它读取 `docs/official-sources.json`，抓取官方厂商链接，并在证据发生变化时创建 pull request。它不会推送到 `main`。

推荐路径是 **Claude Routines**——在 Anthropic 云端运行的定时 Claude Code 会话，基于 Claude 订阅，无需 API key，也无需 GitHub Actions，并且在笔记本关闭时仍可持续运行。通过 `claude -p` **本地**运行刷新已不推荐：自 2026-06-15 起，符合条件订阅计划中的 Agent SDK / `claude -p` 使用会消耗单独的月度 Agent SDK 信用额度（按用户每月重置，不可结转），且本地 cron 仅在机器唤醒时触发。详见 `docs/cloud-automation.md`。

1. 在 Claude Code 中运行 `/schedule`（或打开 <https://claude.ai/code/routines>）。
2. 将例程指向本仓库，并使用 `prompts/daily-official-doc-update.md` 中的提示词。
3. 将其安排为每天一次。它会打开 PR，然后执行自动合并门禁：仅对通过来源检查且仅含文档更改的情况进行 squash 合并；其他更改需等待你审核（见 `docs/cloud-automation.md`）。

Codex 用户也可以使用 Codex App Automation 按照同样流程执行。见 `docs/cloud-automation.md` 了解两种路径。

## 本地检查

```bash
node scripts/check-official-sources.mjs --write-report
```

该脚本会校验来源 ID、允许的官方主机、URL 可达性、必需的来源类别，以及 `SKILL.md` 的行数预算。