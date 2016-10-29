'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const FacebookStrategy = require('passport-facebook').Strategy;
const graph = require('fbgraph');

const config = require('./config/config.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({ keys: ['asdasddadsd', 'asasasasdfsfse'] }));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  console.log(JSON.stringify(config));
  res.render("index");
});

//Configurate passport
	//Strategy
passport.use(new FacebookStrategy({
		clientID: config.facebookStrategy.id,
		clientSecret: config.facebookStrategy.secret,
		callbackUrl: config.facebookStrategy.callbackUrl
	}, function(accessToken, refreshToken, profile, cb)
	{
		const user = { accessToken, profile}

		cb(null, user);
	}
));
	//How to store user in the session

	//How to take the user of the session



app.listen(8000, () => {
  console.log('Listening on port 8000');
});
