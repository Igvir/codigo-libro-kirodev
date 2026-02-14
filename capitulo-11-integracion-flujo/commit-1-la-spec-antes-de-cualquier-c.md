# Commit 1: La spec (antes de cualquier código)
git add specs/feature-x.md
git commit -m "spec: define feature X requirements and contracts"

# Commit 2: Implementación generada + revisada
git add src/features/feature-x/
git commit -m "feat: implement feature X based on spec

- Generated with Kiro from specs/feature-x.md
- Manually reviewed and adjusted edge cases
- See spec for design decisions"

# Commit 3: Tests
git add tests/features/feature-x/
git commit -m "test: add tests for feature X

- Unit tests for core logic
- Integration tests for API endpoints
- Edge cases from spec covered"
