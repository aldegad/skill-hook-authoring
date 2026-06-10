# Interoperabilidad entre runtime de agentes

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

Dos cosas en un repositorio:

1. **Una wiki de compatibilidad**, actualizada diariamente a partir de la documentación oficial de proveedores, que registra cómo se comparan los runtimes de agente de hoy — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor y Kuma Studio — en habilidades, hooks, plugins/extensiones, archivos de instrucciones de proyecto, CLI spawn (interactivo vs sin cabeza), reanudación de sesión y facturación.
2. **Una metodología** para interoperar y gestionar esos runtimes: publicar una única fuente de verdad del repositorio (skills, hooks, comandos, scripts, referencias, recursos, cableado MCP/app o metadatos de plugin específicos del runtime) sin que se desvíe entre agentes.

Cada afirmación de compatibilidad cita la documentación oficial del proveedor; cuando un runtime no documenta una capacidad, la wiki registra `not documented` en lugar de inferir paridad.

## Qué posee este repositorio

- `SKILL.md` es el punto de entrada de la skill y la metodología de autoría/interoperabilidad.
- `docs/compatibility-matrix.md` es la comparación entre runtimes (incluye la tabla de reanudación de sesión).
- `docs/cli-invocation.md` registra el CLI spawn por runtime (interactivo vs sin cabeza) y la sintaxis de reanudación.
- `docs/plugin-packaging.md` explica cómo varía el empaquetado de plugins/extensiones según la plataforma.
- `docs/official-sources.json` es el manifiesto de fuentes que se vuelve a verificar en la actualización diaria.
- `docs/cloud-automation.md` explica la automatización de actualización diaria y por qué se ejecuta en la nube, no localmente.
- `docs/kuma-studio-patterns.md` recoge los patrones públicos de operación de Kuma Studio.
- `CHANGELOG.md` junto con la etiqueta de git son el registro de versiones. La historia permanece aquí, no en los cuerpos de documentación.

## Actualización diaria de la wiki

Un agente diario mantiene la wiki actualizada: lee `docs/official-sources.json`, obtiene las URL oficiales de los proveedores y abre un pull request cuando cambia la evidencia. Nunca hace push a `main`.

La ruta recomendada es **Claude Routines** — una sesión programada de Claude Code que se ejecuta en la nube de Anthropic con una suscripción de Claude, sin API key y sin GitHub Actions, y permanece en ejecución cuando tu portátil está cerrado. Ejecutar la actualización **localmente** mediante `claude -p` no se recomienda: desde el 2026-06-15, el uso de Agent SDK / `claude -p` en planes de suscripción elegibles consume un crédito mensual separado de Agent SDK por usuario (se renueva mensualmente y no se acumula), en lugar del pool interactivo, y un cron local solo se activa cuando la máquina está encendida. Consulta `docs/cloud-automation.md`.

1. En Claude Code, ejecuta `/schedule` (o abre <https://claude.ai/code/routines>).
2. Apunta la rutina a este repositorio y usa el prompt de `prompts/daily-official-doc-update.md`.
3. Programa su ejecución una vez al día. Abre un PR y luego ejecuta una puerta de auto-fusión que hace squash-merge de cambios solo de documentación que pasan la verificación de fuentes; cualquier otra cosa espera tu revisión (consulta `docs/cloud-automation.md`).

Los usuarios de Codex pueden ejecutar el mismo flujo con una automatización de Codex App. Consulta `docs/cloud-automation.md` para ambas rutas.

## Verificaciones locales

```bash
node scripts/check-official-sources.mjs --write-report
```

El script valida IDs de fuentes, hosts oficiales permitidos, alcance de URL, las categorías de fuente requeridas y el presupuesto de líneas de `SKILL.md`.