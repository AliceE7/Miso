const mongo = require('mongoose')

const guildSchema = new mongo.Schema({
  guild: String,
  prefix: { type: String, default: "*" }
})

module.exports = new mongo.model('guild', guildSchema, 'guilds')