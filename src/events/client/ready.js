const { ActivityType } = require('discord.js');
const chalk = require('chalk');
const db = require('../../database/schemas/guild.js')
const user = require('../../database/schemas/user.js')
/** 
* @params(discord.js).Client client
*/
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

  client.guilds.cache.forEach(async(g) => {
    const data = await db.findOneAndUpdate({ id: g.id }, { name: g.name }, {
      upsert: true
    })
  })
  client.users.cache.forEach(async(u) => {
    const x = await user.findOneAndUpdate({ discordId: u.id }, { username: u.username }, {
      upsert: true
    })
  })
}