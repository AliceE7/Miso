const express = require('express');
const app = express();
const { join } = require('path');

app.set('view engine', "pug");
app.set('views', join(__dirname, "views"));
app.use(express.static(join(__dirname, 'public')));

app.use('/', require('./routes/index'));

app.listen(8001, () => { })