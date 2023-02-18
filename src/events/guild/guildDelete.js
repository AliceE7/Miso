const { EmbedBuilder, WebhookClient } = require('discord.js');
const settings = require('../../database/schemas/guild.js');

module.exports = async(client, guild) => {
  settings.findOneAndDelete({ id: guild.id })
  .catch(console.error)
}