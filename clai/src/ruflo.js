const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const { exec, spawn } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

function spawnInherit(command, args, options = {}) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    });
    child.on('close', (code) => resolve({ code }));
    child.on('error', (err) => resolve({ code: -1, error: err.message }));
  });
}

const RUFLO_PACKAGE = 'claude-flow@alpha';
const RUFLO_BIN = 'claude-flow';
const BACKUP_SUFFIX = `.bak-${Date.now()}`;

async function checkRufloInstalled() {
  try {
    const { stdout } = await execAsync(`${RUFLO_BIN} --version`);
    return { installed: true, version: stdout.trim() };
  } catch {
    return { installed: false, version: null };
  }
}

async function installRufloGlobal() {
  console.log(chalk.gray(`\n   npm install -g ${RUFLO_PACKAGE} ...\n`));
  const result = await spawnInherit('npm', ['install', '-g', RUFLO_PACKAGE]);
  console.log('');
  if (result.code !== 0) {
    console.error(chalk.red(`   ✗ Échec de l'installation (code ${result.code})`));
    if (result.error) console.error(chalk.red(`     ${result.error}`));
    return false;
  }
  const check = await checkRufloInstalled();
  if (check.installed) {
    console.log(chalk.green(`   ✓ Ruflo installé: ${check.version}`));
    return true;
  }
  console.log(chalk.yellow('   ⚠ Installé mais binaire introuvable sur le PATH'));
  console.log(chalk.gray('     Vérifiez: npm config get prefix'));
  return false;
}

function deepMerge(target, source) {
  if (target === null || target === undefined) return source;
  if (source === null || source === undefined) return target;
  if (typeof target !== 'object' || typeof source !== 'object') return source;
  if (Array.isArray(target) || Array.isArray(source)) {
    const arrTarget = Array.isArray(target) ? target : [];
    const arrSource = Array.isArray(source) ? source : [];
    const merged = [...arrTarget];
    for (const item of arrSource) {
      const exists = merged.some(
        (m) => JSON.stringify(m) === JSON.stringify(item)
      );
      if (!exists) merged.push(item);
    }
    return merged;
  }
  const out = { ...target };
  for (const key of Object.keys(source)) {
    out[key] = key in target ? deepMerge(target[key], source[key]) : source[key];
  }
  return out;
}

async function backupFile(filePath) {
  if (!(await fs.pathExists(filePath))) return null;
  const backupPath = `${filePath}${BACKUP_SUFFIX}`;
  await fs.copy(filePath, backupPath);
  return backupPath;
}

async function snapshotFiles(projectDir) {
  const files = [
    path.join(projectDir, 'CLAUDE.md'),
    path.join(projectDir, '.mcp.json'),
    path.join(projectDir, '.claude', 'settings.json'),
    path.join(projectDir, '.claude', 'settings.local.json'),
  ];
  const snapshots = {};
  for (const f of files) {
    if (await fs.pathExists(f)) {
      snapshots[f] = await fs.readFile(f, 'utf-8');
    }
  }
  return snapshots;
}

async function restoreSnapshot(filePath, content) {
  if (content === undefined) return;
  await fs.writeFile(filePath, content, 'utf-8');
}

async function runRufloInit(projectDir, options = {}) {
  const args = options.wizard ? ['init', '--wizard'] : ['init', '--force'];
  console.log(
    chalk.gray(
      `\n   Lancement de claude-flow ${args.join(' ')}${options.wizard ? ' (interactif)' : ''}...\n`
    )
  );
  const result = await spawnInherit(RUFLO_BIN, args, { cwd: projectDir });
  console.log('');
  if (result.code === 0) {
    console.log(chalk.green('   ✓ claude-flow init terminé'));
    return { success: true };
  }
  console.error(
    chalk.red(`   ✗ claude-flow init a échoué (code ${result.code})`)
  );
  if (result.error) console.error(chalk.red(`     ${result.error}`));
  return { success: false, code: result.code, error: result.error };
}

async function safeMergeJsonFile(filePath, originalContent, label) {
  if (originalContent === undefined) return { action: 'kept-ruflo' };
  if (!(await fs.pathExists(filePath))) {
    await fs.writeFile(filePath, originalContent, 'utf-8');
    return { action: 'restored-original' };
  }

  let userJson, rufloJson;
  try {
    userJson = JSON.parse(originalContent);
  } catch {
    return { action: 'error', reason: `${label}: JSON utilisateur invalide` };
  }
  try {
    rufloJson = JSON.parse(await fs.readFile(filePath, 'utf-8'));
  } catch {
    return { action: 'error', reason: `${label}: JSON Ruflo invalide` };
  }

  const backupPath = `${filePath}${BACKUP_SUFFIX}`;
  await fs.writeFile(backupPath, originalContent, 'utf-8');

  const merged = deepMerge(userJson, rufloJson);
  await fs.writeFile(filePath, JSON.stringify(merged, null, 2), 'utf-8');

  return { action: 'merged', backup: backupPath };
}

