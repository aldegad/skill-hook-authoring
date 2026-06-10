# Interopérabilité multi-runtime entre agents et plateformes

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

Deux choses dans un même dépôt :

1. **Un wiki de compatibilité**, mis à jour quotidiennement à partir des docs officielles des fournisseurs, consignant comment les runtimes d’agents d’aujourd’hui — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor et Kuma Studio — se comparent au niveau des skills, hooks, plugins/extensions, fichiers d’instructions de projet, démarrage CLI (interactif vs headless), reprise de session et facturation.
2. **Une méthodologie** pour l’interopérabilité et la gestion de ces runtimes : livrer une source unique détenue par le dépôt (skills, hooks, commandes, scripts, références, assets, connexions MCP/app, ou métadonnées de plugins spécifiques au runtime) sans divergence entre agents.

Toute affirmation de compatibilité cite la documentation officielle du fournisseur ; lorsqu’un runtime ne documente pas une capacité, le wiki indique `not documented` plutôt que d’inférer une parité.

## Contenu géré par ce dépôt

- `SKILL.md` est le point d’entrée de la skill et la méthodologie d’authoring/interopérabilité.
- `docs/compatibility-matrix.md` est la comparaison inter-runtime (inclut le tableau sur la reprise de session).
- `docs/cli-invocation.md` consigne le démarrage CLI par runtime (interactif vs headless) et la syntaxe de reprise.
- `docs/plugin-packaging.md` explique en quoi la création de plugins/extensions diffère selon les plateformes.
- `docs/official-sources.json` est le manifeste source que la vérification quotidienne reconduit.
- `docs/cloud-automation.md` explique l’automatisation de la mise à jour quotidienne et pourquoi elle s’exécute dans le cloud, pas localement.
- `docs/kuma-studio-patterns.md` rassemble les modèles publics d’exploitation de Kuma Studio.
- `CHANGELOG.md` ainsi que le tag Git servent de registre de version. L’historique reste ici, pas dans les corps de docs.

## Actualisation quotidienne du wiki

Un agent quotidien maintient le wiki à jour : il lit `docs/official-sources.json`, récupère les URLs officielles des fournisseurs, puis ouvre une pull request lorsque les éléments de preuve ont changé. Il ne pousse jamais directement sur `main`.

Le chemin recommandé est **Claude Routines** — une session Claude Code planifiée qui s’exécute dans le cloud d’Anthropic avec un abonnement Claude, sans clé API et sans GitHub Actions, et continue de tourner quand votre ordinateur portable est fermé. Exécuter la mise à jour **localement** via `claude -p` est déconseillé : à partir du 2026-06-15, l’usage de l’Agent SDK / `claude -p` sur les plans d’abonnement éligibles consomme un crédit mensuel d’Agent SDK séparé (par utilisateur, renouvelé mensuellement, non reportable) au lieu du pool du plan interactif — et un cron local ne s’exécute que quand la machine est allumée. Voir `docs/cloud-automation.md`.

1. Dans Claude Code, exécutez `/schedule` (ou ouvrez <https://claude.ai/code/routines>).
2. Pointez la routine sur ce dépôt et utilisez le prompt dans `prompts/daily-official-doc-update.md`.
3. Programmez-la une fois par jour. Elle ouvre une PR, puis exécute une porte de fusion automatique qui squash-merge les changements de documentation seuls passant la vérification des sources ; tout le reste attend votre revue (voir `docs/cloud-automation.md`).

Les utilisateurs de Codex peuvent suivre le même flux avec une automatisation Codex App. Voir `docs/cloud-automation.md` pour les deux parcours.

## Vérifications locales

```bash
node scripts/check-official-sources.mjs --write-report
```

Le script valide les IDs de source, les hôtes officiels autorisés, la joignabilité des URLs, les catégories de source requises et la ligne budgétaire de `SKILL.md`.