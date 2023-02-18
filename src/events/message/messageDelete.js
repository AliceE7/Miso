const { EmbedBuilder } = require('discord.js');
const settings = require('../../database/schemas/guild.js');
module.exports = async (client, message) => {
  if(!message.guild) return;

  const embed = new EmbedBuilder()
  .setColor(client.color)
  .setTimestamp(message.createdAt)
  .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
  .setDescription(`**Message Deleted By ${message.member.toString()} In ${message.channel.toString()}**\n${message.content}`)
  .setFooter({ text: `Id: ${message.id} | MemberId: ${message.author.id}` })
  if(message.attachements > 1) {
    embed.addFields({ name: "Attachements:", value: message.attachements.url })
  }

  //finding the channel Id in database
  const data = await settings.findOne({ id: message.guild.id })
  .catch(console.error)
  const channel = data.message_logging;
  if(!channel) return;

  //finding the channel & sending the embed
  const guild_channel = message.guild.channels.cache.get(channel)
  if(!guild_channel) return;
  guild_channel.send({ embeds: [embed] })
  .catch(console.error)
}