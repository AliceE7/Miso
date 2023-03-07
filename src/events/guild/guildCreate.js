const { EmbedBuilder, WebhookClient } = require('discord.js');
const settings = require('../../database/schemas/guild.js')
module.exports = async (client, guild) => {

  await settings.findOneAndUpdate(
    { id: guild.id }, { name: guild.name }, { upsert: true }
  )

  const webhook = new WebhookClient({ url: process.env.webhook })
  const embed = new EmbedBuilder()
    .addFields(
      { name: "Guild:", value: guild.name },
      { name: "Id:", value: guild.id },
      { name: "Owner:", value: "<@" + guild.ownerId + ">" },
    )
    .setColor(client.color)
    .setTimestamp(guild.createdAt)
    .setAuthor({ name: guild.name, iconURL: guild.iconURL() })

  webhook.send({ embeds: [embed] }).catch(console.error)
}