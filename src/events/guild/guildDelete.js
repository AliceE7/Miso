const { EmbedBuilder, WebhookClient } = require('discord.js');
const settings = require('../../database/schemas/guild.js');

module.exports = async (client, guild) => {

  settings.findOneAndDelete({ id: guild.id })
    .catch(console.error)

  const webhook = new WebhookClient({ url: process.env.webhook })
  const embed = new EmbedBuilder()
    .setColor("Red")
    .addFields(
      { name: "Guild:", value: guild.name },
      { name: "Id:", value: guild.id },
      { name: "Owner:", value: "<@" + guild.ownerId + ">" }
    )
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })

  webhook.send({ embeds: [embed] })
}