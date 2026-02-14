it('should prevent deletion with pending orders', async () => {
// Arrange
const product = await createProduct();
await createPendingOrder(product.id);

// Act & Assert
await expect(
service.softDelete(product.id)
).rejects.toThrow(ProductHasPendingOrdersException);
});

it('should count abandoned carts as pending', async () => {
// Arrange
const product = await createProduct();
await createAbandonedCart(product.id, hoursAgo(12));

// Act & Assert
await expect(
service.softDelete(product.id)
).rejects.toThrow(ProductHasPendingOrdersException);
});

it('should allow deletion with old abandoned carts', async () => {
// Arrange
const product = await createProduct();
await createAbandonedCart(product.id, hoursAgo(30));

// Act & Assert
await expect(
service.softDelete(product.id)
).resolves.toBeDefined();
});
});
});
