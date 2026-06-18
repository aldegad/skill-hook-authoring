<p align="center">
  <img src="assets/icon.png" width="168" alt="Una sola fuente de verdad que se extiende a cada runtime de agente" />
</p>

<h1 align="center">Interoperabilidad entre plataformas de agentes multiplataforma</h1>

<p align="center"><b>Una sola fuente de verdad para tus skills, hooks y plugins — en cada agente de IA que uses.</b></p>

<p align="center">

[Inglés](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

Ya no ejecutas un único agente de IA. Codex, Claude Code, Grok, Hermes, Antigravity, Cursor: cada uno tiene su propia idea de qué es una "skill", dónde se registran los hooks, qué archivo de instrucciones lee, cómo se reanuda una sesión y cómo funciona realmente la facturación. Si intentas enviar las mismas herramientas a todos manualmente, en una semana se desincronizan. Si preguntas "¿puedo hacer X en el runtime Y?", la respuesta está enterrada en siete sitios de documentación diferentes —o ni siquiera está documentada.

Este repositorio es el mapa y el método:

1. **Una wiki de compatibilidad, actualizada a diario desde la documentación oficial de cada proveedor.** Siete runtimes — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor y Kuma Studio — comparados en skills, hooks, plugins/extensiones, archivos de instrucciones y memoria, ejecución por CLI (interactivo vs headless), reanudación de sesión y facturación.
2. **Una metodología para distribuir una sola fuente de verdad de repositorio** — skills, hooks, comandos, scripts, referencias, assets, configuración de MCP/app, metadatos de plugins — instalados en cada runtime sin deriva: una raíz canónica de paquete, instalaciones por symlink, procedimientos explícitos de retiro/cambio de nombre y una lista de verificación de validación.

## Lo que responde

Preguntas que de otro modo te roban toda la tarde, respondidas con citas:

| Preguntas frecuentes | La wiki responde |
|---|---|
| "¿Puedo desactivar una skill en Grok o Hermes?" | No existe desactivación oficial por skill en ninguno de los dos, así que un toggle debe mover la skill fuera de la raíz de descubrimiento. Ese hecho marca la diferencia entre implementar un toggle real o publicar una mentira. |
| "¿Qué archivo de instrucciones lee cada agente?" | `AGENTS.md` vs `CLAUDE.md` vs `GEMINI.md` vs `.hermes.md` — quién lee qué, en qué prioridad y cómo compartir un solo archivo entre todos. |
| "¿Cómo reanudo una sesión desde un script?" | La tabla de reanudación de sesión: comando de reanudación, ubicación del store de sesión y formato de session-id para cada runtime. |
| "¿Mi cron diario `claude -p` me cobrará dinero?" | Las filas de facturación registran exactamente cómo se cobra el uso headless/SDK — incluido el cambio de créditos del Agent SDK del 2026-06-15, que actualmente está **en pausa** (a partir de 2026-06-18, `claude -p` todavía consume de los límites de uso de tu suscripción). |
| "¿Existe `/<skill-name>` en Codex?" | No — Codex usa `$<skill-name>`. La matriz de invocación de skills registra el token real de invocación de cada runtime, así dejas de asumir que un token funciona en todos lados. |

**Esta es la capa sobre la que construyes tus herramientas de gestión.** El sistema de toggles de skills/hooks de Kuma Studio —encender o apagar cualquier skill o hook desde una sola GUI en Claude, Codex, Grok y Hermes— se construyó directamente sobre estos hechos: la wiki indica cuál es el interruptor real de on/off de cada runtime (`skillOverrides`, `[[skills.config]]`, claves de estado de hooks), y donde no existe un interruptor oficial, también lo indica, así la herramienta compensa de forma deliberada en lugar de adivinar. Sea cual sea el dashboard cross-agent, herramienta de sincronización o administrador de flotas que estés construyendo, esta wiki es la verdad base que necesitas.

## Por qué confiar en esto

- **Cada afirmación cita la documentación propia del proveedor.** Sin corazonadas, sin folclore, sin “me funcionó en mi máquina”.
- **La ausencia se registra, no se infiere.** Cuando un runtime no documenta una capacidad, la wiki indica `not documented` en lugar de asumir paridad —saber que un switch *no existe* vale tanto como saber dónde está.
- **Se revalida a diario.** Un agente en la nube programado vuelve a descargar cada fuente en `docs/official-sources.json` y abre un PR cuando cambia la evidencia; una puerta de control determinista integra automáticamente cambios solo de documentación que pasan la verificación de fuentes. Las tablas de compatibilidad obsoletas degradan las herramientas cross-runtime; esta no se queda quieta.

## Qué posee este repositorio

- `SKILL.md` — el punto de entrada de la skill y la metodología de autoría/interoperabilidad.
- `docs/compatibility-matrix.md` — la comparación entre runtimes (Skills/Hooks/Plugins/Instructions, Reanudación de sesión, Invocación de skills).
- `docs/cli-invocation.md` — spawn por runtime (interactivo vs headless) y sintaxis de reanudación.
- `docs/plugin-packaging.md` — cómo difiere el empaquetado de plugins/extensiones por plataforma.
- `docs/official-sources.json` — el manifiesto de fuentes que la actualización diaria vuelve a verificar.
- `docs/cloud-automation.md` — la automatización de actualización diaria y por qué se ejecuta en la nube.
- `docs/kuma-studio-patterns.md` — patrones de operación públicos de Kuma Studio.
- `CHANGELOG.md` junto con el tag de git — el registro de versiones. La historia se conserva aquí, no en los cuerpos de los documentos.

## Actualización diaria de la wiki

Un agente diario mantiene la wiki al día: lee `docs/official-sources.json`, descarga las URL oficiales de los proveedores y abre una pull request cuando cambia la evidencia. Nunca hace push directo a `main`.

La ruta recomendada es **Claude Routines** —una sesión programada de Claude Code que se ejecuta en la nube de Anthropic con una suscripción a Claude, sin clave de API y sin GitHub Actions, y sigue funcionando aunque tu portátil esté cerrado. Ejecutar la actualización **localmente** con `claude -p` se desaconseja principalmente por **confiabilidad**: un cron local solo funciona mientras la máquina esté encendida, mientras que una Routine en la nube funciona independientemente del estado del portátil. (En facturación: el cambio de créditos mensuales separados anunciado para 2026-06-15 está actualmente **en pausa**, así que a partir de 2026-06-18 `claude -p` y el uso del Agent SDK siguen tomando del pool de uso de tu suscripción; los usuarios de `ANTHROPIC_API_KEY` siguen en pago por uso.) Ver `docs/cloud-automation.md`.

1. En Claude Code, ejecuta `/schedule` (o abre <https://claude.ai/code/routines>).
2. Apunta la rutina a este repositorio y usa el prompt en `prompts/daily-official-doc-update.md`.
3. Prográmala una vez al día. Abre un PR y luego ejecuta una puerta de auto-fusión que hace squash-merge de cambios solo de documentación que pasen la verificación de fuentes; todo lo demás espera tu revisión (ver `docs/cloud-automation.md`).

Los usuarios de Codex pueden ejecutar el mismo flujo con una Codex App Automation. Consulta `docs/cloud-automation.md` para ambas rutas.

## Comprobaciones locales

```bash
node scripts/check-official-sources.mjs --write-report
```

El script valida IDs de fuentes, hosts oficiales permitidos, alcanzabilidad de URL, categorías de fuente requeridas y el presupuesto de líneas de `SKILL.md`.