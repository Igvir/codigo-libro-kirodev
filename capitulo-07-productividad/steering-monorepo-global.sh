# Steering: Monorepo Global

## Estructura
Este es un monorepo con:
- packages/web-app: Next.js frontend
- packages/mobile-app: React Native app
- packages/shared: código compartido entre web y mobile

## Shared Code
Cualquier código que web Y mobile necesitan va a packages/shared.
Ejemplos: tipos, utils, hooks reusables.

NO dupliques código. Si ves patrón repetido en web y mobile,
refactoriza a shared.

## Versionado
Usamos Changesets para versioning.
Después de cambios, corre: npm run changeset
