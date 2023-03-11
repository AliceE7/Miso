const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = async (client, interaction) => {
  const { user } = interaction;
  const res = await snekfetch.get('https://some-random-api.ml/animal/bird');
  const image = res.body.image;
  const fact = res.body.fact;

  const embed = new EmbedBuilder()
    .setColor(client.color)
    .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
    .setFooter({ text: `Powered By:` })
    .setDescription(`**Fact:** ${fact}`)
    .setImage(image)

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setEmoji("🔄")
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('newBird')
    )

  interaction.editReply({ embeds: [embed], components: [row] });

  const filter = i => i.customId === 'newBird' && i.user.id === user.id;
  const collector = interaction.channel.createMessageComponentCollector({ filter, idle: 15000 });

  collector.on('collect', async (i) => {
    const newRes = await snekfetch.get('https://some-random-api.ml/animal/bird');
    const newImage = newRes.body.image;
    const newFact = newRes.body.fact;
    const newone = new EmbedBuilder()
      .setColor(client.color)
      .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
      .setFooter({ text: `Powered By:` })
      .setDescription(`**Fact:** ${newFact}`)
      .setImage(newImage)
    i.update({ embeds: [newone], components: [row] });
  });

  collector.on('end', (i) => {
    const updated = row.components.forEach(button => button.setDisabled(true))
    i.editReply({ embeds: [embed], components: [updated] })
  })
}