# Especificación de Integración: Stripe Payments

## Contexto
Necesitamos procesar pagos de suscripciones y compras one-time usando Stripe.

## Credentials y Configuración

**Ambientes:**
- Development: usar Stripe test keys
- Production: usar Stripe live keys

**Webhooks:**
- URL: `https://api.tuapp.com/webhooks/stripe`
- Eventos a escuchar:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

## Modelo de Datos Local

Necesitamos almacenar referencias a objetos de Stripe:

```sql
CREATE TABLE stripe_customers (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
user_id UUID REFERENCES users(id),
stripe_customer_id VARCHAR(50) UNIQUE NOT NULL,
email VARCHAR(100),
created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE stripe_payment_intents (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
order_id UUID REFERENCES orders(id),
stripe_payment_intent_id VARCHAR(50) UNIQUE NOT NULL,
amount INTEGER NOT NULL, -- en centavos
currency VARCHAR(3) DEFAULT 'mxn',
status VARCHAR(50), -- succeeded, failed, pending
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE stripe_subscriptions (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
user_id UUID REFERENCES users(id),
stripe_subscription_id VARCHAR(50) UNIQUE NOT NULL,
stripe_customer_id VARCHAR(50),
plan VARCHAR(50), -- basic, pro, enterprise
status VARCHAR(50), -- active, canceled, past_due
current_period_start TIMESTAMP,
current_period_end TIMESTAMP,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);
```
```
## Flujo 1: Pago One-Time

### Paso 1: Cliente inicia checkout
```typescript
// Frontend: CheckoutPage.tsx

async function handleCheckout() {
// 1. Crear payment intent en nuestro backend
const response = await api.post('/api/payments/create-intent', {
amount: cartTotal,
currency: 'mxn',
orderId: currentOrder.id
});

const { clientSecret } = response.data.data;

// 2. Mostrar formulario de Stripe Elements
const stripe = await loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY);
const elements = stripe.elements({ clientSecret });

const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');

// 3. Confirmar pago
const { error } = await stripe.confirmPayment({
elements,
confirmParams: {
return_url: 'https://tuapp.com/order-confirmation'
}
});

if (error) {
showError(error.message);
}
}
```

### Paso 2: Backend crea Payment Intent
```typescript
// Backend: PaymentController.ts

async createPaymentIntent(req: Request, res: Response) {
const { amount, currency, orderId } = req.body;
const userId = req.user.userId;

// 1. Obtener o crear Stripe Customer
let stripeCustomer = await db.stripeCustomers.findOne({ userId });

if (!stripeCustomer) {
const customer = await stripe.customers.create({
email: req.user.email,
metadata: { userId }
});

stripeCustomer = await db.stripeCustomers.create({
userId,
stripeCustomerId: customer.id,
email: req.user.email
});
}

// 2. Crear Payment Intent
const paymentIntent = await stripe.paymentIntents.create({
amount: amount * 100, // Convertir a centavos
currency,
customer: stripeCustomer.stripeCustomerId,
metadata: {
orderId,
userId
},
automatic_payment_methods: {
enabled: true
}
});

// 3. Guardar referencia local
await db.stripePaymentIntents.create({
orderId,
stripePaymentIntentId: paymentIntent.id,
amount: paymentIntent.amount,
currency: paymentIntent.currency,
status: paymentIntent.status
});

// 4. Retornar client secret
res.json({
success: true,
data: {
clientSecret: paymentIntent.client_secret
}
});
}
```
```
### Paso 3: Webhook confirma pago
```typescript
// Backend: WebhookController.ts

async handleStripeWebhook(req: Request, res: Response) {
const sig = req.headers['stripe-signature'];

// 1. Verificar firma del webhook
let event;
try {
event = stripe.webhooks.constructEvent(
req.body,
sig,
process.env.STRIPE_WEBHOOK_SECRET
);
} catch (err) {
return res.status(400).send(`Webhook Error: ${err.message}`);
}

// 2. Manejar evento
switch (event.type) {
case 'payment_intent.succeeded':
await handlePaymentSuccess(event.data.object);
break;

case 'payment_intent.payment_failed':
await handlePaymentFailure(event.data.object);
break;
}

res.json({ received: true });
}

async function handlePaymentSuccess(paymentIntent) {
// 1. Actualizar estado local
await db.stripePaymentIntents.update({
where: { stripePaymentIntentId: paymentIntent.id },
data: { status: 'succeeded', updatedAt: new Date() }
});

// 2. Actualizar orden
const { orderId } = paymentIntent.metadata;
await db.orders.update({
where: { id: orderId },
data: {
status: 'paid',
paidAt: new Date()
}
});

// 3. Enviar email de confirmación
await EmailService.sendOrderConfirmation(orderId);

// 4. Loguear para auditoría
logger.info('Payment succeeded', {
paymentIntentId: paymentIntent.id,
orderId,
amount: paymentIntent.amount
});
}
```
```
## Manejo de Errores

### Errores de Stripe
```typescript
try {
const paymentIntent = await stripe.paymentIntents.create({...});
} catch (error) {
if (error.type === 'StripeCardError') {
// Error de tarjeta (fondos insuficientes, tarjeta rechazada, etc.)
throw new AppError(
'Pago rechazado por el banco',
400,
'payment_declined',
{ stripeError: error.message }
);
} else if (error.type === 'StripeInvalidRequestError') {
// Parámetros inválidos
logger.error('Invalid Stripe request', { error });
throw new AppError(
'Error en la solicitud de pago',
500,
'payment_error'
);
} else {
// Otro error de Stripe
logger.error('Stripe error', { error });
throw new AppError(
'Error al procesar el pago',
500,
'payment_error'
);
}
}
```
```
### Errores de Webhook
- Si el webhook falla, Stripe lo reintentará automáticamente
- Implementar idempotencia: verificar que el evento no fue procesado antes

