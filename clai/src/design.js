const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const fetch = require('node-fetch');

const assets = path.resolve(__dirname, '../templates/design-sources');
const manifest = require('../templates/design-sources/manifest.json');
const digest = data => crypto.createHash('sha256').update(data).digest('hex');

function assertInside(root, destination) {
  const relative = path.relative(root, destination);
  if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Chemin de référence hors projet');
  let current = root;
  for (const part of relative.split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    let stat;
    try { stat = fs.lstatSync(current); }
    catch (error) { if (error.code === 'ENOENT') break; throw error; }
    if (stat.isSymbolicLink()) throw new Error('Lien symbolique interdit pour les références : ' + current);
  }
}

async function checkFiles(root, files) {
  for (const file of files) {
    assertInside(root, file.destination);
    if (digest(file.data) !== file.sha256) throw new Error('Empreinte source incorrecte : ' + file.destination);
    if (await fs.pathExists(file.destination)) {
      const previous = await fs.readFile(file.destination);
      if (!previous.equals(file.data)) throw new Error('Référence locale modifiée, conservée : ' + file.destination);
    }
  }
}

async function writeFiles(root, files) {
  await checkFiles(root, files);
  for (const file of files) {
    await fs.ensureDir(path.dirname(file.destination));
    if (!(await fs.pathExists(file.destination))) await fs.writeFile(file.destination, file.data, { flag: 'wx' });
  }
}

async function bundled(relative, sha256, destination) {
  const data = await fs.readFile(path.join(assets, relative));
  return { destination, data, sha256 };
}

function catalog(filter = '') {
  const search = filter.toLowerCase();
  return { repository: manifest.awesome.repository, commit: manifest.awesome.commit,
    references: manifest.awesome.entries.filter(entry => (entry.id + ' ' + entry.summary).toLowerCase().includes(search)).map(entry => ({ ...entry,
      url: manifest.awesome.repository + '/blob/' + manifest.awesome.commit + '/' + entry.path })) };
}

async function installSources(cwd = process.cwd()) {
  const root = await fs.realpath(cwd);
  const destination = path.join(root, 'design/references/taste', manifest.taste.commit);
  const files = await Promise.all(manifest.taste.files.map(file =>
    bundled(file.path, file.sha256, path.join(destination, path.basename(file.path)))));
  files.push(await bundled(manifest.taste.licensePath, manifest.taste.licenseSha256, path.join(destination, 'LICENSE')));
  await writeFiles(root, files);
  return { repository: manifest.taste.repository, commit: manifest.taste.commit,
    directory: destination, files: files.map(file => file.destination) };
}

async function resolveVault(root, docName) {
  if (docName && !/^[\p{L}\p{N}_ .-]+$/u.test(docName)) throw new Error('Nom de vault invalide');
  const entries = (await fs.readdir(root, { withFileTypes: true })).filter(entry =>
    entry.isDirectory() && entry.name.startsWith('[DOC]-') && (!docName || entry.name === '[DOC]-' + docName));
  if (entries.length !== 1) throw new Error('Un vault [DOC]-* unique est requis ; utilisez --doc <nom> pour le choisir');
  const docRoot = path.join(root, entries[0].name);
  assertInside(root, docRoot);
  return docRoot;
}

async function download(url) {
  const response = await fetch(url, { timeout: 20000, size: 1024 * 1024, redirect: 'error' });
  if (!response.ok) throw new Error('Téléchargement de référence : HTTP ' + response.status);
  return response.buffer();
}

