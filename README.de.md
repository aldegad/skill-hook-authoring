# Interoperabilität zwischen Laufzeitplattformen für Agenten

[Englisch](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

Zwei Dinge in einem Repo:

1. **Ein Kompatibilitätswiki**, das täglich aus offiziellen Anbieter-Dokumentationen aktualisiert wird und festhält, wie heutige Agent-Runtimes — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor und Kuma Studio — in Bezug auf Skills, Hooks, Plugins/Extensions, Projektanweisungsdateien, CLI-Start (interaktiv vs. headless), Sitzungsfortsetzung und Abrechnung im Vergleich abschneiden.
2. **Eine Methodik** für die Interoperabilität und Verwaltung dieser Runtimes: Bereitstellung einer repo-eigenen Source of Truth (Skills, Hooks, Commands, Skripte, Referenzen, Assets, MCP/App-Verkabelung oder laufzeit-spezifische Plugin-Metadaten), ohne Drift zwischen Agenten.

Jeder Kompatibilitätsanspruch verweist auf die Original-Dokumentation des Anbieters; dort, wo eine Runtime eine Fähigkeit nicht dokumentiert, vermerkt das Wiki `not documented`, statt eine Gleichwertigkeit zu vermuten.

## Was dieses Repo enthält

- `SKILL.md` ist der Skill-Einstiegspunkt und die Methodik für Authoring/Interoperabilität.
- `docs/compatibility-matrix.md` ist der plattformübergreifende Vergleich (enthält die Session Resume-Tabelle).
- `docs/cli-invocation.md` dokumentiert den CLI-Start pro Runtime (interaktiv vs. headless) und die Syntax zum Fortsetzen.
- `docs/plugin-packaging.md` erklärt, wie sich das Plugin-/Extension-Packaging je nach Plattform unterscheidet.
- `docs/official-sources.json` ist das Quellmanifest, das bei der täglichen Aktualisierung erneut überprüft wird.
- `docs/cloud-automation.md` erklärt die tägliche Update-Automatisierung und warum sie in der Cloud statt lokal läuft.
- `docs/kuma-studio-patterns.md` hält öffentlich verfügbare Betriebsabläufe von Kuma Studio fest.
- `CHANGELOG.md` plus der Git-Tag sind die Versionsdokumentation. Die Historie bleibt hier, nicht in den Dokument-Inhalten.

## Tägliche Wiki-Aktualisierung

Ein täglicher Agent hält das Wiki aktuell: Er liest `docs/official-sources.json`, ruft die offiziellen Anbieter-URLs ab und erstellt einen Pull Request, wenn sich die Belege geändert haben. Er pushed niemals auf `main`.

Der empfohlene Weg ist **Claude Routines** — eine geplante Claude-Code-Sitzung, die in Anthropics Cloud mit einem Claude-Abo läuft, ohne API-Schlüssel und ohne GitHub Actions, und weiterläuft, auch wenn der Laptop geschlossen ist. Die lokale Ausführung des Refresh über `claude -p` ist nicht empfohlen: Headless `claude -p` wird nach Token-Nutzung abgerechnet (nicht über das Abonnement), und ab dem **2026-06-15** zählt die Nutzung von Agent SDK / `claude -p` überhaupt nicht mehr zum Claude-Plan. Siehe `docs/cloud-automation.md`.

1. In Claude Code `/schedule` ausführen (oder <https://claude.ai/code/routines> öffnen).
2. Die Routine auf dieses Repository richten und den Prompt aus `prompts/daily-official-doc-update.md` verwenden.
3. Sie einmal täglich planen. Sie öffnet einen PR und führt danach ein Auto-Merge-Gate aus, das nur Dokument-Änderungen, die den Source-Check bestehen, per Squash-Merge übernimmt; alles andere wartet auf dein Review (siehe `docs/cloud-automation.md`).

Codex-Nutzer können denselben Ablauf mit einer Codex App Automation ausführen. Siehe `docs/cloud-automation.md` für beide Wege.

## Lokale Prüfungen

```bash
node scripts/check-official-sources.mjs --write-report
```

Das Skript validiert Source-IDs, erlaubte offizielle Hosts, die Erreichbarkeit von URLs, die erforderlichen Source-Kategorien und das Zeilenbudget von `SKILL.md`.