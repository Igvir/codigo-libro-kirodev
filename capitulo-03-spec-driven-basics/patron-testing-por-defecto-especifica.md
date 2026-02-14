## Estrategia de Testing

### Unit Tests (Jest + React Testing Library)
- Todos los hooks personalizados deben tener tests
- Todos los services deben tener tests
- Componentes complejos deben tener tests de comportamiento
- Utilities y validators deben tener tests exhaustivos

### Integration Tests
- Flujos completos de usuario (crear producto, editar, eliminar)
- Interacciones entre componentes relacionados
- Manejo de estados de error y loading

### Test Coverage
- Mínimo 80% coverage para lógica de negocio
- 100% coverage para utilities y validators
- Tests deben ser determinísticos (no flaky)

### Test Structure
```typescript
describe('useProducts hook', () => {
describe('when loading products', () => {
it('should show loading state initially', () => {
// Test implementation
});

it('should handle successful data fetch', () => {
// Test implementation
});

it('should handle API errors gracefully', () => {
// Test implementation
});
});
});
```
