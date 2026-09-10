#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const excludedNames = new Set(['node_modules', '.next', 'dist', 'build', '.git', '.gradle', '.dart_tool', 'Pods', 'DerivedData', 'vendor', 'coverage']);
const displayLimit = 80;

// Bounded, deterministic candidate inventory. Neither absence nor presence proves UI support.
export function collectInventory(root, { maxFiles = 5000, maxEntries = 20000 } = {}) {
  const files = [];
  const skipped = new Set();
  const errors = [];
  let entriesVisited = 0;
  let truncated = false;
  function walk(relative) {
    let entries;
    try {
      entries = fs.readdirSync(path.join(root, relative), { withFileTypes: true })
        .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    } catch (error) {
      errors.push({ path: relative || '.', code: error.code || 'READ_ERROR' });
      return;
    }
    for (const entry of entries) {
      if (entriesVisited >= maxEntries || files.length >= maxFiles) {
        truncated = true;
        return;
      }
      entriesVisited++;
      const rel = relative ? relative + '/' + entry.name : entry.name;
      if (entry.isSymbolicLink()) { skipped.add('symbolic links'); continue; }
      if (entry.isDirectory()) {
        if (excludedNames.has(entry.name) || entry.name.startsWith('[DOC]-')) {
          skipped.add(entry.name.startsWith('[DOC]-') ? '[DOC]-*' : entry.name);
        } else {
          walk(rel);
          if (truncated) return;
        }
      } else if (entry.isFile()) files.push(rel);
    }
  }
  walk('');
  const web = files.filter(f => /\.(tsx|jsx|vue|svelte|html)$/.test(f));
  const native = files.filter(f => /\.(kt|kts|java|swift|dart|xaml|storyboard|xib)$/.test(f) || /(^|\/)res\/layout[^/]*\/.*\.xml$/.test(f));
  const styles = files.filter(f => /\.(css|scss|sass|less|pcss)$/.test(f));
  const manifests = files.filter(f => /(^|\/)(package\.json|pubspec\.yaml|Package\.swift|AndroidManifest\.xml|build\.gradle(?:\.kts)?|project\.pbxproj)$/.test(f));
  let pkg;
  try { pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')); } catch { pkg = null; }
  const deps = { ...pkg?.dependencies, ...pkg?.devDependencies };
  const tools = ['next', 'react', 'react-native', 'expo', 'vue', 'svelte', '@angular/core', 'vite', 'tailwindcss', '@storybook/react', '@storybook/nextjs']
    .filter(name => deps[name]).map(name => name + '@' + deps[name]);
  const platformHints = [];
  if (web.length) platformHints.push('Web/JSX candidates (JSX may also target native)');
  if (deps['react-native'] || deps.expo) platformHints.push('React Native/Expo');
  if (files.some(f => /(^|\/)(AndroidManifest\.xml|build\.gradle(?:\.kts)?)$/.test(f))) platformHints.push('Android/Gradle candidates (Gradle alone is not proof of Android)');
  if (files.some(f => /\.swift$|\.xcodeproj\/project\.pbxproj$/.test(f))) platformHints.push('Swift/Apple candidates');
  if (files.some(f => /(^|\/)pubspec\.yaml$|\.dart$/.test(f))) platformHints.push('Dart/Flutter candidates');
  if (files.some(f => /\.xaml$/.test(f))) platformHints.push('XAML/.NET candidates');
  return { files, web, native, styles, manifests, tools, platformHints, packageFound: !!pkg,
    storybook: files.some(f => /(^|\/)\.storybook\/|\.stories\.(tsx|jsx|ts|js|mdx)$/.test(f)),
    scope: { maxFiles, maxEntries, entriesVisited, filesVisited: files.length, truncated,
      excluded: [...excludedNames, '[DOC]-*', 'symbolic links'], skipped: [...skipped].sort(), errors } };
}

function section(title, files) {
  return ['## ' + title + ' (' + files.length + ' candidats)',
    files.length ? files.slice(0, displayLimit).map(f => '- ' + f).join('\n') : '- Aucun candidat détecté dans la portée parcourue.',
    files.length > displayLimit ? 'Affichage limité à ' + displayLimit + ' éléments ; inventaire également disponible avec --json.' : ''].join('\n\n');
}

export function renderReport(inventory, today = new Date().toISOString().slice(0, 10)) {
  const s = inventory.scope;
  return ['---', 'title: Inventaire UX du projet', 'type: ux-audit', 'status: draft',
    'created: ' + today, 'updated: ' + today, 'tags:', '  - ux', '  - project-scan', '---', '',
    '# Inventaire UX du projet', '',
    'Inventaire heuristique, pas une validation visuelle ou une preuve de support des plateformes.',
    '« Non détecté » ne signifie pas « inexistant ». Les fichiers natifs et JSX sont des candidats à inspecter.',
    '', '## Portée', '',
    '- Fichiers parcourus : ' + s.filesVisited + ' ; entrées parcourues : ' + s.entriesVisited,
    '- Limites : ' + s.maxFiles + ' fichiers / ' + s.maxEntries + ' entrées',
    '- Inventaire tronqué : ' + (s.truncated ? 'oui' : 'non'),
    '- Exclusions : ' + s.excluded.join(', '),
    '- Erreurs de lecture : ' + (s.errors.length ? s.errors.map(e => e.path + ' (' + e.code + ')').join(', ') : 'aucune'),
    '- Autres stacks et architectures non reconnues : inspection manuelle nécessaire.',
    '', '## Indices de stack', '',
    '- package.json racine : ' + (inventory.packageFound ? 'lu' : 'absent ou illisible'),
    '- Outils racine : ' + (inventory.tools.join(', ') || 'aucun détecté'),
    '- Plateformes possibles : ' + (inventory.platformHints.join(', ') || 'non déterminées'),
    '- Storybook : ' + (inventory.storybook ? 'indices détectés' : 'non détecté'),
    '', section('Manifestes à inspecter (y compris sous-projets)', inventory.manifests),
    '', section('Surfaces web ou JSX possibles', inventory.web),
    '', section('Sources natives possibles', inventory.native),
    '', section('Styles web', inventory.styles),
    '', '## Prochaines actions', '',
    '1. Compléter Product_Context, Design_Direction et Platform_Profile depuis les sources du projet.',
    '2. Utiliser ux-audit / ux-component-spec sur les tâches et composants pertinents.',
    '3. Utiliser ux-mockup-brief et ux-mockup-generate si une proposition visuelle est nécessaire.',
    '4. Vérifier avec ux-visual-verification sur chaque runtime concerné ; une capture web ne valide pas le natif.',
    ''].join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  if ((process.argv[2] || 'help') === 'scan') {
    const cwd = process.cwd();
    const docs = fs.readdirSync(cwd, { withFileTypes: true })
      .filter(entry => entry.isDirectory() && entry.name.startsWith('[DOC]-'));
    if (docs.length !== 1) {
      console.error('Expected one [DOC]-* directory; initialize documentation or resolve the ambiguous vault before scanning.');
      process.exitCode = 2;
    } else {
      const inventory = collectInventory(cwd);
      if (process.argv.includes('--json')) {
        console.log(JSON.stringify(inventory, null, 2));
      } else {
        const reportPath = path.join(cwd, docs[0].name, '11-UX-DesignOps', '08-Audits', 'Project_Scan_Report.md');
        fs.mkdirSync(path.dirname(reportPath), { recursive: true });
        fs.writeFileSync(reportPath, renderReport(inventory), 'utf8');
        console.log('Wrote ' + reportPath);
      }
    }
  } else console.log('uxkit-lite\n\n  node scripts/ux/uxkit-lite.mjs scan [--json]');
}
