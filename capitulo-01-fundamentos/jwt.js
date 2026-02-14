const jwt = require('jsonwebtoken');

// Middleware para verificar token JWT
const verificarToken = (req, res, next) => {
// Extraer token del header Authorization
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

if (!token) {
return res.status(401).json({
error: 'Token no proporcionado'
});
}

try {
// Verificar y decodificar token
const decoded = jwt.verify(token, process.env.JWT_SECRET);

// Agregar datos del usuario al request
req.usuario = decoded;
next();
} catch (error) {
return res.status(403).json({
error: 'Token inválido o expirado'
});
}
};

module.exports = { verificarToken };
