# Sync con GitLab al completar tareas

## Trigger: On Agent Turn Complete

Cuando completo una tarea de spec:

1. Verifica si el spec está asociado a un issue de GitLab
(busca "gitlab: #123" en el frontmatter del spec)

2. Si hay issue asociado:
- Agrega comentario con progreso
- Si todas las tareas completadas: cambia status a "In Review"

3. Formato del comentario:
" Progreso automático:
Tarea completada: [nombre de la tarea]
Progreso total: X/Y tareas (Z%)"
