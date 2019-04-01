const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const isEmpty = require("is-empty");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const config = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  config.query("CREATE DATABASE IF NOT EXISTS `nodejs_login1`");
  config.query("USE nodejs_login1");
  var sql="CREATE TABLE IF NOT EXISTS `users`(`CWID` int(8), `firstName` varchar(20), `lastName` varchar(20), `email` varchar(40)  PRIMARY KEY, `password` varchar(200), `role` varchar(20))";
  config.query(sql);
  
config.query("SELECT * FROM users WHERE Email = ?",[req.body.email], function(error, results, fields){
  if(!isEmpty(results)){
  
    return res.status(400).json({ email: "Email already exists" });
 
  }
  else{
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        const newUser= {
          "cwid" : req.body.cwid,
          "firstName":req.body.firstName,
          "lastName":req.body.lastName,
          "email":req.body.email,
          "password":hash,
          "role" : req.body.role
        };
        if (err) throw err;
        var cwid = newUser.cwid;

        if(cwid.length == 8){
          
          config.query('INSERT INTO users SET ?',newUser, function (error, results, fields) {
             if(error){
               console.log(error);
             } 
             else{
               res.json(newUser);
             }  
          
          });
    }
  });
    });
   


  }
})
 
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  config.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
  if(results.length<0){
    return res.status(404).json({ emailnotfound: "Email not found" });
 
  }
  else{
    bcrypt.compare(req.body.password, results[0].password, function(err, response) {
    if(response === true){
      // User matched
        // Create JWT Payload
        const payload = {
          email: email
          
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 86400 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              role: results[0].role
            });
          }
        );
    }
    else {
      return res
        .status(400)
        .json({ passwordincorrect: "Password incorrect" });
    }
    
    });
  }
  
  });
  
});

module.exports = router;