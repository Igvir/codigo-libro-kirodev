const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Simulación de base de datos
let usuarios = [];

// Validador de email simple
const esEmailValido = (email) => {
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// POST /auth/register
router.post('/register', async (req, res) => {
const { email, password } = req.body;

// Validaciones
if (!email || !password) {
return res.status(400).json({
error: 'Email y password son requeridos'
});
}

if (!esEmailValido(email)) {
return res.status(400).json({
error: 'Email inválido'
});
}

if (password.length < 6) {
return res.status(400).json({
error: 'Password debe tener mínimo 6 caracteres'
});
}

// Verificar si usuario ya existe
if (usuarios.find(u => u.email === email)) {
return res.status(409).json({
error: 'Usuario ya existe'
});
}

// Hash del password
const passwordHash = await bcrypt.hash(password, 10);

const nuevoUsuario = {
id: usuarios.length + 1,
email,
passwordHash
};

usuarios.push(nuevoUsuario);

res.status(201).json({
message: 'Usuario registrado exitosamente',
userId: nuevoUsuario.id
});
});

// POST /auth/login
router.post('/login', async (req, res) => {
const { email, password } = req.body;

if (!email || !password) {
return res.status(400).json({
error: 'Email y password son requeridos'
});
}

// Buscar usuario
const usuario = usuarios.find(u => u.email === email);

if (!usuario) {
return res.status(401).json({
error: 'Credenciales inválidas'
});
}

// Verificar password
const passwordValido = await bcrypt.compare(
password,
usuario.passwordHash
);

if (!passwordValido) {
return res.status(401).json({
error: 'Credenciales inválidas'
});
}

// Generar token
const token = jwt.sign(
{ userId: usuario.id, email: usuario.email },
process.env.JWT_SECRET,
{ expiresIn: '24h' }
);

res.json({
message: 'Login exitoso',
token
});
});

module.exports = router;
