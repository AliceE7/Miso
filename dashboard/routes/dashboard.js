const express = require('express')
const router = express.Router();

router.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/auth/login')
  }
  res.render('index.ejs', {
    req: req,
    client: client,
    async: true
  });
});

module.exports = router;