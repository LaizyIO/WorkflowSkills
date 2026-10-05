const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const { catalog, installSources, importReference, manifest } = require('../src/design');

const repo = path.resolve(__dirname, '../..');
const cli = path.join(repo, 'clai/bin/clai.js');
const ibm = fs.readFileSync(path.join(__dirname, 'fixtures/awesome-ibm-DESIGN.md'));
function workspace(t) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'clai-design-sources-'));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  return cwd;
}
function put(cwd, name, text) {
  const file = path.join(cwd, name);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}
function read(cwd, name) { return fs.readFileSync(path.join(cwd, name), 'utf8'); }
function run(cwd, ...args) {
  const result = spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  return result;
}

test('catalog is pinned, has safe IDs and matches the offline CLI', t => {
  const result = catalog();
  assert.match(result.commit, /^[a-f0-9]{40}$/);
  assert.equal(new Set(result.references.map(entry => entry.id)).size, result.references.length);
  for (const entry of result.references) {
    assert.match(entry.id, /^[a-z0-9.-]+$/);
    assert.match(entry.sha256, /^[a-f0-9]{64}$/);
    assert.equal(entry.path, 'design-md/' + entry.id + '/DESIGN.md');
    assert.ok(entry.url.includes(result.commit));
  }
  assert.deepEqual(JSON.parse(run(workspace(t), 'design', 'catalog', '--json').stdout), result);
  const filtered = JSON.parse(run(workspace(t), 'design', 'catalog', '--filter', 'IBM', '--json').stdout);
  assert.ok(filtered.references.some(entry => entry.id === 'ibm'));
  assert.ok(filtered.references.length < result.references.length);
});

test('Taste installation is offline, intact and idempotent, preserving project documents', async t => {
  const cwd = workspace(t);
  put(cwd, 'DESIGN.md', '# Our purple brand with a dense table and semantic colors\n');
  put(cwd, 'design/references/custom.md', 'custom');
  const result = await installSources(cwd);
  assert.equal(result.files.length, manifest.taste.files.length + 1);
  const before = result.files.map(file => fs.readFileSync(file));
  await installSources(cwd);
  result.files.forEach((file, i) => assert.ok(fs.readFileSync(file).equals(before[i])));
  assert.equal(read(cwd, 'DESIGN.md'), '# Our purple brand with a dense table and semantic colors\n');
  assert.equal(read(cwd, 'design/references/custom.md'), 'custom');
  const manifestPath = path.join(repo, 'ux-design-direction/assets/design-sources/manifest.json');
  assert.ok(fs.readFileSync(manifestPath).equals(fs.readFileSync(path.join(repo, 'clai/templates/design-sources/manifest.json'))));
  for (const file of manifest.taste.files) {
    const source = fs.readFileSync(path.join(repo, 'ux-design-direction/assets/design-sources', file.path));
    assert.equal(crypto.createHash('sha256').update(source).digest('hex'), file.sha256);
    assert.ok(source.equals(fs.readFileSync(path.join(result.directory, path.basename(file.path)))));
  }
});

test('modified Taste snapshots are preserved and conflicts are checked before installing missing files', async t => {
  const cwd = workspace(t);
  const destination = 'design/references/taste/' + manifest.taste.commit;
  put(cwd, destination + '/redesign.md', 'locally customized');
  await assert.rejects(installSources(cwd), /modifiée/);
  assert.equal(read(cwd, destination + '/redesign.md'), 'locally customized');
  assert.equal(fs.existsSync(path.join(cwd, destination, 'frontend.md')), false);
});

test('reference import verifies real upstream bytes, registers a candidate and preserves decisions', async t => {
  const cwd = workspace(t);
  put(cwd, '[DOC]-Demo/11-UX-DesignOps/01-Product/Design_Direction.md', 'Our selected direction');
  put(cwd, '[DOC]-Demo/11-UX-DesignOps/01-Product/Design_References.md', '# Our references\n\nChosen: our own identity.\n');
  put(cwd, '[DOC]-Demo/00-MOC/MOC-UX.md', '# Custom MOC\n');
  put(cwd, '[DOC]-Demo/00-MOC/MOC-Principal.md', '# Custom main MOC\n');
  put(cwd, 'DESIGN.md', '# Project contract\n');
  let calls = 0;
  const result = await importReference('ibm', { cwd, download: async url => {
    calls++;
    assert.equal(url, 'https://raw.githubusercontent.com/voltagent/awesome-design-md/' + manifest.awesome.commit + '/design-md/ibm/DESIGN.md');
    return ibm;
  } });
  assert.equal(calls, 1);
  assert.ok(fs.readFileSync(result.file).equals(ibm));
  assert.equal(read(cwd, 'DESIGN.md'), '# Project contract\n');
  assert.equal(read(cwd, '[DOC]-Demo/11-UX-DesignOps/01-Product/Design_Direction.md'), 'Our selected direction');
  const record = fs.readFileSync(result.register, 'utf8');
  assert.ok(record.startsWith('# Our references\n\nChosen: our own identity.\n'));
  assert.match(record, /candidate, non sélectionnée/);
  assert.match(record, new RegExp(manifest.awesome.commit));
  assert.ok(fs.existsSync(path.join(path.dirname(result.file), 'LICENSE')));
  const moc = read(cwd, '[DOC]-Demo/00-MOC/MOC-UX.md');
  assert.ok(moc.startsWith('# Custom MOC\n'));
  const mainMoc = read(cwd, '[DOC]-Demo/00-MOC/MOC-Principal.md');
  assert.ok(mainMoc.startsWith('# Custom main MOC\n'));
  assert.match(mainMoc, /\[\[MOC-UX\]\]/);
  // Installed verified references remain usable when the network is down.
  await importReference('ibm', { cwd, download: async () => { throw new Error('offline'); } });
  assert.equal(fs.readFileSync(result.register, 'utf8'), record);
  assert.equal(read(cwd, '[DOC]-Demo/00-MOC/MOC-UX.md'), moc);
  assert.equal(read(cwd, '[DOC]-Demo/00-MOC/MOC-Principal.md'), mainMoc);
});

