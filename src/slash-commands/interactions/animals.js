const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('animal')
  .setDescription('cat: animal')
  .addSubcommand(sub => sub.setName('cat').setDescription('cats!'))
  .addSubcommand(sub => sub.setName('bird').setDescription('birds!')),
  run: async (client, interaction) => {
    await interaction.deferReply({ fetchReply: true });
    client.handleSubcommand(client, interaction)
  }
}