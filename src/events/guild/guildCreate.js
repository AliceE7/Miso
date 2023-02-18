const { EmbedBuilder, WebhookClient } = require('discord.js');
const settings = require('../../database/schemas/guild.js')
module.exports = async(client, guild) => {
  //create a database for this guild
  const setting = await settings.findOne({ id: guild.id })
  .catch(console.error)
  if(!setting) {
    let newd = await new settings({
      id: guild.id,
      name: guild.id
    })
      newd.save()
  }

  //build the webhook
  const webhook = new WebhookClient({ url: process.env.webhook })

  //guild 
  const owner = guild.ownerId;

  const embed = new EmbedBuilder() 
  .addFields(
    { name: "Guild:", value: guild.name },
    { name: "Id:", value: guild.id },
    { name: "Owner:", value: owner },
  )
  .setColor(client.color)
  .setTimestamp(guild.createdAt)
  .setAuthor({ name: guild.name, iconURL: guild.iconURL() })

  //send the message to miso's test guild 
  webhook.send({ embeds: [embed] }).catch(console.error)
}