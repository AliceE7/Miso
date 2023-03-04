const { PermissionsBitField: { Flags }, ChannelType, EmbedBuilder } = require('discord.js');
const settings = require('../../database/schemas/guild.js');
module.exports = {
  name: `server-logging`,
  aliases: ["serv-logging"],
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
      let embed = new EmbedBuilder()
      .setAuthor({ name: message.author.tag, iconURL: message.displayAvatarURL() }).setDescription('Looks Like `SERVER_LOGS` Is Not Setted Up, You can set-up logs by using `<prefix>server-logging [mode] <channel>` ').setColor(client.color)
      let find = await settings.findOne({ id: message.guild.id })
        .catch(console.error)
      if (!find.server_logging) {
        message.channel.send({ embeds: [embed] })
      } else {
        settings.updateOne({ id: message.guild.id }, { server_logging: null })
          .catch(console.error)
        await message.channel.send({ content: "Deleted From Database, I will no longer log server changes."})
      }
    } else if (mention) {
      if (!mention.type === "GuildText") return;

      settings.findOneAndUpdate({ id: message.guild.id }, { server_logging: mention.id }, { upsert: true })
      .catch(console.error)
     await message.channel.send(`Done! Set logging channel as ${mention.toString()}`)
    }
  }
}