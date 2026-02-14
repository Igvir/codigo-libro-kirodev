// src/services/userService.ts
import { db } from './db';

export async function findActiveUserByEmail(email: string) {
return db.users.findFirst({
where: {
email: email,
is_active: true //  Usa el nombre correcto de la columna
}
});
}
