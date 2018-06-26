var express = require('express');
var router = express.Router();
var uzytkownik = require('../utils/database.js')
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/logowanie', function(req,res){
  res.render('logowanie');

});

router.post('/logowanie',
  passport.authenticate('local', {
    session: true,
    successRedirect: '/',
    failureRedirect: '/logowanie'
  })
);

router.get('/users', function(req,res){
  res.render('users');

});

router.get('/students', function(req,res){
  res.render('studenci');

});


module.exports = router;
