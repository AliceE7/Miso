const { EmbedBuilder } = require('discord.js');
const settings = require('../../database/schemas/guild.js');

module.exports = async (client, oldChannel, newChannel) => {
  if (!oldChannel.guild) return;
  let embed = new EmbedBuilder(), updated = ""
  const old = oldChannel, newC = newChannel;

  embed.setColor('Red')
  embed.setTitle(`Channel Updated: ${newC.toString()}`)
  embed.setTimestamp()
  embed.setAuthor({ name: newC.guild.name, iconURL: newC.guild.iconURL() })

  if (old.name !== newC.name) {
    embed.addFields({ name: "Old Name:", value: old.name }, { name: "New Name:", value: newC.name })
    updated = true;
  }
  else if (old.topic !== newC.topic) {
    embed.addFields(
      { name: "Old Topic:", value: old.topic },
      { name: "New Topic", value: newC.topic })
    updated = true;
  }
  else if (old.rtcRegion !== newC.rtcRegion) {
    embed.addFields(
      { name: "Old rtc Region:", value: old.rtcRegion },
      { name: "New rtc Region:", value: newC.rtcRegion }
    )
  }

  if (updated) {
    //find logging channels in database
    const setting = await settings.findOne({ id: oldChannel.guild.id })
    const channels = setting.server_logging;
    if (!channels) return;
    //send the message & check if channel exsist
    const guild_channel = oldChannel.guild.channels.cache.get(channels)
    if (!guild_channel) return;
    guild_channel.send({ embeds: [embed] })
  }
}