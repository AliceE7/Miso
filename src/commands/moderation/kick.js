const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js')
module.exports = {
  name: `kick`,
  aliases: [],
  category: `Moderation`,
  description: `kick a guild member`,
  usage: `[user/Id]`,
  examples: [``],
  perms: {
    member: [Flags.Administrator, Flags.KickMembers, Flags.ModerateMembers],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args, getCommandUsage) => {
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

    if (!user) {
      const res = getCommandUsage(client, message, "kick")
      return message.channel.send(res)
    }

    const reason = args.slice(1).join(" ") || "No Reason Provided"

    try {
      message.guild.members.kick(user.id, { reason: reason }).then(async (member) => {
        const msg = `**kicked** \`${member.tag}\` | ${reason} `;
        await message.channel.send({ content: msg })
      })
    } catch (e) {
      console.log(e)
    }
  }
}