var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var students = [
  {"id": 1, "imie":"Dawid", "nazwisko":"Woźniak"},
  {"id": 2, "imie":"Anna", "nazwisko":"Kowalska"},
  {"id": 3, "imie":"Adam", "nazwisko":"Nawałka"},
  {"id": 4, "imie":"Robert", "nazwisko":"Lewandowski"}
];


var studentSchema = mongoose.Schema({
  imie: String,
  nazwisko: String
});

/* GET home page. */
router.get('/', function(req, res, next) {
  mongoose.connect('mongodb://localhost/test');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'błąd połączenia...'));
  db.once('open', function() {
    res.render('index', { title: 'Połączono z bazą danych' });
  });

});

router.get('/list', function(req, res, next){
  res.render('students', { title: 'Lista studentów', data : students });
});

router.get('/list/:id', function(req, res, next){
  var i = 0;
  for(; i < students.length; ++i)
  {
    if(students[i].id == req.params.id)
    {
      break;
    }
  }
  res.render('students_status', {title: 'Student status', data: students[i]})
});

router.get('/add', function(req, res, next){
  res.render('students_add', {title: 'Dodaj studenta'});
});

router.post('/add', function(req, res, next){
  if(req.body.imie.length > 0 && req.body.nazwisko.length > 0)
  {
    var max = 0;
    for(var i = 0; i < students.length; ++i)
    {
      if(max < students[i].id)
      {
        max = students[i].id;
      }
    }
    students.push({"id": max + 1, "imie": req.body.imie, "nazwisko": req.body.nazwisko});
    res.redirect('list');
  }
  else
  {
    res.render('students_error', {message: 'Nie wypelniono wszystkich pol'});
  }
});


/* DELETE ALL*/
router.delete('/delete-all', function(req, res, next) {
    students.remove({}, function (err, writeRes) {
        if (err) return next(err);
        res.send(writeRes);
    });
});


module.exports = router;
