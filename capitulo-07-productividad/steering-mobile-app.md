# Steering: Mobile App

## Contexto
Esta es la app mobile (React Native).
Comparte código con web vía packages/shared.

## Mobile-Specific
Features que NO van a shared (solo mobile):
- Push notifications (react-native-firebase)
- Native modules (camera, location)
- Mobile-specific navigation (react-navigation)

## Performance
Mobile tiene constraints de performance más estrictos que web.
- Lazy load screens pesadas
- Optimiza imágenes agresivamente
- Cache todo lo posible
