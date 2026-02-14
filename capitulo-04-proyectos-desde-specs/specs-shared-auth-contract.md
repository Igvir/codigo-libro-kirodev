# /specs/shared/auth-contract.md

## Contrato: Token de Autenticación JWT

**Última actualización:** 2025-01-15
**Responsable:** María González
**Estado:** Aprobado por equipo

### Estructura del Payload

```typescript
interface JWTPayload {
userId: string; // UUID del usuario
email: string; // Email verificado
role: UserRole; // Enum: 'admin' | 'manager' | 'staff' | 'customer'
permissions: string[]; // Array de permisos específicos
iat: number; // Timestamp de emisión
exp: number; // Timestamp de expiración
}

enum UserRole {
ADMIN = 'admin',
MANAGER = 'manager',
STAFF = 'staff',
CUSTOMER = 'customer'
}
```
```
### Permisos Disponibles

```typescript
const PERMISSIONS = {
// Productos
'products:read': 'Ver productos',
'products:create': 'Crear productos',
'products:update': 'Editar productos',
'products:delete': 'Eliminar productos',

// Inventario
'inventory:read': 'Ver inventario',
'inventory:adjust': 'Ajustar stock',

// Usuarios
'users:read': 'Ver usuarios',
'users:manage': 'Gestionar usuarios',

// Reportes
'reports:read': 'Ver reportes',
'reports:export': 'Exportar reportes'
} as const;
```
```
### Roles y Permisos por Defecto

```typescript
const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
admin: Object.keys(PERMISSIONS), // Todos los permisos
manager: [
'products:read', 'products:create', 'products:update',
'inventory:read', 'inventory:adjust',
'reports:read', 'reports:export'
],
staff: [
'products:read',
'inventory:read'
],
customer: [
'products:read'
]
};
```
```
### Validación de Permisos

```typescript
// Función helper para verificar permisos
function hasPermission(token: JWTPayload, permission: string): boolean {
return token.permissions.includes(permission);
}

// Middleware Express
function requirePermission(permission: string) {
return (req, res, next) => {
const token = req.user; // Asumiendo que ya fue verificado

if (!hasPermission(token, permission)) {
return res.status(403).json({
success: false,
error: 'forbidden',
message: `Permiso requerido: ${permission}`
});
}

next();
};
}
```
```
### Ejemplos de Uso

**Backend (Express):**
```typescript
// Ruta que requiere permiso específico
router.post('/api/products',
authenticate, // Verifica JWT
requirePermission('products:create'),
createProduct
);
```
```
**Frontend (React):**
```typescript
// Hook para verificar permisos
function useHasPermission(permission: string): boolean {
const { user } = useAuth();
return user?.permissions.includes(permission) || false;
}

// Componente
function ProductActions({ product }) {
const canEdit = useHasPermission('products:update');
const canDelete = useHasPermission('products:delete');

return (
<div>
{canEdit && <Button onClick={handleEdit}>Editar</Button>}
{canDelete && <Button onClick={handleDelete}>Eliminar</Button>}
</div>
);
}
```
```
### NO HACER

No verificar solo el rol sin verificar permisos específicos
No hardcodear permisos en múltiples lugares
No asumir que 'admin' puede hacer todo sin verificar
No cambiar esta estructura sin notificar al equipo

### Proceso de Cambios

Si necesitas agregar o modificar permisos:

1. Crear issue describiendo el cambio y la justificación
2. Actualizar este contrato con el cambio propuesto
3. Notificar en el canal de Slack #specs-review
4. Esperar aprobación de al menos 2 desarrolladores
5. Actualizar todos los módulos que usen este contrato
6. Hacer PR con los cambios
