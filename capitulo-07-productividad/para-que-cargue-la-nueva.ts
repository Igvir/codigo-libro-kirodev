Tú: Muéstrame la estructura de la tabla users

Kiro: [Consulta vía MCP PostgreSQL]

La tabla `users` tiene estas columnas:
- id: uuid (primary key)
- email: varchar(255) (unique, not null)
- username: varchar(50) (unique, not null)
- created_at: timestamp
- updated_at: timestamp
- is_active: boolean (default true)

Tú: Genera una función para buscar usuarios activos por email

Kiro: [Genera código usando los nombres EXACTOS de las columnas]
