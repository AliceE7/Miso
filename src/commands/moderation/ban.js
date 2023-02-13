const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js')
module.exports = {
  name: `ban`,
  aliases: [],
  category: `Moderation`,
  description: `Ban a user`,
  usage: `<user/ID> [reason]`,
  examples: [``],
  perms: {
    member: [Flags.Administrator, Flags.BanMembers, Flags.ManageGuild],
    bot: [Flags.BanMembers]
  },
  ownerOnly: true,
  run: async (client, message, args, getCommandUsage) => {
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])

    if (!user) {
      const res = getCommandUsage(client, message, "ban")
      return message.channel.send(res)
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`Cannot find that user in the server.`)
    }

    if (member.permissions.has(Flags.Administrator, Flags.ManageGuild, Flags.BanMembers)) {
      return;
    }

    const reason = args.slice(1).join(" ") || "No Reason Provided"

    let dm = new EmbedBuilder()
      .setDescription(`You were banned in **${message.guild.name}**`)
      .setColor('Red')
      .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })

    await member.send({ embeds: [dm] }).catch(() => { })

    message.guild.bans.create(member.user?.id || member.id, { reason: reason, deleteMessageSeconds: 604800 })
      .then((banned) => {
        let embed = new EmbedBuilder()
          .addFields({
            name: "Banned:",
            value: `${banned.user?.tag || banned?.tag} was banned`,
          }, {
            name: "Responsible Moderator:",
            value: message.member.toString()
          }, {
            name: "Reason:",
            value: reason
          })
          .setColor('Red')
          .setAuthor({ name: banned.user?.tag || banned.tag, iconURL: banned.user.displayAvatarURL() })
        message.channel.send({ embeds: [embed] })
          .catch(() => { })
      })
  }
}