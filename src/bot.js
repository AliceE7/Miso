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
  console.error('unhandledRejection:\n' + promise)
});
process.on("uncaughtException", (error, orgin) => {
  console.error('unhandledRejection:\n' + "Orgin:\n" + orgin + "\n" + error)
});
process.on("uncaughtExceptionMonitor", (error, orgin) => {
  console.error('unhandledRejection:\n' + "Orgin:\n" + orgin + "\n" + error)
});
process.on("unhandledRejection", (reason, promise) => {
  console.error('unhandledRejection:\n' + "Reason:\n" + reason + "\n" + promise)
});

client.login(token)

module.exports = {
  client
}