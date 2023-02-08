const express = require('express');
const app = express();

module.exports = client => {
  app.get(`/`, (req, res) => {
    res.send(`x`)
  })

  app.listen(3000, () => { })
}