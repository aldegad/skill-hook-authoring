<p align="center">
  <img src="assets/icon.png" width="168" alt="あなたのスキル、フック、プラグインをすべてのAIエージェントランタイムで一元管理する真実のソース" />
</p>

<h1 align="center">クロスランタイム・エージェント・プラットフォーム相互運用性</h1>

<p align="center"><b>あなたのスキル、フック、プラグインのための単一の真実の情報源を、実行するすべてのAIコーディングエージェント上で共有します。</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

もはや1つのAIエージェントだけを運用しているわけではない。  
Codex、Claude Code、Grok、Hermes、Antigravity、Cursor――それぞれが「スキル」とは何か、フックはどこに登録するのか、どの指示ファイルを読むのか、セッション再開はどう行うのか、課金は実際にどう動くのか、という点で独自の定義を持っている。  
同じツール群を手作業で全ランタイムに配備すると、1週間もするとバラバラになってしまう。`ランタイムYでXができるか？`と聞いても、答えは7つの異なるドキュメントサイトに散らばっているか、そもそもどこにもない。

このリポジトリは、その地図であり方法である。

1. **公式ベンダードキュメントから毎日更新される互換性Wiki。** 7つのランタイム（Codex、Claude Code、Grok、Hermes、Antigravity CLI、Cursor、Kuma Studio）を、スキル、フック、プラグイン/拡張、プロジェクト指示とメモリファイル、CLI起動（対話型 vs ヘッドレス）、セッション再開、課金方式の観点で比較している。  
2. **1つのリポジトリ所有の真実の情報源を配布する方法論。** スキル、フック、コマンド、スクリプト、リファレンス、アセット、MCP/app接続、プラグインメタデータを、ドリフトなく全ランタイムへ導入するための、1つの正規パッケージルート、シンボリックリンク導入、明示的な廃止/リネーム手順、検証チェックリスト。

## What it answers

今まで丸一日を費やしていた質問に、根拠付きで答える。

| あなたの質問 | wikiの回答 |
|---|---|
| 「GrokやHermesで特定のスキルをオフにできますか？」 | どちらにも公式のスキル個別無効化は存在しないため、無効化はディスカバリールートからスキルを外す形になります。この事実を知らずに実装すると、実際のトグルではなく、見かけ上の機能を作ってしまうことになる。 |
| 「各エージェントはどの指示ファイルを読むのか？」 | `AGENTS.md` vs `CLAUDE.md` vs `GEMINI.md` vs `.hermes.md`――誰がどれをどの優先度で読むのか、また1つのファイルをどう共有するかを示す。 |
| 「スクリプトからセッションを再開するには？」 | セッション再開テーブルに、各ランタイムの再開コマンド、セッション保存場所、session-id形式をまとめている。 |
| 「毎晩の`claude -p` cronは課金されるか？」 | サブスクリプションではプランの利用枠から消費される — インタラクティブ利用と同じプールで、実行ごとの個別クレジットはない（2026-06-15に発表された個別課金クレジットの変更は一時停止され、適用されていない。`ANTHROPIC_API_KEY`アカウントは従量課金のまま）。課金行に現在の検証済みステータスと日付を記載している。 |
| 「Codexで`/<skill-name>`は使える？」 | 使えない。Codexでは`$<skill-name>`を使う。スキル呼び出し行列には各ランタイムの実際の呼び出しトークンを記録しているため、「どれでも通る」と思い込む事故を防げる。 |

**ここが管理系ツールを構築するための基盤レイヤーだ。**  
Kuma Studio のスキル/フック切替システム（1つのGUIからClaude、Codex、Grok、Hermesの任意スキル・フックをオン/オフ切替）は、この事実の上に直接構築されている。wikiは各ランタイムの実在のオン/オフスイッチ（`skillOverrides`、`[[skills.config]]`、hook state keys）を示し、スイッチが公式に存在しない箇所も明示するため、ツールが推測で動くのではなく、意図的に代替処理を行う。構築中のクロスエージェントダッシュボード、同期ツール、フリート管理ツールにとって、このwikiこそが信頼できる基礎データである。

## Why trust it

- **すべての主張はベンダー自身のドキュメントに根拠がある。** 感覚論、俗説、「自分の環境では動いた」という主観は含まれない。  
- **欠落は推測ではなく記録する。** 能力がドキュメントで明示されない場合、wikiは`not documented`と明記する。スイッチが存在しないことを知ることは、あることを知るのと同じ価値がある。  
- **毎日自己再検証される。** `docs/official-sources.json` にある各ソースを定期エージェントが再取得し、変更があればPRを開く。証跡チェックを通過したdocs-only変更は自動ゲートで自動マージされる。古い互換性表はクロスランタイムの運用を劣化させるが、このシステムは放置しない。

## What This Repo Owns

- `SKILL.md` — スキルエントリポイント、および作成/相互運用の方法論。  
- `docs/compatibility-matrix.md` — クロスランタイム比較（Skills/Hooks/Plugins/Instructions、Session Resume、Skill Invocation）。  
- `docs/cli-invocation.md` — ランタイム別のCLI起動方法（対話型 vs ヘッドレス）と再開シンタックス。  
- `docs/plugin-packaging.md` — プラットフォームごとのプラグイン/拡張のパッケージング差分。  
- `docs/official-sources.json` — 日次更新が再検証するソースマニフェスト。  
- `docs/cloud-automation.md` — 日次更新の自動化、およびクラウド実行理由。  
- `docs/kuma-studio-patterns.md` — 公開されているKuma Studio運用パターン。  
- `CHANGELOG.md`とgitタグ — 版数記録。履歴は本文ではなくここに残る。

## Daily Wiki Refresh

日次エージェントがwikiを最新化する。`docs/official-sources.json`を読み取り、公式ベンダーURLを再取得し、証跡が変更された場合にPRを開く。`main`への直接pushは行わない。

推奨ルートは**Claude Routines**。Anthropicのクラウド上でClaudeサブスクリプションを使って実行される定期Claude Codeセッションで、APIキー不要、GitHub Actions不要。ノートPCが閉じていても稼働し続ける。`claude -p`でローカル実行する方法は**信頼性**の観点から推奨されない。ローカルcronは端末が起きているときのみ動作し、クラウドRoutineは端末状態に依存せず実行されるためである。  
（課金について：サブスクリプションでは`claude -p`およびAgent SDKの利用はプランの利用枠から消費される — 2026-06-15に発表された月額個別クレジット変更は一時停止され、適用されていない。`ANTHROPIC_API_KEY`を利用するユーザーは従量課金のまま。現在の検証済みステータスと日付は`docs/cli-invocation.md`にある。）詳しくは`docs/cloud-automation.md`を参照。

1. Claude Codeで`/schedule`を実行する（または<https://claude.ai/code/routines>を開く）。  
2. このリポジトリをルーチンの対象にし、`prompts/daily-official-doc-update.md`のプロンプトを使用する。  
3. 1日1回スケジュールする。PRを開いた後、source checkを通過したドキュメントのみの変更は自動マージゲートでsquash-mergeされる。その他の変更はレビュー待ちになる（`docs/cloud-automation.md`参照）。

CodexユーザーはCodex App Automationで同じ流れを実行できる。両経路は`docs/cloud-automation.md`に記載されている。

## Local Checks

```bash
node scripts/check-official-sources.mjs --write-report
```

このスクリプトはソースID、許可された公式ホスト、URL到達性、必須ソースカテゴリ、そして`SKILL.md`の行数予算を検証する。