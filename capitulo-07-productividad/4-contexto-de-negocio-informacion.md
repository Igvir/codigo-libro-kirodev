## Contexto del Negocio

Este es un marketplace de productos artesanales.
- "Vendedores" son artesanos que venden
- "Compradores" son usuarios finales
- "Productos" pueden tener variaciones (tamaño, color)
- Pagos se procesan vía Stripe, toman comisión de 8%

### Flujo de Compra
1. Comprador agrega a carrito
2. Checkout con Stripe
3. Vendedor recibe notificación
4. Vendedor marca como enviado
5. Comprador puede dejar review después de recibir
