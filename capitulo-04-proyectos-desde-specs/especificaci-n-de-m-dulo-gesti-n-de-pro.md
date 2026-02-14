# Especificación de Módulo: Gestión de Productos

## Objetivo
Permitir a los usuarios crear, editar, buscar y categorizar productos en el inventario.

## Alcance del Módulo

**Incluye:**
- CRUD completo de productos
- Sistema de categorías jerárquico (categorías y subcategorías)
- Búsqueda y filtrado avanzado
- Carga de imágenes de productos
- Gestión de variantes (talla, color, etc.)

**No incluye:**
- Control de stock (eso está en el módulo de Inventario)
- Pricing dinámico (feature futura)
- Importación masiva desde CSV (eso está en el módulo de Reportes)

## Modelo de Datos

### Tabla: products
```sql
CREATE TABLE products (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
sku VARCHAR(50) UNIQUE NOT NULL,
name VARCHAR(200) NOT NULL,
description TEXT,
category_id UUID REFERENCES categories(id),
base_price DECIMAL(10,2) NOT NULL,
cost DECIMAL(10,2),
status VARCHAR(20) DEFAULT 'active', -- active, discontinued, draft
created_by UUID REFERENCES users(id),
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
```
```
### Tabla: categories
```sql
CREATE TABLE categories (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
name VARCHAR(100) NOT NULL,
slug VARCHAR(100) UNIQUE NOT NULL,
parent_id UUID REFERENCES categories(id),
created_at TIMESTAMP DEFAULT NOW()
);
```
```
### Tabla: product_images
```sql
CREATE TABLE product_images (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
product_id UUID REFERENCES products(id) ON DELETE CASCADE,
url VARCHAR(500) NOT NULL,
alt_text VARCHAR(200),
display_order INTEGER DEFAULT 0,
uploaded_at TIMESTAMP DEFAULT NOW()
);
```
```
### Tabla: product_variants
```sql
CREATE TABLE product_variants (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
product_id UUID REFERENCES products(id) ON DELETE CASCADE,
sku VARCHAR(50) UNIQUE NOT NULL,
name VARCHAR(100) NOT NULL, -- ej: "Talla M - Color Rojo"
attributes JSONB, -- { "size": "M", "color": "red" }
price_adjustment DECIMAL(10,2) DEFAULT 0,
created_at TIMESTAMP DEFAULT NOW()
);
```
```
## Endpoints del API

### GET /api/products
Lista productos con paginación y filtros.

**Query params:**
- `page` (number, default: 1)
- `limit` (number, default: 20, max: 100)
- `category` (UUID, opcional)
- `status` (string, opcional: active|discontinued|draft)
- `search` (string, opcional: busca en name, description, sku)
- `sort` (string, opcional: name|created_at|price, default: created_at)
- `order` (string, opcional: asc|desc, default: desc)

**Respuesta exitosa (200):**
```json
{
"success": true,
"data": [
{
"id": "uuid",
"sku": "PROD-001",
"name": "Camiseta Básica",
"description": "100% algodón",
"category": {
"id": "uuid",
"name": "Ropa",
"slug": "ropa"
},
"basePrice": 25.99,
"status": "active",
"images": [
{
"url": "https://...",
"altText": "Vista frontal"
}
],
"variantsCount": 6,
"createdAt": "2025-01-15T10:30:00Z"
}
],
"meta": {
"page": 1,
"limit": 20,
"total": 145,
"totalPages": 8
}
}
```
```
### POST /api/products
Crea un nuevo producto.

**Requiere autenticación:** Sí (rol: admin o manager)

**Body:**
```json
{
"sku": "PROD-002",
"name": "Pantalón Deportivo",
"description": "Ideal para running",
"categoryId": "uuid",
"basePrice": 45.99,
"cost": 20.00,
"status": "active"
}
```

**Validaciones:**
- `sku`: requerido, único, alfanumérico con guiones, max 50 chars
- `name`: requerido, min 3 chars, max 200 chars
- `categoryId`: debe existir en la tabla categories
- `basePrice`: requerido, mayor a 0
- `cost`: opcional, si existe debe ser menor o igual a basePrice
- `status`: debe ser uno de: active, discontinued, draft

**Respuesta exitosa (201):**
```json
{
"success": true,
"data": {
"id": "uuid",
"sku": "PROD-002",
"name": "Pantalón Deportivo"
}
}
```
```
**Errores posibles:**
- 400: Validación fallida
- 401: No autenticado
- 403: Sin permisos
- 409: SKU duplicado

