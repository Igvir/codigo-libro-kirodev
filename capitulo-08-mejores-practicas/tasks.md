# tasks.md (con cada tarea ultra-específica)

1. Crear src/types/Product.ts con interface Product exactamente como:
interface Product {
id: string;
name: string;
price: number;
inStock: boolean;
}

2. Crear src/services/product.ts con:
- getProducts(): Promise<Product[]>
- getProductById(id: string): Promise<Product>
[firmas de función específicas]
