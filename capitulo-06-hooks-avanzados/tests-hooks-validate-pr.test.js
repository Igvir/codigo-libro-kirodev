// tests/hooks/validate-pr.test.js

describe('validate-pr hook', () => {
it('bloquea PR sin descripción', async () => {
const pr = createMockPR({ description: '' });
const result = await runHook('validate-pr', pr);

expect(result.blocked).toBe(true);
expect(result.reason).toContain('PR description is required');
});

it('permite PR con checklist completo', async () => {
const pr = createMockPR({
description: '## Checklist\n- [x] Tests added\n- [x] Docs updated'
});

const result = await runHook('validate-pr', pr);
expect(result.blocked).toBe(false);
});
});
