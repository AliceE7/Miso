const express = require('express');
const { ChannelType, version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const passport = require('passport');

const router = express.Router();

router.get('/', async (req, res) => {
	res.render('home/index.pug')
});

router.get('/invite', async function(req, res) {
	res.redirect(`https://discord.com/oauth2/authorize?client_id=1008300388715352085&permissions=1098974625783&scope=bot%20applications.commands`);
});

module.exports = router;