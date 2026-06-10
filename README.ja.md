<p align="center">
  <img src="assets/icon.png" width="168" alt="あらゆるエージェント実行環境に放射される、単一の信頼できる情報源" />
</p>

<h1 align="center">クロスランタイム・エージェントプラットフォームの相互運用性</h1>

<p align="center"><b>あなたのスキル、フック、プラグインに関する一つの真実の情報源を、実行するすべてのAIコーディングエージェントに提供します。</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

もはやAIエージェントを1つだけ運用している時代ではありません。Codex、Claude Code、Grok、Hermes、Antigravity、Cursor、各エージェントは、`skill`の定義方法、フックの登録場所、読み込む指示ファイル、セッションの再開方法、課金の仕組みまで異なっています。  
同じツールをすべてに手作業で導入すると、1週間もたたないうちに差分が生まれます。「ランタイムYでXはできるか？」と聞くと、答えは7つのドキュメントサイトに分散しているか、場合によってはどこにもありません。

このリポジトリは、地図であり方法です。

1. **公式ベンダードキュメントから毎日更新される互換性Wiki。** 7つのランタイム（Codex、Claude Code、Grok、Hermes、Antigravity CLI、Cursor、Kuma Studio）を、スキル、フック、プラグイン/拡張、プロジェクト指示・メモリファイル、CLI起動（対話型 vs ヘッドレス）、セッション再開、課金で比較。
2. **1つのリポジトリ所有の真実の情報源を配布する方法論。** スキル、フック、コマンド、スクリプト、参照、アセット、MCP/app配線、プラグインメタデータを、リポジトリ運用で一元化し、各ランタイムにドリフトなくインストールする：正規のパッケージルート、シンボリックリンクインストール、明示的な廃止/リネーム手順、検証チェックリスト。

## What it answers

本来なら丸一日かけて調べてしまう疑問を、出典付きで答えます：

| あなたの疑問 | ウィキの回答 |
|---|---|
| 「GrokやHermesでスキルをオフにできますか？」 | いずれにも公式のスキル単位無効化はありません。したがってトグルは、ディスカバリールートからスキルを移動させる形で実装しなければなりません。この事実は、実際に機能するトグルを作れるかどうかを分けます。 |
| 「各エージェントはどの指示ファイルを読むの？」 | `AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、`.hermes.md` の読み取り対象、優先順位、そして1つのファイルを全エージェントで共有する方法。 |
| 「スクリプトからセッションを再開するには？」 | セッション再開テーブル：各ランタイムの再開コマンド、セッション保存場所、セッションID形式。 |
| 「毎晩の`claude -p` cronは課金される？」 | 課金行にはヘッドレス/SDK利用の課金方法を詳細に追記しており、`2026-06-15`のAgent SDKクレジット変更も反映されています。 |
| 「`/<skill-name>`はCodexでも有効？」 | 無効です。Codexは`$<skill-name>`を使用します。Skill Invocationマトリクスは各ランタイムの実際の呼び出しトークンを記録しているため、どこでも同じトークンが使えると仮定しなくて済みます。 |

**これが管理ツールの土台です。** Kuma Studioのスキル/フリップシステム—Claude、Codex、Grok、Hermesを1つのGUIでオンオフできる機能—は、ここにある事実に直接基づいて構築されました。ウィキは各ランタイムの実際のオン/オフスイッチ（`skillOverrides`、`[[skills.config]]`、フック状態キー）を示し、公式にスイッチが存在しない場所も明示するため、ツールは推測ではなく意図的に代替処理を行います。あなたが構築するクロスエージェントダッシュボード、同期ツール、フリート管理ツールにとって、このウィキは必要な真実の土台です。

## Why trust it

- **各主張はベンダー公式ドキュメントに紐づきます。** 体験則、思い付き、または「自分の環境では動いた」という情報はありません。
- **「存在しない」情報も明示します。** ランタイムが機能を文書化していない場合、同等と仮定せず`not documented`と明記します。スイッチが存在しないことを知ることも、場所を知るのと同じくらい価値があります。
- **毎日自動で再検証されます。** 定期実行されるクラウドエージェントが`docs/official-sources.json`内の各ソースを再取得し、証拠が変化するとPRを作成します。決定的ゲートがソースチェックを通過したドキュメントのみを自動マージします。互換性表の陳腐化はクロスランタイムツールの劣化を招きますが、この仕組みは停滞しません。

## What This Repo Owns

- `SKILL.md` — スキルのエントリポイント、執筆/相互運用の方法論。
- `docs/compatibility-matrix.md` — クロスランタイム比較（Skills / Hooks / Plugins / Instructions、Session Resume、Skill Invocation）。
- `docs/cli-invocation.md` — ランタイム別CLI起動（対話型 vs ヘッドレス）と再開構文。
- `docs/plugin-packaging.md` — プラットフォーム別のプラグイン/拡張パッケージングの差分。
- `docs/official-sources.json` — 毎日の再検証を担保するソースマニフェスト。
- `docs/cloud-automation.md` — 毎日更新する自動化と、クラウドで実行する理由。
- `docs/kuma-studio-patterns.md` — 公開されているKuma Studio運用パターン。
- `CHANGELOG.md`とGitタグ — バージョン記録。履歴は本文書群ではなくここに残ります。

## Daily Wiki Refresh

毎日エージェントがウィキを更新します。`docs/official-sources.json`を読み取り、公式ベンダーURLを取得し、証拠が変化したときにPRを開きます。`main`への直接プッシュは行いません。

推奨パスは**Claude Routines**です。これはClaudeサブスクリプション上のAnthropicクラウドでスケジュール実行されるClaude Codeセッションで、APIキー不要かつGitHub Actions不要。ノートPCを閉じていても継続して実行されます。`2026-06-15`以降、対象サブスクリプションではローカル`claude -p`利用が新しい月次Agent SDKクレジット（ユーザー単位・毎月更新・繰越なし）に計上されるため、ローカルcronは起動中のマシンが眠っていないときのみ作動します。詳しくは`docs/cloud-automation.md`を参照してください。

1. Claude Codeで`/schedule`を実行する（または<https://claude.ai/code/routines>を開く）。
2. このリポジトリを対象にし、`prompts/daily-official-doc-update.md`のプロンプトを使用する。
3. 1日1回のスケジュールを設定する。PRを開いた後、ソースチェックを通過したドキュメントのみを対象に自動マージゲートがスカッシュマージを実行し、それ以外はレビュー待ちになります（`docs/cloud-automation.md`参照）。

CodexユーザーはCodex App Automationでも同じ流れを実行できます。両方の手順は`docs/cloud-automation.md`にあります。

## Local Checks

```bash
node scripts/check-official-sources.mjs --write-report
```

このスクリプトは、ソースID、許可された公式ホスト、URL到達可能性、必須ソースカテゴリ、`SKILL.md`の行数上限を検証します。