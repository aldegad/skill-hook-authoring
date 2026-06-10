<p align="center">
  <img src="assets/icon.png" width="168" alt="Una fuente de verdad única que se irradia a cada runtime de agente" />
</p>

# Interoperabilidad entre plataformas de agente entre entornos de ejecución

[Inglés](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

Dos cosas en un solo repositorio:

1. **Una wiki de compatibilidad**, actualizada diariamente desde la documentación oficial de los proveedores, que registra cómo los runtimes de agentes actuales —Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor y Kuma Studio— se comparan en habilidades, hooks, plugins/extensiones, archivos de instrucciones de proyecto, ejecución de CLI (interactivo vs. sin cabeza), reanudación de sesión y facturación.
2. **Una metodología** para interoperar y gestionar esos runtimes: publicar una fuente de verdad propiedad del repositorio (skills, hooks, comandos, scripts, referencias, assets, cableado de MCP/app, o metadatos de plugin específicos del runtime) sin desviaciones entre agentes.

Cada afirmación de compatibilidad cita la documentación del propio proveedor; cuando un runtime no documenta una capacidad, la wiki registra `not documented` en lugar de inferir paridad.

## Lo que posee este repositorio

- `SKILL.md` es el punto de entrada de la skill y la metodología de autoría/interoperabilidad.
- `docs/compatibility-matrix.md` es la comparación entre runtimes (incluye la tabla de Session Resume).
- `docs/cli-invocation.md` registra la ejecución de CLI por runtime (interactivo vs sin cabeza) y la sintaxis de reanudación.
- `docs/plugin-packaging.md` explica cómo varía el empaquetado de plugins/extensiones según la plataforma.
- `docs/official-sources.json` es el manifiesto de fuentes que la actualización diaria vuelve a verificar.
- `docs/cloud-automation.md` explica la automatización de la actualización diaria y por qué se ejecuta en la nube, no localmente.
- `docs/kuma-studio-patterns.md` recoge los patrones públicos de operación de Kuma Studio.
- `CHANGELOG.md` junto con la etiqueta de git son el registro de versión. La historia permanece aquí, no en los cuerpos de la documentación.

## Actualización diaria de la wiki

Un agente diario mantiene la wiki al día: lee `docs/official-sources.json`, obtiene las URLs oficiales de los proveedores y abre una pull request cuando cambia la evidencia. Nunca hace push a `main`.

La ruta recomendada es **Claude Routines** —una sesión programada de Claude Code que se ejecuta en la nube de Anthropic con una suscripción de Claude, sin API key y sin GitHub Actions, y que sigue ejecutándose cuando tu portátil está apagado. Ejecutar la actualización **localmente** con `claude -p` no se recomienda: desde 2026-06-15, el uso de Agent SDK / `claude -p` en planes de suscripción elegibles usa un crédito mensual separado de Agent SDK (por usuario, se renueva mensualmente y no se arrastra) en lugar del pool interactivo, y un cron local solo se dispara mientras la máquina está activa. Consulta `docs/cloud-automation.md`.

1. En Claude Code, ejecuta `/schedule` (o abre <https://claude.ai/code/routines>).
2. Apunta la rutina a este repositorio y usa el prompt en `prompts/daily-official-doc-update.md`.
3. Programarla una vez al día. Abre una PR y luego ejecuta una puerta de auto-fusión que hace squash de cambios solo de documentación que pasan la verificación de fuente; cualquier otra cosa espera tu revisión (ver `docs/cloud-automation.md`).

Los usuarios de Codex pueden ejecutar el mismo flujo con una Codex App Automation. Consulta `docs/cloud-automation.md` para ambas rutas.

## Comprobaciones locales

```bash
node scripts/check-official-sources.mjs --write-report
```

El script valida los IDs de fuente, hosts oficiales permitidos, la accesibilidad de las URLs, las categorías de fuente requeridas y el presupuesto de líneas de `SKILL.md`.