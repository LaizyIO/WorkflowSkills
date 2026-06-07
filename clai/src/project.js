const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');

function normalizeTarget(target) {
  if (!target) return null;
  const t = String(target).toLowerCase().trim();
  return t === 'claude' || t === 'codex' ? t : null;
}

function getTargetConfig(target) {
  if (target === 'codex') {
    return {
      target: 'codex',
      runtimeDirName: '.codex',
      guideFileName: 'AGENTS.md',
      guideTemplatePath: 'codex/AGENTS.md.template',
      templatesRootPath: 'codex'
    };
  }

  return {
    target: 'claude',
    runtimeDirName: '.claude',
    guideFileName: 'CLAUDE.md',
    guideTemplatePath: 'CLAUDE.md.template',
    templatesRootPath: null
  };
}

async function detectExisting(targetDir) {
  const exists = await fs.pathExists(targetDir);
  if (!exists) return { exists: false };

  const files = await fs.readdir(targetDir, { recursive: true });
  return {
    exists: true,
    count: files.length,
    files: files.slice(0, 10)
  };
}

async function smartCopy(src, dest, label, spinner, force = false) {
  if (!(await fs.pathExists(src))) {
    return { action: 'skipped', reason: 'source not found' };
  }

  const existing = await detectExisting(dest);
  if (existing.exists) {
    if (force) {
      await fs.copy(src, dest, { overwrite: true });
      return { action: 'overwritten', count: existing.count, forced: true };
    }

    spinner.stop();
    console.log(chalk.yellow('\n⚠️  ' + label + ' existe déjà avec ' + existing.count + ' fichier(s)'));

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Que voulez-vous faire?',
        choices: [
          { name: '✅ Écraser (mettre à jour)', value: 'overwrite' },
          { name: '⏭️  Ignorer (garder l\'existant)', value: 'skip' },
          { name: '🔍 Afficher les fichiers existants', value: 'show' }
        ]
      }
    ]);

    if (action === 'show') {
      console.log(chalk.gray('\nFichiers existants:'));
      existing.files.forEach((f) => console.log(chalk.gray('  - ' + f)));
      if (existing.count > 10) {
        console.log(chalk.gray('  ... et ' + (existing.count - 10) + ' autres'));
      }

      const { finalAction } = await inquirer.prompt([
        {
          type: 'list',
          name: 'finalAction',
          message: 'Action:',
          choices: [
            { name: '✅ Écraser', value: 'overwrite' },
            { name: '⏭️  Ignorer', value: 'skip' }
          ]
        }
      ]);

      spinner.start();
      if (finalAction === 'skip') {
        return { action: 'skipped', reason: 'user choice' };
      }

      await fs.copy(src, dest, { overwrite: true });
      return { action: 'overwritten', count: existing.count };
    }

    spinner.start();
    if (action === 'skip') {
      return { action: 'skipped', reason: 'user choice' };
    }

    await fs.copy(src, dest, { overwrite: true });
    return { action: 'overwritten', count: existing.count };
  }

  await fs.ensureDir(dest);
  await fs.copy(src, dest, { overwrite: false });
  return { action: 'created' };
}

async function copyTemplateTree(src, dest, replacements = {}, force = false) {
  if (!(await fs.pathExists(src))) {
    return { action: 'skipped', reason: 'source not found', created: 0, updated: 0, skipped: 0 };
  }

  let created = 0;
  let updated = 0;
  let skipped = 0;

  async function copyEntry(entrySrc, entryDest) {
    const stat = await fs.stat(entrySrc);
    if (stat.isDirectory()) {
      await fs.ensureDir(entryDest);
      const entries = await fs.readdir(entrySrc);
      for (const entry of entries) {
        await copyEntry(path.join(entrySrc, entry), path.join(entryDest, entry));
      }
      return;
    }

    const existed = await fs.pathExists(entryDest);
    if (existed && !force) {
      skipped++;
      return;
    }

    await fs.ensureDir(path.dirname(entryDest));
    let content = await fs.readFile(entrySrc, 'utf-8');
    for (const [key, value] of Object.entries(replacements)) {
      content = content.replace(new RegExp('\\{\\{' + key + '\\}\\}', 'g'), value);
    }
    await fs.writeFile(entryDest, content, 'utf-8');

    if (existed) updated++;
    else created++;
  }

  await copyEntry(src, dest);
  return {
    action: created > 0 || updated > 0 ? 'created' : 'skipped',
    created,
    updated,
    skipped
  };
}

