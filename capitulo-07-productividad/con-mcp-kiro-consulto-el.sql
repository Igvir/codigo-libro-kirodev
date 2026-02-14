# Steering con MCP

## Database Access (vía MCP)

Tenemos servidor MCP de PostgreSQL configurado.

Cuando necesites información de la DB:
- Usa el MCP server para consultar schema o datos
- NO ejecutes queries destructivas (DROP, DELETE) sin preguntar
- Preferir queries con LIMIT para exploración

Ejemplo de uso:
"Muéstrame los últimos 10 usuarios registrados"
Kiro usará MCP para ejecutar query apropiada.

## Queries Exploratorias

Antes de generar código que interactúa con DB:
1. Pregunta el schema de las tablas involucradas
2. Verifica nombres exactos de columnas
3. Chequea tipos de datos y constraints
4. Genera código con información verificada
