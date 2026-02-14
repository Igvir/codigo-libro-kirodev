const result = validator.validate('Short1');

expect(result.valid).toBe(false);
expect(result.error).toBe('Password must be at least 8 characters');
});

// Validates: Requirement 2.1.2
it('debe rechazar password sin números con mensaje específico', () => {
const result = validator.validate('NoNumbers');

expect(result.valid).toBe(false);
expect(result.error).toBe('Password must contain at least one number');
});

// Validates: Requirement 2.1.3
it('debe rechazar password sin mayúsculas con mensaje específico', () => {
const result = validator.validate('lowercase123');

expect(result.valid).toBe(false);
expect(result.error).toBe('Password must contain at least one uppercase letter');
});

// Validates: Requirement 2.1.4
it('debe aceptar password que cumple todos los requisitos', () => {
const result = validator.validate('ValidPass123');

expect(result.valid).toBe(true);
expect(result.error).toBeUndefined();
});
});

describe('PasswordValidator - Implementation Tests', () => {
describe('edge cases', () => {
it('debe manejar password exactamente de 8 caracteres', () => {
const result = validator.validate('Valid123');
expect(result.valid).toBe(true);
});

it('debe manejar password muy largo', () => {
const longPassword = 'A1' + 'a'.repeat(100);
const result = validator.validate(longPassword);
expect(result.valid).toBe(true);
});

it('debe manejar múltiples números', () => {
const result = validator.validate('Numbers123456');
expect(result.valid).toBe(true);
});

it('debe manejar múltiples mayúsculas', () => {
const result = validator.validate('UPPERCASE123');
expect(result.valid).toBe(true);
});
});

describe('validaciones de entrada', () => {
it('debe manejar string vacío', () => {
const result = validator.validate('');
expect(result.valid).toBe(false);
});

it('debe manejar solo espacios', () => {
const result = validator.validate(' ');
expect(result.valid).toBe(false);
});
});
});
});
