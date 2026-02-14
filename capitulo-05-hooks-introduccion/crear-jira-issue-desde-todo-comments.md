# Crear Jira Issue desde TODO Comments

## Trigger: On File Save
## Pattern: **/*.{ts,tsx,js,jsx}

Cuando se guarda un archivo:

**Objetivo:** Automatizar creación de issues en Jira desde TODOs en código.

**Proceso:**

1. **Escanear comentarios TODO:**
typescript
// TODO(P1): Refactorizar esta función - muy compleja
// TODO: Agregar validación de email
// FIXME: Bug cuando user es null


2. **Para cada TODO nuevo** (no existía en versión anterior):

**Extraer metainformación:**
- Prioridad: (P0/P1/P2/P3) o default P2
- Tipo: TODO = task, FIXME = bug
- Descripción: texto del comentario
- Archivo y línea donde está
- Autor: del git blame

3. **Verificar si ya existe issue:**
- Buscar en Jira con query: `text ~ "TODO from [archivo]:[línea]"`
- Si existe, actualizar descripción si cambió
- Si no existe, crear nuevo

4. **Crear issue en Jira via MCP:**
```javascript
// Usando MCP server de Jira
await mcpServers.jira.createIssue({
project: 'PROJ',
type: 'Task', // o 'Bug' si es FIXME
priority: 'Medium',
summary: `Refactorizar función en auth.ts:42`,
description: `
Archivo: src/auth/token.ts:42
Comentario: Refactorizar esta función - muy compleja

Contexto de código:
\`\`\`typescript
[5 líneas antes y después del TODO]
\`\`\`

Autor: @diego
Fecha: 2024-01-15
`,
labels: ['tech-debt', 'from-code']
});
