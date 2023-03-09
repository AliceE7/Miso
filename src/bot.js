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
client.slash_commands = new Collection();
client.commandArray = [];
client.config = config;
client.emoji = config.emoji;
client.log = logger;
client.prefix = "*"
client.color = "30b38a";
client.db = require('./database/mongoose.js');

["event", "command", "slash-command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

require('./functions/client.js')(client);

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
}).then(() => { logger('MONGO', "MongoDB Connected!") })

process.on("rejectionHandled", (promise) => {
  logger('ERROR', promise)
});
process.on("uncaughtException", (error, orgin) => {
  logger('ERROR', error + "\n" + orgin)
});
process.on("unhandledRejection", (promise, reason) => {
  console.error(promise, reason)
});

client.handleCommands()

client.login(token)

module.exports = {
  client
}