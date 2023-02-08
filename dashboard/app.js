const express = require('express');
const app = express();

module.exports = client => {
  app.use(express.static(__dirname + '/public'));

  app.set('views', __dirname + "/views");
  app.set(`view engine`, "ejs");

  app.get(`/`, (req, res) => {
    res.render('index', {
      client: client
    })
  })

  app.listen(3000, () => { })
}