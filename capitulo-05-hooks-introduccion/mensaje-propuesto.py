feat(auth): add password validation with security requirements

Implements password validation ensuring minimum length of 8 characters,
at least one number, and at least one uppercase letter. Validation
provides specific error messages for each requirement.

Implements: Requirement 2.1 - Password Validation

Files changed:
- New PasswordValidator class with validate() method
- Exported from auth module
- Full test coverage including edge cases
