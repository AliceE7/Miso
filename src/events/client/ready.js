const { ActivityType } = require('discord.js');
module.exports.event = {
  name: "ready"
}

module.exports = async (client) => {
  // [@] (SET CLIENT STATUS)
  client.user.setPresence({
    activities: [{ name: "Developing!", type: ActivityType.Playing }],
    status: "online",
    clientStatus: "mobile"
  });
}