const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { token } = process.env;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel, Partials.Guild, Partials.Role]
});

client.login(token)