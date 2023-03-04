

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
  logger
}