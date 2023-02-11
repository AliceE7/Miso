const fs = require('fs');
const chalk = require('chalk');
const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')

const TOKEN = process.env.token;
const CLIENT_ID = "1008300388715352085";

const rest = new REST({ version: '9' }).setToken(TOKEN);

module.exports = (client) => {
  const slashCommands = [];

  fs.readdirSync('./src/slash-commands/').forEach(async dir => {
    const files = fs.readdirSync(`./src/slash-commands/${dir}/`).filter(file => file.endsWith('.js'));

    for (const file of files) {
      const slashCommand = require(`../../src/slash-commands/${dir}/${file}`);
      slashCommands.push({
        name: slashCommand.name,
        description: slashCommand.description,
        type: slashCommand.type,
        options: slashCommand.options ? slashCommand.options : null,
        default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
        default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
      });

      if (slashCommand.name) {
        client.slashCommands.set(slashCommand.name, slashCommand)
      } else {
        console.log('Error: Slash Command File Has no Name')
      }
    }

  });

  (async () => {
    try {
      await rest.put(
          Routes.applicationCommands(CLIENT_ID),
        { body: slashCommands }
      );
      console.log(chalk.yellow('Slash Commands • Registered'))
    } catch (error) {
      console.log(error);
    }
  })();
};