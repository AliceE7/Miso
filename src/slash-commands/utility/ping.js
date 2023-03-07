const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('me')
  .setDescription('commands for miso')
  .addSubcommand((sub) => 
    sub
    .setName('ping')
    .setDescription('returns bots ping')
  ),
  run: async (client, interaction) => {
    const { member, user } = interaction;
    const ws = client.ws.ping;
    
    const embed = new EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription(`**Ping:** ${ws}ms`)
    .setColor(client.color)
    
    interaction.reply({ embeds: [embed] });
  }
}