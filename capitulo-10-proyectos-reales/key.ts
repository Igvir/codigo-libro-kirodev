// Mi validación: ¿Este código realmente cumple los invariantes?

describe('Payment Retry Service - Critical Invariants', () => {
describe('Invariant 1: Never double-charge', () => {
it('should return cached result for duplicate idempotency key', async () => {
const key = generateIdempotencyKey(subscription, period, 1);

// First call succeeds
const firstResult = await service.processPayment(paymentData, key);
expect(firstResult.status).toBe('success');

// Second call with same key returns cached result
const secondResult = await service.processPayment(paymentData, key);
expect(secondResult).toEqual(firstResult);
expect(secondResult.fromCache).toBe(true);

// Verify Stripe was called only once
expect(stripeMock.charges.create).toHaveBeenCalledTimes(1);
});

it('should generate different keys for different attempts', () => {
const key1 = generateIdempotencyKey(subscription, period, 1);
const key2 = generateIdempotencyKey(subscription, period, 2);

expect(key1).not.toBe(key2);
});

it('should handle race condition with distributed lock', async () => {
const key = generateIdempotencyKey(subscription, period, 1);

// Simulate two concurrent requests
const [result1, result2] = await Promise.all([
