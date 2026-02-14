# Notificar Equipo en Slack de Cambios Críticos

## Trigger: On File Save
## Pattern: src/api/**/*.ts

Cuando se modifica un archivo de API:

**Objetivo:** Alertar al equipo cuando se hacen cambios a endpoints públicos.

**Detectar cambios breaking:**
1. Parámetros removidos de funciones exportadas
2. Cambios en tipos de retorno
3. Nuevos errores lanzados
4. Cambios en validaciones

**Si se detecta cambio potencialmente breaking:**

1. **Analizar impacto:**
- Buscar usos de la función en el codebase
- Identificar servicios/clientes que llaman este endpoint
- Estimar número de afectados

2. **Enviar a Slack via MCP:**
```javascript
await mcpServers.slack.sendMessage({
channel: '#api-changes',
message: `
*Potential Breaking Change Detected*

*File:* \`src/api/users.ts\`
*Function:* \`createUser()\`
*Author:* @diego

*Change:*
\`\`\`diff
- createUser(email: string, password: string)
+ createUser(data: CreateUserData)
\`\`\`

*Impact:*
- 3 internal services affected
- 2 mobile clients need updating

*Action Required:*
- [ ] Update API docs
- [ ] Notify mobile team
- [ ] Plan migration strategy

<https://github.com/company/repo/commit/abc123|View Commit>
`,
thread: 'api-changes-2024-01'
});
