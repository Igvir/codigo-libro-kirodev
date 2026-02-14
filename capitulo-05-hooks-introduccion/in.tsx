Performance & A11y Report: ProductCard.tsx

Line 12: Inline function in onClick prop
Problema: Se crea nueva función en cada render
Impacto: Re-renders innecesarios en componentes hijos

Actual:
<button onClick={() => handleClick(product.id)}>

Mejora:
const handleProductClick = useCallback(() => {
handleClick(product.id);
}, [product.id]);

<button onClick={handleProductClick}>

Line 15: Style object created in render
Problema: Nuevo objeto en cada render causa re-paint
Impacto: Performance degradada en listas largas

Actual:
<div style={{ padding: '1rem', margin: '0.5rem' }}>

Mejora:
// Fuera del componente
const cardStyles = { padding: '1rem', margin: '0.5rem' };

<div style={cardStyles}>

Line 20: Librería completa importada
Problema: Importando toda lodash en vez de función específica
Impacto: +70KB en bundle

Actual:
import _ from 'lodash';
const sorted = _.sortBy(items, 'name');

Mejora:
import sortBy from 'lodash/sortBy';
const sorted = sortBy(items, 'name');

Line 25-30: useCallback usado correctamente
Line 35: Componente memoizado apropiadamente
