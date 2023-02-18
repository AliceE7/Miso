const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js')
const snekfetch = require('snekfetch')
module.exports = {
  name: `cat`,
  aliases: [],
  category: `Fun`,
  description: ``,
  usage: ``,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    try {
    const res = await snekfetch.get("https://some-random-api.ml/animal/cat")
    const data = res.body.image;
    const fact = res.body.fact;
    const embed = new EmbedBuilder()
      .setImage(data)
      .setDescription(`**fact:** ${fact}`)
      .setFooter({ text: 'Powered By: https://some-random-api.ml' })
      .setColor(client.color)
    message.channel.send({ embeds: [embed] })
    } catch(e) { console.log(e) }
  }
}