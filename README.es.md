<p align="center">
  <img src="assets/icon.png" width="168" alt="Una sola fuente de verdad que irradia a cada runtime de agente" />
</p>

<h1 align="center">Interoperabilidad entre agentes entre runtimes</h1>

<p align="center"><b>Una sola fuente de verdad para tus skills, hooks y plugins — en todos los agentes de IA que ejecutes.</b></p>

<p align="center">

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [简体中文](README.zh-Hans.md) | [Español](README.es.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

</p>

---

Ya no ejecutas un solo agente de IA. Codex, Claude Code, Grok, Hermes, Antigravity, Cursor — cada uno tiene su propia idea de qué es una "skill", dónde se registran los hooks, qué archivo de instrucciones lee, cómo se reanuda una sesión y cómo funciona realmente la facturación. Enviar las mismas herramientas a todos manualmente hace que se separen en una semana. Si preguntas "¿puedo hacer X en el runtime Y?", la respuesta está enterrada en siete sitios de documentación distintos — o no está documentada en absoluto.

Este repositorio es el mapa y el método:

1. **Una wiki de compatibilidad, actualizada a diario desde la documentación oficial del proveedor.** Siete runtimes — Codex, Claude Code, Grok, Hermes, Antigravity CLI, Cursor y Kuma Studio — comparados en skills, hooks, plugins/extensions, archivos de instrucciones/memoria, spawn de CLI (interactivo vs headless), reanudación de sesión y facturación.
2. **Una metodología para distribuir una única fuente de verdad en el repositorio** — skills, hooks, comandos, scripts, referencias, assets, integración de MCP/app, metadatos de plugins — instalados en cada runtime sin desviaciones: una raíz canónica de paquete, instalaciones con symlink, procedimientos explícitos de retirada/renombre y una lista de verificación de validación.

## Qué responde

Preguntas en las que podrías perder una tarde, respondidas con citas:

| Preguntas | La wiki responde |
|---|---|
| "¿Puedo desactivar una skill en Grok o Hermes?" | No existe una desactivación oficial por skill en ninguno de ellos; por lo tanto, un interruptor debe sacar la skill de la raíz de descubrimiento. Ese hecho marca la diferencia entre implementar un verdadero apagado y lanzar una mentira. |
| "¿Qué archivo de instrucciones lee cada agente?" | `AGENTS.md` frente a `CLAUDE.md` frente a `GEMINI.md` frente a `.hermes.md`: quién lee qué, con qué prioridad y cómo compartir un mismo archivo entre todos. |
| "¿Cómo reanudo una sesión desde un script?" | La tabla de reanudación de sesión: comando de reanudación, ubicación del store de sesión y formato de session-id para cada runtime. |
| "¿Mi cron nocturno con `claude -p` me costará dinero?" | Las filas de facturación muestran exactamente cómo se cobra el uso headless/SDK — incluyendo el cambio de créditos de Agent SDK de 2026-06-15. |
| "¿Existe `/<skill-name>` en Codex?" | No — Codex usa `$<skill-name>`. La matriz de invocación de skills registra el token real de invocación de cada runtime, así dejas de asumir que un token funciona en todas partes. |

**Esta es la capa sobre la que construyes herramientas de administración.** El sistema de activación de skill/hook de Kuma Studio — activar o desactivar cualquier skill o hook en Claude, Codex, Grok y Hermes desde una sola interfaz — se construyó directamente sobre estos datos: la wiki indica dónde está el interruptor real de cada runtime (`skillOverrides`, `[[skills.config]]`, claves de estado de hooks), y donde no existe un interruptor oficial, también lo indica, para que la herramienta compense de forma deliberada en lugar de adivinar. Cualquier dashboard cross-agent, herramienta de sincronización o gestor de flota que estés construyendo, esta wiki es la verdad base que necesita.

## Por qué confiar en ella

- **Cada afirmación cita la documentación oficial del proveedor.** Sin corazonadas, sin folclore, sin "funcionaba en mi máquina".
- **La ausencia se registra, no se infiere.** Donde un runtime no documenta una capacidad, la wiki indica `not documented` en vez de asumir paridad; saber que un interruptor *no existe* vale tanto como saber dónde está.
- **Se vuelve a verificar a diario.** Un agente programado vuelve a obtener cada fuente en `docs/official-sources.json` y abre un PR cuando cambia la evidencia; una validación determinista auto-mergea cambios solo de documentación que pasan la comprobación de fuentes. Las tablas de compatibilidad obsoletas es cómo se degrada la interoperabilidad entre runtimes — esta no se queda estática.

## Qué posee este repositorio

- `SKILL.md` — el punto de entrada de la skill y la metodología de autoría/interoperabilidad.
- `docs/compatibility-matrix.md` — la comparación entre runtimes (Skills/Hooks/Plugins/Instructions, reanudación de sesión, invocación de skills).
- `docs/cli-invocation.md` — spawn por CLI por runtime (interactivo vs headless) y sintaxis de reanudación.
- `docs/plugin-packaging.md` — cómo cambia el empaquetado de plugins/extensions por plataforma.
- `docs/official-sources.json` — el manifiesto de fuentes que la actualización diaria vuelve a verificar.
- `docs/cloud-automation.md` — la automatización de actualización diaria y por qué se ejecuta en la nube.
- `docs/kuma-studio-patterns.md` — patrones públicos de operación de Kuma Studio.
- `CHANGELOG.md` más la etiqueta git — el historial de versiones. La historia queda aquí, no en el cuerpo de los docs.

## Actualización diaria de la wiki

Un agente diario mantiene la wiki al día: lee `docs/official-sources.json`, obtiene las URLs oficiales de proveedores y abre un pull request cuando cambia la evidencia. Nunca hace push directo a `main`.

La ruta recomendada es **Claude Routines** — una sesión programada de Claude Code que se ejecuta en la nube de Anthropic con una suscripción de Claude, sin clave de API y sin GitHub Actions, y permanece ejecutándose aunque tu portátil esté cerrado. Ejecutar la actualización **localmente** con `claude -p` no es recomendable: desde el 2026-06-15, el uso de Agent SDK / `claude -p` en planes de suscripción elegibles consume un crédito mensual de Agent SDK separado por usuario (se renueva mensualmente y no se acumula) en lugar del pool de plan interactivo, y un cron local solo se ejecuta mientras la máquina esté despierta. Consulta `docs/cloud-automation.md`.

1. En Claude Code, ejecuta `/schedule` (o abre <https://claude.ai/code/routines>).
2. Apunta la rutina a este repositorio y usa el prompt en `prompts/daily-official-doc-update.md`.
3. Programarla una vez al día. Abre un PR y luego ejecuta una puerta de auto-merge que hace squash merge de cambios solo de documentación que pasan la verificación de fuente; cualquier otro cambio espera tu revisión (consulta `docs/cloud-automation.md`).

Los usuarios de Codex pueden ejecutar el mismo flujo con una Codex App Automation. Consulta `docs/cloud-automation.md` para ambas rutas.

## Comprobaciones locales

```bash
node scripts/check-official-sources.mjs --write-report
```

El script valida IDs de fuentes, hosts oficiales permitidos, alcance de URLs, las categorías de fuente requeridas y el presupuesto de líneas de `SKILL.md`.