const { EmbedBuilder } = require('discord.js');
const logging = require('../../database/schemas/guild.js');
module.exports = async (client, newMessage, oldMessage) => {
  if (newMessage.author.bot) return;
  if (!newMessage.guild) return;

  if (newMessage.content === oldMessage.content) return;

  const embed = new EmbedBuilder()
    .setColor('DarkOrange')
    .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL() })
    .setTimestamp(newMessage.createdAt)
    .addFields(
      {
        name: "New Message:",
        value: oldMessage.cleanContent
      },
      {
        name: "Old Message:",
        value: newMessage.cleanContent
      }
    ) // the newMessage is in old message field cuz it returns old and same for old

  const data = await logging.findOne({ id: newMessage.guild.id })
    .catch(console.error)
  const channel = data.message_logging;
  if (!channel) return;
  const guild_channel = newMessage.guild.channels.cache.get(channel)
  if (!guild_channel) return;

  await guild_channel.send({
    embeds: [embed]
  })
    .catch(console.error)
}