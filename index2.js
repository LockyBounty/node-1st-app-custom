var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var config  = require('./config');
var mongoose    = require('mongoose');

var express     = require('express');
var app         = express();

var bodyParser  = require('body-parser');
// Connection URL
var url = 'mongodb://localhost:27017/music';
// Use connect method to connect to the Server

var port = process.env.PORT || 8000;
mongoose.connect(config.database);
app.set('superNode-auth', config.configName);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Seja Bem-Vindo a API: http://localhost:' + port + '/api');
});

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db.close();
}); 
