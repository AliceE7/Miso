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
  run: async (client, message, args) => {
    const data = await prefixModel.findOne({
      guild: message.guild.id
    });

    if (!args[0]) return message.channel.send('You must provide a **new prefix**!');

    if (args[0].length > 5) return message.channel.send('Your new prefix must be under \`5\` characters!')

    if (data) {
      await prefixModel.findOneAndRemove({
        guild: message.guild.id
      })

      message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

      let newData = new prefixModel({
        prefix: args[0],
        guild: message.guild.id
      })
      newData.save();
    } else if (!data) {
      message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

      let newData = new prefixModel({
        prefix: args[0],
        guild: message.guild.id
      })
      newData.save();
    }

  }
}