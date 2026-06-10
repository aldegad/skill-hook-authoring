# Interoperabilidad entre plataformas de agentes en múltiples runtimes

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

Dos cosas en un mismo repositorio:

1. **Una wiki de compatibilidad**, actualizada diariamente a partir de la documentación oficial de cada proveedor, que registra cómo se comparan los runtimes de agentes de hoy — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor y Kuma Studio — en skills, hooks, plugins/extensions, archivos de instrucciones del proyecto, CLI spawn (interactivo vs sin cabeza), reanudación de sesiones y facturación.
2. **Una metodología** para interoperar y gestionar esos runtimes: publicar una única fuente de verdad propietaria del repositorio (skills, hooks, comandos, scripts, referencias, assets, cableado de MCP/app o metadatos de plugins específicos del runtime) sin divergencia entre agentes.

Cada afirmación de compatibilidad cita la documentación oficial del proveedor; cuando un runtime no documenta una capacidad, la wiki registra `not documented` en lugar de inferir equivalencias.

## Qué posee este repositorio

- `SKILL.md` es el punto de entrada de la skill y la metodología de autoría/interoperación.
- `docs/compatibility-matrix.md` es la comparación entre runtimes (incluye la tabla de Session Resume).
- `docs/cli-invocation.md` registra el CLI spawn por runtime (interactivo vs headless) y la sintaxis de reanudación.
- `docs/plugin-packaging.md` explica cómo varía el empaquetado de plugins/extensions según la plataforma.
- `docs/official-sources.json` es el manifiesto de fuentes que la actualización diaria vuelve a verificar.
- `docs/cloud-automation.md` explica la automatización de actualización diaria y por qué se ejecuta en la nube, no localmente.
- `docs/kuma-studio-patterns.md` recoge patrones públicos de operación de Kuma Studio.
- `CHANGELOG.md` junto con la etiqueta de git constituyen el registro de versiones. La historia permanece aquí, no en los cuerpos de los documentos.

## Actualización diaria de la wiki

Un agente diario mantiene la wiki al día: lee `docs/official-sources.json`, obtiene las URLs oficiales de los proveedores y abre una pull request cuando la evidencia cambió. Nunca hace push directo a `main`.

La ruta recomendada es **Claude Routines** — una sesión programada de Claude Code que se ejecuta en la nube de Anthropic con una suscripción de Claude, sin clave API y sin GitHub Actions, y permanece en ejecución cuando tu portátil está apagado. Ejecutar la actualización **localmente** con `claude -p` está desaconsejado: `claude -p` en modo headless se cobra por uso de tokens (no por la suscripción), y desde el 2026-06-15 el uso de Agent SDK / `claude -p` ya no cuenta para el plan de Claude en absoluto. Ver `docs/cloud-automation.md`.

1. En Claude Code, ejecuta `/schedule` (o abre <https://claude.ai/code/routines>).
2. Dirige la rutina a este repositorio y usa el prompt de `prompts/daily-official-doc-update.md`.
3. Programa la ejecución una vez al día. Abre una PR, luego ejecuta una puerta de auto-merge que hace squash-merge de cambios de solo documentación que aprueben la verificación de fuentes; cualquier otra cosa espera tu revisión (ver `docs/cloud-automation.md`).

Los usuarios de Codex pueden ejecutar el mismo flujo con una Codex App Automation. Ver `docs/cloud-automation.md` para ambas rutas.

## Comprobaciones locales

```bash
node scripts/check-official-sources.mjs --write-report
```

El script valida los IDs de fuente, los hosts oficiales permitidos, la accesibilidad de URLs, las categorías de fuente requeridas y el presupuesto de líneas de `SKILL.md`.