async function appendRufloSection(claudeMdPath, projectName) {
  const sectionTemplatePath = path.resolve(
    __dirname,
    '../templates/ruflo/CLAUDE-RUFLO-SECTION.md'
  );

  if (!(await fs.pathExists(sectionTemplatePath))) {
    return { action: 'skipped', reason: 'template ruflo introuvable' };
  }

  let sectionContent = await fs.readFile(sectionTemplatePath, 'utf-8');
  sectionContent = sectionContent.replace(
    /\{\{PROJECT_NAME\}\}/g,
    projectName || 'Project'
  );

  if (!(await fs.pathExists(claudeMdPath))) {
    await fs.writeFile(claudeMdPath, sectionContent, 'utf-8');
    return { action: 'created' };
  }

  const existing = await fs.readFile(claudeMdPath, 'utf-8');
  if (existing.includes('## Ruflo - Orchestration Multi-Agents')) {
    return { action: 'exists', reason: 'section déjà présente' };
  }

  const separator = '\n\n---\n\n';
  await fs.writeFile(claudeMdPath, existing + separator + sectionContent, 'utf-8');
  return { action: 'appended' };
}

async function initRufloInProject(options = {}) {
  const cwd = process.cwd();
  if (await fs.pathExists(path.join(cwd, '.codex'))) {
    console.log(chalk.yellow('\nRuflo est supporte uniquement pour la cible Claude.'));
    console.log(chalk.gray('Projet Codex detecte (.codex present).\n'));
    return { success: false, reason: 'codex-target-not-supported' };
  }
  console.log(chalk.blue('\n🌊 Intégration Ruflo dans le projet\n'));

  const check = await checkRufloInstalled();
  if (!check.installed) {
    console.log(chalk.yellow('⚠️  Ruflo n\'est pas installé globalement.'));
    if (!options.force) {
      const { doInstall } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'doInstall',
          message: 'Installer Ruflo maintenant (npm install -g claude-flow@alpha) ?',
          default: true,
        },
      ]);
      if (!doInstall) {
        console.log(chalk.yellow('Annulé. Lancez `clai ruflo install` plus tard.'));
        return { success: false, reason: 'user-cancelled-install' };
      }
    }
    const installed = await installRufloGlobal();
    if (!installed) return { success: false, reason: 'install-failed' };
  } else {
    console.log(chalk.gray(`   Ruflo détecté: ${check.version}`));
  }

  console.log(chalk.gray('   Snapshot des fichiers existants...'));
  const snapshots = await snapshotFiles(cwd);
  const protectedFiles = Object.keys(snapshots);
  if (protectedFiles.length > 0) {
    console.log(chalk.gray(`   ${protectedFiles.length} fichier(s) protégé(s)`));
  }

  const result = await runRufloInit(cwd, { wizard: options.wizard === true });
  if (!result.success) return { success: false, reason: 'ruflo-init-failed' };

  console.log(chalk.gray('   Restauration / merge des fichiers protégés...'));

  const claudeMdPath = path.join(cwd, 'CLAUDE.md');
  if (snapshots[claudeMdPath] !== undefined) {
    await restoreSnapshot(claudeMdPath, snapshots[claudeMdPath]);
    console.log(chalk.gray('   ✓ CLAUDE.md restauré (original préservé)'));
  }

  const localSettingsPath = path.join(cwd, '.claude', 'settings.local.json');
  if (snapshots[localSettingsPath] !== undefined) {
    await restoreSnapshot(localSettingsPath, snapshots[localSettingsPath]);
    console.log(chalk.gray('   ✓ settings.local.json restauré'));
  }

  const settingsPath = path.join(cwd, '.claude', 'settings.json');
  const settingsResult = await safeMergeJsonFile(
    settingsPath,
    snapshots[settingsPath],
    'settings.json'
  );
  if (settingsResult.action === 'merged') {
    console.log(chalk.gray(`   ✓ settings.json mergé (backup: ${path.basename(settingsResult.backup)})`));
  } else if (settingsResult.action === 'restored-original') {
    console.log(chalk.gray('   ✓ settings.json original restauré'));
  } else if (settingsResult.action === 'error') {
    console.log(chalk.red(`   ✗ settings.json: ${settingsResult.reason}`));
  }

  const mcpPath = path.join(cwd, '.mcp.json');
  const mcpResult = await safeMergeJsonFile(mcpPath, snapshots[mcpPath], '.mcp.json');
  if (mcpResult.action === 'merged') {
    console.log(chalk.gray(`   ✓ .mcp.json mergé (backup: ${path.basename(mcpResult.backup)})`));
  } else if (mcpResult.action === 'restored-original') {
    console.log(chalk.gray('   ✓ .mcp.json original restauré'));
  } else if (mcpResult.action === 'error') {
    console.log(chalk.red(`   ✗ .mcp.json: ${mcpResult.reason}`));
  }

  const projectName = options.projectName || path.basename(cwd);
  const sectionResult = await appendRufloSection(claudeMdPath, projectName);
  if (sectionResult.action === 'created') {
    console.log(chalk.gray('   ✓ CLAUDE.md créé avec section Ruflo'));
  } else if (sectionResult.action === 'appended') {
    console.log(chalk.gray('   ✓ Section Ruflo ajoutée à CLAUDE.md'));
  } else if (sectionResult.action === 'exists') {
    console.log(chalk.gray('   ↷ Section Ruflo déjà présente'));
  } else if (sectionResult.action === 'skipped') {
    console.log(chalk.yellow(`   ⚠ Section Ruflo non ajoutée: ${sectionResult.reason}`));
  }

  console.log(chalk.green('\n✅ Ruflo intégré avec succès\n'));
  console.log(chalk.blue('🎯 Prochaines étapes Ruflo:'));
  console.log(chalk.gray('   1. Redémarrez Claude Code pour charger les outils MCP'));
  console.log(chalk.gray('   2. Vérifiez avec: claude-flow status'));
  console.log(chalk.gray('   3. Initialisez la mémoire: claude-flow memory init'));
  console.log(chalk.gray('   4. Dans Claude Code: /claude-flow-help\n'));

  return { success: true, settingsResult, mcpResult, sectionResult };
}

