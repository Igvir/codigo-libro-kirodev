# Product Service Specification

## Propósito
Gestionar el catálogo de productos artesanales con soporte
para variantes, inventario y categorización.

## Entidades

### Product
- id: UUID
- name: string (3-100 chars)
- description: string (10-2000 chars)
- basePrice: decimal (> 0)
- category: CategoryEnum
- images: string[] (1-10 URLs)
- variants: ProductVariant[]
- isActive: boolean
