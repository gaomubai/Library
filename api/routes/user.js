var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');
var dbPool = require('.././common/dataAccess.js')

router.post('/signup', function(req, res, next) {
    var sqlNewUser = "INSERT INTO user (name, password) VALUES (?)";
    var values = [req.body.username, req.body.password];
    dbPool.query(sqlNewUser, [values], (err, result) => {
        if(err){
            return res.status(500).json({
				err_code:500,
				message:'server is busy'});
        }
        res.cookie('username',result.username);
        return res.status(200).json({code:0, msg:'Register Success', success: true})
    });
});

router.post('/signin', function(req, res, next){
    var sqlFindUser = "SELECT * FROM user WHERE NAME='"+req.body.username+"' and PASSWORD='"+req.body.password+"'"
    dbPool.query(sqlFindUser,function(err,result){
        if (err) {
            return res.status(500).json({
				err_code:500,
				message:'server is busy'});
        }
        if(result.length==0){
            console.log("The user name or password is incorrect");
            res.status(200).json({code:1, msg:'Login Fall', success: false});
        }
        res.status(200).json({code:0, msg:'Login Success', success: true, userId: result[0].id});
    })
});

module.exports = router;