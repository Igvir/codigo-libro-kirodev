export async function fetchUserProfile(userId: string, includePrivate = false) {
if (!userId) throw new Error('userId required');
const data = await db.users.findOne({ id: userId });
if (!data) throw new Error('User not found');
return includePrivate ? data : omitPrivateFields(data);
}
