var express = require('express');
var mysql = require('mysql')
var router = express.Router();
var dbPool = require('.././common/dataAccess.js')

router.get('/', function(req, res, next) {
  var createUserTable = "create table if not exists user(id INT AUTO_INCREMENT NOT NULL,\
  name VARCHAR(255) NOT NULL UNIQUE,\
  password VARCHAR(255) NOT NULL,\
  PRIMARY KEY(id))";

  var createBookTable = "create table if not exists books(id INT AUTO_INCREMENT NOT NULL,\
  title VARCHAR(255) NOT NULL,\
  author VARCHAR(255) NOT NULL,\
  summary VARCHAR(255) NOT NULL,\
  genres VARCHAR(255) NOT NULL,\
  uploaderId INT NOT NULL,\
  PRIMARY KEY(id),\
  FOREIGN KEY(uploaderId) REFERENCES user(id))";

  dbPool.query(createUserTable, (err, result) => {
    if(err) throw err;
  });

  dbPool.query(createBookTable, (err, result) => {
    if(err) throw err;
  });
});

module.exports = router;
