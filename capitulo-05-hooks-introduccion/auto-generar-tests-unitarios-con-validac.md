# Auto-generar Tests Unitarios con Validación de Specs

## Trigger: On File Save
## Pattern: src/**/*.ts

**PASO 1: Verificar si existe una spec relacionada**

Antes de generar tests, busca si este archivo es parte de una spec:
1. Usa el contexto `#spec` para listar specs disponibles
2. Si el archivo modificado está relacionado con una spec (por path o por mención en
