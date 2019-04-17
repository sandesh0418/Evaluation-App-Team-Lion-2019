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
    //   main();

    // async function main(){
        
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
            }
      
    connection.query("INSERT INTO `users`(`firstName`, `lastName`, `email`) VALUES(?,?,?)", [req.body.firstName, req.body.lastName, req.body.email], function(err, result){
        console.log("its messed up here");
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