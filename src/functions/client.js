const { PermissionFlagsBits } = require('discord.js');

module.exports = async (client) => {

client.handleSubcommand = async function(client, interaction) {
  try {
    return require(`../../src/sub-commands/${interaction.commandName}/${interaction.options.getSubcommand()}`)(client, interaction)
  } catch (e) {
    console.log(e)
    
  }
}
}