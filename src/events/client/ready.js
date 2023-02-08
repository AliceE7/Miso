const { ActivityType } = require('discord.js');
const chalk = require('chalk');
module.exports = async (client) => {
  console.log(
    chalk.red("[ "), chalk.italic(chalk.green("CLIENT")), chalk.red(" ]"),
    chalk.blue(`Ready!`)
  )
  // [@] (SET CLIENT STATUS)
  client.user.setPresence({
    activities: [{ name: "Soon!", type: ActivityType.Playing }],
    status: "online",
  });
}