```typescript
async function handlePaymentSuccess(paymentIntent) {
// Verificar si ya procesamos este evento
const existingRecord = await db.stripePaymentIntents.findOne({
where: {
stripePaymentIntentId: paymentIntent.id,
status: 'succeeded'
}
});

if (existingRecord) {
logger.info('Payment already processed', {
paymentIntentId: paymentIntent.id
});
return; // Ya procesado, no hacer nada
}

// Continuar con el procesamiento...
}
```
```
## Testing

### Test con Tarjetas de Prueba
Stripe proporciona tarjetas de prueba para diferentes escenarios:

```typescript
// tests/integration/stripe-payments.test.ts

describe('Stripe Payments', () => {

it('should process successful payment', async () => {
const response = await request(app)
.post('/api/payments/create-intent')
.send({
amount: 100,
currency: 'mxn',
orderId: testOrder.id
});

expect(response.body.success).toBe(true);
expect(response.body.data.clientSecret).toBeDefined();

// Confirmar pago con tarjeta de prueba exitosa
const paymentIntent = await stripe.paymentIntents.confirm(
response.body.data.clientSecret,
{
payment_method: 'pm_card_visa' // Tarjeta de prueba exitosa
}
);

expect(paymentIntent.status).toBe('succeeded');
});

it('should handle declined payment', async () => {
// ... crear intent ...

const paymentIntent = await stripe.paymentIntents.confirm(
clientSecret,
{
payment_method: 'pm_card_chargeDeclined' // Tarjeta rechazada
}
);

expect(paymentIntent.status).toBe('requires_payment_method');
});
});
```
```
## Monitoreo y Logs

### Eventos a loguear
- Todos los payment intents creados
- Todos los webhooks recibidos
- Todos los errores de Stripe
- Discrepancias entre Stripe y nuestra BD

```typescript
// Ejemplo de logging estructurado
logger.info('Payment intent created', {
paymentIntentId: paymentIntent.id,
orderId,
amount,
currency,
userId
});

logger.error('Stripe webhook failed', {
event: event.type,
error: error.message,
paymentIntentId: event.data.object.id
});
```
```
### Dashboard de Monitoreo
- Crear vista en admin panel mostrando:
- Pagos pendientes de confirmación (>5 min)
- Webhooks fallidos en las últimas 24h
- Discrepancias entre Stripe y BD

## Checklist de Deployment

Antes de ir a producción:
- [ ] Cambiar a live keys de Stripe
- [ ] Configurar webhook en Stripe dashboard apuntando a URL de producción
- [ ] Verificar que el endpoint del webhook está público (no requiere autenticación)
- [ ] Configurar STRIPE_WEBHOOK_SECRET con el secret del webhook de producción
- [ ] Probar con pequeñas transacciones reales
- [ ] Configurar alertas para pagos fallidos
- [ ] Documentar proceso de reconciliación manual si algo sale mal
