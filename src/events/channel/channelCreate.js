const { EmbedBuilder } = require('discord.js');
const settings = require('../../database/schemas/guild.js');

module.exports = async (client, channel) => {
  if(!channel.guild) return;

  
  const time = channel.createdAt;
  const stamp = Math.floor(time / 1000)
  const date = `<t:${stamp}:R>`
    
  const embed = new EmbedBuilder()
    .setAuthor({ name: `${channel.guild.name}`, iconURL: channel.guild.iconURL() })
  .addFields(
    { name: "Name:", value: `#${channel.name} ( ${channel.toString()} )` },
    { name: "ID:", value: channel.id },
    { name: "Created At:", value: date }
  )
  .setTitle("Channel Created:")
  .setColor("Red")
  .setTimestamp(channel.createdAt)
  .setFooter({ text: `Id: ${channel.id} : ${channel.guild.id}` })

  //find logging channels in database
  const setting = await settings.findOne({ id: channel.guild.id })
  const channels = setting.server_logging;
  if(!channels) return;

  //send the message & check if channel exsist
  const guild_channel = channel.guild.channels.cache.get(channels)
  if(!guild_channel) return;
  guild_channel.send({ embeds: [embed] })
}