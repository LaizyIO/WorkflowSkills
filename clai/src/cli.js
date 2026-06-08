const { program } = require('commander');
const chalk = require('chalk');
const { checkClaude, installClaude } = require('./checker');
const { setupMarketplace } = require('./marketplace');
const { initProject, installGlobal, syncProject, runMojibakeCheck } = require('./project');
const {
  checkRufloInstalled,
  installRufloGlobal,
  initRufloInProject,
  statusRufloInProject,
  removeRufloFromProject
} = require('./ruflo');

const pkg = require('../package.json');

program
  .name('clai')
  .description('CLI pour Workflow Skills Suite - Claude Code et Codex')
  .version(pkg.version);

program
  .command('check')
  .description('Verifie si Claude Code CLI est installe')
  .action(async () => {
    console.log(chalk.blue('Verification de Claude Code CLI...\n'));
    const result = await checkClaude();

    if (result.installed) {
      console.log(chalk.green('Claude Code CLI est installe'));
      console.log(chalk.gray('   Version: ' + result.version));
      console.log(chalk.gray('   Path: ' + result.path));
    } else {
      console.log(chalk.red('Claude Code CLI n\'est pas installe'));
      console.log(chalk.yellow('\nUtilisez: clai install'));
    }
  });

program
  .command('install')
  .description('Installe Claude Code CLI si necessaire')
  .action(async () => {
    console.log(chalk.blue('Installation de Claude Code CLI...\n'));
    await installClaude();
  });

program
  .command('setup')
  .description('Affiche les instructions pour ajouter le marketplace plugin')
  .action(async () => {
    console.log(chalk.blue('Setup Workflow Skills Suite...\n'));

    const check = await checkClaude();
    if (!check.installed) {
      console.log(chalk.yellow('Claude Code CLI n\'est pas installe'));
      console.log(chalk.gray('   Vous pouvez quand meme configurer le marketplace\n'));
    }

    await setupMarketplace();

    console.log(chalk.green('Configuration terminee!'));
    console.log(chalk.gray('   Apres avoir ajoute le plugin, utilisez: clai init [name]'));
  });

program
  .command('init [name]')
  .description('Initialise un projet avec commandes et docs (target claude|codex)')
  .option('-d, --doc <name>', 'Nom du dossier [DOC]-')
  .option('-f, --force', 'Force l\'ecrasement sans confirmation')
  .option('-t, --target <target>', 'Cible d\'installation: claude ou codex')
  .option('--no-ux', 'Ne pas installer UX DesignOps pour la cible Codex')
  .option('--with-ruflo', 'Integre Ruflo (multi-agents) sans prompter')
  .option('--no-ruflo', 'Desactive le prompt Ruflo')
  .action(async (name, options) => {
    console.log(chalk.blue('Initialisation du projet...\n'));
    await initProject(name, options);
    console.log(chalk.green('\nProjet initialise avec succes!'));
  });

const rufloCmd = program
  .command('ruflo')
  .description('Gestion de l\'integration Ruflo (orchestration multi-agents)');

rufloCmd
  .command('install')
  .description('Installe Ruflo (claude-flow@alpha) globalement')
  .action(async () => {
    const check = await checkRufloInstalled();
    if (check.installed) {
      console.log(chalk.green('Ruflo deja installe: ' + check.version));
      return;
    }
    await installRufloGlobal();
  });

rufloCmd
  .command('init')
  .description('Integre Ruflo dans le projet courant (safe merge)')
  .option('-f, --force', 'Skippe les prompts')
  .option('--wizard', 'Lance claude-flow init en mode wizard interactif')
  .action(async (options) => {
    await initRufloInProject(options);
  });

rufloCmd
  .command('status')
  .description('Affiche l\'etat Ruflo du projet courant')
  .action(async () => {
    await statusRufloInProject();
  });

rufloCmd
  .command('remove')
  .description('Supprime les artefacts Ruflo du projet (sans toucher CLAUDE.md/settings.json)')
  .action(async () => {
    await removeRufloFromProject();
  });

program
  .command('global')
  .description('Installe les commandes au niveau global (~/.claude/ ou ~/.codex/)')
  .option('-t, --target <target>', 'Cible d\'installation globale: claude ou codex')
  .action(async (options) => {
    console.log(chalk.blue('Installation des commandes globales...\n'));
    await installGlobal(options);
    console.log(chalk.green('\nCommandes globales installees!'));
  });

program
  .command('sync')
  .description('Met a jour les commandes et skills')
  .option('-t, --target <target>', 'Cible de sync: claude ou codex')
  .option('--no-ux', 'Ne pas synchroniser UX DesignOps pour la cible Codex')
  .action(async (options) => {
    console.log(chalk.blue('Synchronisation...\n'));
    await syncProject(options);
    console.log(chalk.green('\nSynchronisation terminee!'));
  });

program
  .command('check-mojibake [paths...]')
  .description('Detecte les sequences mojibake dans les fichiers texte du projet')
  .action(async (paths) => {
    const code = await runMojibakeCheck(paths);
    process.exitCode = code;
  });

program
  .command('i [name]')
  .description('Alias pour: init [name]')
  .action((name, options) => {
    program.commands.find((cmd) => cmd.name() === 'init').action(name, options);
  });

program
  .command('g')
  .description('Alias pour: global')
  .action(() => {
    program.commands.find((cmd) => cmd.name() === 'global').action({});
  });

program
  .command('s')
  .description('Alias pour: sync')
  .action(() => {
    program.commands.find((cmd) => cmd.name() === 'sync').action({});
  });

program.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
