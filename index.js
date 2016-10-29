'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const FacebookStrategy = require('passport-facebook').Strategy;
const graph = require('fbgraph');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({ keys: ['asdasddadsd', 'asasasasdfsfse'] }));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render("index");
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
