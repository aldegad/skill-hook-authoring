<p align="center">
  <img src="assets/icon.png" width="168" alt="Une seule source de vérité rayonnant vers chaque runtime d’agent" />
</p>

<h1 align="center">Interopérabilité inter-runtime des plateformes d'agents</h1>

<p align="center"><b>Une seule source de vérité pour vos skills, hooks et plugins — sur chaque agent IA que vous utilisez.</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

Vous n’utilisez plus un seul agent IA. Codex, Claude Code, Grok, Hermes, Antigravity, Cursor — chacun a sa propre idée de ce qu’est une « skill », où les hooks s’enregistrent, quel fichier d’instruction il lit, comment les sessions reprennent, et comment la facturation fonctionne réellement. Envoyer les mêmes outils à tous à la main finit par les faire diverger en moins d’une semaine. Demander « puis-je faire X sur le runtime Y ? » vous mène à une réponse dispersée sur sept sites de docs — ou non documentée.

Ce dépôt est la carte et la méthode :

1. **Un wiki de compatibilité, actualisé quotidiennement depuis la documentation officielle des fournisseurs.** Sept runtimes — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor et Kuma Studio — comparés sur les skills, hooks, plugins/extensions, fichiers d’instructions et mémoire, CLI spawn (interactif vs headless), reprise de session, et facturation.
2. **Une méthode pour déployer une source de vérité unique appartenant au dépôt** — skills, hooks, commandes, scripts, références, assets, branchements MCP/app, métadonnées de plugins — installés dans chaque runtime sans dérive : une racine de package canonique, des installations via symlink, des procédures explicites de retrait/renommage, et une checklist de validation.

## Ce que cela répond

Des questions auxquelles on peut passer une après-midi, avec références :

| Vous demandez | Le wiki répond |
|---|---|
| « Puis-je désactiver une skill sur Grok ou Hermes ? » | Aucun disable officiel par skill n’existe sur l’un ou l’autre — il faut donc déplacer la skill hors du root de découverte. Ce constat fait la différence entre livrer un vrai switch et livrer une fausse information. |
| « Quel fichier d’instruction chaque agent lit ? » | `AGENTS.md` vs `CLAUDE.md` vs `GEMINI.md` vs `.hermes.md` — qui lit quoi, avec quelle priorité, et comment partager un même fichier entre tous. |
| « Comment reprendre une session depuis un script ? » | Le tableau de reprise de session : commande de reprise, emplacement du store de session, et format d’`session-id` pour chaque runtime. |
| « Mon cron `claude -p` nocturne va me coûter de l’argent ? » | Les lignes de facturation indiquent précisément comment l’usage headless/SDK est facturé — y compris le changement de crédit Agent SDK du 2026-06-15, actuellement **en pause** (au 2026-06-18, `claude -p` consomme toujours votre quota d’abonnement). |
| « `/<skill-name>` existe sur Codex ? » | Non — Codex utilise `$<skill-name>`. La matrice d’invocation de skill enregistre le vrai token d’invocation de chaque runtime, afin de ne plus supposer qu’un token fonctionne partout. |

**Ceci est la couche sur laquelle vous construisez vos outils de gestion.** Le système de toggle de skills/hooks de Kuma Studio — activer ou désactiver n’importe quelle skill ou hook dans Claude, Codex, Grok et Hermes depuis une seule interface — a été construit directement sur ces faits : le wiki indique où se trouve l’interrupteur réel de chaque runtime (`skillOverrides`, `[[skills.config]]`, clés d’état des hooks), et là où aucun switch n’existe officiellement, il le dit aussi, de sorte que l’outil compense volontairement au lieu de deviner. Quel que soit le tableau de bord cross-agent, l’outil de synchronisation ou le gestionnaire de flotte que vous construisez, ce wiki est la vérité terrain dont vous avez besoin.

## Pourquoi lui faire confiance

- **Chaque affirmation est sourcée dans la documentation officielle du fournisseur.** Pas d’impression personnelle, pas de folklore, pas de « ça marche sur ma machine ».
- **L’absence est consignée, pas déduite.** Quand un runtime ne documente pas une capacité, le wiki indique `not documented` au lieu de supposer une parité — savoir qu’un switch *n’existe pas* vaut autant que savoir où il est.
- **Il se re-vérifie chaque jour.** Un agent cloud planifié re-télécharge chaque source dans `docs/official-sources.json` et ouvre une PR quand les preuves changent ; une gate déterministe fusionne automatiquement les changements docs-only qui passent le contrôle de source. Les tableaux de compatibilité obsolètes font pourrir les outils inter-runtime — celui-ci ne s’endort pas.

## Ce que ce dépôt contient

- `SKILL.md` — le point d’entrée de la skill et la méthodologie d’authoring/interopérabilité.
- `docs/compatibility-matrix.md` — la comparaison inter-runtime (Skills/Hooks/Plugins/Instructions, Session Resume, Skill Invocation).
- `docs/cli-invocation.md` — le spawn CLI par runtime (interactif vs headless) et la syntaxe de reprise.
- `docs/plugin-packaging.md` — la manière dont le packaging plugin/extension diffère selon la plateforme.
- `docs/official-sources.json` — le manifeste de sources que le rafraîchissement quotidien re-vérifie.
- `docs/cloud-automation.md` — l’automatisation de mise à jour quotidienne, et pourquoi elle s’exécute dans le cloud.
- `docs/kuma-studio-patterns.md` — les patterns opérationnels publics de Kuma Studio.
- `CHANGELOG.md` plus le tag git — le registre des versions. L’historique reste ici, pas dans les corps de docs.

## Rafraîchissement quotidien du wiki

Un agent quotidien maintient le wiki à jour : il lit `docs/official-sources.json`, récupère les URLs officielles des fournisseurs, et ouvre une pull request quand les preuves ont changé. Il ne pousse jamais sur `main`.

Le chemin recommandé est **Claude Routines** — une session Claude Code planifiée qui s’exécute dans le cloud d’Anthropic sur un abonnement Claude, sans clé API et sans GitHub Actions, et qui continue de tourner même lorsque votre ordinateur portable est fermé. Exécuter le rafraîchissement **localement** via `claude -p` est surtout déconseillé pour des raisons de **fiabilité** : une tâche cron locale ne s’exécute que tant que la machine est allumée, tandis qu’une Routine cloud continue quel que soit l’état de l’ordinateur. (Concernant la facturation : le changement de crédit mensuel séparé annoncé le 2026-06-15 est actuellement **en pause**, donc au 2026-06-18 `claude -p` et l’usage Agent SDK consomment toujours votre pool d’usage d’abonnement ; les utilisateurs de `ANTHROPIC_API_KEY` restent en pay-as-you-go.) Voir `docs/cloud-automation.md`.

1. Dans Claude Code, lancez `/schedule` (ou ouvrez <https://claude.ai/code/routines>).
2. Pointez la routine vers ce dépôt et utilisez le prompt de `prompts/daily-official-doc-update.md`.
3. Programmez-la une fois par jour. Elle ouvre une PR, puis exécute une gate d’auto-merge qui squash-merge les changements docs-only passant la vérification source ; tout le reste attend votre revue (voir `docs/cloud-automation.md`).

Les utilisateurs de Codex peuvent exécuter le même flux via une automatisation d’application Codex. Voir `docs/cloud-automation.md` pour les deux chemins.

## Vérifications locales

```bash
node scripts/check-official-sources.mjs --write-report
```

Le script valide les IDs de source, les hosts officiels autorisés, la joignabilité des URLs, les catégories de source requises et la line budget de `SKILL.md`.