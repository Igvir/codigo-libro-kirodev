Crear un API REST para productos con Express:

UBICUO:
- El sistema tendrá un modelo de producto con: id, nombre, precio, stock
- El sistema tendrá endpoints GET /products, POST /products,
PUT /products/:id, DELETE /products/:id
- El sistema separará las rutas en un archivo independiente

CUANDO (validaciones):
- When se cree o actualice un producto,
the sistema shall validar que precio sea un número positivo
- When se cree o actualice un producto,
the sistema shall validar que stock sea un número no negativo

SI (errores):
- If los datos de entrada son inválidos,
then the sistema shall retornar error 400 con descripción del problema
- If se solicita un producto inexistente,
then the sistema shall retornar error 404 "Producto no encontrado"

FORMATO:
- Todas las respuestas serán JSON con estructura {success: boolean, data/error: any}
