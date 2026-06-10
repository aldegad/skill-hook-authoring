# クロスランタイム エージェント・プラットフォーム相互運用性

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

このリポジトリには2つの要素があります。

1. **互換性ウィキ**。公式ベンダードキュメントを毎日更新し、今日のエージェントランタイム（Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor, Kuma Studio）が、スキル、フック、プラグイン/拡張、project-instruction ファイル、CLI スポーン（対話型 vs ヘッドレス）、セッション再開、課金に関してどのように比較されるかを記録します。
2. これらのランタイムを相互運用し管理するための**方法論**。ランタイム固有の情報に依存して分散しないよう、1つのリポジトリ由来のソース・オブ・トゥルース（スキル、フック、コマンド、スクリプト、参照資料、アセット、MCP/app 配線、またはランタイム固有のプラグインメタデータ）を提供します。

各互換性の記載はベンダー自身のドキュメントに基づいており、ランタイムが機能を文書化していない場合は、同等性を推測せずに `not documented` と記録します。

## このリポジトリで管理しているもの

- `SKILL.md` はスキルのエントリポイントであり、作成・相互運用の方法論です。
- `docs/compatibility-matrix.md` はクロスランタイム比較表（セッション再開テーブルを含む）です。
- `docs/cli-invocation.md` はランタイムごとの CLI スポーン（対話型 vs ヘッドレス）と再開構文を記録します。
- `docs/plugin-packaging.md` はプラットフォームごとのプラグイン/拡張のパッケージ方法の違いを説明します。
- `docs/official-sources.json` は毎日の再検証を行うソースマニフェストです。
- `docs/cloud-automation.md` は毎日の更新自動化と、ローカルではなくクラウドで実行する理由を説明します。
- `docs/kuma-studio-patterns.md` は Kuma Studio の公開運用パターンをまとめます。
- `CHANGELOG.md` と git タグがバージョン履歴を示します。履歴は本文書内ではなくここに保持されます。

## 毎日のウィキ更新

毎日、エージェントがウィキを最新状態に保ちます。`docs/official-sources.json` を読み取り、公式ベンダーURLを取得し、根拠が変わった場合はプルリクエストを作成します。`main` には直接プッシュしません。

推奨の方法は **Claude Routines** です。これは Anthropic のクラウド上で Claude サブスクリプションを使って実行される Claude Code の定期実行で、API キー不要・GitHub Actions不要で、ノートPCを閉じていても継続して実行されます。`claude -p` でローカル実行する方法は推奨されません。ヘッドレスの `claude -p` は従量課金（サブスクリプションではない）として請求され、2026-06-15 の Agent SDK / `claude -p` 利用では、課金が Claude プランに一切カウントされないようになります。詳細は `docs/cloud-automation.md` を参照してください。

1. Claude Code で `/schedule` を実行する（または <https://claude.ai/code/routines> を開く）。
2. このリポジトリを対象にし、`prompts/daily-official-doc-update.md` のプロンプトを使用する。
3. 1日1回のスケジュールを設定する。PR が作成された後、ソースチェックを通過したドキュメント変更のみを squash-merge で自動的に取り込むゲートを実行し、それ以外はレビュー待ちになります（`docs/cloud-automation.md` を参照）。

Codex ユーザーも同じフローを Codex App Automation で実行できます。両方の方法は `docs/cloud-automation.md` に記載されています。

## ローカルチェック

```bash
node scripts/check-official-sources.mjs --write-report
```

このスクリプトは、ソースID、許可された公式ホスト、URL到達性、必要なソースカテゴリ、`SKILL.md` の行数制限を検証します。