async function findDocRoot(cwd, preferredName = null) {
  if (preferredName) {
    const preferred = path.join(cwd, '[DOC]-' + preferredName);
    if (await fs.pathExists(preferred)) return preferred;
  }

  const entries = await fs.readdir(cwd, { withFileTypes: true });
  const found = entries.find((entry) => entry.isDirectory() && entry.name.startsWith('[DOC]-'));
  return found ? path.join(cwd, found.name) : null;
}

async function ensureMocUxLink(docRoot, today) {
  const mocDir = path.join(docRoot, '00-MOC');
  const mocPath = path.join(mocDir, 'MOC-Principal.md');
  await fs.ensureDir(mocDir);

  if (!(await fs.pathExists(mocPath))) {
    await fs.writeFile(mocPath, `---
title: MOC-Principal
type: moc
status: draft
created: ${today}
updated: ${today}
tags:
  - moc
---

# MOC Principal

## UX

- [[MOC-UX]]
`, 'utf-8');
    return { action: 'created' };
  }

  let content = await fs.readFile(mocPath, 'utf-8');
  if (content.includes('[[MOC-UX]]')) {
    return { action: 'exists' };
  }

  content = content.replace(/updated:\s*\d{4}-\d{2}-\d{2}/, 'updated: ' + today);
  content += '\n\n## UX\n- [[MOC-UX]]\n';
  await fs.writeFile(mocPath, content, 'utf-8');
  return { action: 'updated' };
}

async function installUxDesignOps(cwd, docName, projectName, templatesDir, force = false) {
  const uxTemplateRoot = path.join(templatesDir, 'codex', 'ux-designops');
  const today = new Date().toISOString().split('T')[0];
  const replacements = {
    DATE: today,
    PROJECT_NAME: docName || projectName || 'Project'
  };

  const result = {
    root: await copyTemplateTree(path.join(uxTemplateRoot, 'root'), cwd, replacements, force),
    doc: null,
    moc: null,
    skipped: false,
    reason: null
  };

  const docRoot = await findDocRoot(cwd, docName);
  if (!docRoot) {
    result.skipped = true;
    result.reason = 'no [DOC]-* directory found';
    return result;
  }

  result.doc = await copyTemplateTree(path.join(uxTemplateRoot, 'doc'), docRoot, replacements, force);
  result.moc = await ensureMocUxLink(docRoot, today);
  return result;
}

async function resolveTarget(options = {}) {
  const fromFlag = normalizeTarget(options.target);
  if (fromFlag) return fromFlag;

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'target',
      message: 'Cible d\'initialisation :',
      choices: [
        { name: 'Claude Code', value: 'claude' },
        { name: 'Codex', value: 'codex' }
      ],
      default: 'codex'
    }
  ]);
  return answer.target;
}

function getTemplatesRoot(templatesDir, targetConfig) {
  return targetConfig.templatesRootPath
    ? path.join(templatesDir, targetConfig.templatesRootPath)
    : templatesDir;
}

