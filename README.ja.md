<p align="center">
  <img src="assets/icon.png" width="168" alt="あらゆるエージェントランタイムへ放射される単一の信頼できる情報源" />
</p>

# クロスランタイムエージェントプラットフォーム相互運用性

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

このリポジトリには2つの要素があります。

1. **互換性ウィキ**。ベンダー公式ドキュメントから毎日更新され、当日のエージェントランタイム（Codex、Claude Code、Grok、Hermes、Antigravity CLI、Cursor、Kuma Studio）が、スキル、フック、プラグイン/拡張、プロジェクト指示ファイル、CLI 起動（インタラクティブ/ヘッドレス）、セッション再開、課金の観点で比較される内容を記録します。
2. **相互運用と管理の方法論**。ランタイム固有の特性（スキル、フック、コマンド、スクリプト、参照資料、アセット、MCP/app の接続、またはランタイム固有のプラグインメタデータ）を、エージェント間で分散せずに1つのリポジトリ由来の真実源として運用します。

すべての互換性主張はベンダー自身のドキュメントを参照しており、あるランタイムが機能を明示的に文書化していない場合、互換性を推測せずに `not documented` と記録します。

## このリポジトリが担う内容

- `SKILL.md` はスキルのエントリポイントであり、著者ガイド兼相互運用方法論です。
- `docs/compatibility-matrix.md` はクロスランタイム比較表です（セッション再開の表を含む）。
- `docs/cli-invocation.md` はランタイム別の CLI 起動方法（インタラクティブ vs ヘッドレス）と再開構文を記録します。
- `docs/plugin-packaging.md` はプラットフォーム別のプラグイン/拡張パッケージ方法を説明します。
- `docs/official-sources.json` は毎日の更新で再検証されるソースマニフェストです。
- `docs/cloud-automation.md` は毎日の更新自動化の説明と、ローカルではなくクラウドで実行する理由を説明します。
- `docs/kuma-studio-patterns.md` は公開されている Kuma Studio の運用パターンを収集します。
- `CHANGELOG.md` と git タグがバージョン履歴です。履歴は本文書内ではなくここに保持されます。

## 日次ウィキ更新

日次エージェントがウィキを最新状態に保ちます。`docs/official-sources.json` を読み取り、公式ベンダーURLを取得し、エビデンスが変更された場合はプルリクエストを作成します。`main` への直接 push はしません。

推奨の方法は **Claude Routines** です。これは Anthropic のクラウド上でサブスクリプション付き Claude コードとしてスケジュール実行され、API キー不要で GitHub Actions も使わず、ノートPCを閉じていても継続して動作します。**ローカル**で `claude -p` による更新は推奨されません：2026-06-15 以降、対象サブスクリプションプランの Agent SDK / `claude -p` 利用は、対話型プランのクレジットではなく、毎月リセットされる別の月次 Agent SDK クレジット（利用者単位、繰り越しなし）を使用するためです。また、ローカルの cron は端末が起動中のみ実行されます。詳しくは `docs/cloud-automation.md` を参照してください。

1. Claude Code で `/schedule` を実行する（または <https://claude.ai/code/routines> を開く）。
2. ルーティン対象をこのリポジトリに設定し、`prompts/daily-official-doc-update.md` のプロンプトを使用する。
3. 1日1回のスケジュールを設定する。これにより PR が作成され、ソースチェックに合格した docs のみの変更は自動マージゲートを経て squash-merge されます。その他の変更はレビュー待ちになります（`docs/cloud-automation.md` を参照）。

Codex ユーザーは Codex App Automation を使って同じフローを実行できます。両方の手順は `docs/cloud-automation.md` を参照してください。

## ローカルチェック

```bash
node scripts/check-official-sources.mjs --write-report
```

このスクリプトは、ソースID、許可された公式ホスト、URL 到達可能性、必要なソースカテゴリ、`SKILL.md` の行数上限を検証します。