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
  ownerOnly: false,
  run: async (client, message, args) => {
    if (!args[0]) {
      List(client, message)
    }
    else {
      One(client, message, args)
    }
  }
}




async function List(client, message) {
  const commands = client.commands;

  const map = commands
    .map((cmd) => cmd.name)
    .join(', ')

  const embed = new EmbedBuilder()
    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
    .setDescription(map)
    .setColor(client.color)

  await message.channel.send({ embeds: [embed] })
}

async function One(client, message, args) {
  const got = args[0].toLowerCase();
  const commands = client.commands;
  const embed = new EmbedBuilder()
  const command = client.commands.get(got);

  if (command) {

    if (command.name) {
      embed.addFields({
        name: "Name:",
        value: command.name
      })
    }

    if (command.aliases) {
      embed.addFields({
        name: "Aliases:",
        value: command.aliases.map((a) => a).join(", ") || "N/A"
      })
    }

    if (command.category) {
      embed.addFields({
        name: "Category:",
        value: command.category || "N/A"
      })
    }

    if (command.description) {
      embed.addFields({
        name: "Description",
        value: command.description || "N/A"
      })
    }

    if (command.usage) {
      embed.addFields({
        name: "Usage:",
        value: command.usage || "N/A"
      })
    }

    if (command.examples) {
      embed.addFields({
        name: "Examples",
        value: command.examples.map((e) => e).join(', ') || "N/A"
      })
    }

    embed.setColor(client.color)
    embed.setDescription(`<> **=** required, [] **=** optional`)
    await message.channel.send({ embeds: [embed] })
  }
  else {
    const none = new EmbedBuilder()
      .setDescription('No Commands Found Matching ' + got)
      .setColor(client.color)
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
    message.channel.send({ embeds: [none] })
  }

  const one = args[0].toLowerCase()
  const name = args[1]
  const x = client.commands.get(name)
  const em = new EmbedBuilder()

  if (x) {
    if (one == "name") {
      if (x.name) {
        em.addFields({
          name: "Name:",
          value: x.name
        })
      }
    }
    if(one == "usage") {
      if(x.usage) {
        em.addFields({
          name: "Usage:",
          value: x.usage || "N/A"
        })
      }
    }
  } 
  else {
    return;
  }
}