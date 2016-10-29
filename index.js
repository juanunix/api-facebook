'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const FacebookStrategy = require('passport-facebook').Strategy;
const graph = require('fbgraph');
const config = require('./config/config');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({ keys: ['asdasddadsd', 'asasasasdfsfse'] }));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');

passport.use(new FacebookStrategy({
		clientID: config.facebookStrategy.id,
		clientSecret: config.facebookStrategy.secret,
		callbackURL: config.facebookStrategy.callbackURL,
	}, function(accessToken, refreshToken, profile, cb)
	{
		User.findOrCreate({
			uid: profile.id
		},{
			name: profile.displayName,
			provider: 'facebook',
			accessToken
		}, (err, user) => {
			cb(null, user);
		})
	}
));

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(user, done){
	done(null, user);
});

app.get('/auth/facebook', passport.authenticate('facebook', {scope:['publish_actions', 'user_friends']}));

app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {failureRediredct: '/'}),
	function(req, res){
		console.log(JSON.stringify(req.session));
		res.redirect('/');
	}
);

app.get('/auth/close', (req, res) => {
	req.logout();
	res.redirect('/');
})

app.get('/', (req, res) => {
	if(typeof req.session.passport == "undefined" || !req.session.passport.user){
	  res.render("index");
  } else {
	  res.render("home");
  }
});

app.post('/logros', (req, res) =>{
	const logro = req.body.logro;
	graph.setAccessToken(req.session.passport.user.accessToken);
	graph.post('/feed', {message: logro}, (err, response) => {
		console.log(response);
		res.redirect('/');
	});
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
