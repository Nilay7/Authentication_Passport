var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('../models/Users');
const bcrypt = require('bcrypt-nodejs');
// const passportJWT = require("passport-jwt");
// const ExtractJWT = passportJWT.ExtractJwt;
// const JWTStrategy   = passportJWT.Strategy;

module.exports = function(passport) {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        Users.findById(id, () => {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy ({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true 
    }, (req, email, password, done) => {
        Users.findOne({ 'local.email': email }, (err, user) => {
            if (err) return done(err);

            if(user) {
                return done(null, false, {message:'The mail is already taken!'});
            } else {
                var newUser = new Users();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                
                newUser.save((err) => {
                    if (err) throw err;
                    return done(null, newUser);
                });
            }
        });
    }
    ));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },(req, email, password, done) => {
        Users.findOne({ 'local.email': email }, (err, user) => {
            if (err) return done(err);
            
            if (!user)
                return done(null, false, {message: 'Incorrect Username'});

            if (!user.validPassword(password))
                return done(null, false, { message: 'Incorrect Password' });
        
            return done(null, user);    
            });
        }));

};


    