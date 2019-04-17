const express = require("express");
const router = express.Router();
var connection = require('../../models/User');
var passport = require('passport');
var connection = require('../../models/User')
var validator = require('../../validation/evaluatorValidator');
var nodemailer = require('nodemailer');
//PATH: evaluators/evaluatorsList


router.post('/addEvaluator', passport.authenticate("jwt", {session: false}), (req,res) =>{

    const { errors , isValid } = validator(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
      }
    //   main();

    // async function main(){
        
    //     let transporter = nodemailer.createTransport({
    //         service: 'gmail', 
    //         auth: {
    //           user: "", 
    //           pass: "" 
    //         }
    //       });
    //       let mailOptions = {
    //         from: `"Fred Foo 👻" <email@gmail.com>`, 
    //         to: req.body.email, 
    //         subject: "Invitation to register for Department Evaluation Application", 
    //         text: "Hello "+req.body.firstName+"Follow the link to sign up: "+"www.google.com" 
            
    //       };
    //       let info = await transporter.sendMail(mailOptions);
    //       console.log("Message sent: %s", info.messageId);
  
    //       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
    // }
      
    connection.query("INSERT INTO `users`(`firstName`, `lastName`, `email`, `Dept_Id`) VALUES(?,?,?,?)", [req.body.firstName, req.body.lastName, req.body.email, req.body.Dept_Id], function(err, result){
        if (err) throw err;
        else{
            res.send("Evaluator has been added");
        }
    })
})


router.get('/evaluatorList/:deptId', (req, res) => {
    departmentId = req.params.deptId;
    let evaluatorList;
    console.log(departmentId)

    let queryGetEvaluators = "SELECT firstName, lastName, email FROM users WHERE Dept_Id='" + departmentId + "'";
    
    connection.query(queryGetEvaluators, function(error, results, fields) {
        if (error) 
        {
            res.status(400).json({
              status:false,
              error: error,
              message:'The evaluators could not be retrieved.'
              })
        }
        else
        {
            console.log(results)
            if (results.length > 0)
            {
                evaluatorList = Object.values(JSON.parse(JSON.stringify(results)))
                res.status(200).json({
                    status: true,
                    evaluatorList: evaluatorList
                })
            }
            else
            {
                res.status(404).json({
                    status:false,
                    message:'There are no evaluators.'
                })
            }
        }
    })
})

module.exports = router;