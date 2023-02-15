const express = require('express');
const app = express();
const { join } = require('path');

app.set('view engine', "ejs");
app.set('views', join(__dirname, "views"));
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home/index.ejs')
});


//admin
app.get('/admin/developer', (req, res) => {
  res.send(`X`)
})

app.listen(3001, () => { })