const { PermissionsBitField: { Flags }, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle: { Secondary }, ComponentType } = require('discord.js')
module.exports = {
  name: `help`,
  aliases: [],
  category: ``,
  description: ``,
  usage: ``,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  run: async (client, message, args) => {
    const base = new EmbedBuilder()
      .setColor(client.color)
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
      .setDescription('..')

    const actionrow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Help Me!')
        .setStyle(Secondary)
        .setCustomId('help')
    )

    const msg = message.channel.send({ embeds: [base], components: [actionrow] });
    const collector = message.channel.createMessageComponentCollector({
      time: 200000
    });
    
    collector.on('collect', async (i) => {
     await i.deferUpdate();
      if (i.customId === "help") {
        msg.edit({ content: "edited" })
      }
    });

    const cmd = args[1];
    if (cmd) {
      console.log("e")
    }
  }
}