## Convenciones de Código

### Estructura de Archivos
- Componentes: PascalCase (ProductList.tsx)
- Hooks: camelCase con prefijo 'use' (useProducts.ts)
- Services: PascalCase con sufijo 'Service' (ProductService.ts)
- Types: PascalCase con sufijo 'Type' (ProductType.ts)
- Utils: camelCase descriptivo (formatPrice.ts)

### Patrones de Naming
- Componentes: Sustantivo descriptivo (UserProfile, OrderSummary)
- Hooks: Verbo + sustantivo (useProducts, useAuthentication)
- Functions: Verbo + objeto (createProduct, validateEmail)
- Variables: camelCase descriptivo (isLoading, userEmail)
- Constants: UPPER_SNAKE_CASE (MAX_RETRY_ATTEMPTS)

### Estructura de Componentes
```typescript
// Orden estándar para todos los componentes
interface Props {
// Props tipadas
}

export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
// 1. Hooks de estado
// 2. Hooks personalizados
// 3. Efectos
// 4. Handlers de eventos
// 5. Funciones auxiliares
// 6. Early returns
// 7. JSX principal
};
```

### Manejo de Errores
- Todos los async functions deben tener try-catch
- Errores se loggean con contexto específico
- UI muestra mensajes de error user-friendly
- Errores críticos se reportan a servicio de monitoreo
