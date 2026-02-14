# requirements.md

Migrar API de Express a Fastify manteniendo funcionalidad exacta.

Endpoints actuales:
- GET/POST /api/users
- GET/PUT/DELETE /api/users/:id
- POST /api/auth/login
- POST /api/auth/register
- GET /api/products
- Similar CRUD para orders

Middlewares custom:
- Authentication (JWT)
- Request logging
- Error handling

Todos los tests deben seguir pasando después de migración.
