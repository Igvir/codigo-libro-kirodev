# Steering: Proyecto E-Commerce

## Stack Tecnológico
- Frontend: React 18 con TypeScript
- Backend: Node.js con Express
- Database: PostgreSQL 14
- ORM: Prisma
- Testing: Jest + React Testing Library

## Convenciones de Código

### Nombres
- Componentes React: PascalCase (UserProfile.tsx)
- Hooks custom: use + PascalCase (useShoppingCart.ts)
- Archivos de utils: camelCase (formatCurrency.ts)
- Constantes: UPPER_SNAKE_CASE

### Estructura de Archivos
Usar esta estructura:
src/
components/ # React components
hooks/ # Custom hooks
services/ # API calls y lógica de negocio
utils/ # Funciones helper puras
types/ # TypeScript type definitions

## Patrones Preferidos

### Estado de UI
Prefiero Context API para estado global simple.
Solo usa Zustand si el estado es verdaderamente complejo (>5 contextos).

### Manejo de Errores
Siempre usa try-catch en funciones async.
Crea errores custom que extiendan Error: PaymentError, ValidationError, etc.

### Testing
- Cada componente tiene .test.tsx en mismo directorio
- Tests unitarios para utils
- Integration tests para flujos críticos (checkout, payment)
- Evita snapshots (se rompen mucho, poco valor)

## Decisiones de Arquitectura

### API Design
- RESTful, no GraphQL
- Versionado en URL: /api/v1/products
- Siempre retorna JSON con estructura estándar

### Database
- Migrations viven en prisma/migrations/
- Nunca modifiques migrations aplicadas
- Seeds para datos de test: npm run db:seed

## Cosas que NO hacer
- NO usar any en TypeScript (usa unknown si es necesario)
- NO hacer queries directas a DB desde componentes (usar services)
- NO commitear console.log en código de producción
- NO usar var (solo const y let)
