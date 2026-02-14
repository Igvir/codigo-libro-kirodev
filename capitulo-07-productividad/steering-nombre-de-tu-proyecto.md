# Steering: [Nombre de tu proyecto]

## Stack Tecnológico

[Pega aquí tu stack del Paso 2]

## Convenciones de Código

### Nombres
- Componentes: [ej: PascalCase]
- Funciones: [ej: camelCase]
- Constantes: [ej: UPPER_SNAKE_CASE]

### Imports
[ej: Imports absolutos desde src/ usando alias @/]

## Patrones Preferidos

[De tu auditoría del Paso 1, agrega 2-3 patterns que Kiro debería seguir]

Ejemplo:
- Manejo de errores: Siempre con try-catch en funciones async
- API calls: Usar fetch, no axios
- Forms: Usar React Hook Form con Zod para validación

## NO Hacer

[De tu auditoría del Paso 1, agrega 2-3 cosas que Kiro hizo mal]

Ejemplo:
- NO usar `any` en TypeScript
- NO crear componentes dentro de componentes (mover afuera)
- NO hacer fetch en useEffect (usar SWR o React Query)
