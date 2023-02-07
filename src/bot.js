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
client.prefix = "e!";

["event", "command", "slash-command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.login(token);