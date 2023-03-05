const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js');
const snekfetch = require('snekfetch');
module.exports = {
  name: `quote`,
  aliases: [],
  category: ``,
  description: `get a random quote`,
  usage: ``,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    try {
      const res = await snekfetch.get('https://some-random-api.ml/animu/quote')
      const data = res.body.sentence;
      const character = res.body.character;
      const anime = res.body.anime;
      const embed = new EmbedBuilder()
      .setDescription(`${data}\n**Character:** ${character}\n**Anime:** ${anime}`)
      .setFooter({ text: 'Powered By: https://some-random-api.ml' })
      .setColor(client.color)
      await message.channel.send({ embeds: [embed] })
    } catch(e) {
      console.log(e)
    }
  }
}