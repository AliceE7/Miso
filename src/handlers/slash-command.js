const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/slash-commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/slash-commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { slash_commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../src/slash-commands/${folder}/${file}`);
        slash_commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const rest = new REST({ version: '10' }).setToken(process.env.token);
    const clientId = "1008300388715352085";
    const guildId = "1008095772484575283"
    try {
      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });
      client.log("DISCORD", "Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};