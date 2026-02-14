const express = require('express');
const router = express.Router();

// Base de datos simulada (en producción usarías DB real)
let products = [];
let nextId = 1;

// GET /products - Listar todos
router.get('/', (req, res) => {
res.json({ success: true, data: products });
});

// POST /products - Crear producto
router.post('/', (req, res) => {
const { nombre, precio, stock } = req.body;

// Validaciones
if (!nombre || typeof precio !== 'number' || typeof stock !== 'number') {
return res.status(400).json({
success: false,
error: 'Datos inválidos'
});
}

if (precio <= 0) {
return res.status(400).json({
success: false,
error: 'Precio debe ser positivo'
});
}

if (stock < 0) {
return res.status(400).json({
success: false,
error: 'Stock no puede ser negativo'
});
}

const producto = { id: nextId++, nombre, precio, stock };
products.push(producto);

res.status(201).json({ success: true, data: producto });
});

// PUT /products/:id - Actualizar
router.put('/:id', (req, res) => {
const id = parseInt(req.params.id);
const { nombre, precio, stock } = req.body;

const index = products.findIndex(p => p.id === id);
if (index === -1) {
return res.status(404).json({
success: false,
error: 'Producto no encontrado'
});
}

// Validaciones (similar a POST)
if (precio !== undefined && precio <= 0) {
return res.status(400).json({
success: false,
error: 'Precio debe ser positivo'
});
}

if (stock !== undefined && stock < 0) {
return res.status(400).json({
success: false,
error: 'Stock no puede ser negativo'
});
}

// Actualizar campos
if (nombre !== undefined) products[index].nombre = nombre;
if (precio !== undefined) products[index].precio = precio;
if (stock !== undefined) products[index].stock = stock;

res.json({ success: true, data: products[index] });
});

// DELETE /products/:id - Eliminar
router.delete('/:id', (req, res) => {
const id = parseInt(req.params.id);
const index = products.findIndex(p => p.id === id);

if (index === -1) {
return res.status(404).json({
success: false,
error: 'Producto no encontrado'
});
}

products.splice(index, 1);
res.json({ success: true, message: 'Producto eliminado' });
});

module.exports = router;
