const { PermissionsBitField: { Flags }, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle: { Secondary, Primary, Danger }, ComponentType, SlashCommandBuilder } = require('discord.js')
module.exports = {
  name: `help`,
  aliases: [],
  category: ``,
  description: `Miso's Commands!`,
  usage: ``,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  run: async (client, message, args) => {
    const commands = client.commands

    const base = new EmbedBuilder()
      .setColor(client.color)
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
      .setDescription('..')

    const actionrow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Help Me!')
        .setStyle(Primary)
        .setCustomId('help')
    )

    const catrow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(`List`)
        .setStyle(Danger)
        .setCustomId('list')
    ).addComponents(
      new ButtonBuilder()
        .setLabel('Info')
        .setStyle(Secondary)
        .setCustomId("info")
    )

    const msg = await message.channel.send({ embeds: [base], components: [actionrow] });
    const collector = message.channel.createMessageComponentCollector({
      time: 200000
    });

    collector.on('collect', async (i) => {
      if (i.customId === "help") {
        const base_help = new EmbedBuilder()
          .setColor(client.color)
          .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
          .addFields(
            { name: "-------------------------", value: `C` }
          )
          .setTimestamp()
        await i.reply({
          embeds: [base_help],
          components: [catrow],
          ephemeral: true
        })
      }
      if (i.customId === "list") {
        const list = commands.map((cmd) => `${cmd.name}`).join(", ");
        const embed = new EmbedBuilder()
          .setAuthor({ name: i.user.tag, iconURL: i.user.displayAvatarURL() })
          .setColor(client.color)
          .setDescription(`${list}`)

        i.reply({
          embeds: [embed],
          ephemeral: true
        }).catch(() => { })
      }
      if(i.customId === "info") {
        const info = commands
        .filter((cmd) => cmd.category === "Info")
        .map((cmd) => cmd.name)
        .join(', ')

        const embed = new EmbedBuilder()
        .setDescription(`${info}`)
        i.reply({
          embeds: [embed],
          ephemeral: true
        })
      }
    });

    collector.on('end', async () => {
      actionrow.components.forEach((button) => button.setDisabled(true))
      await msg.edit({ embeds: [base], components: [actionrow] })
    })

    const cmd = args[1];
    if (cmd) {
      console.log("e")
    }
  }
}