<p align="center">
  <img src="assets/icon.png" width="168" alt="Eine verlässliche Quelle, die auf jede Agent-Laufzeit ausstrahlt" />
</p>

<h1 align="center">Laufzeitübergreifende Interoperabilität von Agent-Plattformen</h1>

<p align="center"><b>Eine verlässliche Quelle für deine Skills, Hooks und Plugins — in jedem KI-Coding-Agenten, den du nutzt.</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

Du läufst nicht mehr nur einen KI-Agenten. Codex, Claude Code, Grok, Hermes, Antigravity, Cursor — jeder hat seine eigene Vorstellung davon, was ein „Skill“ ist, wo Hooks registriert werden, welche Anweisungsdatei gelesen wird, wie Sitzungen fortgesetzt werden und wie das Abrechnungssystem wirklich funktioniert. Dieselben Werkzeuge von Hand für alle bereitzustellen führt dazu, dass sie innerhalb einer Woche auseinanderdriften. Fragst du „Kann ich auf Runtime Y überhaupt X machen?“, liegt die Antwort auf sieben verschiedenen Dokumentationsseiten — oder nirgendwo dokumentiert.

Dieses Repository ist die Karte und die Methode:

1. **Ein Kompatibilitäts-Wiki, täglich aus offiziellen Anbieter-Dokumentationen aktualisiert.** Sieben Laufzeiten — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor und Kuma Studio — werden im Vergleich von Skills, Hooks, Plugins/Erweiterungen, Projektanweisungs- und Gedächtnisdateien, CLI-Start (interaktiv vs. headless), Sitzungs-Wiederaufnahme und Abrechnung betrachtet.
2. **Eine Methodik für eine repo-eigene Wahrheitssource** — Skills, Hooks, Befehle, Skripte, Referenzen, Assets, MCP/App-Verkabelung, Plugin-Metadaten — ohne Drift in jeder Laufzeit installieren: ein kanonischer Paketstamm, Symlink-Installationen, klare Verfahren zum Außerkraftsetzen/Umbenennen und eine Validierungsgliederung.

## Was es beantwortet

Fragen, für die du sonst einen Nachmittag verbrannt hättest, mit Belegen beantwortet:

| Du fragst | Das Wiki beantwortet |
|---|---|
| „Kann ich einen Skill in Grok oder Hermes ausschalten?“ | Es gibt auf beiden keine offizielle pro-Skill-Fehlerstatus. Daher muss das Ausschalten den Skill aus der Entdeckungswurzel entfernen. Diese Tatsache unterscheidet einen echten Schalter von einer falschen Annahme. |
| „Welche Anweisungsdatei liest jeder Agent?“ | `AGENTS.md` vs `CLAUDE.md` vs `GEMINI.md` vs `.hermes.md` — wer was mit welcher Priorität liest und wie man eine einzige Datei über alle teilt. |
| „Wie setze ich eine Sitzung aus einem Skript fort?“ | Die Tabelle „Session Resume“ gibt Wiederaufnahmebefehl, Sitzungs-Store-Standort und Sitzungs-ID-Format für jede Laufzeit an. |
| „Verursacht mein nächtlicher `claude -p`-Cron Kosten?“ | Die Abrechnungszeilen zeigen genau, wie Headless-/SDK-Nutzung berechnet wird — einschließlich der Änderung der Agent SDK-Credits am 15.06.2026. |
| „Ist `/<skill-name>` in Codex möglich?“ | Nein — Codex nutzt `$<skill-name>`. Die Skill-Invocation-Matrix zeigt das echte Invokations-Token jeder Laufzeit, damit du nicht annimmst, dass ein Token überall funktioniert. |

**Das ist die Grundlage, auf der du Verwaltungswerkzeuge aufbaust.** Das Skill-/Hook-Umschalt-System von Kuma Studio — jedes beliebige Skill oder Hook per GUI in Claude, Codex, Grok und Hermes ein- oder auszuschalten — wurde direkt auf diesen Fakten aufgebaut: Das Wiki zeigt, wo der echte Schalter jeder Laufzeit liegt (`skillOverrides`, `[[skills.config]]`, Hook-State-Keys), und wo offiziell kein Schalter existiert, steht das ebenfalls dort, sodass die Werkzeuge bewusst ausgleichen statt zu raten. Egal welche cross-agent Dashboard-, Sync- oder Fleet-Verwaltung du baust, dieses Wiki ist die nötige Wahrheitsschicht.

