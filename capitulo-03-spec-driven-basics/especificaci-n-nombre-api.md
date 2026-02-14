# Especificación: [NOMBRE_API]

## Contexto y Objetivo
### Problema
[Describe el problema específico que resuelve esta API]

### Objetivo
[Objetivo específico y medible]

## Endpoints

### [MÉTODO] /api/[recurso]
**Propósito:** [Qué hace este endpoint]
**Autenticación:** [Requerida/No requerida]
**Rate limiting:** [Límites específicos]

**Request:**
```json
{
"campo1": "string (requerido, max 100 chars)",
"campo2": "number (opcional, min 0)"
}
```

**Response 200:**
```json
{
"success": true,
"data": {
"id": "uuid",
"campo1": "string",
"createdAt": "ISO 8601 timestamp"
}
}
```

**Response 400:**
```json
{
"success": false,
"error": "Validation failed",
"details": ["campo1 is required"]
}
```

## Stack Técnico
- Runtime: Node.js [VERSION]+
- Framework: Express [VERSION]+
- Database: [DATABASE] [VERSION]+
- ORM: [ORM] [VERSION]+
- Validation: [LIBRARY] [VERSION]+
- Testing: [FRAMEWORK] [VERSION]+

## Criterios de Aceptación
- [ ] Endpoint responde en < [TIME]ms p95
- [ ] Validación rechaza inputs inválidos con mensajes específicos
- [ ] Rate limiting funciona según especificación
- [ ] Logs incluyen request ID para trazabilidad
- [ ] Tests cubren casos happy path y edge cases
