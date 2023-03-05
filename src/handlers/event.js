const fs = require('fs')
module.exports = async (client) => {
  fs.readdirSync('./src/events/').forEach((dirs) => {
    const events = fs.readdirSync(`./src/events/${dirs}/`).filter(files => files.endsWith('.js'));
    for (const file of events) {
      const name = file.split(".")[0];
      const pull = require(`../../src/events/${dirs}/${file}`);
      if (pull.disabled) {
        console.log("?.")
      }
      try {
        client.on(name, pull.bind(null, client))
        delete require.cache[require.resolve("../../src/events/" + dirs + "/" + file)];
      } catch (err) { console.log(err) }
    }
  })
}