const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js');
const moment = require('moment')
module.exports = {
  name: `uptime`,
  aliases: [],
  category: `Utility`,
  description: `Get Miso's Uptime`,
  usage: ``,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
   const uptime = moment(client.uptime).format("HH mm ss")
    
    const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ size: 512 })})
    .setDescription(uptime)
    .setFooter({ text: client.ws.ping + " | " + message.id })
    .setColor(client.color)

    await message.channel.send({ embeds: [embed] })
  }
}