test('invalid IDs, absent or ambiguous vaults stop before any download/write; --doc resolves ambiguity', async t => {
  const cwd = workspace(t);
  let calls = 0;
  const download = async () => { calls++; return ibm; };
  for (const id of ['../escape', 'missing', 'IBM']) await assert.rejects(importReference(id, { cwd, download }), /inconnue/);
  await assert.rejects(importReference('ibm', { cwd, download }), /vault/);
  fs.mkdirSync(path.join(cwd, '[DOC]-Demo'));
  fs.mkdirSync(path.join(cwd, '[DOC]-Other'));
  await assert.rejects(importReference('ibm', { cwd, download }), /vault/);
  assert.equal(calls, 0);
  assert.equal(fs.existsSync(path.join(cwd, 'design')), false);
  await importReference('ibm', { cwd, doc: 'Other', download });
  assert.equal(calls, 1);
  assert.deepEqual(fs.readdirSync(path.join(cwd, '[DOC]-Demo')), []);
});

test('corrupted downloads and modified local sources fail without changing documents', async t => {
  const cwd = workspace(t);
  put(cwd, '[DOC]-Demo/11-UX-DesignOps/01-Product/Design_References.md', 'untouched');
  await assert.rejects(importReference('ibm', { cwd, download: async () => Buffer.from('corrupt') }), /Empreinte/);
  assert.equal(fs.existsSync(path.join(cwd, 'design')), false);
  const relative = 'design/references/awesome-design-md/' + manifest.awesome.commit + '/ibm/DESIGN.md';
  put(cwd, relative, 'customized');
  await assert.rejects(importReference('ibm', { cwd, download: async () => ibm }), /Empreinte/);
  assert.equal(read(cwd, relative), 'customized');
  assert.equal(read(cwd, '[DOC]-Demo/11-UX-DesignOps/01-Product/Design_References.md'), 'untouched');
});

test('install/import refuse paths through symlinks or Windows junctions', async t => {
  const cwd = workspace(t), outside = workspace(t);
  try { fs.symlinkSync(outside, path.join(cwd, 'design'), process.platform === 'win32' ? 'junction' : 'dir'); }
  catch (error) { if (error.code === 'EPERM') return t.skip('Symlinks unavailable'); throw error; }
  fs.mkdirSync(path.join(cwd, '[DOC]-Demo'));
  await assert.rejects(installSources(cwd), /symbolique/);
  await assert.rejects(importReference('ibm', { cwd, download: async () => ibm }), /symbolique/);
  assert.deepEqual(fs.readdirSync(outside), []);
});

test('fresh init and legacy sync anchor sources, preserve custom docs and do not select a brand', t => {
  const cwd = workspace(t);
  fs.mkdirSync(path.join(cwd, '.codex'));
  put(cwd, '[DOC]-Demo/00-MOC/MOC-UX.md', '# Our MOC\n');
  put(cwd, '[DOC]-Demo/11-UX-DesignOps/01-Product/Design_Direction.md', 'Brand purple, no motion');
  put(cwd, 'DESIGN.md', '# Custom purple design\n');
  run(cwd, 'sync', '--target', 'codex');
  const contract = read(cwd, 'DESIGN.md');
  assert.ok(contract.startsWith('# Custom purple design\n'));
  assert.match(contract, /ux-design-direction/);
  assert.match(contract, /Awesome DESIGN.md/);
  assert.equal(read(cwd, '[DOC]-Demo/11-UX-DesignOps/01-Product/Design_Direction.md'), 'Brand purple, no motion');
  const refs = '[DOC]-Demo/11-UX-DesignOps/01-Product/Design_References.md';
  assert.match(read(cwd, refs), /candidate/);
  const snapshot = read(cwd, refs);
  run(cwd, 'sync', '--target', 'codex');
  assert.equal(read(cwd, 'DESIGN.md'), contract);
  assert.equal(read(cwd, refs), snapshot);
  assert.equal(fs.existsSync(path.join(cwd, 'design/references/awesome-design-md')), false);
  const fresh = workspace(t);
  run(fresh, 'init', 'Demo', '--target', 'codex', '--doc', 'Demo', '--no-ruflo', '--force');
  assert.match(read(fresh, 'AGENTS.md'), /ux-design-direction/);
  assert.ok(fs.existsSync(path.join(fresh, 'design/references/taste', manifest.taste.commit, 'LICENSE')));
});

test('dangling reference symlinks are rejected before creating an external target', async t => {
  const cwd = workspace(t), outside = workspace(t);
  const destination = path.join(outside, 'missing');
  fs.mkdirSync(destination);
  try { fs.symlinkSync(destination, path.join(cwd, 'design'), process.platform === 'win32' ? 'junction' : 'dir'); }
  catch (error) { if (error.code === 'EPERM') return t.skip('Symlinks unavailable'); throw error; }
  fs.rmdirSync(destination);
  await assert.rejects(installSources(cwd), /symbolique/);
  assert.equal(fs.existsSync(destination), false);
});
