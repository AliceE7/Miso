const { PermissionsBitField: { Flags }, EmbedBuilder, SlashCommandBuilder } = require('discord.js')
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
    const user = message.mentions.users.first() || message.guild.members.cache.get(arga[0]) || message.author;

    const embed = new EmbedBuilder()
  }
}