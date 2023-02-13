const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js')
module.exports = {
  name: `ping`,
  aliases: [],
  category: `Utility`,
  description: `Miso's Ping`,
  usage: `[]`,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    const ping = Math.round(client.ws.ping);
    const round = Date.now() - message.createdTimestamp;
    const embed = new EmbedBuilder()
      .setDescription(`**Ping:** \`${ping}ms\`\n**API Ping:** \`${round}ms\` `)
      .setColor(client.color)

    message.channel.send({ embeds: [embed] })
      .catch(() => {
        const re = client.channels.cache.get(message.channel.id)
        re.send({ embeds: [embed], content: "**There was a error executing this command**" })
      })
  }
}