const { PermissionsBitField: { Flags }, ChannelType } = require('discord.js');
const settings = require('../../database/schemas/guild.js');
module.exports = {
  name: `message-logging`,
  aliases: ["msg-logging"],
  category: `Settings`,
  description: `set the message logging channel!`,
  usage: `[mode] <channel>`,
  examples: [``],
  perms: {
    member: [Flags.ManageGuild],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    if (!args[0]) return;

    const mention = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

    if (args[0] === "off") {
      let find = await settings.findOne({ id: message.guild.id })
        .catch(console.error)
      if (!find.message_logging) {
        message.channel.send('ERROR:NOT_FOUND_IN_DATABASE:CANNOT_TURN_OFF')
      } else {
        settings.updateOne({ id: message.guild.id }, { message_logging: null })
          .catch(console.error)
      }
    } else if (mention) {

      let setting = await settings.findOne({ id: message.guild.id })
      if (!mention.type === "GuildText") return;

      settings.findOneAndUpdate({ id: message.guild.id }, { message_logging: mention.id }, { upsert: true })
      .catch(console.error)
     await message.channel.send(`Done Set logging channel as ${mention.toString()}`)
    }
  }
}