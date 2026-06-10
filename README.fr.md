# Interopérabilité entre environnements d’exécution de plateformes d’agents

[Anglais](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

Deux choses dans un seul dépôt :

1. **Un wiki de compatibilité**, actualisé quotidiennement à partir des documents officiels des fournisseurs, qui recense la manière dont les environnements d’agents d’aujourd’hui — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor et Kuma Studio — se comparent selon les compétences, hooks, plugins/extensions, fichiers d’instructions projet, lancement CLI (interactif vs headless), reprise de session et facturation.
2. **Une méthodologie** pour l’interopérabilité et la gestion de ces environnements : fournir une source de vérité propre au dépôt (skills, hooks, commandes, scripts, références, assets, branchements MCP/app, ou métadonnées de plugins spécifiques au runtime) sans divergence entre agents.

Chaque affirmation de compatibilité cite la documentation officielle du fournisseur ; lorsqu’un runtime ne documente pas une capacité, le wiki indique `not documented` plutôt que d’inférer une parité.

## Ce que ce dépôt contient

- `SKILL.md` est le point d’entrée de la skill et la méthodologie d’authoring/interopérabilité.
- `docs/compatibility-matrix.md` est la comparaison inter-runtime (inclut le tableau de reprise de session).
- `docs/cli-invocation.md` répertorie, par runtime, le lancement CLI (interactif vs headless) et la syntaxe de reprise.
- `docs/plugin-packaging.md` explique comment le packaging des plugins/extensions diffère selon la plateforme.
- `docs/official-sources.json` est le manifeste source que la vérification quotidienne revalide.
- `docs/cloud-automation.md` explique l’automatisation de la mise à jour quotidienne et pourquoi elle s’exécute dans le cloud, pas localement.
- `docs/kuma-studio-patterns.md` documente les patterns de fonctionnement publics de Kuma Studio.
- `CHANGELOG.md` ainsi que le tag git constituent l’historique de version. L’historique reste ici, pas dans les contenus de docs.

## Actualisation quotidienne du wiki

Un agent quotidien maintient le wiki à jour : il lit `docs/official-sources.json`, récupère les URLs officielles des fournisseurs, et ouvre une pull request lorsque les preuves ont changé. Il ne pousse jamais sur `main`.

Le parcours recommandé est **Claude Routines** — une session Claude Code planifiée qui s’exécute dans le cloud d’Anthropic via un abonnement Claude, sans clé API et sans GitHub Actions, et continue de fonctionner quand votre ordinateur portable est fermé. Exécuter la mise à jour **localement** via `claude -p` est déconseillé : le `claude -p` headless est facturé selon une tarification par token (et non par abonnement), et à partir du 2026-06-15, l’usage de l’Agent SDK / `claude -p` ne compte plus du tout dans le plan Claude. Voir `docs/cloud-automation.md`.

1. Dans Claude Code, exécutez `/schedule` (ou ouvrez <https://claude.ai/code/routines>).
2. Orientez la routine vers ce dépôt et utilisez le prompt dans `prompts/daily-official-doc-update.md`.
3. Programmez-la une fois par jour. Elle ouvre une PR, puis exécute une porte d’auto-merge qui squashe et fusionne les changements docs-only passant la vérification source ; tout le reste attend votre relecture (voir `docs/cloud-automation.md`).

Les utilisateurs de Codex peuvent exécuter le même flux avec une automatisation Codex App Automation. Voir `docs/cloud-automation.md` pour les deux parcours.

## Vérifications locales

```bash
node scripts/check-official-sources.mjs --write-report
```

Le script valide les IDs des sources, les hôtes officiels autorisés, la joignabilité des URLs, les catégories de sources requises et la ligne budget de `SKILL.md`.