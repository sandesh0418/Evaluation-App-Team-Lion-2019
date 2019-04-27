const express = require("express");
const router = express.Router();
var connection = require('../../models/User');
var passport = require('passport');
var connection = require('../../models/User')
var validator = require('../../validation/evaluatorValidator');
var nodeMailer = require('nodemailer');
//PATH: evaluators/evaluatorsList


router.post('/addEvaluator', passport.authenticate("jwt", {session: false}), (req,res) =>{

    const { errors , isValid } = validator(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
      }
  
        
            var email = req.body.email;
            
            console.log(email);
            let transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'emailtester845@gmail.com',
                    pass: 'TeamLion128'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            let mailOptions = {
                from: '"Nabin Karki" <emailtester845@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Evaluator Assignment", // Subject line
                text: "Please go to localhost:3000/register to register as an evaluator" // plain text body
               // html: '<b>NodeJS Email Tutorial</b>' // html body
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                    
                })
            
    connection.query("Select * from `users` where `email` = ?", req.body.email, function(err, result, fields){
        if(err) throw err;

        if(result.length>0){
            errors.email = "Evaluator with that email already exist";
            return res.status(400).json(errors);

        }
    
    connection.query("INSERT INTO `users`(`firstName`, `lastName`, `email`,`Dept_Id`,`role`) VALUES(?,?,?,?,?)", [req.body.firstName, req.body.lastName, req.body.email, req.body.Dept_Id, "Evaluator"], function(err, result){
        
        if (err) throw err;
        else{
            res.send("Evaluator has been added");
        }
    })

})

})

router.post("/deleteEvaluator", passport.authenticate("jwt", {session: false}), (req, res) =>{
    var email = req.body.email;

    connection.query("UPDATE `users` SET `password`= 'deleted' where `email` = ?", email, function(err, result, fields){
        if(err) throw err;

    })
})


router.get('/evaluatorList/:deptId', (req, res) => {
    departmentId = req.params.deptId;
    let evaluatorList;

    let queryGetEvaluators = "SELECT firstName, lastName, email FROM users WHERE Dept_Id='" + departmentId + "' AND role='Evaluator' AND NOT `password` = 'deleted'";
    
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