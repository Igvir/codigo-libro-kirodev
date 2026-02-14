## Arquitectura

### Data Fetching
- Server Components para data que no cambia (product listings)
- Client Components + SWR para data dinámica (user profile)
- NO uses useEffect para fetching

### Error Boundaries
Toda página debe tener ErrorBoundary.
Usa componente compartido: src/components/ErrorBoundary.tsx
