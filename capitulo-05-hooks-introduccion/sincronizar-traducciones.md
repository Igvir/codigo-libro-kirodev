# Sincronizar Traducciones

## Trigger: On File Save
## Pattern: src/locales/es/*.json

Cuando se actualiza el archivo de idioma base (español):

**Objetivo:** Mantener todos los idiomas sincronizados con nuevas claves.

**Proceso:**

1. **Identificar cambios:**
- Comparar archivo actual con versión anterior (git diff)
- Detectar claves nuevas, modificadas, o eliminadas

2. **Para cada idioma disponible** (en, pt, fr, etc.):

**Claves nuevas:**
- Agregar la clave con valor `[NEEDS_TRANSLATION]`
- Agregar comentario con el texto original en español
- Actualizar metadata de _pendingTranslations

**Claves modificadas:**
- Marcar como `[UPDATED - NEEDS_REVIEW]`
- Mantener la traducción anterior pero flaggearla

**Claves eliminadas:**
- Remover de todos los idiomas
- Logguear en changelog de traducciones

3. **Generar reporte:**
- Crear/actualizar `translations-status.md`
- Listar claves pendientes por idioma
- Calcular porcentaje de completitud

4. **Si integración con servicio de traducción existe:**
- Enviar claves nuevas a Lokalise/Crowdin/etc
- Crear tasks para traductores