### PUT /api/products/:id
Actualiza un producto existente.

**Requiere autenticación:** Sí (rol: admin o manager)

**Body:** Mismos campos que POST, todos opcionales

**Respuesta exitosa (200):** Mismo formato que POST

### DELETE /api/products/:id
Elimina un producto (soft delete, cambia status a 'deleted').

**Requiere autenticación:** Sí (rol: admin)

**Respuesta exitosa (200):**
```json
{
"success": true,
"data": {
"deleted": true,
"id": "uuid"
}
}
```
```
### POST /api/products/:id/images
Sube una imagen para un producto.

**Requiere autenticación:** Sí

**Content-Type:** multipart/form-data

**Body:**
- `file`: archivo de imagen (jpg, png, webp, max 5MB)
- `altText`: texto alternativo (opcional)

**Proceso:**
1. Validar tipo y tamaño de archivo
2. Subir a AWS S3 con nombre único
3. Guardar URL en product_images
4. Retornar URL pública

**Respuesta exitosa (201):**
```json
{
"success": true,
"data": {
"id": "uuid",
"url": "https://bucket.s3.amazonaws.com/...",
"altText": "Vista frontal",
"displayOrder": 0
}
}
```
```
## Componentes del Frontend

### ProductList
Componente principal para listar productos con paginación y filtros.

**Props:**
- `initialFilters`: objeto con filtros iniciales (opcional)
- `onProductClick`: callback cuando se selecciona un producto

**Estado interno:**
- `products`: array de productos
- `loading`: boolean
- `error`: string | null
- `filters`: objeto con filtros activos
- `pagination`: objeto con info de paginación

**Funcionalidad:**
- Carga productos al montar
- Actualiza lista cuando cambian filtros
- Maneja paginación
- Muestra skeleton loading mientras carga
- Muestra mensaje de error si falla

### ProductForm
Formulario para crear/editar productos.

**Props:**
- `product`: objeto producto (si es edición) o null (si es creación)
- `onSave`: callback cuando se guarda exitosamente
- `onCancel`: callback cuando se cancela

**Validación en cliente:**
- Validar campos requeridos antes de enviar
- Mostrar errores inline en cada campo
- Deshabilitar botón submit mientras se envía

### ProductCard
Card para mostrar un producto en lista o grid.

**Props:**
- `product`: objeto producto
- `onClick`: callback al hacer click
- `showActions`: boolean, mostrar botones de editar/eliminar

## Lógica de Negocio Importante

### Cálculo de Precio Final
```typescript
// Precio final = precio base + ajuste de variante
const finalPrice = product.basePrice + (variant?.priceAdjustment || 0);
```
```
### Generación de SKU
Si el usuario no proporciona SKU, generar automáticamente:
```
FORMATO: CAT-YYYY-NNNN
CAT: primeras 3 letras de categoría en mayúscula
YYYY: año actual
NNNN: número secuencial de 4 dígitos
```
```

Ejemplo: ROP-2025-0001
```
### Búsqueda
La búsqueda debe ser case-insensitive y buscar en:
- name (coincidencia parcial)
- sku (coincidencia exacta o parcial)
- description (coincidencia parcial)

Usar búsqueda full-text de PostgreSQL para mejor performance:

```sql
WHERE
to_tsvector('spanish', name || ' ' || description)
@@ plainto_tsquery('spanish', $1)
OR sku ILIKE $2
```
```
## Dependencias con Otros Módulos

**Módulo de Autenticación:**
- Necesita verificar token JWT en endpoints protegidos
- Necesita info del usuario para campos created_by

**Módulo de Inventario:**
- Los productos deben existir antes de crear stock
- Al eliminar producto, verificar que no tenga stock activo

**Módulo de Reportes:**
- Proporciona datos de productos para reportes de ventas

## Testing Requerido

### Unit Tests
- Validaciones de producto
- Generación de SKU
- Cálculo de precio final

### Integration Tests
- CRUD completo de productos
- Subida de imágenes
- Búsqueda y filtrado
- Manejo de errores

### E2E Tests (opcional pero recomendado)
- Flujo completo: crear producto  agregar imagen  editar  eliminar
