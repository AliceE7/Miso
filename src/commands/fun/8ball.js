const { PermissionsBitField: { Flags } } = require('discord.js');
const snekfetch = require('snekfetch')
module.exports = {
  name: `8ball`,
  aliases: [],
  category: `Fun`,
  description: ``,
  usage: `[Q]`,
  examples: [`8ball is miso a good bot`],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args, getCommandUsage) => {
    const Q = args.join(" ");
    if (!Q) {
      const usage = getCommandUsage(client, message, "8ball")
      return message.channel.send(usage)
    }
    if (Q < 1) {
      return;
    }

    try {
      const res = await snekfetch.get(`https://eightballapi.com/api?question=${Q}&lucky=false`)
      const A = res.body.reading;
      message.channel.send(A).catch(() => { })
    } catch (e) { console.error(e) }
  }
}