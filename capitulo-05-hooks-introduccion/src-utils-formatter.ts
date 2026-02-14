// src/utils/formatter.ts

/**
* Formatea un precio en pesos mexicanos
*/
export function formatPrice(amount: number): string {
if (amount < 0) {
throw new Error('Amount cannot be negative');
}

return new Intl.NumberFormat('es-MX', {
style: 'currency',
currency: 'MXN'
}).format(amount);
}

/**
* Formatea una fecha relativa (ej: "hace 2 horas")
*/
export function formatRelativeTime(date: Date): string {
const now = new Date();
const diffMs = now.getTime() - date.getTime();
const diffMins = Math.floor(diffMs / 60000);

if (diffMins < 1) return 'ahora mismo';
if (diffMins < 60) return `hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;

const diffHours = Math.floor(diffMins / 60);
if (diffHours < 24) return `hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;

const diffDays = Math.floor(diffHours / 24);
return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
}
