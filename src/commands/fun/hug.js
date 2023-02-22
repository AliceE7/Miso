const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js');
const snekfetch = require('snekfetch')
module.exports = {
  name: `hug`,
  aliases: [],
  category: `Fun`,
  description: `hug someone!`,
  usage: ``,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    try {
      const member = message.mentions.users.first()

      const res = await snekfetch.get('https://some-random-api.ml/animu/hug');
      const data = res.body.link;
      if (member.id === message.author.id) {
        const embed = new EmbedBuilder()
          .setDescription(`${client.user.toString()} hugs ${message.member.toString()}`)
          .setImage(data)
          .setColor(client.color)
        await message.channel.send({ embeds: [embed] })
      }
      if (member) {
        const embed = new EmbedBuilder()
          .setDescription(`${message.member.toString()} hugs <@${member.id}>`)
          .setImage(data)
          .setColor(client.color)
        await message.channel.send({ embeds: [embed] })
      } else {
        const embed = new EmbedBuilder()
          .setDescription(`${client.user.toString()} hugs ${message.member.toString()}`)
          .setImage(data)
          .setColor(client.color)
        await message.channel.send({ embeds: [embed] })
      }
    } catch (e) {
      console.log(e)
    }
  }
}