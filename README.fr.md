<p align="center">
  <img src="assets/icon.png" width="168" alt="Une source de vérité unique qui rayonne vers chaque runtime d’agent" />
</p>

# Interopérabilité entre plateformes d’agents multi-runtime

[Anglais](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Espagnol](README.es.md) | [Français](README.fr.md) | [Allemand](README.de.md)

Deux choses dans un même dépôt :

1. **Un wiki de compatibilité**, actualisé quotidiennement à partir de la documentation officielle des fournisseurs, qui consigne la comparaison des runtimes d’agents d’aujourd’hui — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor et Kuma Studio — au niveau des compétences, hooks, plugins/extensions, fichiers d’instructions de projet, lancement CLI (interactif vs headless), reprise de session et facturation.
2. **Une méthodologie** pour l’interopérabilité et la gestion de ces runtimes : fournir une source de vérité appartenant au dépôt (skills, hooks, commandes, scripts, références, assets, branchement MCP/app, ou métadonnées de plugin spécifiques à un runtime) sans dérive entre agents.

Chaque affirmation de compatibilité cite la documentation officielle du fournisseur ; lorsqu’un runtime ne documente pas une capacité, le wiki indique `not documented` au lieu d’inférer une parité.

## Ce que possède ce dépôt

- `SKILL.md` est le point d’entrée de la skill et la méthodologie d’auteur/interopérabilité.
- `docs/compatibility-matrix.md` est la comparaison inter-runtime (incluant le tableau de reprise de session).
- `docs/cli-invocation.md` répertorie le mode d’invocation CLI par runtime (interactif vs headless) et la syntaxe de reprise.
- `docs/plugin-packaging.md` explique comment l’empaquetage des plugins/extensions diffère selon les plateformes.
- `docs/official-sources.json` est le manifeste source que l’actualisation quotidienne re-vérifie.
- `docs/cloud-automation.md` explique l’automatisation de la mise à jour quotidienne et pourquoi elle s’exécute dans le cloud, pas localement.
- `docs/kuma-studio-patterns.md` capture les schémas d’exploitation publics de Kuma Studio.
- `CHANGELOG.md` ainsi que le tag Git servent de registre de version. L’historique reste ici, pas dans les corps de docs.

## Actualisation quotidienne du wiki

Un agent quotidien maintient le wiki à jour : il lit `docs/official-sources.json`, récupère les URL officielles des fournisseurs et ouvre une pull request lorsque les preuves ont changé. Il ne pousse jamais directement sur `main`.

Le chemin recommandé est **Claude Routines** — une session Claude Code planifiée qui s’exécute dans le cloud d’Anthropic sur un abonnement Claude, sans clé API et sans GitHub Actions, et continue de fonctionner lorsque votre ordinateur est fermé. L’exécution locale via `claude -p` est déconseillée : à partir du **2026-06-15**, l’usage de l’Agent SDK / `claude -p` sur les abonnements éligibles consomme un crédit Agent SDK mensuel séparé (par utilisateur, renouvelé chaque mois, non reportable) au lieu du pool d’un plan interactif — et une tâche cron locale ne se déclenche que lorsque la machine est active. Voir `docs/cloud-automation.md`.

1. Dans Claude Code, exécutez `/schedule` (ou ouvrez <https://claude.ai/code/routines>).
2. Orientez la routine vers ce dépôt et utilisez le prompt de `prompts/daily-official-doc-update.md`.
3. Planifiez-la une fois par jour. Elle ouvre une PR, puis exécute une porte d’auto-fusion qui squash-fusionne les modifications de docs qui passent la vérification des sources ; tout le reste attend votre revue (voir `docs/cloud-automation.md`).

Les utilisateurs de Codex peuvent appliquer le même flux avec une automatisation d’application Codex. Voir `docs/cloud-automation.md` pour les deux parcours.

## Vérifications locales

```bash
node scripts/check-official-sources.mjs --write-report
```

Le script valide les identifiants source, les hôtes officiels autorisés, la joignabilité des URL, les catégories de source requises et la limite de lignes de `SKILL.md`.