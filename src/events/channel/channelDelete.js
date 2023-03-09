const { EmbedBuilder } = require('discord.js');
const settings = require('../../database/schemas/guild.js');
module.exports = async (client, channel) => {
  if(!channel.guild) return;
  if(client.config.modes.maintenance) return;
  
  const time = Date.now()
  const stamp = Math.floor(time / 1000)
  const date = `<t:${stamp}:R>`
  
  const embed = new EmbedBuilder()
    .setAuthor({ name: channel.guild.name, iconURL: channel.guild.iconURL() })
    .setTitle('Channel Deleted:')
    .addFields({ name: "Name:", value: `#${channel.name}` }, { name: "ID:", value: channel.id }, { name: "Deleted At:", value: `${date}` })
    .setFooter({ text: `ID: ${channel.id} : ${channel.guild.id}` })
    .setColor("Red")
    .setTimestamp(channel.createdAt)
  
  //find logging channels in database
  const setting = await settings.findOne({ id: channel.guild.id })
  const channels = setting.server_logging;
  if(!channels) return;

  //send the message & check if channel exsist
  const guild_channel = channel.guild.channels.cache.get(channels)
  if(!guild_channel) return;
  guild_channel.send({ embeds: [embed] })
}