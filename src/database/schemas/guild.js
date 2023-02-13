const mongo = require('mongoose')

const guildSchema = new mongo.Schema({
  id: String,
  name: String,
  prefix: { type: String, default: "*" },
  
  tickets: {
    channel: String,
    category: String,
  }
})

module.exports = new mongo.model('guild', guildSchema)