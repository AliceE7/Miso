module.exports = async client => {
  const fs = require("fs");
  let commandsArray = [];
  const { Routes } = require('discord-api-types/v9');
  const { REST } = require('@discordjs/rest')

  const TOKEN = process.env.token;
  const CLIENT_ID = "1008300388715352085";

  const rest = new REST({ version: '9' }).setToken(TOKEN);

  const commandsFolder = fs.readdirSync("./src/slash-commands");
  for (const folder of commandsFolder) {
    const commandFiles = fs
      .readdirSync(`./src/slash-commands/${folder}`)
      .filter((file) => file.endsWith("js"));

    for (const file of commandFiles) {
      const commandFile = require(`../../src/slash-commands/${folder}/${file}`);

      client.slash.set(commandFile.data.name, commandFile);

      if (commandFile.developer) developerArray.push(commandFile.data.toJSON());
      else commandsArray.push(commandFile.data.toJSON());
      continue;
    }
  }
  await rest.put(
    Routes.applicationCommands(CLIENT_ID),
    { body: commandsArray }
  );
}