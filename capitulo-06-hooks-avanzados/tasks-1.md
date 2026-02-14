# tasks.md - Migrar autenticación de sessions a JWT

1. Instalar dependencias: jsonwebtoken, bcrypt
2. Crear utils/jwt.js con funciones generateToken y verifyToken
3. Modificar controllers/auth.js para usar JWT en lugar de sessions
4. Crear middleware/authenticate.js que valide JWT en requests
5. Actualizar routes/api.js para usar nuevo middleware
6. Modificar frontend/auth.js para guardar token en localStorage
7. Agregar tests en tests/auth.test.js para nuevos flows
8. Actualizar README.md con nueva estrategia de auth
