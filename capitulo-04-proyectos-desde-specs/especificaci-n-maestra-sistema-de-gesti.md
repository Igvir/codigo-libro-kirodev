# Especificación Maestra: Sistema de Gestión de Inventario

## Arquitectura General

**Tipo:** Aplicación web fullstack con arquitectura cliente-servidor

**Stack Principal:**
- Frontend: React 18 + Vite + TypeScript
- Backend: Node.js 20 + Express + TypeScript
- Base de datos: PostgreSQL 15
- Caché: Redis 7
- Autenticación: JWT con refresh tokens

## Decisiones Técnicas Fundamentales

### Autenticación
- Todos los endpoints privados requieren header: `Authorization: Bearer <token>`
- Tokens JWT expiran en 15 minutos
- Refresh tokens en cookies httpOnly, expiran en 7 días
- Formato de respuesta de error 401: `{ "error": "unauthorized", "message": "..." }`

### Estructura de Respuestas API
Todos los endpoints siguen este formato:

**Éxito:**
{format: json}
```
{
"success": true,
"data": { /* contenido */ },
"meta": { /* paginación, timestamps, etc */ }
}
```

**Error:**
{format: json}
```
{
"success": false,
"error": "error_code",
"message": "Descripción legible",
"details": { /* info adicional si aplica */ }
}
```

### Convenciones de Código

**Nombres de archivos:**
- Componentes React: PascalCase (`UserProfile.tsx`)
- Hooks personalizados: camelCase con prefijo use (`useInventory.ts`)
- Utilidades: camelCase (`formatCurrency.ts`)
- Rutas API: kebab-case (`/api/product-categories`)

**Gestión de errores:**
- Usar clases de error personalizadas: `AppError`, `ValidationError`, `NotFoundError`
- Siempre loguear errores con contexto: `logger.error('Failed to create product', {
