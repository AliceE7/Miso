const { InteractionType } = require("discord.js");

module.exports = async (client, interaction) => {
  if (interaction.isChatInputCommand()) {
    const { slash_commands } = client;
    const { commandName } = interaction;

    const command = slash_commands.get(commandName);
    if (!command) return;

    try {
      await command.run(client, interaction);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: `An error has occurred!\n\`\`\`${error}\`\`\``,
        ephemeral: true,
      });
    }
  } else if (interaction.isContextMenuCommand()) {
    const { slash_commands } = client;
    const { commandName } = interaction;
    const commands = slash_commands;

    const contextCommand = commands.get(commandName);
    if (!contextCommand) return;

    try {
      await contextCommand.run(client, interaction);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: `An error has occurred!\n\`\`\`${error}\`\`\``,
        ephemeral: true,
      });
    }
  } else if (
    interaction.type === InteractionType.ApplicationCommandAutocomplete
  ) {
    const { slash_commands } = client;
    const { commandName } = interaction;

    const command = slash_commands.get(commandName);
    if (!command) return;

    try {
      await command.autocomplete(client, interaction);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: `An error has occurred!\n\`\`\`${error}\`\`\``,
        ephemeral: true,
      });
    }
  }
}