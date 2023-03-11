const { version } = require('./package.json');
const { logger } = require('./src/functions/functions.js');

console.clear();
logger('SYSTEM', `Version: ${version}`)
require('./src/bot.js');