const chalk = require('chalk');

/** 
* Log A Message To The Console
* @param{String} tag
* @param {String} content
*/
async function logger(tag, content) {
    console.log(
      chalk.hex("#e4e41c").bold('[ ')+
      chalk.hex("#f88949").underline(chalk.italic(tag))+
      chalk.hex("#e4e41c").bold(' ]'),
      chalk.hex("#f1483d").bold(content)
    )
}

module.exports = {
  logger
}