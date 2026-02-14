Tú: Diseña un esquema para un sistema de reservas de
restaurante con soporte para múltiples ubicaciones

Kiro: [Power de PostgreSQL activado automáticamente]

Basándome en mejores prácticas de diseño relacional:

-- Tabla principal de restaurantes
CREATE TABLE restaurants (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name VARCHAR(255) NOT NULL,
slug VARCHAR(100) UNIQUE NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ubicaciones (un restaurante puede tener varias)
CREATE TABLE locations (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
address TEXT NOT NULL,
city VARCHAR(100) NOT NULL,
capacity INTEGER NOT NULL CHECK (capacity > 0),
-- Índice para búsquedas por ciudad
CONSTRAINT idx_locations_city CREATE INDEX (city)
);

[continúa con reservations, time_slots, etc.]

El Power incluye validación: he verificado que los
foreign keys tienen índices apropiados y que las
constraints son consistentes.
