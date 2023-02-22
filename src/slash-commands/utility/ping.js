const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping Pong")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
    .setDescription(`**Ping:** \`${client.ws.ping}ms\``)
    .setColor(client.color)
    interaction.reply({ embeds: [embed], ephemeral: true })
    .catch(console.error)
  },
};