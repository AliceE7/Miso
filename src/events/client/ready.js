const { ActivityType } = require('discord.js');
const chalk = require('chalk');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
/** 
* @params(discord.js).Client client
*/
module.exports = async (client) => {
  const rest = new REST({ version: '10' }).setToken(process.env.token);
  console.log(
    chalk.red("[ "), chalk.italic(chalk.green("CLIENT")), chalk.red(" ]"),
    chalk.blue(`Ready!`)
  )
  
  rest.put(
    Routes.applicationCommands("1008300388715352085"),
    { body: client.data },
  );
  
  // [@] (SET CLIENT STATUS)
  client.user.setPresence({
    activities: [{ name: "Soon!", type: ActivityType.Playing }],
    status: "online",
  });


}