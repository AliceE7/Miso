const mongo = require('mongoose')

const guildSchema = new mongo.Schema({
  id: String,
  name: String,
  prefix: { type: String, default: "*" },
  guild_messages_sent: { type: Number, default: "0" },

  //welcome
  welcome: {
    channel: { type: String, default: null },
    message: { type: String, default: null }
  },
  
  //Logging
  message_logging: { type: String, default: null },
  server_logging: { type: String, default: null },
})

module.exports = new mongo.model('guild', guildSchema)