const { PermissionsBitField: { Flags } } = require('discord.js');
const snekfetch = require('snekfetch');
module.exports = {
  name: `duck`,
  aliases: [],
  category: `Fun`,
  description: `ducks!`,
  usage: ``,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    try {
      const res = await snekfetch.get("https://random-d.uk/api/v2/random")
      const data = res.body.url;
      message.channel.send(data)
    } catch (e) {
      console.log(e)
    }
  }
}