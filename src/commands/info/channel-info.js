const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js')
module.exports = {
  name: `channel-info`,
  aliases: ["channelinfo"],
  category: `Info`,
  description: `get information on a channel`,
  usage: `[channel]`,
  examples: [``],
  perms: {
    member: [],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    const channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.name === args.slice(0).join(" ")) || message.guild.channels.cache.get(args[0]) || message.channel;

    if (!channel) return;

    if (!channel.type === "GUILD_VOICE") return;

    const At = Math.floor(channel.createdAtTimestamp / 1000)
    
    const embed = new EmbedBuilder()
      .setDescription(`<:normalchannel:1021543262428868649>${channel.name}`)
    .setDescription(`Id: ${channel.id}\nName: ${channel.name}\nTopic: ${channel.topic}\nURL: ${channel.url}\nType: ${channel.type}\nInvite: ${channel.createInvite()}\nCreated At ${At}\nNsfw? ${channel.nsfw}`)
    .setColor(client.color)

    await message.channel.send({ embeds: [embed] })
  }
}