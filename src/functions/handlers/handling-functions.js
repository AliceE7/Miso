async function run(client) {
  setTimeout(() => {
    require('../../../dashboard/app.js')(client); 
    console.log(`luanching dashboard`)
  }, 10000) // wait for client to be ready  (10s)
}


module.exports = {
  run
}