async function importReference(id, options = {}) {
  const entry = manifest.awesome.entries.find(candidate => candidate.id === id);
  if (!entry) throw new Error('Référence inconnue. Consultez clai design catalog');
  const root = await fs.realpath(options.cwd || process.cwd());
  const docRoot = await resolveVault(root, options.doc);
  const destination = path.join(root, 'design/references/awesome-design-md', manifest.awesome.commit, id);
  const referencePath = path.join(destination, 'DESIGN.md');
  const register = path.join(docRoot, '11-UX-DesignOps/01-Product/Design_References.md');
  const moc = path.join(docRoot, '00-MOC/MOC-UX.md');
  const mainMoc = path.join(docRoot, '00-MOC/MOC-Principal.md');
  for (const file of [referencePath, register, moc, mainMoc]) assertInside(root, file);
  const url = 'https://raw.githubusercontent.com/voltagent/awesome-design-md/' + manifest.awesome.commit + '/' + entry.path;
  // A verified installed snapshot works offline. A modified snapshot is never replaced.
  const data = await fs.pathExists(referencePath) ? await fs.readFile(referencePath) : await (options.download || download)(url);
  if (digest(data) !== entry.sha256) throw new Error('Empreinte de référence incorrecte ; copie locale conservée si présente : ' + referencePath);
  const files = [{ data, destination: referencePath, sha256: entry.sha256 },
    await bundled(manifest.awesome.licensePath, manifest.awesome.licenseSha256, path.join(destination, 'LICENSE'))];
  await checkFiles(root, files);

  const today = new Date().toISOString().slice(0, 10);
  const marker = '<!-- workflow-skills:reference:awesome-design-md/' + manifest.awesome.commit + '/' + id + ' -->';
  let record = await fs.pathExists(register) ? await fs.readFile(register, 'utf8') :
    '---\ntitle: Références de design\ntype: ux-product\nstatus: draft\ncreated: ' + today + '\nupdated: ' + today +
    '\ntags:\n  - ux\n  - design\n---\n\n# Références de design\n\nLes imports sont des candidates à évaluer ; ils ne remplacent pas DESIGN.md.\n';
  const local = path.relative(root, referencePath).split(path.sep).join('/');
  if (!record.includes(marker)) {
    record = record.replace(/^updated: .*$/m, 'updated: ' + today);
    record += '\n' + marker + '\n## ' + id + '\n\n- Statut : candidate, non sélectionnée.\n- Source : ' +
      manifest.awesome.repository + '/blob/' + manifest.awesome.commit + '/' + entry.path +
      '\n- Commit : `' + manifest.awesome.commit + '`\n- Fichier : `' + local + '`\n- SHA-256 : `' + entry.sha256 +
      '`\n- Licence : MIT, voir LICENSE à côté de la copie.\n- Propriétés utiles, adaptations, exclusions, raison produit et vérifications : à renseigner après lecture.\n';
  }
  let mocText = await fs.pathExists(moc) ? await fs.readFile(moc, 'utf8') :
    '---\ntitle: MOC-UX\ntype: moc\nstatus: draft\ncreated: ' + today + '\nupdated: ' + today + '\ntags:\n  - ux\n---\n\n# MOC UX\n';
  if (!mocText.includes('[[Design_References]]')) {
    mocText = mocText.replace(/^updated: .*$/m, 'updated: ' + today);
    mocText += '\n## Références de design\n\n- [[Design_References]]\n';
  }
  let mainText = await fs.pathExists(mainMoc) ? await fs.readFile(mainMoc, 'utf8') :
    '---\ntitle: MOC-Principal\ntype: moc\nstatus: draft\ncreated: ' + today + '\nupdated: ' + today + '\ntags:\n  - moc\n---\n\n# MOC Principal\n';
  if (!mainText.includes('[[MOC-UX]]')) {
    mainText = mainText.replace(/^updated: .*$/m, 'updated: ' + today);
    mainText += '\n## UX DesignOps\n\n- [[MOC-UX]]\n';
  }
  await writeFiles(root, files);
  await fs.ensureDir(path.dirname(register));
  if (!(await fs.pathExists(register)) || await fs.readFile(register, 'utf8') !== record) await fs.writeFile(register, record);
  await fs.ensureDir(path.dirname(moc));
  if (!(await fs.pathExists(moc)) || await fs.readFile(moc, 'utf8') !== mocText) await fs.writeFile(moc, mocText);
  if (!(await fs.pathExists(mainMoc)) || await fs.readFile(mainMoc, 'utf8') !== mainText) await fs.writeFile(mainMoc, mainText);
  return { id, commit: manifest.awesome.commit, file: referencePath, register, status: 'candidate' };
}

module.exports = { catalog, installSources, importReference, manifest };