async function initProject(projectName, options = {}) {
  const spinner = ora('Initialisation du projet...').start();

  try {
    const cwd = process.cwd();
    const templatesDir = path.resolve(__dirname, '../templates');
    const target = await resolveTarget(options);
    const targetConfig = getTargetConfig(target);

    let name = projectName;
    if (!name) {
      spinner.stop();
      const answer = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Nom du projet:',
          default: path.basename(cwd),
          validate: (input) => input.trim() !== ''
        }
      ]);
      name = answer.projectName;
      spinner.start('Initialisation...');
    }

    const runtimeDir = path.join(cwd, targetConfig.runtimeDirName);
    await fs.ensureDir(runtimeDir);

    const results = {
      commands: null,
      agents: null,
      outputStyles: null,
      cache: null,
      doc: null,
      ux: null
    };

    const forceOverwrite = options.force || false;
    const targetTemplatesRoot = getTemplatesRoot(templatesDir, targetConfig);

    spinner.text = 'Installation des commandes...';
    results.commands = await smartCopy(
      path.join(targetTemplatesRoot, 'commands'),
      path.join(runtimeDir, 'commands'),
      'Commandes',
      spinner,
      forceOverwrite
    );

    spinner.text = 'Installation des agents...';
    results.agents = await smartCopy(
      path.join(targetTemplatesRoot, 'agents'),
      path.join(runtimeDir, 'agents'),
      'Agents',
      spinner,
      forceOverwrite
    );

    spinner.text = 'Installation des output-styles...';
    results.outputStyles = await smartCopy(
      path.join(targetTemplatesRoot, 'output-styles'),
      path.join(runtimeDir, 'output-styles'),
      'Output-styles',
      spinner,
      forceOverwrite
    );

    spinner.text = 'Configuration du cache...';
    results.cache = await smartCopy(
      path.join(targetTemplatesRoot, 'cache'),
      path.join(runtimeDir, 'cache'),
      'Cache',
      spinner,
      forceOverwrite
    );

    let docName = options.doc;
    if (!docName) {
      spinner.stop();
      const { createDoc } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'createDoc',
          message: 'Créer la structure documentation Obsidian [DOC]-?',
          default: true
        }
      ]);

      if (createDoc) {
        const { docProjectName } = await inquirer.prompt([
          {
            type: 'input',
            name: 'docProjectName',
            message: 'Nom du dossier de documentation:',
            default: name,
            validate: (input) => input.trim() !== ''
          }
        ]);
        docName = docProjectName;
      }

      spinner.start('Configuration de la documentation...');
    }

    if (docName) {
      const docDir = path.join(cwd, '[DOC]-' + docName);
      const obsidianTemplateDir = path.join(templatesDir, 'obsidian');

      if (await fs.pathExists(obsidianTemplateDir)) {
        spinner.text = 'Configuration documentation Obsidian...';
        results.doc = await smartCopy(obsidianTemplateDir, docDir, 'Documentation Obsidian', spinner, forceOverwrite);
        if (results.doc.action === 'created') {
          await updateDocName(docDir, docName);
        }
        spinner.succeed('Structure [DOC]-' + docName + ' configurée');
      } else {
        spinner.warn('Template Obsidian non trouvé');
      }
    } else {
      spinner.succeed('Projet initialisé (sans documentation)');
    }

    if (target === 'codex' && options.ux !== false) {
      spinner.text = 'Installation UX DesignOps...';
      results.ux = await installUxDesignOps(cwd, docName, name, templatesDir, forceOverwrite);
      if (results.ux.skipped) {
        spinner.warn('UX DesignOps partiellement installé: ' + results.ux.reason);
      } else {
        spinner.succeed('UX DesignOps configuré');
      }
    }

    spinner.text = 'Génération du guide ' + targetConfig.guideFileName + '...';
    const guideResult = await generateGuide(cwd, name, docName, targetConfig);
    results.guide = guideResult;
    if (guideResult.action === 'created') {
      spinner.succeed('Guide ' + targetConfig.guideFileName + ' généré');
    } else if (guideResult.action === 'appended') {
      spinner.succeed(targetConfig.guideFileName + ' mis à jour (contenu ajouté)');
    } else if (guideResult.action === 'exists') {
      spinner.info(targetConfig.guideFileName + ' existe déjà (contenu présent)');
    }

    console.log(chalk.green('\n✅ Projet initialisé avec succès!\n'));
    console.log(chalk.blue('🎯 Cible: ' + target + '\n'));
    console.log(chalk.blue('📁 Actions effectuées:\n'));

    const printResult = (label, result, createdLabel, updatedLabel, skippedLabel) => {
      if (!result) return;
      const icon = result.action === 'created' ? '✨' : result.action === 'overwritten' ? '🔄' : '⏭️';
      const action = result.action === 'created' ? createdLabel : result.action === 'overwritten' ? updatedLabel : skippedLabel;
      console.log(chalk.gray('   ' + icon + ' ' + label + ' → ' + action));
    };

    printResult(targetConfig.runtimeDirName + '/commands/', results.commands, 'Créées', 'Mises à jour', 'Ignorées');
    printResult(targetConfig.runtimeDirName + '/agents/', results.agents, 'Créés', 'Mis à jour', 'Ignorés');
    printResult(targetConfig.runtimeDirName + '/output-styles/', results.outputStyles, 'Créés', 'Mis à jour', 'Ignorés');
    printResult(targetConfig.runtimeDirName + '/cache/', results.cache, 'Créé', 'Mis à jour', 'Ignoré');

    if (docName && results.doc) {
      const icon = results.doc.action === 'created' ? '✨' : results.doc.action === 'overwritten' ? '🔄' : '⏭️';
      const action = results.doc.action === 'created' ? 'Créée' : results.doc.action === 'overwritten' ? 'Mise à jour' : 'Ignorée';
      console.log(chalk.gray('   ' + icon + ' [DOC]-' + docName + '/ → ' + action));
    }

    if (results.guide) {
      const icon = results.guide.action === 'created' ? '✨' :
        results.guide.action === 'appended' ? '➕' :
        results.guide.action === 'exists' ? 'ℹ️' : '⏭️';
      const action = results.guide.action === 'created' ? 'Créé' :
        results.guide.action === 'appended' ? 'Mis à jour (ajouté)' :
        results.guide.action === 'exists' ? 'Déjà présent' : 'Ignoré';
      console.log(chalk.gray('   ' + icon + ' ' + targetConfig.guideFileName + ' → ' + action));
    }

    if (results.ux) {
      if (results.ux.skipped) {
        console.log(chalk.gray('   UX DesignOps docs → Ignorées (' + results.ux.reason + ')'));
      } else {
        console.log(chalk.gray('   ✨ UX DesignOps → Configuré ([DOC]-*/11-UX-DesignOps + DESIGN.md)'));
      }
    }

    if (target === 'claude' && options.ruflo !== false) {
      let doRuflo = options.withRuflo === true;
      if (!doRuflo) {
        const answer = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'doRuflo',
            message: 'Intégrer Ruflo (orchestration multi-agents, mémoire vectorielle) ? [optionnel]',
            default: false
          }
        ]);
        doRuflo = answer.doRuflo;
      }
      if (doRuflo) {
        const { initRufloInProject } = require('./ruflo');
        await initRufloInProject({ projectName: name, force: options.force });
      } else {
        console.log(chalk.gray('\n   Ruflo ignoré. Activable plus tard via: clai ruflo init'));
      }
    } else if (target === 'codex') {
      console.log(chalk.gray('\n   Ruflo est conservé uniquement pour la cible Claude.'));
    }

    console.log(chalk.blue('\n🎯 Prochaines étapes:'));
    console.log(chalk.gray('   1. Lancez ' + (target === 'codex' ? 'Codex' : 'Claude Code') + ' dans ce dossier'));
    console.log(chalk.gray('   2. Suivez le workflow feature et mettez à jour [DOC]-* pendant les phases de travail'));

    return true;
  } catch (error) {
    spinner.fail('Erreur lors de l\'initialisation');
    console.error(chalk.red('Erreur:'), error.message);
    return false;
  }
}

