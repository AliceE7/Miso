const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('avatar')
  .setDescription('get a users avatar!')
  .setDefaultMemberPermissions(PermissionsBitField.Flags.UseApplicationCommands)
  .addUserOption((option) => option.setName('user').setDescription('specific user').setRequired(false)),
  run: async (client, interaction) => {
    const user = interaction.options.get('user') || interaction.user;
    interaction.reply({ content: user.id, ephemeral: true })
  }
}