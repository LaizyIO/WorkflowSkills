const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const cli = path.resolve(__dirname, '../bin/clai.js');
function workspace(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'clai-ruflo-test-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}
function run(cwd, ...args) {
  const result = spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
}

test('Claude init without Ruflo installs no Ruflo command or guide section', t => {
  const cwd = workspace(t);
  run(cwd, 'init', 'Demo', '--target', 'claude', '--doc', 'Demo', '--no-ruflo', '--force');
  assert.ok(fs.existsSync(path.join(cwd, '.claude/commands/commit.md')));
  assert.ok(!fs.existsSync(path.join(cwd, '.claude/commands/ruflo-status.md')));
  assert.doesNotMatch(fs.readFileSync(path.join(cwd, 'CLAUDE.md'), 'utf8'), /ruflo/i);
});

test('Codex init installs no Ruflo command', t => {
  const cwd = workspace(t);
  run(cwd, 'init', 'Demo', '--target', 'codex', '--doc', 'Demo', '--force');
  assert.ok(fs.existsSync(path.join(cwd, '.codex/commands/commit.md')));
  assert.ok(!fs.existsSync(path.join(cwd, '.codex/commands/ruflo-status.md')));
});