async function installGlobal(options = {}) {
  const spinner = ora('Installation globale...').start();

  try {
    const target = normalizeTarget(options.target) || 'claude';
    const targetConfig = getTargetConfig(target);
    const homeDir = os.homedir();

    const globalRuntimeDir = path.join(homeDir, targetConfig.runtimeDirName);
    const globalCommandsDir = path.join(globalRuntimeDir, 'commands');
    const globalAgentsDir = path.join(globalRuntimeDir, 'agents');

    const templatesDir = path.resolve(__dirname, '../templates');
    const targetTemplatesRoot = getTemplatesRoot(templatesDir, targetConfig);
    const commandsTemplatesDir = path.join(targetTemplatesRoot, 'commands');
    const agentsTemplatesDir = path.join(targetTemplatesRoot, 'agents');

    await fs.ensureDir(globalCommandsDir);
    await fs.ensureDir(globalAgentsDir);

    let totalInstalled = 0;

    if (await fs.pathExists(commandsTemplatesDir)) {
      const commands = await fs.readdir(commandsTemplatesDir);
      for (const cmd of commands) {
        const srcPath = path.join(commandsTemplatesDir, cmd);
        const destPath = path.join(globalCommandsDir, cmd);
        if ((await fs.stat(srcPath)).isFile()) {
          await fs.copy(srcPath, destPath, { overwrite: true });
          spinner.text = 'Installation de /' + cmd.replace('.md', '') + '...';
          totalInstalled++;
        }
      }
    }

    if (await fs.pathExists(agentsTemplatesDir)) {
      const agents = await fs.readdir(agentsTemplatesDir);
      for (const agent of agents) {
        const srcPath = path.join(agentsTemplatesDir, agent);
        const destPath = path.join(globalAgentsDir, agent);
        if ((await fs.stat(srcPath)).isFile()) {
          await fs.copy(srcPath, destPath, { overwrite: true });
          spinner.text = 'Installation de l\'agent ' + agent.replace('.md', '') + '...';
          totalInstalled++;
        }
      }
    }

    if (totalInstalled > 0) {
      spinner.succeed(totalInstalled + ' composants installés globalement');
      console.log(chalk.gray('   Commandes: ' + globalCommandsDir));
      console.log(chalk.gray('   Agents: ' + globalAgentsDir));
      console.log(chalk.gray('   Cible: ' + target));
    } else {
      spinner.warn('Aucun composant trouvé dans le package');
    }

    return true;
  } catch (error) {
    spinner.fail('Erreur lors de l\'installation globale');
    console.error(chalk.red('Erreur:'), error.message);
    return false;
  }
}

