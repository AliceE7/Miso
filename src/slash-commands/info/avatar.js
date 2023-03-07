const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('information commands')
    .addSubcommand((sub) =>
      sub
        .setName('avatar')
        .setDescription('returns users avatar!')
        .addUserOption((op) =>
          op.setName('user')
            .setDescription('get a users avatar')
            .setRequired(false)
        )
    ),
  run: async (client, interaction) => {
    const user = interaction.options.get('user');
    if (user) {
      const member = interaction.guild.members.cache.get(user.value);
      const embed = new EmbedBuilder()
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setImage(member.user.displayAvatarURL({ format: "png" , size: 4096 }))

      return interaction.reply({ embeds: [embed] });
    } else {
      const member = interaction.guild.members.cache.get(interaction.user.id);
      const embed = new EmbedBuilder()
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL() })
        .setImage(member.user.displayAvatarURL({ format: "png", size: 4096 }))

      return interaction.reply({ embeds: [embed] });
    }
  }
}