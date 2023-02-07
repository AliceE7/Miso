const fs = require('fs')
module.exports = async (client) => {
  fs.readdirSync('./src/events/').forEach((dirs) => {
    const events = fs.readdirSync(`./src/events/${dirs}/`).filter(files => files.endsWith('.js'));
    for (const file of events) {
      const name = file.split(".")[0];
      const pull = require(`../../src/events/${dirs}/${file}`);
      try {
        if (pull.enabled) {
          if (pull.once) {
            client.once(pull.name, (...args) => pull.run(...args));
          } else {
            client.on(pull.name, (...args) => pull.run(...args));
          }
        } else { return; }
      } catch (err) { console.log(err) }
    }
  })
}