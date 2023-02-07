module.exports = {
  enabled: true,
  name: "ready",
  once: true,
  run: async (client) => {
    // [@] (SET CLIENT STATUS)
    client.users.setPrecence()
  }
}