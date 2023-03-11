const { PermissionsBitField: { Flags }, ChannelType, EmbedBuilder } = require('discord.js');
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
    const mention = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(data => data.name === args[0]);

    if (!mention) {
      const res = client.getCommandUsage(client, message, 'message-logging');
      message.channel.send(res);
    }

    if (args[0] === "off") {
      let find = await settings.findOne({ id: message.guild.id })
        .catch(console.error)
      if (!find.message_logging) {
        let embed = new EmbedBuilder()
          .setColor('Red')
          .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
          .setDescription(client.emoji.zxmark + "Hmm, I can't find the database for this server. Please wait 10-30 mins before using this command!")
          .setFooter({ text: message.guild.id })
        message.channel.send({ embeds: [embed] })
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