const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js')
const Snekfetch = require('snekfetch')
module.exports = {
  name: `kangaroo`,
  aliases: [],
  category: ``,
  description: `get random cute kangaroo!!`,
  usage: ``,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    try {
      const res = await Snekfetch.get("https://some-random-api.ml/animal/kangaroo")
      const data = res.body.image;
      const fact = res.body.fact;
      const embed = new EmbedBuilder()
      .setDescription('**Fact:** ' + fact)
      .setImage(data)
      .setColor(client.color)
      await message.channel.send({ embeds: [embed] })
    } catch(e) {
      console.log(e)
    }
  }
}