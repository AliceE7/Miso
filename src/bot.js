const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { token } = process.env;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel, Partials.Guild, Partials.Role]
});

client.commands = new Collection();

["event", "command", "slash-command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
})

client.login(token);