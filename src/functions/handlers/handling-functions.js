const chalk = require('chalk');

/** 
* Log A Message To The Console
* @param{String} tag
* @param {String} content
*/
async function logger(tag, content) {
    console.log(
      chalk.yellow('[ ')+
      chalk.blue.underline(chalk.italic(tag))+
      chalk.yellow(' ]'),
      chalk.hex("#ff5ef6").bold(content)
    )
}

module.exports = {
  logger
}