async function syncProject(options = {}) {
  const spinner = ora('Synchronisation...').start();

  try {
    const cwd = process.cwd();
    const target = normalizeTarget(options.target) ||
      (await fs.pathExists(path.join(cwd, '.codex')) ? 'codex' : 'claude');
    const targetConfig = getTargetConfig(target);
    const runtimeDir = path.join(cwd, targetConfig.runtimeDirName);

    if (!(await fs.pathExists(runtimeDir))) {
      spinner.fail('Projet non initialisé');
      console.log(chalk.yellow('💡 Utilisez: clai init --target ' + target));
      return false;
    }

    const templatesDir = path.resolve(__dirname, '../templates');
    const targetTemplatesRoot = getTemplatesRoot(templatesDir, targetConfig);

    const commandsDir = path.join(runtimeDir, 'commands');
    const commandsTemplatesDir = path.join(targetTemplatesRoot, 'commands');
    if (await fs.pathExists(commandsTemplatesDir)) {
      await fs.copy(commandsTemplatesDir, commandsDir, { overwrite: true });
    }

    const agentsDir = path.join(runtimeDir, 'agents');
    const agentsTemplatesDir = path.join(targetTemplatesRoot, 'agents');
    if (await fs.pathExists(agentsTemplatesDir)) {
      await fs.copy(agentsTemplatesDir, agentsDir, { overwrite: true });
    }

    if (target === 'codex' && options.ux !== false) {
      await installUxDesignOps(cwd, null, path.basename(cwd), templatesDir, false);
    }

    spinner.succeed('Synchronisation terminée (' + target + ')');
    return true;
  } catch (error) {
    spinner.fail('Erreur lors de la synchronisation');
    console.error(chalk.red('Erreur:'), error.message);
    return false;
  }
}

async function updateDocName(_docDir, _name) {
  return true;
}

async function generateGuide(projectDir, projectName, docName, targetConfig) {
  try {
    const templatesDir = path.resolve(__dirname, '../templates');
    const templatePath = path.join(templatesDir, targetConfig.guideTemplatePath);
    const destPath = path.join(projectDir, targetConfig.guideFileName);

    if (!(await fs.pathExists(templatePath))) {
      return { action: 'skipped', reason: 'template not found' };
    }

    let templateContent = await fs.readFile(templatePath, 'utf-8');
    const pkg = require('../package.json');
    const today = new Date().toISOString().split('T')[0];

    templateContent = templateContent
      .replace(/\{\{PROJECT_NAME\}\}/g, docName || projectName || 'Project')
      .replace(/\{\{DATE\}\}/g, today)
      .replace(/\{\{CLAI_VERSION\}\}/g, pkg.version);

    if (await fs.pathExists(destPath)) {
      const existingContent = await fs.readFile(destPath, 'utf-8');
      if (
        existingContent.includes('## Feature Workflow Skills') &&
        existingContent.includes('## RÈGLE CRITIQUE : Suivre la Documentation Obsidian')
      ) {
        return { action: 'exists', path: targetConfig.guideFileName, reason: 'content already present' };
      }

      const separator = '\n\n---\n\n# Workflow Skills Suite - Configuration Ajoutée\n\n';
      await fs.writeFile(destPath, existingContent + separator + templateContent, 'utf-8');
      return { action: 'appended', path: targetConfig.guideFileName };
    }

    await fs.writeFile(destPath, templateContent, 'utf-8');
    return { action: 'created', path: targetConfig.guideFileName };
  } catch (error) {
    return { action: 'error', reason: error.message };
  }
}

module.exports = {
  initProject,
  installGlobal,
  syncProject,
  getTargetConfig,
  normalizeTarget
};
