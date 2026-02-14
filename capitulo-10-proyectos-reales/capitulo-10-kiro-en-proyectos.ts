- createdAt: timestamp
- updatedAt: timestamp

### ProductVariant
- id: UUID
- productId: UUID (FK)
- name: string (ej: "Azul - Grande")
- sku: string (único)
- priceModifier: decimal
- stock: integer (>= 0)
- attributes: JSON

## Endpoints

### GET /products
- Query params: category, minPrice, maxPrice, search, page, limit
- Response: ProductListResponse con paginación
- Cache: 5 minutos

### GET /products/:id
- Response: ProductDetailResponse con variantes
- 404 si no existe o no está activo

### POST /products (Admin)
- Auth: Bearer token con rol admin
- Validación completa de payload
- Response: 201 con producto creado

### PUT /products/:id (Admin)
- Actualización parcial permitida
- Validar que al menos un campo cambie

### DELETE /products/:id (Admin)
- Soft delete (isActive = false)
- Productos con órdenes pendientes no se pueden eliminar

## Reglas de Negocio
1. SKU debe ser único globalmente
2. Producto debe tener al menos una variante
3. Stock negativo no permitido
4. Precio final = basePrice + variant.priceModifier
