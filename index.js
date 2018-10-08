const path = require('path');
const express = require('express');
var session = require('express-session');
const app = express();
var port = process.env.PORT || 4000;
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const flash = require('connect-flash');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/passport-test');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

require('./config/passport.js')(passport);

// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure:true }
}));
app.use(passport.initialize());

// app.use(flash());

require('./routes/route.js')(app, passport);

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});

