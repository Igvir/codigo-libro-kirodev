describe('Spec Compliance - Requirement 1.2: User Registration', () => {
// Validates: Requirement 1.2.3
it('debe rechazar email inválido con error "Invalid email format"', async () => {
const invalidEmails = ['notanemail', 'missing@domain', '@nodomain.com'];

for (const email of invalidEmails) {
await expect(
registerUser({ email, password: 'valid123' })
).rejects.toThrow('Invalid email format');
}
});
});
