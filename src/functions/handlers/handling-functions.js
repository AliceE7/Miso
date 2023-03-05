

const chalk = require('chalk')
async function logger(tag, content) {
  if (tag) {
    console.log(
      chalk.red('[ '),
      chalk.green(tag),
      chalk.red(' ]'),
      chalk.blue(content)
    )
  } else {
    console.log(
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