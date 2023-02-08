console.clear();
require('./src/bot.js');
const { sendError } = require("./src/functions/handlers/handling-functions.js");
/*const { ShardingManager } = require('discord.js');
const chalk = require('chalk');

const manager = new ShardingManager('./src/bot.js', {
  token: process.env.token
});

manager.on("shardCreate", (shard) => {
  log(`Launching Shard: ${shard}`)
})*/


process.on("rejectionHandled", (promise) => {
  sendError(promise)
});

process.on("uncaughtException", (error, orgin) => {
  sendError(error, orgin)
});

process.on("uncaughtExceptionMonitor", (error, orgin) => {
  sendError(error, orgin)
});

process.on("unhandledRejection", (reason, promise) => {
  sendError(promise, reason)
});

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