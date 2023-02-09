console.clear();
require('./src/bot.js');

process.on("warning", (warning) => {
  sendError(warning)
});

/**  */
process.on("beforeExit", (code) => {
  sendError(code)
});

process.on("disconnect", () => {
  sendError("xx", "xx", "xx", "xx")
});

process.on("exit", (code) => {
  sendError(code)
});

async function log(x) {
  console.log(
    chalk.blue(`[ `),
    chalk.bgGreen('SHARD'),
    chalk.blue(' ]'),
    chalk.red(chalk.bold(x))
  )
}