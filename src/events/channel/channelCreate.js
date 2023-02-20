const { EmbedBuilder } = require('discord.js');
const settings = require('../../database/schemas/guild.js');

module.exports = async (client, channel) => {
  const embed = new EmbedBuilder()
  .addFields(
    { name: "Channel:", value: channel.toString() },
    { name: "Id:", value: channel.id }
  )
  .setDescription(`Channel Created ${channel.toString()}`)
  .setColor(client.color)
  .setTimestamp(channel.createdAt)
  .setFooter({ text: `Id: ${channel.id} | guildId: ${channel.guild.id}` })

  //find logging channels in database
  const setting = settings.findOne({ id: channel.guild.id })
  const channels = setting.message_logging;
  if(!channels) return;

  //send the message & check if channel exsist
  const guild_channel = channel.guild.channels.cache.get(channels)
  if(!guild_channel) return;
  guild_channel.send({ embeds: [embed] })
}