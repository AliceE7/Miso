const { PermissionsBitField: { Flags } } = require('discord.js');
const snekfetch = require('snekfetch')
module.exports = {
  name: `joke`,
  aliases: [],
  category: `Fun`,
  description: `Jokes!`,
  usage: ``,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    try {
      const res = await snekfetch.get('https://some-random-api.ml/others/joke');
      const data = res.body.joke;
      message.channel.send(data)
    } catch(e) {
      console.log(e)
    }
  }
}