# /specs/IMPLEMENTATION_ORDER.md

## Orden de Implementación: Sistema de Inventario

### Fase 1: Fundamentos (Semana 1)
**Sin dependencias externas**

1. Configuración inicial del proyecto
- Setup de Vite + React + TypeScript
- Setup de Express + TypeScript
- PostgreSQL + Prisma
- Variables de entorno
- Responsable: Todo el equipo

2. Sistema de autenticación básico
- Spec: `/specs/auth-module.md`
- JWT tokens
- Registro y login
- Middleware de autenticación
- Responsable: María

3. UI Base Components
- Spec: `/specs/ui-components.md`
- Button, Input, Select, Modal, Toast
- Layout principal
- Responsable: Carlos

### Fase 2: Datos Maestros (Semana 2)
**Depende de: Autenticación**

4. Gestión de Proveedores
- Spec: `/specs/features/suppliers.md`
- CRUD completo
- Responsable: Ana

5. Gestión de Categorías
- Spec: `/specs/features/categories.md`
- CRUD con jerarquía
- Responsable: Carlos

6. Gestión de Bodegas/Almacenes
- Spec: `/specs/features/warehouses.md`
- CRUD completo
- Responsable: Luis

### Fase 3: Productos (Semana 3)
**Depende de: Categorías, Proveedores**

7. Gestión de Productos
- Spec: `/specs/features/products.md`
- CRUD + imágenes + variantes
- Responsable: Ana + Carlos

### Fase 4: Inventario (Semana 4)
**Depende de: Productos, Bodegas**

8. Control de Stock
- Spec: `/specs/features/inventory.md`
- Movimientos de inventario
- Alertas de stock bajo
- Responsable: Luis

9. Órdenes de Compra
- Spec: `/specs/features/purchase-orders.md`
- Crear órdenes
- Aprobar/rechazar
- Recibir mercancía
- Responsable: María

### Fase 5: Reportes y Análisis (Semana 5)
**Depende de: Todo lo anterior**

10. Dashboard de Analytics
- Spec: `/specs/features/dashboard.md`
- KPIs principales
- Gráficas
- Responsable: Carlos

11. Reportes Exportables
- Spec: `/specs/features/reports.md`
- PDF y Excel
- Historial de movimientos
- Valorización de inventario
- Responsable: Ana

### Bloqueadores Conocidos

**María bloquea a:** Luis (necesita autenticación para inventario)
**Ana bloquea a:** Luis (necesita productos para stock)
**Carlos bloquea a:** Todos (necesitan UI components)

### Hitos Importantes

- **Fin Semana 2:** Demo de datos maestros funcionando
- **Fin Semana 3:** Demo de productos completo con imágenes
- **Fin Semana 4:** Demo de flujo completo: crear orden  recibir  actualizar stock
- **Fin Semana 5:** Presentación final con reportes

### Reuniones de Sincronización

- **Daily standup:** 9:00 AM (15 min max)
- ¿Qué hiciste ayer?
- ¿Qué harás hoy?
- ¿Tienes bloqueadores?

- **Sync semanal:** Viernes 3:00 PM (1 hora)
- Demo de lo completado
- Revisar specs de siguiente semana
- Ajustar plan si es necesario

### Reglas de Integración

1. No hacer merge a `main` sin:
- [ ] Tests pasando
- [ ] Code review aprobado
- [ ] Spec actualizado si hubo cambios
- [ ] Notificación en Slack si afecta otros módulos

2. Si tu feature depende de algo que no existe:
- Crear datos mock temporales
- Documentar el contrato esperado
- Notificar al responsable de la dependencia

3. Si descubres que necesitas cambiar un contrato compartido:
- STOP, no cambies directamente
- Crear propuesta en `/specs/proposals`
- Discutir en Slack
- Consenso antes de implementar
