console.clear();
require('./src/bot.js');
const { sendError } = require("./src/functions/WMAQv-h/handling-functions.js");

process.on("rejectionHandled", (promise) => {
  sendError(promise)
})

process.on("uncaughtException", (error, orgin) => {
  sendError(error, orgin)
})

process.on("uncaughtExceptionMonitor", (error, orgin) => {
  sendError(error, orgin)
})

process.on("unhandledRejection", (reason, promise) => {
  sendError(promise, reason)
})

process.on("warning", (warning) => {
  sendError(warning)
})

/**  */
process.on("beforeExit", (code) => {
  sendError(code)
})

process.on("disconnect", () => {
  sendError("xx", "xx", "xx", "xx")
})

process.on("exit", (code) => {
  sendError(code)
})
