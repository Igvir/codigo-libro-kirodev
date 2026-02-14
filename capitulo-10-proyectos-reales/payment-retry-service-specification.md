# Payment Retry Service Specification

## Invariantes Críticos (NO NEGOCIABLES)
1. NUNCA procesar un pago dos veces
2. SIEMPRE loggear antes de cualquier operación de pago
3. SIEMPRE verificar idempotency key antes de procesar
4. Circuit breaker DEBE activarse tras 5 fallos consecutivos

## Estrategia de Reintentos

### Backoff Exponencial
- Intento 1: inmediato
- Intento 2: 1 minuto
- Intento 3: 5 minutos
- Intento 4: 30 minutos
- Intento 5: 2 horas
- Intento 6: 24 horas (último)

### Errores Retriables
- NETWORK_ERROR
- TIMEOUT
- RATE_LIMITED
- TEMPORARY_FAILURE

### Errores NO Retriables (fallar inmediatamente)
- CARD_DECLINED
- INSUFFICIENT_FUNDS
- INVALID_CARD
- FRAUDULENT
- AUTHENTICATION_REQUIRED

## Idempotencia

### Generación de Idempotency Key
