export class PasswordValidator {
validate(password: string): { valid: boolean; error?: string } {
if (password.length < 8) {
return {
valid: false,
error: 'Password must be at least 8 characters'
};
}

if (!/\d/.test(password)) {
return {
valid: false,
error: 'Password must contain at least one number'
};
}

if (!/[A-Z]/.test(password)) {
return {
valid: false,
error: 'Password must contain at least one uppercase letter'
};
}

return { valid: true };
}
}
