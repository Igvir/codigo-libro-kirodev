const manager = new UserManager(database, authService);
const user = await manager.create({ email: 'test@example.com', ... });
await manager.update(user.id, { name: 'Nuevo Nombre' });
