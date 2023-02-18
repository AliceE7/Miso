const { PermissionsBitField: { Flags } } = require('discord.js');
const snekfetch = require('snekfetch');
module.exports = {
  name: `fox`,
  aliases: [],
  category: `Fun`,
  description: `Fox!`,
  usage: ``,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    try {
      const res = await snekfetch.get("https://randomfox.ca/floof/")
      const data = res.body.image;
      message.channel.send(data)
    } catch(e) {
      console.log(e)
    }
  }
}