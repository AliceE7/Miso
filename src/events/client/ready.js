module.exports = {
  enabled: true,
  name: "ready",
  once: true,
  run: async (client) => {
    // [@] (SET CLIENT STATUS)
    client.user.setPresence({
      activities: [{ name: client.status.name, type: client.status.type }],
      status: client.status.x,
      clientStatus: client.device
    });
  }
}