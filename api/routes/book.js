var express = require('express');
var formidable = require('formidable');
var router = express.Router();
var mysql = require('mysql');
var dbPool = require('.././common/dataAccess.js')

router.post('/add', function(req, res, next) {
  var sqlNewBook = "INSERT INTO books (title, author, summary, genres, uploaderId) VALUES (?)";
  var values = [req.body.title, req.body.author, req.body.summary, req.body.genres, req.body.id];
  dbPool.query(sqlNewBook, [values], (err, result) => {
      if(err){
        return res.status(500).json({
        err_code:500,
        message:'server is busy'});
      }
  });
  res.json({code:0, msg:'Adding Success', success: true});
});

router.get('/allbooks', function(req, res, next){
  var sqlGetAllBooks = "SELECT * FROM books";
  dbPool.query(sqlGetAllBooks, (err, result) => {
    if (err) {
      return res.status(500).json({
        err_code:500,
        message:'server is busy'});
    }
    res.json({code:0, msg:'Get All Books', success: true, data: result})
  })
});

router.get('/getBook/:id', function(req, res, next){
  var sqlGetBook = "SELECT * FROM books WHERE id=?";
  dbPool.query(sqlGetBook, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({
        err_code:500,
        message:'server is busy'});
    }
    res.json({code:0, msg:'Get Book with ' + req.params.id , success: true, data: result})
  })
});

router.delete('/deleteBook/:id', function(req, res, next){
  var sqlDeleteBook = "DELETE FROM books WHERE id=?";
  dbPool.query(sqlDeleteBook, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({
        err_code:500,
        message:'server is busy'});
    }
    res.json({code:0, msg:'Delete Book with ' + req.params.id , success: true})
  })
});

module.exports = router;