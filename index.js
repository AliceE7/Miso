const { version } = require('./package.json');
const { logger } = require('./src/functions/handlers/handling-functions');

console.clear();
logger('SYSTEM', `Version: ${version}`)
require('./src/bot.js');