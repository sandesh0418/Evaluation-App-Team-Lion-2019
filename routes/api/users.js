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
  console.log(req.body);

  config.query(
    "SELECT * FROM users WHERE Email = ?",
    [req.body.email],
    function(error, results, fields) {
      if (isEmpty(results)) {
        return res.status(400).json({ email: "This email has not been invited. Please contact your supervisor" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            const newUser = {
              cwid: req.body.cwid,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash
            };
            if (err) throw err;
            var cwid = newUser.cwid;

            if (cwid.length == 8) {
              config.query("UPDATE users SET  cwid = ?, firstName =?, lastName=?, password=? where email=? and password is NULL", [newUser.cwid, newUser.firstName, newUser.lastName, newUser.password, newUser.email], function(
                error,
                results,
                fields
              ) {
                if (error) {
                  console.log(error);
                } else {
                  res.json(newUser);
                }
              });
            }
          });
        });
      }
    }
  );
});

router.post("/update", (req, res) => {
  config.query("USE nodejs_login1");
  var sql = "UPDATE users SET ";
  if (!(req.body.firstName === "")) {
    sql += 'firstName="' + req.body.firstName + '", ';
  }
  if (!(req.body.lastName === "")) {
    sql += 'lastName="' + req.body.lastName + '" ';
  }
  // if (!(req.body.cwid === "")){
  //   sql+="cwid=""+req.body.cwid+"" ";
  // }
  // if (!(req.body.email === "")){
  //   sql+="email=\""+req.body.email+"\" ";
  // }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (req.body.password === req.body.passowrd2) {
        sql += 'password="' + hash + '"';
        console.log(hash);
      }
    });
  });
  sql += 'WHERE email="' + req.body.currentEmail + '";';

  console.log(sql);
  config.query(sql, function(error, results, fields) {
    if (error) {
      console.log(error);
    }
  });
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

  config.query("SELECT * FROM users WHERE email = ?", [email], function(
    error,
    results,
    fields
  ) {
    if (undefined !== results && results.length <= 0) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else if (results) {
      bcrypt.compare(password, results[0].password, function(err, response) {
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
