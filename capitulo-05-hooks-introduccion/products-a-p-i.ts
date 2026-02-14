/**
* API para gestión del catálogo de productos
*
* Proporciona métodos para listar, buscar, y obtener detalles
* de productos disponibles en la tienda.
*/
export class ProductsAPI {
/**
* Lista productos del catálogo con soporte para paginación y filtros
*
* Permite buscar productos por categoría o texto, con paginación
* configurable. El límite máximo por página es 100 items.
*
* @param params - Parámetros de consulta
* @param params.page - Número de página (default: 1, mínimo: 1)
* @param params.limit - Items por página (default: 20, máximo: 100)
* @param params.category - Filtrar por categoría específica (opcional)
* @param params.search - Búsqueda por texto en nombre/descripción (opcional)
*
* @returns Lista paginada de productos con metadata
*
* @throws {Error} Si limit excede 100
*
* @example
* ```typescript
* // Primera página, límite default
* const products = await api.listProducts({ page: 1 });
*
* // Búsqueda en categoría
* const ceramics = await api.listProducts({
* category: 'ceramics',
* limit: 50
* });
* ```
*/
async listProducts(params) {
// ...
}

/**
* Obtiene los detalles completos de un producto específico
*
* @param id - ID único del producto
*
* @returns Objeto con todos los detalles del producto
*
* @throws {Error} "Product ID required" si id está vacío
* @throws {Error} "Product not found" si no existe producto con ese ID
*
* @example
*
* const product = await api.getProduct('prod-123');
* console.log(product.name, product.price);
*
*/
async getProduct(id) {
// ...
}
}
