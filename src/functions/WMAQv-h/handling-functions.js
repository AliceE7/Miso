const { EmbedBuilder, WebhookClient } = require('discord.js');

const handling = new WebhookClient({
  url: process.env.handling_function_webhook
})

async function sendError(error, x, y, extra) {
  const embed = new EmbedBuilder()
    .setColor(0x333333)
  const is = ""
  if (error) {
    embed.setDescription(`\`\`\`\`js\n${error}\`\`\`\` `)
    is = true
  } else { is = false }
  if (x) {
    embed.addFields({ name: "x", value: x, inline: true })
    is = true
  } else { is = false }
  if (y) {
    embed.addFields({ name: "y", value: y, inline: true })
    is = true
  } else { is = false }
  if (extra) {
    embed.addFields({ name: "extra", value: extra, inline: true })
    is = true
  }
  if (is) {
    handling.send({ embeds: [embed] })
      .catch((err) => { handling.send("Error Sending Error Message" + err) })
  }
}

module.exports = {
  sendError,
}