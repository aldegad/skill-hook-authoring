<p align="center">
  <img src="assets/icon.png" width="168" alt="每个代理运行时都可共享的统一事实来源" />
</p>

<h1 align="center">跨运行时代理平台互操作性</h1>

<p align="center"><b>为你的技能、钩子和插件提供唯一可信来源，适用于你运行的每一个 AI 编码代理。</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

你不再只运行一个 AI 代理。Codex、Claude Code、Grok、Hermes、Antigravity、Cursor 每个对“技能是什么”、钩子如何注册、读取哪个指令文件、会话如何恢复以及计费机制到底如何，都有自己的定义。你若手工把同样的工具链部署到它们上，通常一周内就会分歧。想问“运行时 Y 上我能否执行 X？”答案往往埋在七套文档站里，甚至根本没有文档。

本仓库就是这张地图和方法论：

1. **一个兼容性 Wiki，每日从官方厂商文档刷新。** 七种运行时（Codex、Claude Code、Grok、Hermes、Antigravity CLI、Cursor 和 Kuma Studio）在技能、钩子、插件/扩展、项目指令与记忆文件、CLI 启动（交互式 vs 无头）、会话恢复和计费方面进行对比。
2. **一套面向一仓库存储真相的交付方法**——技能、钩子、命令、脚本、参考资料、资源、MCP/应用接线、插件元数据——可在各运行时间安装且不会漂移：统一的包根、符号链接安装、明确的停用/重命名流程，以及验证清单。

## 它解决了哪些问题

你原本会花一下午才弄清的问题，现在用引用给出答案：

| 你会问 | Wiki 的回答 |
|---|---|
| “我可以在 Grok 或 Hermes 关闭某个技能吗？” | 两者都没有官方的“按技能关闭”能力，因此开关必须通过将技能移出发现根目录来实现。这个差异决定了我们是做真实可用的开关，还是发布错误的实现。 |
| “每个代理读取哪个指令文件？” | `AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、`.hermes.md` 分别由谁读取、优先级如何，以及如何让一个文件在它们之间共享。 |
| “如何从脚本恢复会话？” | 会话恢复表：每种运行时的恢复命令、会话存储位置，以及会话 ID 格式。 |
| “我每晚运行 `claude -p` 的定时任务会计费吗？” | 计费行记录了 headless/SDK 用法如何计费，包含 2026-06-15 的 Agent SDK 信用额度变更。 |
| “在 Codex 上有 `/<skill-name>` 这种调用方式吗？” | 不是——Codex 使用 `$<skill-name>`。技能调用矩阵记录了每个运行时真实的调用令牌，你不必再假设同一个令牌到处通用。 |

**这是你构建管理工具的基础层。** Kuma Studio 的技能/钩子开关系统——支持在一个 GUI 中对 Claude、Codex、Grok、Hermes 的任意技能或钩子进行开关——正是基于这些事实直接构建的：wiki 指明了每个运行时真实的开关位置（`skillOverrides`、`[[skills.config]]`、钩子状态键），也明确标注了哪些运行时没有官方开关，因此工具会有意识地补偿，而不是盲目猜测。无论你在做跨代理仪表盘、同步工具还是集群管理器，这份 wiki 都是其所需的事实依据。 |

## 为什么值得信任

- **每一条结论都引用厂商自身文档。** 没有感觉判断、没有民间说法、没有“我在我机器上能跑”。
- **缺失信息会被记录，而不是推断。** 如果某运行时未记录某项能力，wiki 会写明 `not documented`，而不是假设行为一致——知道某个开关“不存在”与知道它在哪里一样有价值。
- **它会每日自我复核。** 一个定时云代理会重新抓取 `docs/official-sources.json` 中的每个来源，并在证据变化时提 PR；一个确定性门控会自动合并通过来源校验的纯文档更新。过期的兼容性表会让跨运行时工具逐渐失效，而这一份不会停滞不前。

## 本仓库管理的内容

- `SKILL.md` — 技能入口与编写/互操作方法论。
- `docs/compatibility-matrix.md` — 跨运行时对照（技能/钩子/插件/指令、会话恢复、技能调用）。
- `docs/cli-invocation.md` — 各运行时的 CLI 启动方式（交互式 vs 无头）与恢复语法。
- `docs/plugin-packaging.md` — 不同平台下插件/扩展打包差异。
- `docs/official-sources.json` — 每日刷新复核的来源清单。
- `docs/cloud-automation.md` — 每日更新自动化，以及为何要在云端运行。
- `docs/kuma-studio-patterns.md` — Kuma Studio 的公开运作模式。
- `CHANGELOG.md` 及 Git 标签 — 版本记录。历史保存在这里，而不是散落在文档正文里。

## 每日 Wiki 刷新

一个每日代理保持 wiki 的时效性：它读取 `docs/official-sources.json`，抓取官方厂商 URL，并在证据变化时提交 PR。它不会直接推送到 `main`。

推荐路径是 **Claude Routines**——一个在 Anthropic 云端按计划运行的 Claude Code 会话，基于 Claude 订阅运行，不需要 API Key，也无需 GitHub Actions，并且在你关闭笔记本时仍可持续运行。不建议在本地通过 `claude -p` 运行刷新：自 2026-06-15 起，合格订阅计划的 Agent SDK / `claude -p` 使用将从单独的月度 Agent SDK 信用额度中扣费（按用户、每月重置、不可结转），而本地 cron 仅在机器唤醒时触发。详见 `docs/cloud-automation.md`。

1. 在 Claude Code 中运行 `/schedule`（或打开 <https://claude.ai/code/routines>）。
2. 将例程指向本仓库，并使用 `prompts/daily-official-doc-update.md` 中的提示词。
3. 安排为每天一次。它会打开一个 PR，并运行自动合并门禁，对通过来源检查的纯文档更改进行 squash 合并；其余更改则等待你人工审核（见 `docs/cloud-automation.md`）。

Codex 用户也可以用 Codex App Automation 执行同样流程。两种路径见 `docs/cloud-automation.md`。

## 本地检查

```bash
node scripts/check-official-sources.mjs --write-report
```

该脚本会校验来源 ID、允许的官方主机、URL 可达性、所需来源类别，以及 `SKILL.md` 的行数预算。