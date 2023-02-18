const { PermissionsBitField: { Flags } } = require('discord.js');
const snekfetch = require('snekfetch')
module.exports = {
  name: `8ball`,
  aliases: [],
  category: `Fun`,
  description: ``,
  usage: `[Q]`,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    const Q = args.join(" ");
    if (!Q) {
      return message.channel.send('Q')
    }
    if (Q < 1) return;

    try {
      const res = await snekfetch.get(`https://eightballapi.com/api?question=${Q}&lucky=false`)
      const A = res.body.reading;
      message.channel.send(A).catch(() => { })
    } catch (e) { console.error(e) }
  }
}