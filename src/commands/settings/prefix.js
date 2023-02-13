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

    if (!args[0]) return message.channel.send('You must provide a **new prefix**!');

    if (args[0].length > 5) return message.channel.send('Your new prefix must be under \`5\` characters!')

    if (data) {
      message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

      let newData = await prefixModel.findOneAndUpdate({ id: message.guild.id }, { prefix: args[0] }, {
        upsert: true
      });
    } else if (!data) {
      message.channel.send(`**Uh Oh...**\nThis server's **database** is not setted up, this is a super rare error! Please wait a few minutes i will setup the database try this command in a few seconds!`)
    }
  }
}