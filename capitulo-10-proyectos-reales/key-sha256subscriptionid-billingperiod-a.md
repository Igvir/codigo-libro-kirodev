### Verificación
1. Antes de procesar, consultar cache de idempotency keys
2. Si existe y fue exitoso: retornar resultado cacheado
3. Si existe y falló con error retriable: permitir reprocesar
4. Si existe y falló con error definitivo: retornar error cacheado

## Auditoría (PCI-DSS)
- Log estructurado JSON
- Campos obligatorios: timestamp, action, subscription_id,
amount, result, idempotency_key, request_id
- NUNCA loggear: card_number, cvv, full_name
- Retención: 7 años mínimo
- Integridad: hash encadenado por sesión
