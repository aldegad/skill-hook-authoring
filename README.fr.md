<p align="center">
  <img src="assets/icon.png" width="168" alt="Une source de vérité unique diffusée vers chaque runtime d’agent" />
</p>

<h1 align="center">Interopérabilité inter-runtime des plateformes d’agents</h1>

<p align="center"><b>Une source de vérité unique pour vos skills, hooks et plugins — sur chaque agent de codage IA que vous exécutez.</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

Vous n’utilisez plus un seul agent IA. Codex, Claude Code, Grok, Hermes, Antigravity, Cursor — chacun a sa propre idée de ce qu’est une « skill », de l’endroit où les hooks sont enregistrés, du fichier d’instruction qu’il lit, de la façon de reprendre une session, et du fonctionnement réel de la facturation. Vous déployez manuellement le même ensemble d’outils partout, et en une semaine tout diverge. Si vous demandez « est-ce que je peux faire X sur le runtime Y ? », la réponse est enterrée dans sept sites de docs différents — ou pas documentée du tout.

Ce dépôt est la carte et la méthode :

1. **Un wiki de compatibilité, mis à jour chaque jour à partir de la documentation officielle des éditeurs.** Sept runtimes — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor et Kuma Studio — sont comparés sur les skills, hooks, plugins/extensions, fichiers d’instruction/projet & mémoire, CLI spawn (interactif vs headless), reprise de session et facturation.
2. **Une méthodologie pour distribuer une source de vérité unique propriété du dépôt** — skills, hooks, commandes, scripts, références, assets, branchement MCP/app, métadonnées de plugin — installés sur chaque runtime sans dérive : une racine de package canonique, des installations via symlink, des procédures explicites de retrait/renommage, et une checklist de validation.

## Ce que cela répond

Des questions qui vous feraient brûler l’après-midi, avec sources à l’appui :

| Vous demandez | Le wiki répond |
|---|---|
| « Puis-je désactiver une skill sur Grok ou Hermes ? » | Il n’existe pas de désactivation officielle par skill sur l’un ou l’autre — il faut donc déplacer la skill hors de la racine de découverte. Ce détail fait la différence entre livrer un vrai switch et livrer un mensonge. |
| « Quel fichier d’instruction chaque agent lit-il ? » | `AGENTS.md` vs `CLAUDE.md` vs `GEMINI.md` vs `.hermes.md` — qui lit quoi, dans quel ordre de priorité, et comment partager un même fichier entre eux. |
| « Comment reprendre une session depuis un script ? » | Le tableau Session Resume : commande de reprise, emplacement du store de session et format du session-id pour chaque runtime. |
| « Mon cron nocturne `claude -p` me coûtera-t-il de l’argent ? » | Les lignes de facturation indiquent précisément comment la facturation headless/SDK est appliquée — y compris le changement de crédit Agent SDK du 2026-06-15. |
| « `/<skill-name>` existe-t-il sur Codex ? » | Non — Codex utilise `$<skill-name>`. La matrice d’invocation de skills recense le vrai token d’invocation de chaque runtime, pour que vous cessiez de supposer qu’un token fonctionne partout. |

**C’est la couche sur laquelle on construit l’outil de gestion.** Le système de toggle skill/hook de Kuma Studio — activer ou désactiver n’importe quelle skill ou hook de Claude, Codex, Grok et Hermes depuis une seule interface — a été bâti directement sur ces faits : le wiki indique où se trouve le vrai interrupteur on/off de chaque runtime (`skillOverrides`, `[[skills.config]]`, clés d’état des hooks), et là où aucun interrupteur n’existe officiellement, il le dit aussi, afin que l’outil compense intentionnellement au lieu de deviner. Quel que soit le tableau de bord inter-agent, l’outil de synchronisation ou le gestionnaire de flotte que vous construisez, ce wiki est la vérité terrain dont il a besoin.

## Pourquoi lui faire confiance

- **Chaque affirmation cite la documentation officielle du fournisseur.** Pas de sensations, pas de folklore, pas de « ça marchait sur ma machine ».
- **L’absence est documentée, pas déduite.** Lorsqu’un runtime ne documente pas une capacité, le wiki indique `not documented` au lieu d’inférer une parité — savoir qu’un interrupteur *n’existe pas* vaut autant que savoir où il se trouve.
- **Il se re-vérifie tous les jours.** Un agent cloud planifié réimporte chaque source de `docs/official-sources.json` et ouvre une PR quand les preuves changent ; une porte de validation déterministe fusionne automatiquement les changements docs-only qui passent la vérification des sources. Les tableaux de compatibilité périmés font pourrir l’outillage cross-runtime — celui-ci ne reste pas figé.

## Ce que ce dépôt contient

- `SKILL.md` — le point d’entrée de la skill et la méthodologie d’auteur/interopérabilité.
- `docs/compatibility-matrix.md` — la comparaison inter-runtime (Skills/Hooks/Plugins/Instructions, reprise de session, invocation de skills).
- `docs/cli-invocation.md` — la syntaxe de lancement CLI par runtime (interactif vs headless) et de reprise.
- `docs/plugin-packaging.md` — comment l’empaquetage des plugins/extensions diffère selon la plateforme.
- `docs/official-sources.json` — le manifeste source que le rafraîchissement quotidien ré-vérifie.
- `docs/cloud-automation.md` — l’automatisation de la mise à jour quotidienne, et pourquoi elle s’exécute dans le cloud.
- `docs/kuma-studio-patterns.md` — les modèles d’exploitation publics de Kuma Studio.
- `CHANGELOG.md` ainsi que le git tag — l’historique est ici, pas dans le corps des docs.

## Rafraîchissement quotidien du wiki

Un agent quotidien maintient le wiki à jour : il lit `docs/official-sources.json`, récupère les URLs officielles des fournisseurs et ouvre une pull request lorsque les preuves ont changé. Il ne pousse jamais directement sur `main`.

Le chemin recommandé est **Claude Routines** — une session planifiée de Claude Code exécutée dans le cloud d’Anthropic avec un abonnement Claude, sans clé API et sans GitHub Actions, et qui continue de fonctionner quand votre ordinateur portable est fermé. Exécuter le rafraîchissement **en local** via `claude -p` est déconseillé : depuis le 2026-06-15, l’usage de l’Agent SDK / `claude -p` sur les plans d’abonnement éligibles prélève un crédit mensuel Agent SDK séparé (par utilisateur, se réinitialisant chaque mois, non reportable) au lieu du pool interactif — et une tâche cron locale ne s’exécute que tant que la machine est réveillée. Voir `docs/cloud-automation.md`.

1. Dans Claude Code, exécutez `/schedule` (ou ouvrez <https://claude.ai/code/routines>).
2. Pointez la routine sur ce dépôt et utilisez le prompt dans `prompts/daily-official-doc-update.md`.
3. Programmez-la une fois par jour. Elle ouvre une PR, puis exécute une porte de fusion auto-merge qui fait un squash-merge des changements docs-only validés par le contrôle des sources ; tout le reste attend votre revue (voir `docs/cloud-automation.md`).

Les utilisateurs de Codex peuvent appliquer le même flux avec une Codex App Automation. Voir `docs/cloud-automation.md` pour les deux parcours.

## Vérifications locales

```bash
node scripts/check-official-sources.mjs --write-report
```

Le script valide les IDs de source, les hôtes officiels autorisés, la joignabilité des URL, les catégories de source requises et la ligne budgétaire de `SKILL.md`.