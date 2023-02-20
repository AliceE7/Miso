const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js');
const snekfetch = require('snekfetch')
module.exports = {
  name: `hug`,
  aliases: [],
  category: `Fun`,
  description: `hugs!`,
  usage: ``,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    try {
      const res = await snekfetch.get('https://some-random-api.ml/animu/hug')
      const data = res.body.link;
      message.channel.send(data)
    } catch(e) {
      console.log(e)
    }
  }
}