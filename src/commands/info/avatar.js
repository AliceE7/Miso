const { PermissionsBitField: { Flags }, EmbedBuilder, SlashCommandBuilder } = require('discord.js')
module.exports = {
  name: `avatar`,
  aliases: ["av", "pfp"],
  category: `Info`,
  description: `Returns Your Avatar 📸`,
  usage: `[user]`,
  examples: [`940282986853728338`, "<@940282986853728338>"],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.guild.members.cache.find(m => m.user.tag === args.slice(0).join(" ")) || message.guild.members.cache.find(m => m.user.username === args[0]) || message.guild.members.cache.get(args[0]) || message.author;
    
    const member = message.guild.members.cache.get(user.id);
    if(!member) return;
    
    const embed = new EmbedBuilder()
      .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
      .setImage(member.user.displayAvatarURL())
      .setColor(client.color)

    message.channel.send({
      embeds: [embed]
    })
      .catch(() => { })
  }
}