# Cross-Runtime-Agent-Plattform-Interoperabilität

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

Zwei Dinge in einem Repo:

1. **Ein Kompatibilitäts-Wiki**, das täglich aus offiziellen Herstellerdokumentationen aktualisiert wird und aufzeichnet, wie heutige Agent-Runtimes — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor und Kuma Studio — in Bezug auf Skills, Hooks, Plugins/Extensions, Projektanweisungsdateien, CLI-Start (interaktiv vs. headless), Sitzungswiederaufnahme und Abrechnung im Vergleich stehen.
2. **Eine Methodik** für die Interoperabilität und Verwaltung dieser Runtimes: Bereitstellung einer repo-eigenen Wahrheitssquelle (Skills, Hooks, Befehle, Skripte, Referenzen, Assets, MCP/App-Verkabelung oder runtime-spezifische Plugin-Metadaten) ohne Drift zwischen Agenten.

Jeder Kompatibilitätsanspruch stützt sich auf die Dokumentation des Herstellers; falls eine Runtime eine Fähigkeit nicht dokumentiert, trägt das Wiki `not documented` ein, anstatt eine Gleichwertigkeit zu unterstellen.

## Was dieses Repo beinhaltet

- `SKILL.md` ist der Einstiegspunkt für Skills sowie die Methodik für Authoring/Interoperabilität.
- `docs/compatibility-matrix.md` ist der plattformübergreifende Vergleich (inklusive der Tabelle zur Sitzungswiederaufnahme).
- `docs/cli-invocation.md` hält die CLI-Startmuster pro Runtime (interaktiv vs. headless) und die Resume-Syntax fest.
- `docs/plugin-packaging.md` erläutert, wie sich das Plugin/Extensions-Packaging je nach Plattform unterscheidet.
- `docs/official-sources.json` ist das Quellmanifest, das die tägliche Aktualisierung neu prüft.
- `docs/cloud-automation.md` erklärt die tägliche Update-Automatisierung und warum diese in der Cloud läuft, nicht lokal.
- `docs/kuma-studio-patterns.md` erfasst öffentliche Betriebsmodelle von Kuma Studio.
- `CHANGELOG.md` zusammen mit dem Git-Tag sind der Versionsnachweis. Die Historie bleibt hier, nicht in den Dokumentinhalten.

## Tägliche Wiki-Aktualisierung

Ein täglicher Agent hält das Wiki aktuell: Er liest `docs/official-sources.json`, ruft die offiziellen Hersteller-URLs ab und öffnet einen Pull Request, wenn sich die Nachweise geändert haben. Ein Push nach `main` erfolgt nicht.

Der empfohlene Weg ist **Claude Routines** — eine geplante Claude Code-Sitzung, die in Anthropics Cloud mit einem Claude-Abonnement läuft, ohne API-Key und ohne GitHub Actions, und auch weiterläuft, wenn dein Laptop geschlossen ist. Das **lokale** Ausführen der Aktualisierung über `claude -p` wird nicht empfohlen: Seit dem 2026-06-15 nutzt Agent SDK / `claude -p` bei berechtigten Abonnementplänen ein separates monatliches Agent SDK-Guthaben (pro Nutzer, monatlich erneuert, nicht übertragbar) statt des interaktiven Plan-Pools — und ein lokaler Cron läuft nur, solange der Rechner aktiv ist. Siehe `docs/cloud-automation.md`.

1. In Claude Code `/schedule` ausführen (oder <https://claude.ai/code/routines> öffnen).
2. Die Routine auf dieses Repository ausrichten und den Prompt aus `prompts/daily-official-doc-update.md` verwenden.
3. Einmal täglich planen. Es wird ein PR geöffnet, danach wird ein Auto-Merge-Gate ausgeführt, das Dokumentationsänderungen mit bestandenem Quell-Check per Squash-Merge zusammenführt; alles andere wartet auf deine Freigabe (siehe `docs/cloud-automation.md`).

Codex-Nutzer können denselben Ablauf über eine Codex App Automation ausführen. Siehe `docs/cloud-automation.md` für beide Wege.

## Lokale Prüfungen

```bash
node scripts/check-official-sources.mjs --write-report
```

Das Skript validiert Quell-IDs, erlaubte offizielle Hosts, URL-Erreichbarkeit, die erforderlichen Quellkategorien und das Zeilenbudget von `SKILL.md`.