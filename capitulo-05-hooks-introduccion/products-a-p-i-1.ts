export class ProductsAPI {
async listProducts(params) {
const { page = 1, limit = 20, category, search } = params;

if (limit > 100) {
throw new Error('Limit cannot exceed 100');
}

const products = await this.db.query(/*...*/);
return {
items: products,
page,
total: products.length,
hasMore: products.length === limit
};
}

async getProduct(id) {
if (!id) throw new Error('Product ID required');
const product = await this.db.findOne({ id });
if (!product) throw new Error('Product not found');
return product;
}
}
