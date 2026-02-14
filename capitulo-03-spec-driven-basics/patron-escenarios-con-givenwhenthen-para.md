### Lógica de Aprobación de Gastos

**Escenario 1: Gasto menor aprobación automática**
- Given: Usuario con rol Employee
- And: Gasto de $150 en categoría "Office Supplies"
- And: Usuario no ha excedido límite mensual ($500)
- When: Usuario envía solicitud de reembolso
- Then: Sistema aprueba automáticamente
- And: Notifica a manager por email
- And: Actualiza límite mensual restante

**Escenario 2: Gasto mayor requiere aprobación**
- Given: Usuario con rol Employee
- And: Gasto de $1,200 en categoría "Travel"
- When: Usuario envía solicitud de reembolso
- Then: Sistema marca como "Pending Approval"
- And: Notifica a manager inmediato
- And: Si no hay respuesta en 48h, escala a director
- And: Bloquea nuevas solicitudes hasta resolución

**Escenario 3: Gasto rechazado**
- Given: Manager revisa solicitud pendiente
- And: Solicitud no cumple política de gastos
- When: Manager hace click en "Reject" con razón
- Then: Sistema marca como "Rejected"
- And: Notifica a empleado con razón específica
- And: Restaura límite mensual si aplicaba
- And: Permite re-envío con correcciones
