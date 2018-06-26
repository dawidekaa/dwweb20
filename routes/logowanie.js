var express = require('express');
var router = express.Router();
var baza = require('../utils/database.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('test routingu');
});

router.get('/', function(req, res, next) {
  baza.find(function (err, docs) {
  if (err) return next(err);
  res.json(docs);
  });
  });

module.exports = router;
