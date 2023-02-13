const { EmbedBuilder } = require('discord.js');

function getCommandUsage(client, message, command) {
  const embed = new EmbedBuilder()
  const x = client.commands.get(command);
  if (!x) {
    return { content: `ERROR_NO_ARGS_PROVIDED:${x.toUpperCase()}_NO_COMMANDS_FOUND` }
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

module.exports = {
  getCommandUsage
}