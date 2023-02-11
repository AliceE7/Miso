const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { token } = process.env;
const mongoose = require("mongoose");
const chalk = require('chalk')

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel, Partials.Guild, Partials.Role]
});

client.commands = new Collection();
client.aliases = new Collection();
client.slash = new Collection();
client.usedcommands = "";
client.prefix = "*"
client.color = "#7d76ff";
client.db = require('./database/mongoose.js');

["event", "command", "slash-command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

require('../dashboard/app.js')(client);


mongoose.set('strictQuery', true)
mongoose.connect(process.env.mongo, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 90000,
  keepAlive: false,
});

console.log(
  chalk.red("[ "), chalk.italic(chalk.green("MONGO")), chalk.red(" ]"),
  chalk.blue(`MongoDB Connected!`)
)

process.on("rejectionHandled", (promise) => {
  console.error(promise)
});
process.on("uncaughtException", (error, orgin) => {
  console.error(error, orgin)
});
process.on("uncaughtExceptionMonitor", (error, orgin) => {
  console.error(error, orgin)
});
process.on("unhandledRejection", (promise, reason) => {
  console.error(promise, reason)
});

client.login(token)

module.exports = {
  client
}