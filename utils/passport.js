var uzytkownik = require('./database.js')
var session = require('express-session');
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user.id);
    });
    
passport.deserializeUser(function(id, done) {
    uzytkownik.findById(id, function(err, user) {
    done(err, user);
    });
});