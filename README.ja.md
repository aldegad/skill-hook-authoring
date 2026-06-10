# クロスランタイム エージェント・プラットフォーム相互運用性

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

このリポジトリに2つの要素があります。

1. **互換性ウィキ**。これは公式ベンダー文書をもとに毎日更新され、今日のエージェントランタイム（Codex、Claude Code、Grok、Hermes、Antigravity CLI、Cursor、Kuma Studio）が、skills、hooks、plugins/extensions、project-instruction ファイル、CLI スポーン（対話型とヘッドレス）、セッション再開、課金の観点でどのように比較されるかを記録します。
2. それらのランタイムを相互運用し管理するための**方法論**。ランタイム固有のプラグイン情報に漂移が生じないよう、1つのリポジトリ所有の真実の情報源（skills、hooks、commands、scripts、references、assets、MCP/app の配線、ランタイム固有のプラグインメタデータ）を配備します。

すべての互換性主張はベンダー自身の文書を参照しており、あるランタイムが機能を文書化していない場合、推定して同等と見なすことはせず、ウィキには `not documented` と記録します。

## このリポジトリの責任範囲

- `SKILL.md` はスキルのエントリポイントであり、執筆・相互運用の方法論です。
- `docs/compatibility-matrix.md` はクロスランタイム比較表（セッション再開テーブルを含む）です。
- `docs/cli-invocation.md` はランタイム別の CLI スポーン（対話型 vs ヘッドレス）と再開構文を記録します。
- `docs/plugin-packaging.md` はプラットフォームごとのプラグイン/拡張パッケージングの違いを説明します。
- `docs/official-sources.json` は日次更新で再検証される情報源マニフェストです。
- `docs/cloud-automation.md` は日次更新の自動化と、なぜローカルではなくクラウドで実行されるかを説明します。
- `docs/kuma-studio-patterns.md` は公開されている Kuma Studio の運用パターンをまとめます。
- `CHANGELOG.md` と git tag がバージョン記録です。履歴はここに残り、ドキュメント本文には置きません。

## 日次ウィキ更新

日次エージェントがウィキを最新状態に保ちます。`docs/official-sources.json` を読み込み、公式ベンダー URL を取得し、証拠が変更された場合にプルリクエストを開きます。`main` には直接 push しません。

推奨パスは **Claude Routines** です。これは Anthropic のクラウド上で Claude サブスクリプションを使って実行される定期 Claude Code セッションで、API キー不要、GitHub Actions も不要です。ノートPCを閉じていても継続して実行できます。`claude -p` での **ローカル実行** は推奨されません。2026-06-15 以降、対象のサブスクリプションプランでは Agent SDK / `claude -p` の利用が、対話型プランの枠ではなく、月ごとに更新される個別の月間 Agent SDK クレジット（利用者ごと、繰越不可）から消費されるためです。加えて、ローカルの cron は端末が起動している間のみ動作します。詳細は `docs/cloud-automation.md` を参照してください。

1. Claude Code で `/schedule` を実行する（または <https://claude.ai/code/routines> を開く）。
2. このリポジトリをルーチン対象に設定し、`prompts/daily-official-doc-update.md` のプロンプトを使用する。
3. 1日1回の実行でスケジュールする。PR を開いた後、ソースチェックを通過したドキュメントのみ変更の自動 squash-merge ゲートが実行されます。その他はすべてレビュー待ちになります（`docs/cloud-automation.md` を参照）。

Codex ユーザーは、同じ流れを Codex App Automation で実行できます。両方の方法については `docs/cloud-automation.md` を参照してください。

## ローカルチェック

```bash
node scripts/check-official-sources.mjs --write-report
```

このスクリプトは、ソース ID、許可された公式ホスト、URL 到達性、必須のソースカテゴリ、そして `SKILL.md` の行予算を検証します。