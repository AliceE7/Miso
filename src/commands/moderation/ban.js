const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js')
module.exports = {
  name: `ban`,
  aliases: [],
  category: `Moderation`,
  description: `ban a member`,
  usage: `<user> [reason]`,
  examples: [`ban 000000000000 spamming`],
  perms: {
    member: [Flags.BanMembers],
    bot: [Flags.BanMembers]
  },
  ownerOnly: true,
  cooldown: 1000,
  run: async (client, message, args, getCommandUsage) => {
    const member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]);
    //if no user is provided
    if (!member) {
      const res = getCommandUsage(client, message, "ban");
      message.channel.send(res)
    }

    if (member.id === message.author.id) {
      message.channel.send('Cant ban ur self')
    }

    if (!member.bannable) {
      message.channel.send(`not banable`)
    }

    try {
      const ban = await message.guild.bans.create(member.id, { reason: reason })

      const memberAvatar = ban.user.avatarURL()
      const memberUsername = ban.user.username

      const embed = new EmbedBuilder()
        .setAuthor({ name: memberUsername, iconURL: memberAvatar })
        .setDescription(`${client.emoji.mark} | **banned ${memberUsername}** | ${reason}`)
        .setColor('Green')

      await message.channel.send({ embeds: [embed] })
    } catch (e) {
      message.channel.send('There was an error');
      console.log(e)
    }
  }
}