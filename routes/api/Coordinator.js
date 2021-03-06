const express = require("express");
const router = express.Router();
var connection = require("../../models/User");
const passport = require("passport");
var nodeMailer = require("nodemailer");
const bodyParser = require("body-parser");
const isEmpty = require("is-empty");
const Validator = require("validator");
var uniqid = require("uniqid");

router.post(
  "/addCoordinator",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var email = req.body.email[0];
    var department = req.body.department[0];
    email = !isEmpty(email) ? email : "";
    department = !isEmpty(department) ? department : "";

    var errors = {};

    if(Validator.isEmpty(email)){
      errors.email = "Email field cannot be empty";
    
    }

   else if(!email.includes("@")){
    errors.email = "Please enter a valid email";
    
   }

   if(Validator.isEmpty(department)){
    errors.department = "Department field cannot be empty";

  }

  

  if(!isEmpty(errors)){
    
    return res.status(400).json({ errors, status: false });
  }
  
  else{
    connection.query("SELECT * from `users` where email = ?", email, function(
      err,
      result,
      fields
    ) {
      if (err) throw err;
      
      if (result.length > 0) {
        errors.email = "Coordinator already exists";
        
        return res.status(400).json({ errors, status: false });
      }

   

          connection.query(
            "INSERT INTO `users`( `email`, `Dept_Id`, `role`) VALUES(?,?,?)",
            [email, department, "Administrator"],
            function(err, result, fields) {
              if (err) throw err;

              let transporter = nodeMailer.createTransport({
                service: "gmail",
                auth: {
                  user: "emailtester845@gmail.com",
                  pass: "TeamLion128"
                },
                tls: {
                  rejectUnauthorized: false
                }
              });
              let mailOptions = {
                from: '"ULM Department Evaluation App" <emailtester845@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Coordinator Assignment", // Subject line
                html:
                  "<p>Please <a href='https://team-lion-evaluation.herokuapp.com/register'>Click here</a> to register as a coordinator</p>" // plain text body
                // html: '<b>NodeJS Email Tutorial</b>' // html body
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log(
                  "Message %s sent: %s",
                  info.messageId,
                  info.response
                );
              });

              res.status(200).json({ errors, status: true });
            }
          );
      //   }
      // );
    });
  }
  }
);

router.post(
  "/addDepartment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var department = req.body.department[0];
    var errors = {};
    department = !isEmpty(department) ? department : "";
    if(Validator.isEmpty(department)){
      errors.department = "Department field cannot be empty";
      return res.status(400).json({ errors, status: false });
  
    }
    
    
      
    
   
    
    var dept_id = uniqid();


    connection.query("SELECT * from `department` where department_Name = ?", department, function(
      err,
      result,
      fields
    ) {
      if (err) throw err;

      if (result.length > 0) {
        errors.department = "Department already exists";
        return res.status(400).json({ errors, status: false });
      }

      connection.query(
        "INSERT INTO  `department`(department_Id , department_Name) Values(?,?)",
        [dept_id, department],
        function(err, result, fields) {
          if (err) throw err;
          res.status(200).json({ errors, status: true });
        }
      );
    }
    );
  }
);

router.get(
  "/viewCoordinator",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var Coordinator = [];
    connection.query(
      "SELECT * from users where role =? and password!='deleted' ",
      "Administrator",
      function(err, result, fields) {
        
       
        if (err) throw err;

        if (result.length > 0) {
          for (var i = 0; i < result.length; i++) {
            Coordinator[i] = {
              firstName: `${result[i].firstName}`,
              lastName: `${result[i].lastName}`,
              email: `${result[i].email}`
            };
          }
        }

        res.send(Coordinator);
      }
    );
  }
);

router.get(
  "/viewCoordinatorDeleted",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var Coordinator = [];
    connection.query(
      "SELECT * from users where role =? and password='deleted'",
      "Administrator",
      function(err, result, fields) {
        
        if (err) throw err;
        
        if (result.length > 0) {
          for (var i = 0; i < result.length; i++) {
            Coordinator[i] = {
              firstName: `${result[i].firstName}`,
              lastName: `${result[i].lastName}`,
              email: `${result[i].email}`
            };
          }
        }

        res.send(Coordinator);
      }
    );
  }
);

router.post(
  "/removeCoordinator",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var email = req.body.email;
    
    connection.query("SELECT * from users where email = ?", [email], function(
      err,
      result,
      fields
    ) {
      if (err) throw err;

      if (result.length <= 0) {
        // return res.status(400).json({ "Coordinator doesn't exist" });
      }

      connection.query(
        "UPDATE users SET password='deleted' where email =?",
        [email],
        function(err, result, fields) {
          if (err) throw err;

          res.send("Coordinator has been removed");
        }
      );
    });
  }
);

router.get(
  "/getDepartment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var Departments = [];
    connection.query("SELECT * from department order by department_Name", function(err, result, fields) {
      if (err) throw err;

      if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
          Departments[i] = {
            department_Name: `${result[i].department_Name}`,
            department_Id: `${result[i].department_Id}`
          };
        }
      }

      res.send(Departments);
    });
  }
);

router.post(
  "/removeDepartment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var department = req.body.department;
    
    connection.query("SELECT * from department where department_Name = ?", [department], function(
      err,
      result,
      fields
    ) {
      if (err) throw err;

      if (result.length <= 0) {
         return res.status(400).json( "Department doesn't exist" );
      }

      connection.query(
        "DELETE FROM department where department_Name = ?",
        [department],
        function(err, result, fields) {
          if (err) throw err;

          res.send("Department has been removed");
        }
      );
    });
  }
);
module.exports = router;
