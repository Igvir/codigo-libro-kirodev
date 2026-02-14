Tú: Necesito un reporte de los productos más vendidos por
categoría en el último mes. Muéstrame primero qué
datos tenemos disponibles.

Kiro: [Consulta estructura y datos de ejemplo]

Basándome en el schema y datos existentes, esta query
te dará el reporte:

SELECT
c.name as categoria,
p.name as producto,
COUNT(oi.id) as unidades_vendidas,
SUM(oi.quantity * oi.unit_price) as revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN categories c ON p.category_id = c.id
JOIN orders o ON oi.order_id = o.id
WHERE o.created_at >= NOW() - INTERVAL '30 days'
AND o.status = 'completed'
GROUP BY c.name, p.name
ORDER BY c.name, unidades_vendidas DESC;

¿Quieres que la ejecute para verificar los resultados?
