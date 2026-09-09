const { exec } = require('child_process');
const { promisify } = require('util');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const os = require('os');

const execAsync = promisify(exec);

/**
 * Vérifie si Claude Code CLI est installé
 */
async function checkClaude() {
  try {
    const { stdout } = await execAsync('claude --version');
    const version = stdout.trim();

    // Trouver le path
    let path = '';
    try {
      const { stdout: wherePath } = await execAsync(
        os.platform() === 'win32' ? 'where claude' : 'which claude'
      );
      path = wherePath.trim().split('\n')[0];
    } catch (e) {
      path = 'unknown';
    }

    return {
      installed: true,
      version,
      path
    };
  } catch (error) {
    return {
      installed: false,
      version: null,
      path: null
    };
  }
}

/**
 * Installe Claude Code CLI
 */
async function installClaude() {
  const spinner = ora('Vérification de l\'installation...').start();

  // Check si déjà installé
  const check = await checkClaude();
  if (check.installed) {
    spinner.succeed('Claude Code CLI est déjà installé');
    console.log(chalk.gray(`Version: ${check.version}`));
    return;
  }

  spinner.stop();

  // Demander confirmation
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Voulez-vous installer Claude Code CLI maintenant?',
      default: true
    }
  ]);

  if (!confirm) {
    console.log(chalk.yellow('Installation annulée'));
    return;
  }

  // Déterminer la plateforme
  const platform = os.platform();
  let installCmd = '';

  if (platform === 'darwin') {
    // macOS
    installCmd = 'brew install anthropics/claude/claude';
  } else if (platform === 'linux') {
    // Linux
    console.log(chalk.yellow('\n📋 Installation manuelle requise pour Linux:'));
    console.log(chalk.gray('1. Visitez: https://github.com/anthropics/anthropic-sdk-typescript'));
    console.log(chalk.gray('2. Suivez les instructions d\'installation\n'));
    return;
  } else if (platform === 'win32') {
    // Windows
    console.log(chalk.yellow('\n📋 Installation manuelle requise pour Windows:'));
    console.log(chalk.gray('1. Visitez: https://github.com/anthropics/anthropic-sdk-typescript'));
    console.log(chalk.gray('2. Téléchargez l\'installateur Windows'));
    console.log(chalk.gray('3. Suivez les instructions d\'installation\n'));
    return;
  }

  // Installation pour macOS via Homebrew
  spinner.start('Installation en cours...');
  try {
    await execAsync(installCmd);
    spinner.succeed('Claude Code CLI installé avec succès!');

    // Vérifier l'installation
    const verification = await checkClaude();
    if (verification.installed) {
      console.log(chalk.green(`✅ Version installée: ${verification.version}`));
    }
  } catch (error) {
    spinner.fail('Erreur lors de l\'installation');
    console.error(chalk.red('\n❌ Erreur:'), error.message);
    console.log(chalk.yellow('\n💡 Installation manuelle:'));
    console.log(chalk.gray('   Visitez: https://code.claude.com/install'));
  }
}

module.exports = {
  checkClaude,
  installClaude
};
