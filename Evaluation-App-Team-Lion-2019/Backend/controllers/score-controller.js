var express = require("express");

module.exports.savescore = function(req, res){
    console.log("passed");
    var connection = require('../config');
    var score= {
        //dummy value
        "rubricID": 1,
        "score1": req.body.score1,
        "score2": req.body.score2,
        "score3": req.body.score3

    }
    console.log("passed");

    connection.query("CREATE DATABASE IF NOT EXISTS `nodejs_login1`");
		connection.query("USE nodejs_login1");
         var sql="CREATE TABLE IF NOT EXISTS `users`(`CWID` int(8) PRIMARY KEY, `firstName` varchar(20), `lastName` varchar(20), `email` varchar(100), `password` varchar(200), `role` varchar(20))";
         connection.query(sql);
         var sql="CREATE TABLE IF NOT EXISTS `scores`(`rubricID` int (100), `score1` int (2), `score2` int(2), `score3` int(2))";
         connection.query(sql);
         connection.query('INSERT INTO scores SET ?', score, function(error, results, fields){
            if (error) {
                res.json({
                    status:false,
                    message:'there are some error with query'
                })
              }else{
                  res.json({
                    status:true,
                    data:results,
                    message:'scores sucessfully added'
                })
              }
         });
}