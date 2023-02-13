const { client, dashboard } = require('../../configs.js');
const { token, secret } = process.env;
const chalk = require('chalk')

if (!client.prefix) {
  throw new Error(`CLIENT.PREFIX:UNDEFINED ? NONE ? MISSING`)
} else if (!client.id) {
  config('CLIENT.ID:UNDEFINED\nCLIENT:ID IS NEEDED FOR SOME FUNCTIONS, SOME FUNCTIONS MAY NOT WORK')
} else if (!dashboard.enabled) {
  config(`DASHBOARD.ENABLED:GOT_NONE`)
  config(`DASHBOARD_IS_DISABLED`)
} else if (!dashboard.callback) {
  config('DASHBOARD.CALLBACK:GOT_NONE')
  config('DASHBOARD_LOGIN_FUNCTIONS_WILL_NOT_WORK')
}

if (!token) {
  throw new Error(`ENV_ERROR.TOKEN[token]:UNDEFINED`)
} else if (!secret) {
  config(`SECRET_ENV:UNDEFINED`)
  config(`DASHBOARD_FUNCTIONS_WILL_NOT_WORK`)
}

function config(x) {
  console.log(
    chalk.bgRed(`{ `),
    chalk.red('ERROR_CONFIG:URGENT'),
    chalk.bgRed(' }'),
    chalk.orange(x)
  )
}