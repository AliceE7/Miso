const cooldown = new Set(); //cooldown
const ms = require('ms');
const db = require('../../database/schemas/guild.js');
const { EmbedBuilder, PermissionsBitField: { Flags } } = require('discord.js');
const { getCommandUsage } = require('../../functions/handlers/command.js')
module.exports = async (client, message) => {
  const config = client.config;
  if (!message.guild?.available) return;
  if (message.author.bot) return;
  if (!message.member) {
    message.member = await message.guild.fetchMember(message);
  }

  if (!message.guild.members.me.permissions.has(Flags.SendMessages)) return;

  const data = await db.findOne({ id: message.guild.id });
  const prefix = data.prefix;

  if (!message.content.toLowerCase().startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) return;

  if (client.config.modes.message_owner) {
    if (!client.config.developers.includes(message.author.id))
      return;
  }

  if (client.config.modes.maintenance) {
    if (!client.config.developers.includes(message.author.id)) {
      let msg = message.channel.send("Looks Like The Bot Is In Maintenance Mode!\nwait till we fix the issues, you can join the support server for more info!\n> https://cookiesz.tk/support")
      setTimeout(() => {
        msg.delete().catch(() => { })
      }, 10000)
    }
  }

  if (command.ownerOnly) {
    if (!client.config.developers.includes(message.author.id)) {
      return;
    }
  }

  if (command.perms) {
    if (command.perms.member) {
      if (!message.member.permissions.has(command.perms.member)) {
        return message.channel.send('**You** do not have enough permissions!')
      }
      if (command.perms.bot) {
        if (!message.guild.members.me.permissions.has(command.perms.bot)) {
          return message.channel.send('**I** do not have enough permissions!')
        }
      }
    }
  }

  if (command.cooldown) {
    if (cooldown.has(`${message.author.id}${command.name}`)) {
      return message.channel.send(`**You** can use **${command.name}** command every **${ms(command.cooldown)}**`);
    }
  }

  command.run(client, message, args, getCommandUsage)
  cooldown.add(`${message.author.id}${command.name}`);
  setTimeout(() => {
    cooldown.delete(`${message.author.id}${command.name}`);
  }, command.cooldown);
}