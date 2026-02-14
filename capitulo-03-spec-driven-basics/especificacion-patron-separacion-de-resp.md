## Arquitectura de Componentes

### Capa de Presentación (UI Components)
- ProductList: Muestra lista paginada de productos
- ProductCard: Muestra información individual de producto
- ProductFilters: Controles de filtrado y búsqueda
- ProductForm: Formulario de creación/edición

### Capa de Lógica de Negocio (Custom Hooks)
- useProducts: Gestiona estado de productos y operaciones CRUD
- useProductFilters: Maneja lógica de filtrado y búsqueda
- useProductValidation: Valida datos de productos
- useProductPersistence: Maneja sincronización con backend

### Capa de Datos (Services)
- ProductService: API calls para operaciones de productos
- CacheService: Gestiona cache local de productos
- ValidationService: Reglas de validación de negocio
- NotificationService: Maneja notificaciones de éxito/error

### Capa de Utilidades (Utils)
- formatters: Formateo de precios, fechas, etc.
- validators: Validaciones de entrada
- constants: Constantes de la aplicación
- types: Definiciones TypeScript
