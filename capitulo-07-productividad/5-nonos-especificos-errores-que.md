## Lecciones Aprendidas (No Hacer)

### NO uses bcrypt directamente
Usamos bcryptjs (versión JS pura) por compatibilidad con serverless.
bcrypt nativo rompe en Vercel.

### NO hagas queries N+1
Ya tuvimos incident de performance por esto.
Usa Prisma include para cargar relaciones en una query.

### NO expongas IDs de base de datos
Usa UUIDs públicos. IDs secuenciales revelan volumen de negocio.
