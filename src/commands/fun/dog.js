const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js');
const snekfetch = require('snekfetch');
module.exports = {
  name: `dog`,
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
      const res = await snekfetch.get("https://some-random-api.ml/animal/dog")
      const data = res.body.image;
      const fact = res.body.fact;
      const embed = new EmbedBuilder()
      .setDescription(`**fact:** ${fact}`)
      .setImage(data)
      .setColor(client.color)
      .setFooter({ text: `Powered By: https://some-random-api.ml/` })
      message.channel.send({ embeds: [embed] })
    } catch (e) {
      console.log(e)
    }
  }
}