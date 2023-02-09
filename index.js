console.clear();
require('./src/bot.js');

async function log(x) {
  console.log(
    chalk.blue(`[ `),
    chalk.bgGreen('SHARD'),
    chalk.blue(' ]'),
    chalk.red(chalk.bold(x))
  )
}