# Performance Audit en Componentes React

## Trigger: On File Save
## Pattern: src/components/**/*.{tsx,jsx}

Cuando se guarda un componente React:

**Objetivo:** Detectar anti-patterns de performance tempranamente.

**Checks a realizar:**

1. **Renders innecesarios:**
- Props que son funciones inline: `onClick={() => ...}`
- Objetos/arrays creados en render: `style={{ ... }}`
- Props que cambian en cada render sin memoización

2. **Bundle size:**
- Imports completos de librerías: `import _ from 'lodash'`
- Componentes pesados que deberían ser lazy: `import HeavyChart from '...'`
- Imágenes sin optimizar en imports

3. **Hooks mal usados:**
- useEffect sin dependencies o con dependencies incorrectas
- useState para valores derivados (deberían ser useMemo)
- useCallback/useMemo usados innecesariamente

4. **Accesibilidad:**
- Elementos clickeables sin keyboard support
- Imágenes sin alt text
- Contraste de colores insuficiente en styles inline

**Para cada problema:**
- Señalar la línea específica
- Explicar por qué es problemático
- Mostrar código mejorado