async function statusRufloInProject() {
  const cwd = process.cwd();
  console.log(chalk.blue('\n🌊 État Ruflo dans ce projet\n'));

  const check = await checkRufloInstalled();
  console.log(
    `${check.installed ? chalk.green('✓') : chalk.red('✗')} Ruflo global: ${check.installed ? check.version : 'non installé'}`
  );

  const checks = [
    { label: '.claude-flow/config.yaml', path: path.join(cwd, '.claude-flow', 'config.yaml') },
    { label: '.claude-flow/data/', path: path.join(cwd, '.claude-flow', 'data') },
    { label: '.claude/skills/ (Ruflo)', path: path.join(cwd, '.claude', 'skills') },
    { label: '.claude/helpers/hook-handler.cjs', path: path.join(cwd, '.claude', 'helpers', 'hook-handler.cjs') },
    { label: '.mcp.json (claude-flow)', path: path.join(cwd, '.mcp.json'), checkContent: 'claude-flow' },
    { label: '.swarm/memory.db', path: path.join(cwd, '.swarm', 'memory.db') },
  ];

  for (const c of checks) {
    const exists = await fs.pathExists(c.path);
    let label = c.label;
    if (exists && c.checkContent) {
      const content = await fs.readFile(c.path, 'utf-8').catch(() => '');
      const has = content.includes(c.checkContent);
      console.log(`${has ? chalk.green('✓') : chalk.yellow('~')} ${label}${has ? '' : ' (présent mais sans ' + c.checkContent + ')'}`);
      continue;
    }
    console.log(`${exists ? chalk.green('✓') : chalk.gray('○')} ${label}`);
  }
  console.log('');
}

async function removeRufloFromProject() {
  const cwd = process.cwd();
  console.log(chalk.blue('\n🌊 Suppression de Ruflo du projet\n'));

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Confirmer la suppression de Ruflo (artefacts projet uniquement) ?',
      default: false,
    },
  ]);
  if (!confirm) {
    console.log(chalk.yellow('Annulé.'));
    return;
  }

  const targets = [
    path.join(cwd, '.claude-flow'),
    path.join(cwd, '.swarm'),
    path.join(cwd, '.hive-mind'),
  ];
  for (const t of targets) {
    if (await fs.pathExists(t)) {
      await fs.remove(t);
      console.log(chalk.gray(`   ✓ Supprimé: ${path.basename(t)}/`));
    }
  }

  console.log(
    chalk.yellow(
      "\n⚠ Note: .claude/settings.json, .mcp.json et CLAUDE.md ne sont PAS modifiés automatiquement."
    )
  );
  console.log(
    chalk.gray(
      '   Restaurez-les manuellement depuis les .bak-* ou retirez les sections Ruflo à la main.'
    )
  );
  console.log(chalk.gray('   Pour désinstaller globalement: npm uninstall -g claude-flow\n'));
}

module.exports = {
  checkRufloInstalled,
  installRufloGlobal,
  initRufloInProject,
  statusRufloInProject,
  removeRufloFromProject,
};
