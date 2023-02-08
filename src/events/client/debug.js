module.exports = async (client, info) => {
  if (info.startsWith('Hit a 429')) {
    process.kill(1)
  }
}