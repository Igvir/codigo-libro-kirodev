# Steering: Módulo de Pagos

CRÍTICO: Este módulo procesa dinero real.

## Reglas Estrictas
- TODO cambio requiere tests de integración
- NO uses dependencias nuevas sin aprobación de security team
- Logs deben incluir requestId para auditoría
- Nunca logguees información de tarjetas (ni parcial)

## Validaciones Requeridas
Toda función que toque amounts debe:
1. Validar que amount > 0
2. Validar que amount es número con máximo 2 decimales
3. Verificar que currency es válido (USD, EUR, MXN)

## Testing
Además de unit tests, requiere:
- Integration tests con Stripe test mode
- Tests de edge cases: refunds, failures, timeouts
- Performance tests (p95 < 500ms)

## Contactos
- Owner: @senior-backend
- Security lead: @security-team
- Ante dudas sobre compliance: revisar docs/payments/compliance.md
