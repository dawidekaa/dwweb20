var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testDB', function (err) {
    if (err) {
        console.log('błąd połączenia', err);
    } else {
        console.log('połączenie udane');
    }
});

var CzlowiekSchema = new mongoose.Schema({
  name: String,
  surname: String
});
