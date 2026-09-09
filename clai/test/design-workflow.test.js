const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const cli = path.resolve(__dirname, '../bin/clai.js');
function workspace(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'clai-design-test-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}
function run(cwd, ...args) {
  const result = spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.doesNotMatch(result.stdout + result.stderr, /Erreur:/);
}
function read(cwd, file) { return fs.readFileSync(path.join(cwd, file), 'utf8'); }
function put(cwd, file, content) {
  fs.mkdirSync(path.dirname(path.join(cwd, file)), { recursive: true });
  fs.writeFileSync(path.join(cwd, file), content);
}

test('fresh Codex init provides local image workflow without retired assets', t => {
  const cwd = workspace(t);
  run(cwd, 'init', 'Demo', '--target', 'codex', '--doc', 'Demo', '--no-ruflo', '--force');
  for (const file of ['AGENTS.md', 'DESIGN.md', 'design/mockups/images/.gitkeep',
    '[DOC]-Demo/11-UX-DesignOps/07-Mockups/Mockup_Index.md',
    '[DOC]-Demo/_Templates/TPL-UX-Mockup.md', 'scripts/ux/uxkit-lite.mjs']) {
    assert.ok(fs.existsSync(path.join(cwd, file)), file);
    assert.doesNotMatch(read(cwd, file), /Stitch|output-styles|\{\{PROJECT_NAME\}\}/i);
  }
  for (const file of ['.codex/output-styles', 'design/stitch', '[DOC]-Demo/11-UX-DesignOps/07-Stitch']) {
    assert.ok(!fs.existsSync(path.join(cwd, file)), file);
  }
  assert.match(read(cwd, 'AGENTS.md'), /image generation tool/);
  const scan = spawnSync(process.execPath, ['scripts/ux/uxkit-lite.mjs', 'scan'], { cwd, encoding: 'utf8' });
  assert.equal(scan.status, 0, scan.stderr);
  assert.match(read(cwd, '[DOC]-Demo/11-UX-DesignOps/08-Audits/Project_Scan_Report.md'), /ux-mockup-generate/);
});

test('sync migrates old guide and design policy, preserving custom content and image history', t => {
  const cwd = workspace(t);
  fs.mkdirSync(path.join(cwd, '.codex'));
  put(cwd, 'AGENTS.md', '# Custom project\n\nKeep this unique requirement.\n\n## Documentation Requirements\n\n## Feature Workflow Skills\n\n## UX DesignOps\n\nUse ux-stitch-generate.\n\n### Stitch MCP\n\nUse old remote IDs.\n\n---\n\n## Output Styles\n\nRead .codex/output-styles/non-dev-explanatory.md.\n\n---\n\n## Custom conventions\n\nKeep this too.\n');
  put(cwd, 'DESIGN.md', '# Brand\n\nKeep brand color #123456.\n\n## Stitch\n\nUse old tools.\n\n## Product rules\n\nKeep form behavior.\n');
  put(cwd, '[DOC]-Demo/00-MOC/MOC-UX.md', '# Custom MOC\n\n## Stitch\n\n- [[Project_Map]]\n');
  put(cwd, 'design/stitch/user-image.txt', 'Existing user artifact');
  put(cwd, '[DOC]-Demo/01-Specs/CDC-001.md', 'Existing specification');
  run(cwd, 'sync', '--target', 'codex');
  const guide = read(cwd, 'AGENTS.md');
  assert.doesNotMatch(guide, /Stitch|output.styles/i);
  assert.match(guide, /Keep this unique requirement/);
  assert.match(guide, /Keep this too/);
  assert.match(guide, /ux-mockup-generate/);
  assert.match(guide, /\[DOC\]-Demo\/11-UX-DesignOps\/07-Mockups/);
  assert.match(read(cwd, 'DESIGN.md'), /Keep brand color #123456/);
  assert.match(read(cwd, 'DESIGN.md'), /Keep form behavior/);
  assert.doesNotMatch(read(cwd, 'DESIGN.md'), /Stitch/);
  assert.equal(read(cwd, 'design/stitch/user-image.txt'), 'Existing user artifact');
  assert.equal(read(cwd, '[DOC]-Demo/01-Specs/CDC-001.md'), 'Existing specification');
  const design = read(cwd, 'DESIGN.md');
  run(cwd, 'sync', '--target', 'codex');
  assert.equal(read(cwd, 'AGENTS.md'), guide);
  assert.equal(read(cwd, 'DESIGN.md'), design);
});

test('Claude init no longer installs output styles', t => {
  const cwd = workspace(t);
  run(cwd, 'init', 'Demo', '--target', 'claude', '--doc', 'Demo', '--no-ruflo', '--force');
  assert.ok(fs.existsSync(path.join(cwd, 'CLAUDE.md')));
  assert.ok(!fs.existsSync(path.join(cwd, '.claude/output-styles')));
  assert.doesNotMatch(read(cwd, 'CLAUDE.md'), /output.styles/i);
});

test('Codex --no-ux does not create mockup assets', t => {
  const cwd = workspace(t);
  run(cwd, 'init', 'Demo', '--target', 'codex', '--doc', 'Demo', '--no-ruflo', '--no-ux', '--force');
  assert.ok(!fs.existsSync(path.join(cwd, 'design/mockups')));
  assert.ok(!fs.existsSync(path.join(cwd, 'DESIGN.md')));
});
