# 跨运行时 Agent-Platform 互操作性

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

一个仓库中的两件事：

1. **一个兼容性维基**，每日从官方厂商文档刷新，记录今天各代理运行时——Codex、Claude Code、Grok、Hermes、Antigravity CLI、Cursor 和 Kuma Studio——在技能、hook、插件/扩展、项目指令文件、CLI 启动（交互式与无头）、会话恢复以及计费方面的比较。
2. **一种互操作与运行时管理方法论**：在一个仓库内集中维护真相来源（skills、hooks、commands、scripts、references、assets、MCP/app 连接或运行时专属插件元数据），并避免各代理之间漂移。

每一条兼容性声明都引用厂商自身文档；当某个运行时没有文档说明某项能力时，维基会记录为 `not documented`，而不会推断其兼容性。

## 本仓库负责的内容

- `SKILL.md` 是技能入口点，也是编写/互操作的方法论。
- `docs/compatibility-matrix.md` 是跨运行时对照表（包含会话恢复表）。
- `docs/cli-invocation.md` 记录各运行时的 CLI 启动方式（交互式 vs 无头）及恢复语法。
- `docs/plugin-packaging.md` 说明各平台间插件/扩展打包的差异。
- `docs/official-sources.json` 是每日刷新会重新核验的来源清单。
- `docs/cloud-automation.md` 解释每日更新自动化，以及为何该流程在云端而非本地运行。
- `docs/kuma-studio-patterns.md` 记录公开的 Kuma Studio 运作模式。
- `CHANGELOG.md` 与 git tag 是版本记录。历史记录保留在这里，而不是写入文档正文。

## 每日维基刷新

一个每日任务会保持维基最新：它读取 `docs/official-sources.json`，抓取官方厂商链接，并在证据发生变化时创建拉取请求。它不会向 `main` 直接推送。

推荐路径是 **Claude Routines**——一个在 Anthropic 云端运行的预订 Claude Code 会话，使用 Claude 订阅，无需 API key 且无需 GitHub Actions，并且在笔记本电脑关闭时也会持续运行。不建议在本地运行刷新：通过 `claude -p` 运行的无头模式按 token 计费（不是按订阅），并且从 2026-06-15 起，Agent SDK / `claude -p` 用量不再计入 Claude 计划额度。详见 `docs/cloud-automation.md`。

1. 在 Claude Code 中运行 `/schedule`（或打开 <https://claude.ai/code/routines>）。
2. 将例行任务指向本仓库，并使用 `prompts/daily-official-doc-update.md` 中的提示词。
3. 将其设置为每日运行一次。它会打开一个 PR，然后执行自动合并门控：仅对通过源码检查的仅文档变更进行 squash 合并；其他变更将等待你的审核（见 `docs/cloud-automation.md`）。

Codex 用户可使用 Codex App Automation 执行相同流程。两种方式见 `docs/cloud-automation.md`。

## 本地检查

```bash
node scripts/check-official-sources.mjs --write-report
```

该脚本会校验来源 ID、允许的官方主机、URL 可达性、所需来源类别，以及 `SKILL.md` 的行数预算。