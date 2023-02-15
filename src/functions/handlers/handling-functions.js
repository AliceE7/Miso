async function run(client) {
  setTimeout(() => {
    if (client.config.dashboard.enabled) {
      require('../../../dashboard/app.js')
      logger("DASHBOARD", "Launching Dashboard.")
    } else { return; }
  }, 10000) // wait for client to be ready  (10s)
}

const chalk = require('chalk')
async function logger(tag, content) {
  if(tag) {
    await console.log(
      chalk.red('[ '),
      chalk.green(tag),
      chalk.red(' ]'),
      chalk.blue(content)
    )
  } else {
   await console.log(
    chalk.red('[ '),
    chalk.green('LOG'),
    chalk.red(' ]'),
    chalk.blue(content)
  )
  }
}

module.exports = {
  run,
  logger
}