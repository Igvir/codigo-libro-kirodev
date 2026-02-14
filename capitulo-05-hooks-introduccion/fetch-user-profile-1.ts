/**
* Obtiene el perfil completo de un usuario desde la base de datos
*
* Permite opcionalmente incluir campos privados (email, teléfono) que
* normalmente se omiten en respuestas públicas de API.
*
* @param userId - ID único del usuario en formato UUID
* @param includePrivate - Si incluir campos privados en la respuesta (default: false)
*
* @returns Objeto con datos del perfil del usuario
*
* @throws {Error} "userId required" si userId es vacío o undefined
* @throws {Error} "User not found" si no existe usuario con ese ID
*
* @example
* typescript
* // Perfil público
* const profile = await fetchUserProfile('user-123');
*
* // Perfil con datos privados (solo para admins)
* const fullProfile = await fetchUserProfile('user-123', true);
*
*
* @requirement 3.2.1 - User Profile Retrieval
*/
export async function fetchUserProfile(userId: string, includePrivate = false) {
// ... código
}
