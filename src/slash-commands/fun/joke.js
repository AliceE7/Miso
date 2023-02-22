const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const snekfetch = require('snekfetch')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('get a funny joke')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.UseApplicationCommands),
  run: async (client, interaction) => {
    try {
      const res = await snekfetch.get('https://some-random-api.ml/others/joke');
      const data = res.body.joke;
      interaction.reply(data)
    } catch (e) {
      console.log(e)
    }
  }
}