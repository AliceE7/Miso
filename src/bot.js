const { Client, GatewayIntentBits, Partials, Collection, AllowedMentionsTypes } = require('discord.js');
const config = require('./config.js')
const { token } = process.env;
const mongoose = require("mongoose");
const chalk = require('chalk')
const { logger } = require('./functions/handlers/handling-functions.js');
const path = require('path');

const client = new Client({
  intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel, Partials.Guild, Partials.Role],
  allowedMentions: []
});

client.commands = new Collection();
client.category = require("fs").readdirSync(path.join(__dirname, "commands"));
client.aliases = new Collection();
client.slash = new Collection();
client.config = config;
client.log = logger;
client.prefix = "*"
client.color = "#0e0606";
client.db = require('./database/mongoose.js');

["event", "command", "slash-command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

if (client.isReady) {
  setTimeout(() => {
    require('../dashboard/app.js')(client);
  }, 9000)
}

mongoose.set('strictQuery', true)
mongoose.connect(process.env.mongo, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 90000,
  keepAlive: true,
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