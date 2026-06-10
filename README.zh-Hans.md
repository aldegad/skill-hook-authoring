<p align="center">
  <img src="assets/icon.png" width="168" alt="单一事实来源向每个代理运行时辐射" />
</p>

# 跨运行时代理平台互操作性

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

该仓库包含两部分内容：

1. **兼容性维基**，每日从官方供应商文档刷新一次，记录当今代理运行时——Codex、Claude Code、Grok、Hermes、Antigravity CLI、Cursor 和 Kuma Studio——在技能、钩子、插件/扩展、项目指令文件、CLI 启动方式（交互式 vs 无头）、会话恢复和计费方面的对比情况。
2. **一个互操作与管理这些运行时的方法论**：通过在仓库内维护单一可信源（技能、钩子、命令、脚本、参考资料、资源、MCP/app 接线，或运行时特定的插件元数据），在不同代理之间保持一致，避免漂移。

所有兼容性结论都引用供应商自身文档；当某个运行时未在文档中说明某项能力时，维基会记录为 `not documented`，而不是推断其兼容性。

## 本仓库的内容范围

- `SKILL.md` 是技能入口及编写/互操作方法论。
- `docs/compatibility-matrix.md` 是跨运行时对照表（包含会话恢复表）。
- `docs/cli-invocation.md` 记录各运行时的 CLI 启动方式（交互式 vs 无头）及恢复语法。
- `docs/plugin-packaging.md` 说明不同平台间插件/扩展打包的差异。
- `docs/official-sources.json` 是每日刷新时会复验的来源清单。
- `docs/cloud-automation.md` 说明每日更新自动化及其为何在云端而非本地运行。
- `docs/kuma-studio-patterns.md` 记录公开的 Kuma Studio 运行模式。
- `CHANGELOG.md` 与 Git 标签共同构成版本记录。历史仅保留于此，而不写入文档正文。

## 每日维基刷新

一名日常运行的代理负责保持维基最新：它读取 `docs/official-sources.json`，抓取官方供应商链接，并在证据发生变化时打开拉取请求。它不会直接推送到 `main`。

推荐方式是 **Claude Routines**——一种在 Anthropic 的 Claude 订阅云端运行的定时 Claude Code 会话，无需 API key，也不依赖 GitHub Actions，并且在笔记本电脑关闭时仍可持续运行。通过 `claude -p` 在本地运行刷新不被推荐：自 2026-06-15 起，合格订阅方案中的 Agent SDK / `claude -p` 用量会从独立的每月 Agent SDK 额度中扣除（按用户每月重置，不可结转），且本地 cron 仅在机器唤醒时触发。详见 `docs/cloud-automation.md`。

1. 在 Claude Code 中运行 `/schedule`（或打开 <https://claude.ai/code/routines>）。
2. 将例程指向该仓库，并使用 `prompts/daily-official-doc-update.md` 中的提示词。
3. 将其安排为每日运行一次。它会先打开一个 PR，然后执行自动合并闸门：通过来源校验且仅文档变更的内容会被 squash 合并；其他更改需你审核后再处理（见 `docs/cloud-automation.md`）。

Codex 用户也可以使用 Codex App Automation 按照同样流程运行。两种方式见 `docs/cloud-automation.md`。

## 本地检查

```bash
node scripts/check-official-sources.mjs --write-report
```

该脚本会校验来源 ID、允许的官方主机、URL 可达性、必需的来源类别，以及 `SKILL.md` 的行数预算。