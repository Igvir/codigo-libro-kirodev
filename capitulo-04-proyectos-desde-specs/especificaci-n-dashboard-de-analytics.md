# Especificación: Dashboard de Analytics

## Dependencias

**Módulo de Autenticación** (Contrato: auth-contract.md v1.2)
- Requiere: `permissions.includes('reports:read')`
- Usa: `JWTPayload` para identificar usuario

**Módulo de Productos** (Endpoint: GET /api/products/stats)
- Requiere: Endpoint debe retornar estadísticas agregadas
- Formato esperado:
```json
{
"totalProducts": number,
"activeProducts": number,
"discontinuedProducts": number,
"averagePrice": number
}
```
```
**Módulo de Inventario** (Endpoint: GET /api/inventory/summary)
- Requiere: Endpoint debe retornar resumen de stock
- Formato esperado:
```json
{
"totalItems": number,
"lowStockItems": number,
"outOfStockItems": number,
"warehouseCount": number
}
```
```
## Si una dependencia no existe aún

### Opción A: Crear datos mock
```typescript
// Mock temporal hasta que el endpoint real esté disponible
const mockProductStats = {
totalProducts: 150,
activeProducts: 142,
discontinuedProducts: 8,
averagePrice: 35.50
};
```
```
### Opción B: Crear el contrato primero
Si el endpoint no existe, crear `/specs/shared/products-stats-contract.md`
describiendo el formato esperado y notificar al equipo responsable.
