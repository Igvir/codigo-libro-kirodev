3. **Mantener otras secciones intactas:**
- NO modificar secciones de instalación, getting started, etc.
- SOLO actualizar la sección API Reference

4. **Si README.md no existe:**
- Crear uno básico con:
- Título del proyecto (del package.json)
- Descripción
- Instalación
- API Reference generada

**Formato de output:**

```markdown
## API Reference

### createUser

Crea un nuevo usuario en el sistema con validación de email y password.

**Tipo:** `function`

**Firma:**
```typescript
function createUser(data: CreateUserData): Promise<User>
