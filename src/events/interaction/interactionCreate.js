const { CommandInteraction } = require("discord.js");

module.exports = async (client, interaction) => {
  if (interaction.isChatInputCommand()) {
    //just to make sure 😭
    if (interaction.user.bot) return;

    const command = client.slash.get(interaction.commandName);
    if (!command) {
      return;
    }

    command.run(interaction, client);
  }
}