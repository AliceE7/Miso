const mongo = require('mongoose')

const guildSchema = new mongo.Schema({
  id: String,
  name: String,
  prefix: { type: String, default: "*" },
  message_logging: { type: String, default: null }
})

module.exports = new mongo.model('guild', guildSchema)