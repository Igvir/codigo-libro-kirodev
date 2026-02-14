Tú: Esta query está tardando 8 segundos en producción:

SELECT * FROM orders
WHERE user_id = '...'
ORDER BY created_at DESC;

Kiro: [Ejecuta EXPLAIN ANALYZE via MCP]

El problema es claro:

EXPLAIN ANALYZE muestra:
- Seq Scan on orders (cost=0.00..45892.00)
- Rows: 1,234,567
- Actual time: 7842.123ms

No hay índice en `user_id`. La solución:

CREATE INDEX idx_orders_user_id_created
ON orders(user_id, created_at DESC);

Esto cambiará el Seq Scan a Index Scan, reduciendo
el tiempo a ~10-50ms.

¿Quieres que genere la migración completa?
