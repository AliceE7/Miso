const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { token } = process.env;
const { initializeMongoose } = require('./database/mongoose.js')
initializeMongoose();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel, Partials.Guild, Partials.Role]
});

client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.usedcommands = "";
client.prefix = "*"
client.color = 0x333333;

["event", "command", "slash-command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

require('../dashboard/app.js')(client);

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