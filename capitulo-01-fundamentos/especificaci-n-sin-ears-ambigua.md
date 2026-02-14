# Especificación sin EARS (ambigua):
Crear un sistema de autenticación

# Especificación con principios EARS (clara):
Sistema de Autenticación:

UBICUO:
- El sistema tendrá endpoints POST /auth/register y POST /auth/login
- Las contraseñas se almacenarán hasheadas con bcrypt

CUANDO (evento):
- When un usuario envíe credenciales a /auth/login,
the sistema shall verificar email y password contra la base de datos
- When las credenciales sean válidas,
the sistema shall retornar un token JWT con expiración de 24h

SI (comportamiento no deseado):
- If el email no existe en la base de datos,
then the sistema shall retornar error 401 "Credenciales inválidas"
- If la contraseña es incorrecta,
then the sistema shall retornar error 401 "Credenciales inválidas"
- If el token JWT está expirado,
then the sistema shall retornar error 403 "Token expirado"

MIENTRAS (estado):
- While el usuario esté autenticado,
the sistema shall incluir userId en req.usuario para rutas protegidas
