<p align="center">
  <img src="assets/icon.png" width="168" alt="Eine einzige Quelle der Wahrheit, die zu jeder Agent-Runtime ausstrahlt" />
</p>

# Plattformübergreifende Interoperabilität von Agenten-Plattformen

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

Zwei Dinge in einem Repo:

1. **Ein Kompatibilitäts-Wiki**, das täglich aus offiziellen Herstellerdokumentationen aktualisiert wird und festhält, wie die aktuellen Agent-Runtimes — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor und Kuma Studio — bei Skills, Hooks, Plugins/Extensions, Project-Instruction-Dateien, CLI-Spawn (interaktiv vs. headless), Sitzungs-Wiederaufnahme und Abrechnung im Vergleich abschneiden.
2. **Eine Methodik** für die Interoperabilität und Verwaltung dieser Runtimes: die Bereitstellung einer quelleneigenen Wahrheit im Repository (Skills, Hooks, Befehle, Skripte, Referenzen, Assets, MCP/App-Verkabelung oder runtimespezifische Plugin-Metadaten) ohne Drift zwischen Agenten.

Jede Kompatibilitätsaussage verweist auf die jeweiligen Herstellerdokumente; wenn eine Runtime eine Fähigkeit nicht dokumentiert, vermerkt das Wiki `not documented`, statt eine Parität zu vermuten.

## Was dieses Repo enthält

- `SKILL.md` ist der Skill-Einstiegspunkt sowie die Methodik für Autoring und Interoperabilität.
- `docs/compatibility-matrix.md` ist der plattformübergreifende Vergleich (inklusive der Sitzung-Wiederaufnahme-Tabelle).
- `docs/cli-invocation.md` dokumentiert den CLI-Spawn pro Runtime (interaktiv vs. headless) sowie die Wiederaufnahme-Syntax.
- `docs/plugin-packaging.md` erklärt, wie sich Packaging von Plugins/Extensions je nach Plattform unterscheidet.
- `docs/official-sources.json` ist das Quellen-Manifest, das die tägliche Aktualisierung erneut verifiziert.
- `docs/cloud-automation.md` erklärt die tägliche Update-Automatisierung und warum sie in der Cloud statt lokal läuft.
- `docs/kuma-studio-patterns.md` sammelt öffentliche Betriebsabläufe von Kuma Studio.
- `CHANGELOG.md` zusammen mit dem Git-Tag bilden die Versionshistorie. Die Historie bleibt hier und nicht in den Dokumenten selbst.

## Tägliche Wiki-Aktualisierung

Ein täglicher Agent hält das Wiki aktuell: Er liest `docs/official-sources.json`, ruft die offiziellen Hersteller-URLs ab und öffnet einen Pull Request, sobald sich die Belege geändert haben. Er pusht niemals nach `main`.

Der empfohlene Weg ist **Claude Routines** — eine geplante Claude Code-Sitzung, die in Anthropic's Cloud auf einem Claude-Abo läuft, ohne API-Schlüssel und ohne GitHub Actions, und die weiterläuft, wenn der Laptop geschlossen ist. Die lokale Ausführung des Refreshs über `claude -p` wird nicht empfohlen: Seit 2026-06-15 nutzt die Nutzung von Agent SDK / `claude -p` bei berechtigten Abo-Plänen ein separates monatliches Agent SDK-Guthaben (pro Nutzer, monatlich erneuert, nicht übertragen) statt des interaktiven Plankontos — und ein lokaler Cron wird nur ausgeführt, solange die Maschine aktiv ist. Siehe `docs/cloud-automation.md`.

1. In Claude Code `/schedule` ausführen (oder <https://claude.ai/code/routines> öffnen).
2. Die Routine auf dieses Repository ausrichten und den Prompt in `prompts/daily-official-doc-update.md` verwenden.
3. Einmal täglich planen. Es wird ein PR geöffnet, danach läuft ein Auto-Merge-Gate, das nur dokumentenbezogene Änderungen, die den Quellen-Check bestehen, als Squash-Merge übernimmt; alles andere wartet auf deine Freigabe (siehe `docs/cloud-automation.md`).

Codex-Nutzer können denselben Ablauf mit einer Codex App Automation durchführen. Siehe `docs/cloud-automation.md` für beide Wege.

## Lokale Prüfungen

```bash
node scripts/check-official-sources.mjs --write-report
```

Das Skript prüft Quellen-IDs, erlaubte offizielle Hosts, URL-Erreichbarkeit, die erforderlichen Quellentypen und das Zeilenbudget in `SKILL.md`.