// tests/steering-validation.test.js

const fs = require('fs');
const path = require('path');

describe('Steering Consistency', () => {
const steering = fs.readFileSync('.kiro/steering.md', 'utf8');

test('mentions all critical dependencies', () => {
const packageJson = require('../package.json');
const criticalDeps = ['react', 'typescript', 'prisma'];

criticalDeps.forEach(dep => {
if (packageJson.dependencies[dep]) {
expect(steering).toContain(dep);
}
});
});

test('no forbidden patterns mentioned', () => {
const forbidden = ['var ', 'any ', 'console.log'];

// Steering should mention these as things NOT to do
forbidden.forEach(pattern => {
const regex = new RegExp(`(NO|Don't|Avoid).*${pattern}`, 'i');
expect(steering).toMatch(regex);
});
});

test('all referenced docs exist', () => {
const docRefs = steering.match(/docs\/[\w\/\-\.]+\.md/g) || [];

docRefs.forEach(ref => {
const exists = fs.existsSync(ref);
expect(exists).toBe(true);
});
});
});
