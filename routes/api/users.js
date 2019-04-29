const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const Validator = require("validator");
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
  console.log(req.body);

  config.query(
    "SELECT * FROM users WHERE Email = ?",
    [req.body.email],
    function (error, results, fields) {
      if (isEmpty(results)) {
        return res.status(400).json({ email: "This email has not been invited. Please contact your supervisor" });
      } 
      
      
      else {

        if(results[0].password === null){
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            const newUser = {
              
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash
            };

            
            if (err) throw err;
            

           
              config.query("UPDATE users SET  firstName = ?, lastName= ?, password= ? where email=?",
               [newUser.firstName, newUser.lastName, newUser.password, newUser.email], function(
                error,
                results,
                fields
              ) {
                if (error) {
                  console.log(error);
                } else {
                  res.json("You have been registered");
                }
              });
            
          });
        });
      }

      else{
        return res.status(400).json({ email: "This email has already been registered" });
      }
      }
    }
  );
});

router.post("/update", passport.authenticate("jwt", {session: false}), (req, res) => {
  const errors = {};
  var status = false;
  console.log(req.body)
  var email = req.body.email;
  var password = req.body.password;
  var currentpassword = req.body.currentpassword;
  var password2 = req.body.password2;
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  currentpassword = !isEmpty(currentpassword) ? currentpassword : "";
  password2 = !isEmpty(password2) ? password2 : "";

  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }



  if (Validator.isEmpty(currentpassword)) {
    errors.currentpassword = "Password field is required";
  }

  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(password, password2)) {
    errors.password2 = "Passwords must match";
  }

if(!isEmpty(errors)){
  return res.status(400).json({
    errors, status: status});
}

  config.query("SELECT * FROM users WHERE email = ?", [email], function (
    error,
    results,
    fields
  ) {

    
 
      bcrypt.compare(currentpassword, results[0].password, function (err, response) {
        if(response === true){
        
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              config.query("Update `users` set `password` = ? where `email`= ?",[hash, email], function(err, results){
                if(err) throw err;

                else{

                return res.status(200).json({errors, status: true})
                }
              })
            })
          })
         
        }

        else{
          errors.currentpassword = "Current password does not match"
          
          return res.status(400).json({
            errors, status: status});
          }

      })
    
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

  config.query("SELECT * FROM users WHERE email = ?", [email], function (
    error,
    results,
    fields
  ) {
    if (undefined !== results && results.length <= 0) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else if (results) {
      bcrypt.compare(password, results[0].password, function (err, response) {
        if (response === true) {
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
                role: results[0].role,
                email: email,
                name: results[0].firstName,
                department: results[0].Dept_Id
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    }
  });
});

module.exports = router;
