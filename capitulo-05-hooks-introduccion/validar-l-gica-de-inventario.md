# Validar Lógica de Inventario

## Trigger: On File Save
## Pattern: src/inventory/**/*.ts

Cuando se modifica código de inventario:

**Validar:**
1. Que nunca se permita inventario negativo
2. Que todas las operaciones sean atómicas (transactions)
3. Que se loggueen cambios de stock para auditoría
4. Que se disparen webhooks cuando stock < threshold

**Escanear por anti-patterns:**
```typescript
// Permitir inventario negativo
product.stock -= quantity;

// Validar primero
if (product.stock < quantity) throw new InsufficientStockError();
product.stock -= quantity;

// Sin transaction
await updateStock(productId, -1);
await createOrder(data);

// Con transaction
await db.transaction(async (tx) => {
await tx.updateStock(productId, -1);
await tx.createOrder(data);
});
