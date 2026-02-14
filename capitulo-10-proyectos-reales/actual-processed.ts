service.processPayment(paymentData, key),
service.processPayment(paymentData, key),
]);

// Only one should actually process
const actualProcessed = [result1, result2].filter(r => !r.fromCache);
expect(actualProcessed.length).toBe(1);

// Both should have same final result
expect(result1.transactionId).toBe(result2.transactionId);
});
});

describe('Invariant 2: Always log before payment', () => {
it('should log BEFORE calling payment provider', async () => {
const callOrder: string[] = [];

auditLogMock.log.mockImplementation(() => {
callOrder.push('audit');
});

stripeMock.charges.create.mockImplementation(() => {
callOrder.push('stripe');
return Promise.resolve({ id: 'ch_123' });
});

await service.processPayment(paymentData, idempotencyKey);

expect(callOrder).toEqual(['audit', 'stripe']);
});

it('should abort payment if audit log fails', async () => {
auditLogMock.log.mockRejectedValue(new Error('Audit system down'));

await expect(
service.processPayment(paymentData, idempotencyKey)
).rejects.toThrow(AuditRequiredException);

expect(stripeMock.charges.create).not.toHaveBeenCalled();
});
});
});
