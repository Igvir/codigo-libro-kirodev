# requirements.md

Sistema de Inventario para Tienda de Retail

## Core Features
- Ver lista de productos con stock actual
- Agregar/editar productos
- Marcar cuando producto está bajo stock (<10 unidades)
- Generar reportes de ventas mensuales

## User Roles
- Admin: acceso completo
- Staff: solo ver y marcar bajo stock

## Tech Constraints
- Backend: Node.js + Express + PostgreSQL
- Frontend: React
- Debe funcionar en tablets (touch-friendly)

## Out of Scope (para v1)
- Integración con POS
- Multi-location support
- Predicción de demanda con ML
