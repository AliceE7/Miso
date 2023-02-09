const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js')
const moment = require('moment');
const dateformat = require('dateformat')
module.exports = {
  name: `whois`,
  aliases: ["w"],
  category: `Info`,
  description: `Returns Users Info 👩‍💻`,
  usage: `[user/ID]`,
  examples: [`<@940282986853728338>`, "940282986853728338"],
  perms: {
    member: [],
    bot: []
  },
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    const member = message.guild.members.cache.get(user.id)
    const has = member.permissions.has(Flags.Administrator)
    
    const embed = new EmbedBuilder()
      .setDescription(`<@${member.id}>`)
      .setColor(client.color)
      .addFields(
        { name: "Username:", value: `\`${member.user.username}\`` },
        { name: "ID:", value: `\`${member.id}\`` },
        { name: "Account Created:", value: `\`${dateformat(member.user.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}\`` },
        { name: "Joined Server:", value: `\`${dateformat(member.joinedTimestamp, "dddd, mmmm dS, yyyy, h:MM:ss TT")}\`` },
      )
    
    if(!has) {
      embed.addFields({ name: "Permissions:", value: message.member.permissions.toArray().map(p => `\`${p}\``).join(", ") })
    } else {
      embed.addFields({ name: "Permissions:", value: "`Administrator`"})
    }

    message.channel.send({
      embeds: [embed]
    })
  }
}