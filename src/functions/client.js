const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = async (client) => {

  client.handleSubcommand = async function(client, interaction) {
    try {
      return require(`../../src/sub-commands/${interaction.commandName}/${interaction.options.getSubcommand()}`)(client, interaction)
    } catch (e) {
      console.log(e)
    }
  }

  client.getCommandUsage = function(client, message, command) {
    const embed = new EmbedBuilder()
    const x = client.commands.get(command);
    if (!x) {
      throw new Error('No command found', x)
    }
    if (x.name) {
      embed.addFields({
        name: "Name:",
        value: `${x.name}`
      })
    }
    if (x.aliases) {
      embed.addFields({
        name: "Aliases:",
        value: `${x.aliases.map((alias) => alias).join(', ')}` || "N/A"
      })
    }
    if (x.usage) {
      embed.addFields({
        name: "Usage:",
        value: `${x.usage}`
      })
      if (x.examples) {
        embed.addFields({
          name: "Examples:",
          value: `${x.examples.map((a) => a).join('\n')}` || "N/A"
        })
      }

      embed.setColor(client.color)
      embed.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
      embed.setTimestamp()
      return { embeds: [embed] }
    }
  }
}