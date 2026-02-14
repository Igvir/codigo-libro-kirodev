# Validar Conformidad con OpenAPI Spec

## Trigger: On File Save
## Pattern: src/api/routes/**/*.ts

Cuando se modifica un endpoint:

**Proceso:**
1. Leer openapi.yaml del proyecto
2. Encontrar la definición del endpoint modificado
3. Validar que el código cumple la spec:
- Parámetros correctos
- Responses con los códigos de status correctos
- Validaciones de input según el schema
- Headers requeridos

**Si hay discrepancia:**
Option 1: Actualizar el código para cumplir la spec
Option 2: Sugerir actualización de la spec si el cambio es intencional

**Output:**
