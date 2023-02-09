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
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

    const embed = new EmbedBuilder()
      .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
      .setImage(user.displayAvatarURL())
      .setColor(client.color)

    message.channel.send({
      embeds: [embed]
    })
      .catch(() => { })
  }
}