const bcrypt = require('bcrypt');
const saltRounds = 10;
var express=require("express");


 
module.exports.register=function(req,res){
  var connection = require('../config');
    var password = "";
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
   
  
  
    var users={
		"cwid" : req.body.cwid,
        "firstName":req.body.firstName,
		"lastName":req.body.lastName,
        "email":req.body.email,
        "password":hash,
		"role" : req.body.role
        
    }
 
  var cwid = users.cwid;

	if(cwid.length == 8){
    connection.query("CREATE DATABASE IF NOT EXISTS `nodejs_login1`");
      connection.query("USE nodejs_login1");
       var sql="CREATE TABLE IF NOT EXISTS `users`(`CWID` int(8) PRIMARY KEY, `firstName` varchar(20), `lastName` varchar(20), `email` varchar(100), `password` varchar(200), `role` varchar(20))";
    connection.query(sql);
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })
      }
    });}
	else{
    res.json({
      status:false,
      
      message:"please Enter valid CWID"
  })
		

  }
});
}
