const { ActivityType } = require('discord.js');
const chalk = require('chalk');
const db = require('../../database/schemas/guild.js')
/** 
* @params(discord.js).Client client
*/
module.exports = async (client) => {
  client.log('CLIENT', "Ready " + client.user.username)
  
  // [@] (SET CLIENT STATUS)
  client.user.setPresence({
    activities: [{ name: "*help | Working On Dashboard!", type: ActivityType.Playing }],
    status: "available",
  });

  client.guilds.cache.forEach(async(g) => {
    const data = await db.findOneAndUpdate({ id: g.id }, { name: g.name }, {
      upsert: true
    })
  })
}