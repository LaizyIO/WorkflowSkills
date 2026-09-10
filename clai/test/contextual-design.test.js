const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { spawnSync } = require('node:child_process');

const repo = path.resolve(__dirname, '../..');
const cli = path.join(repo, 'clai/bin/clai.js');
const scanner = path.join(repo, 'clai/templates/codex/ux-designops/root/scripts/ux/uxkit-lite.mjs');
const scannerModule = import(pathToFileURL(scanner).href);
const doc = '[DOC]-Demo/11-UX-DesignOps';
function workspace(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'clai-context-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}
function put(cwd, file, content) {
  const dest = path.join(cwd, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content);
}
function read(cwd, file) { return fs.readFileSync(path.join(cwd, file), 'utf8'); }
function run(cwd, ...args) {
  const r = spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  return r;
}
function method(text) {
  const matches = text.match(/<!-- workflow-skills:contextual-design:start -->[\s\S]*?<!-- workflow-skills:contextual-design:end -->/g);
  assert.equal(matches?.length, 1, 'one complete managed method block');
  return matches[0];
}

test('fresh init installs resolvable context documents and stays stable after sync', t => {
  const cwd = workspace(t);
  run(cwd, 'init', 'Demo', '--target', 'codex', '--doc', 'Demo', '--no-ruflo', '--force');
  const templateRoot = path.join(repo, 'clai/templates/codex/ux-designops');
  for (const name of ['Product_Context', 'Design_Direction', 'Platform_Profile', 'Anti_Slop_Vocabulary']) {
    const file = doc + '/01-Product/' + name + '.md';
    const template = read(templateRoot, 'doc/11-UX-DesignOps/01-Product/' + name + '.md');
    const installed = read(cwd, file);
    assert.equal(installed.replace(/\d{4}-\d{2}-\d{2}/g, '{{DATE}}'), template);
    assert.ok(read(cwd, '[DOC]-Demo/00-MOC/MOC-UX.md').includes('[[' + name + ']]'));
  }
  const design = read(cwd, 'DESIGN.md');
  method(design);
  assert.doesNotMatch(design, /\{\{PROJECT_NAME\}\}/);
  const scanBefore = read(cwd, 'scripts/ux/uxkit-lite.mjs');
  run(cwd, 'sync', '--target', 'codex');
  assert.equal(read(cwd, 'DESIGN.md'), design);
  assert.equal(read(cwd, 'scripts/ux/uxkit-lite.mjs'), scanBefore);
});

test('existing project identity, context, custom scanner and MOC survive migration and repeated sync', t => {
  const cwd = workspace(t);
  fs.mkdirSync(path.join(cwd, '.codex'));
  const brand = '# Marque\r\n\r\nPalette #543210 ; typographie système approuvée.\r\n';
  put(cwd, 'DESIGN.md', brand);
  const customGuide = '# Équipe\n\nRègle locale à préserver.\n\n## Documentation Requirements\n\n## Feature Workflow Skills\n\n## UX DesignOps\n';
  put(cwd, 'AGENTS.md', customGuide);
  const values = {
    [doc + '/01-Product/Product_Context.md']: 'Utilisateurs experts ; source atelier client.',
    [doc + '/01-Product/Design_Direction.md']: 'Direction sélectionnée : photographie documentaire.',
    [doc + '/01-Product/Anti_Slop_Vocabulary.md']: 'Vocabulaire adapté au client.',
    [doc + '/01-Product/Platform_Profile.md']: 'Android natif uniquement.',
    'scripts/ux/uxkit-lite.mjs': '// Custom Kotlin scanner: do not replace.\n',
    'design/mockups/images/selected.png': 'user artifact'
  };
  for (const [file, content] of Object.entries(values)) put(cwd, file, content);
  put(cwd, '[DOC]-Demo/00-MOC/MOC-UX.md', '# MOC personnalisé\n\n- [[Écran client]]\n');
  run(cwd, 'sync', '--target', 'codex');
  assert.ok(read(cwd, 'DESIGN.md').startsWith(brand));
  assert.ok(read(cwd, 'AGENTS.md').startsWith(customGuide));
  for (const [file, content] of Object.entries(values)) assert.equal(read(cwd, file), content);
  const snapshots = Object.fromEntries(['DESIGN.md', 'AGENTS.md', '[DOC]-Demo/00-MOC/MOC-UX.md'].map(file => [file, read(cwd, file)]));
  method(snapshots['DESIGN.md']);
  method(snapshots['AGENTS.md']);
  assert.ok(snapshots['[DOC]-Demo/00-MOC/MOC-UX.md'].includes('[[Écran client]]'));
  // An obsolete managed method can be refreshed without touching surrounding decisions.
  const original = snapshots['DESIGN.md'];
  put(cwd, 'DESIGN.md', original.replace(method(original), '<!-- workflow-skills:contextual-design:start -->\nold method\n<!-- workflow-skills:contextual-design:end -->'));
  run(cwd, 'sync', '--target', 'codex');
  for (const [file, content] of Object.entries(snapshots)) assert.equal(read(cwd, file), content);
});

test('sync upgrades exactly the shipped scanner with LF or CRLF, preserving an edited version', t => {
  const legacy = read(__dirname, 'fixtures/uxkit-lite-v1.mjs').replace(/\r\n/g, '\n');
  for (const [source, upgrade] of [[legacy, true], [legacy.replace(/\n/g, '\r\n'), true], [legacy + '\n// User extension\n', false]]) {
    const cwd = workspace(t);
    fs.mkdirSync(path.join(cwd, '.codex'));
    fs.mkdirSync(path.join(cwd, '[DOC]-Demo'));
    put(cwd, 'scripts/ux/uxkit-lite.mjs', source);
    run(cwd, 'sync', '--target', 'codex');
    assert.equal(read(cwd, 'scripts/ux/uxkit-lite.mjs'), upgrade ? fs.readFileSync(scanner, 'utf8') : source);
  }
});

test('native inventory finds nested targets and excludes generated/private documentation', async t => {
  const cwd = workspace(t);
  for (const file of ['apps/android/app/build.gradle.kts', 'apps/android/app/src/main/AndroidManifest.xml',
    'apps/android/app/src/main/ui/Screen.kt', 'apps/apple/App.swift', 'apps/flutter/pubspec.yaml',
    'apps/flutter/lib/view.dart', 'apps/web/src/pages/Home.tsx', 'apps/web/package.json',
    'node_modules/fake/ui/Fake.tsx', '[DOC]-Demo/example/View.swift', '.gradle/cache/Noise.kt']) put(cwd, file, '');
  const { collectInventory } = await scannerModule;
  const inventory = collectInventory(cwd);
  assert.equal(inventory.scope.truncated, false);
  assert.ok(inventory.native.includes('apps/android/app/src/main/ui/Screen.kt'));
  assert.ok(inventory.native.includes('apps/apple/App.swift'));
  assert.ok(inventory.native.includes('apps/flutter/lib/view.dart'));
  assert.ok(inventory.web.includes('apps/web/src/pages/Home.tsx'));
  assert.ok(inventory.manifests.includes('apps/web/package.json'));
  assert.equal(inventory.files.length, 8);
  assert.equal(inventory.scope.errors.length, 0);
});

test('inventory reports bounded traversal and conservative absence; JSON CLI matches the inventory', async t => {
  const cwd = workspace(t);
  fs.mkdirSync(path.join(cwd, '[DOC]-Demo'));
  for (let n = 0; n < 6; n++) put(cwd, 'src/' + n + '.kt', '');
  const { collectInventory, renderReport } = await scannerModule;
  const truncated = collectInventory(cwd, { maxFiles: 3 });
  assert.equal(truncated.scope.truncated, true);
  assert.equal(truncated.files.length, 3);
  assert.deepEqual(truncated.files, ['src/0.kt', 'src/1.kt', 'src/2.kt']);
  const entryBound = collectInventory(cwd, { maxEntries: 2 });
  assert.equal(entryBound.scope.truncated, true);
  assert.equal(entryBound.scope.entriesVisited, 2);
  assert.match(renderReport(truncated), /Inventaire tronqué : oui/);
  const result = spawnSync(process.execPath, [scanner, 'scan', '--json'], { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), collectInventory(cwd));
  assert.ok(!fs.existsSync(path.join(cwd, doc, '08-Audits/Project_Scan_Report.md')));
});

test('scanner refuses an ambiguous vault without writing either report', t => {
  const cwd = workspace(t);
  for (const name of ['Demo', 'Other']) fs.mkdirSync(path.join(cwd, '[DOC]-' + name));
  const result = spawnSync(process.execPath, [scanner, 'scan'], { cwd, encoding: 'utf8' });
  assert.equal(result.status, 2);
  assert.equal(fs.readdirSync(path.join(cwd, '[DOC]-Demo')).length, 0);
  assert.equal(fs.readdirSync(path.join(cwd, '[DOC]-Other')).length, 0);
});

test('memory-only guides are replaced once for both targets, with no duplicate managed method', t => {
  for (const [target, guide] of [['codex', 'AGENTS.md'], ['claude', 'CLAUDE.md']]) {
    const cwd = workspace(t);
    fs.mkdirSync(path.join(cwd, '.' + target));
    fs.mkdirSync(path.join(cwd, '[DOC]-Demo'));
    put(cwd, guide, '<claude-mem-context>\nNo sessions\n</claude-mem-context>\n');
    run(cwd, 'sync', '--target', target);
    const updated = read(cwd, guide);
    assert.doesNotMatch(updated, /No sessions/);
    method(updated);
    run(cwd, 'sync', '--target', target);
    assert.equal(read(cwd, guide), updated);
  }
});

test('distributed skills include identical source instructions and all relative references', () => {
  const skillsRoot = path.join(repo, 'plugins/codex/workflow-skills/skills');
  function compareTree(src, bundled) {
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      if (entry.name === '__pycache__') continue;
      const a = path.join(src, entry.name), b = path.join(bundled, entry.name);
      if (entry.isDirectory()) compareTree(a, b);
      else assert.ok(fs.readFileSync(b).equals(fs.readFileSync(a)), 'Source/bundle mismatch: ' + b);
    }
  }
  for (const name of fs.readdirSync(skillsRoot)) {
    compareTree(path.join(repo, name), path.join(skillsRoot, name));
    const entry = read(skillsRoot, name + '/SKILL.md');
    for (const match of entry.matchAll(/\]\((references\/[^)]+)\)/g)) {
      assert.ok(fs.existsSync(path.join(skillsRoot, name, match[1])), match[1]);
    }
  }
});
