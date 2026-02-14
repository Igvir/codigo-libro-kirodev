// /src/backend/services/SupplierService.stub.ts
// STUB: Implementación temporal hasta que el módulo real esté listo

export class SupplierServiceStub {

// Retorna datos fake pero con la estructura correcta
static async getById(id: string) {
// Simular delay de red
await new Promise(resolve => setTimeout(resolve, 100));

return {
id,
code: 'SUPP-2025-0001',
name: 'Proveedor de Prueba S.A.',
email: 'contacto@proveedor.com',
phone: '+52 55 1234 5678',
status: 'active',
createdAt: new Date().toISOString()
};
}

static async list(filters: any) {
await new Promise(resolve => setTimeout(resolve, 100));

return {
suppliers: [
{
id: '1',
code: 'SUPP-2025-0001',
name: 'Proveedor A',
email: 'a@proveedor.com',
status: 'active'
},
{
id: '2',
code: 'SUPP-2025-0002',
name: 'Proveedor B',
email: 'b@proveedor.com',
status: 'active'
}
],
meta: {
page: 1,
limit: 20,
total: 2,
totalPages: 1
}
};
}
}
