<p align="center">
  <img src="assets/icon.png" width="168" alt="一个真相源向每个代理运行时辐射" />
</p>

<h1 align="center">跨运行时代理平台互操作性</h1>

<p align="center"><b>在你使用的每个 AI 编码代理中，为技能、钩子与插件提供单一可信来源。</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

你不再只运行一个 AI 代理。Codex、Claude Code、Grok、Hermes、Antigravity、Cursor 每个都有自己对“技能”含义的理解、钩子注册方式、读取哪份指令文件、会话如何恢复，以及计费到底如何计算。你若手动把同一套工具发到每个平台，它们往往一周内就分歧。你甚至会问“我能在运行时 Y 上做 X 吗？”，答案埋在七个不同文档站点里，或者根本没被文档化。

本仓库就是地图与方法：

1. **一份兼容性维基，按官方供应商文档每日刷新。** 比较七种运行时——Codex、Claude Code、Grok、Hermes、Antigravity CLI、Cursor 与 Kuma Studio——在技能、钩子、插件/扩展、项目指令与记忆文件、CLI 启动（交互式与无头）、会话恢复和计费等方面的差异。
2. **一种发布单一仓库真相源的方法**——技能、钩子、命令、脚本、参考资料、资源、MCP/app 接线、插件元数据——可在各运行时一致安装：统一的规范包根目录、符号链接安装、明确的退役/重命名流程，以及验证清单。

## It answers

你本来可能要花一个下午才能弄明白的问题，现在都能有出处地快速确认：

| 你会问什么 | 维基会回答 |
|---|---|
| “我可以在 Grok 或 Hermes 上关闭某个技能吗？” | 两者都没有官方的单个技能禁用能力，因此开关只能通过将技能移出发现根目录来实现。这个事实决定了是发布真实可行的开关，还是发布错误信息。 |
| “每个代理读取哪个指令文件？” | `AGENTS.md` vs `CLAUDE.md` vs `GEMINI.md` vs `.hermes.md`——谁读哪个、优先级如何，以及如何让同一份文件在它们之间共享。 |
| “如何从脚本恢复会话？” | 会话恢复表：每个运行时的恢复命令、会话存储位置与会话 ID 格式。 |
| “我每天晚间的 `claude -p` 定时任务会让我付费吗？” | 在订阅下，它从你的套餐使用额度中扣减 —— 与交互式使用同一额度池，没有单独的按次调用信用额（2026-06-15 公布的单独计费信用额变更已暂停且未生效；`ANTHROPIC_API_KEY` 账户仍按量计费）。计费行记录了当前已核实的状态与日期。 |
| “在 Codex 上有 `/<skill-name>` 这种用法吗？” | 不能——Codex 使用的是 `$<skill-name>`。技能调用矩阵记录了各运行时真实可用的调用令牌，因此你不必假设某个令牌在所有运行时都通用。 |

**这就是你构建管理工具的基础层。** Kuma Studio 的技能/钩子开关系统——从一个 GUI 同时在 Claude、Codex、Grok 与 Hermes 上打开或关闭任意技能与钩子——正是基于这些事实直接构建的：该维基说明了每个运行时真实的开关位置（`skillOverrides`、`[[skills.config]]`、钩子状态键），并在官方不存在开关的场景下也明确说明，因此工具会有意识地进行补偿，而不是猜测。无论你在构建跨代理仪表盘、同步工具还是fleet管理器，这份维基都是它需要的事实依据。

## 为什么可信

- **每一条主张都引用供应商官方文档。** 没有拍脑袋、没有口口相传，也没有“我机器上能跑”。
- **缺失会被记录，而非推断。** 当某运行时未文档化某能力时，维基会写明 `not documented` 而不是假设其对等；知道“某开关不存在”与知道它在哪儿一样有价值。
- **它会每日自我复核。** 一个计划任务中的云代理会重新抓取 `docs/official-sources.json` 中的每个来源，并在证据变更时创建 PR；一个确定性门禁会自动合并通过来源校验的仅文档变更。过时的兼容表会让跨运行时工具腐化——这个不会静止不变。

## 本仓库的职责范围

- `SKILL.md` —— 技能入口点及创作/互操作方法论。
- `docs/compatibility-matrix.md` —— 跨运行时对照表（技能/钩子/插件/指令、会话恢复、技能调用）。
- `docs/cli-invocation.md` —— 按运行时区分的 CLI 启动方式（交互式 vs 无头）与恢复语法。
- `docs/plugin-packaging.md` —— 不同平台下插件/扩展打包方式的差异。
- `docs/official-sources.json` —— 每日刷新复核的来源清单。
- `docs/cloud-automation.md` —— 每日更新自动化，以及为何在云端运行。
- `docs/kuma-studio-patterns.md` —— Kuma Studio 的公开运行模式。
- `CHANGELOG.md` 及 git tag —— 版本记录。历史保存在这里，而不是散落在文档正文中。

## 每日维基刷新

一个每日代理会保持维基最新：它读取 `docs/official-sources.json`，抓取官方供应商链接，在证据变化时打开 PR。它从不直接推送到 `main`。

推荐路径是 **Claude Routines**——一个在 Anthropic 云端运行、基于 Claude 订阅、无需 API key 且无需 GitHub Actions 的定时 Claude Code 会话；即使笔记本关闭也能持续运行。通过 `claude -p` **本地**执行刷新主要不推荐，核心原因是**可靠性**：本地 cron 只有在机器唤醒时触发，而云端 Routine 则不受笔记本状态影响。关于计费：在订阅下，`claude -p` 与 Agent SDK 用量从你的套餐使用池扣减 —— 2026-06-15 公布的“按月独立信用额”变更已暂停且未生效；`ANTHROPIC_API_KEY` 用户则继续按量计费。`docs/cli-invocation.md` 记录了当前已核实的状态与日期。详见 `docs/cloud-automation.md`。

1. 在 Claude Code 中运行 `/schedule`（或打开 <https://claude.ai/code/routines>）。
2. 将例程指向本仓库，并使用 `prompts/daily-official-doc-update.md` 中的提示词。
3. 每天调度一次。它会打开一个 PR，然后运行一个自动合并门禁，对通过来源校验的仅文档变更执行 squash-merge；其余内容需你复核（见 `docs/cloud-automation.md`）。

Codex 用户也可以通过 Codex App Automation 跑同样流程。两种方式见 `docs/cloud-automation.md`。

## 本地检查

```bash
node scripts/check-official-sources.mjs --write-report
```

该脚本会校验来源 ID、允许的官方主机、URL 可达性、必需的来源分类，以及 `SKILL.md` 的行数预算。