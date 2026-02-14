describe('ProductService - Business Rules', () => {
describe('SKU Uniqueness', () => {
it('should allow reusing SKU from inactive product', async () => {
// Arrange
const inactiveProduct = await createProduct({ isActive: false });
const existingSku = inactiveProduct.variants[0].sku;

// Act & Assert
await expect(
service.create({
...validProductData,
variants: [{ ...variantData, sku: existingSku }]
})
).resolves.toBeDefined();
});

it('should reject duplicate SKU from active product', async () => {
// Arrange
const activeProduct = await createProduct({ isActive: true });
const existingSku = activeProduct.variants[0].sku;

// Act & Assert
await expect(
service.create({
...validProductData,
variants: [{ ...variantData, sku: existingSku }]
})
).rejects.toThrow(DuplicateSkuException);
});
});

describe('Soft Delete', () => {