## Warum ihm vertrauen

- **Jede Aussage belegt sich mit der offiziellen Dokumentation des Anbieters.** Keine Bauchgefühle, keine Gerüchte, kein „bei mir hat es funktioniert“.
- **Abwesenheit wird dokumentiert, nicht abgeleitet.** Wo eine Laufzeit eine Fähigkeit nicht dokumentiert, steht im Wiki `not documented`, statt Parität zu unterstellen — zu wissen, dass ein Schalter *nicht existiert*, ist so wertvoll wie zu wissen, wo er ist.
- **Es verifiziert sich selbst täglich.** Ein geplanter Cloud-Agent lädt jede Quelle aus `docs/official-sources.json` neu und öffnet eine PR, wenn sich Belege geändert haben; ein deterministisches Gate merged automatisch nur Dokumentsänderungen, die den Quellencheck bestehen. Veraltete Kompatibilitätstabellen sind die Ursache für verrottendes cross-runtime Werkzeug — dieses hier bleibt nicht stehen.

## Was dieses Repository enthält

- `SKILL.md` — der Skill-Einstiegspunkt sowie die Autorenschafts-/Interoperabilitätsmethodik.
- `docs/compatibility-matrix.md` — der Laufzeitvergleich (Skills/Hooks/Plugins/Instructions, Session Resume, Skill Invocation).
- `docs/cli-invocation.md` — pro Laufzeit CLI-Start (interaktiv vs. headless) und Wiederaufnahme-Syntax.
- `docs/plugin-packaging.md` — wie sich Plugin-/Erweiterungs-Packaging je Plattform unterscheidet.
- `docs/official-sources.json` — das Quellenmanifest, das die tägliche Aktualisierung erneut verifiziert.
- `docs/cloud-automation.md` — die tägliche Update-Automatisierung und warum sie in der Cloud läuft.
- `docs/kuma-studio-patterns.md` — öffentliche Betriebsabläufe von Kuma Studio.
- `CHANGELOG.md` plus das Git-Tag — die Versionshistorie. Die Historie bleibt hier, nicht in den Dokumentenkörpern.

## Tägliche Wiki-Aktualisierung

Ein täglicher Agent hält das Wiki aktuell: Er liest `docs/official-sources.json`, ruft die offiziellen Anbieter-URLs ab und öffnet eine Pull Request, wenn sich Belege geändert haben. Er pusht nicht direkt nach `main`.

Der empfohlene Weg ist **Claude Routines** — eine geplante Claude-Code-Sitzung, die in Anthropics Cloud auf einem Claude-Abo läuft, ohne API-Key und ohne GitHub Actions, und weiterläuft, wenn dein Laptop geschlossen ist. Das lokale Ausführen der Aktualisierung über `claude -p` wird nicht empfohlen: Seit dem 15.06.2026 nutzt die Agent SDK-/`claude -p`-Nutzung auf berechtigten Abonnementplänen einen separaten monatlichen Agent SDK Credit (pro Nutzer, erneuert monatlich, nicht übertragbar) statt des Pools für interaktive Nutzung — und ein lokaler Cron läuft nur, wenn der Rechner eingeschaltet ist. Siehe `docs/cloud-automation.md`.

1. Führe in Claude Code `/schedule` aus (oder öffne <https://claude.ai/code/routines>).
2. Richte die Routine auf dieses Repository aus und verwende den Prompt aus `prompts/daily-official-doc-update.md`.
3. Plane sie auf täglich. Sie öffnet eine PR und führt anschließend ein Auto-Merge-Gate aus, das Dokumentenänderungen, die den Quellencheck bestehen, als Squash-Merge zusammenführt; alles andere wartet auf deine Freigabe (siehe `docs/cloud-automation.md`).

Codex-Nutzende können denselben Ablauf mit einer Codex App Automation nutzen. Siehe `docs/cloud-automation.md` für beide Wege.

## Lokale Prüfungen

```bash
node scripts/check-official-sources.mjs --write-report
```

Das Skript validiert Quellen-IDs, erlaubte offizielle Hosts, Erreichbarkeit der URLs, die erforderlichen Quellkategorien und das `SKILL.md`-Zeilenbudget.