const chalk = require('chalk');
const inquirer = require('inquirer');
const { execSync } = require('child_process');

/**
 * Affiche les instructions pour ajouter le marketplace via /plugin
 */
async function setupMarketplace() {
  console.log(chalk.blue('📚 Configuration du Marketplace Plugin\n'));

  // Repository par défaut
  const marketplaceUrl = 'LaizyIO/WorkflowSkills';

  // Afficher les instructions
  console.log(chalk.green('✅ Pour ajouter Workflow Skills Suite à Claude Code:\n'));

  console.log(chalk.yellow('1.') + ' Lancez Claude Code dans votre projet:');
  console.log(chalk.gray('   $ claude\n'));

  console.log(chalk.yellow('2.') + ' Exécutez la commande plugin:');
  console.log(chalk.gray('   /plugin\n'));

  console.log(chalk.yellow('3.') + ' Ajoutez le repository:');
  console.log(chalk.cyan(`   ${marketplaceUrl}\n`));

  console.log(chalk.green('🎉 Le marketplace sera disponible avec tous les skills et commandes!\n'));

  console.log(chalk.gray('💡 Alternative: Ajoutez manuellement dans ~/.claude/settings.json:'));
  console.log(chalk.gray(`
{
  "extraKnownMarketplaces": {
    "workflow-skills": {
      "source": {
        "source": "github",
        "repo": "${marketplaceUrl}"
      }
    }
  }
}`));

  // Configuration du serveur MCP DeepWiki
  console.log(chalk.blue('\n🔌 Configuration du serveur MCP DeepWiki\n'));

  try {
    console.log(chalk.gray('Installation du serveur MCP DeepWiki...'));
    execSync('claude mcp add -s user -t http deepwiki https://mcp.deepwiki.com/mcp', {
      stdio: 'inherit'
    });
    console.log(chalk.green('✅ Serveur MCP DeepWiki configuré avec succès!\n'));
  } catch (error) {
    console.log(chalk.yellow('⚠️  Impossible de configurer automatiquement le serveur MCP DeepWiki'));
    console.log(chalk.gray('   Vous pouvez le configurer manuellement avec:'));
    console.log(chalk.cyan('   claude mcp add -s user -t http deepwiki https://mcp.deepwiki.com/mcp\n'));
  }

  return { marketplaceUrl };
}

module.exports = {
  setupMarketplace
};
