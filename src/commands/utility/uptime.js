const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js');
const moment = require('moment')
module.exports = {
  name: `uptime`,
  aliases: [],
  category: `Utility`,
  description: `Get Miso's Uptime`,
  usage: ``,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    const ms = client.uptime;
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (1000 * 60)) % 60).toString();
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
    const uptime = days.padStart(1, "0") + " " + "days" + " " +
      hrs.padStart(2, "0") + " " + "hours" + " " +
      min.padStart(2, "0") + " " + "minutes" + " " +
      sec.padStart(2, "0") + " " + "seconds" + " ";


    const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ size: 512 }) })
      .setDescription("```" + uptime + "```")
      .setFooter({ text: client.ws.ping + " | " + message.id })
      .setColor(client.color)

    await message.channel.send({ embeds: [embed] })
  }
}