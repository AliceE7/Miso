const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js')
module.exports = {
  name: `unban`,
  aliases: [],
  category: ``,
  description: `unban a member!`,
  usage: `<member/ID> [reason]`,
  examples: [``],
  perms: {
    member: [Flags.Administrator, Flags.ManageGuild, Flags.ManageChannels, Flags.BanMembers],
    bot: [Flags.BanMembers]
  },
  ownerOnly: false,
  run: async (client, message, args) => {

    if (!args[0]) {
      let res = client.getCommandUsage(client, message, "unban")
      message.channel.send(res)
    }

    const bans = await message.guild.bans.fetch({ cache: false });

    let member;
    member = await 
      bans.find(
        b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      bans.get(args[0]) ||
      bans.find(
        bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase()
      );

    if (!member) {
      let embed = new EmbedBuilder()
        .setDescription(`${client.config.emoji.xmark} **| That user is either not banned or not found!**`)
        .setColor('Red')
      message.channel.send({ embeds: [embed] })
    }

    const reason = args.slice(1).join(" ") || "No Reason Peovided";

    message.guild.members.unban(member.user.id, reason)
      .catch(console.error)

    const embed = new EmbedBuilder()
      .setDescription(`${client.config.emoji.mark} **| Unbanned <@${member.user.id}>**`)
      .addFields({
        name: "Moderator:",
        value: message.member.toString()
      }, {
        name: "Reason:",
        value: reason
      })

    await message.channel.send({ embeds: [embed] })
  }
}