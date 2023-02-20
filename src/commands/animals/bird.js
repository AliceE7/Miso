const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js');
const snekfetch = require('snekfetch');
module.exports = {
  name: `bird`,
  aliases: [],
  category: `Fun`,
  description: `get random cute birds!!`,
  usage: ``,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    try {
      const res = await snekfetch.get('https://some-random-api.ml/animal/bird')
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