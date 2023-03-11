const { PermissionsBitField: { Flags }, EmbedBuilder } = require('discord.js');
const prefixModel = require('../../database/schemas/guild.js');
const mongoose = require('mongoose')
module.exports = {
  name: `prefix`,
  aliases: [],
  category: `Settings`,
  description: `get the prefix or set the prefix`,
  usage: ``,
  examples: [``],
  perms: {
    member: [Flags.Administrator],
    bot: []
  },
  ownerOnly: false,
  run: async (client, message, args) => {
    const data = await prefixModel.findOne({
      id: message.guild.id
    });

    if (!args[0]) {
      let embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`Current prefix for this server is ${data.prefix}`)
      message.channel.send({ embeds: [embed] });
    }

    if (data) {
      const newData = prefixModel.findOneAndUpdate({ id: message.guild.id }, { prefix: args[0] }, { upsert: true });
      let embed = new EmbedBuilder()
      .setDescription(`Changed The Prefix To **${newData.prefix}**`)
      .setColor(client.color)
      await message.channel.send({ embeds: [embed] })
    }
  }
}