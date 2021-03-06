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
            
            connection.query("Select * from `users` where `email` = ?", req.body.email, function(err, result, fields){
                if(err) throw err;
        
                if(result.length>0){
                    errors.email = "Evaluator with that email already exist";
                    return res.status(400).json(errors);
        
                }


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
                from: '"ULM Evaluation Application 2019" <emailtester845@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Evaluator Assignment", // Subject line
                html: "<p>Please <a href='https://team-lion-evaluation.herokuapp.com/register'>Click here</a> to register as an evaluator.</p>" // plain text body
               // html: '<b>NodeJS Email Tutorial</b>' // html body
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                    
                })
            
    
    
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


router.get('/memberList/:deptId/:email', passport.authenticate("jwt", {session: false}), (req, res) => {
    let departmentId = req.params.deptId;

    let whereCondition = "AND NOT role='admin' AND NOT email='" + req.params.email + "'";

    getEvaluators(req, res, whereCondition, departmentId);

})

router.get('/evaluatorList/:deptId', passport.authenticate("jwt", {session: false}), (req, res) => {
    let departmentId = req.params.deptId;

    let whereCondition = "AND role='Evaluator'";

    getEvaluators(req, res, whereCondition, departmentId);

})

function getEvaluators(req, res, whereCondition, departmentId)
{
    let evaluatorList;

    let queryGetEvaluators = "SELECT firstName, lastName, email FROM users WHERE Dept_Id='" + departmentId + 
        "' AND NOT `password` = 'deleted' " + whereCondition;
    
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
}


router.get("/evaluatorProgressBar/:id", (req, res) =>{
var Dept_Id = req.params.id;




connection.query("SELECT firstName, lastName, email FROM users WHERE Dept_Id='" + Dept_Id + "' AND NOT role='Admin' AND NOT `password` = 'deleted' order by firstName asc; ", function(errors, results, fields){
    if (errors) throw errors;
    
    if(results.length>0){

        
        var progressBar = [];
        var noProgress = [];
        var count = 0;
        
        results.forEach(function(progres, i){
            var email = results[i].email
            var firstName=results[i].firstName
            var lastName=results[i].lastName
            
           
           
                    
            connection.query("SELECT distinct Assignment_ID from `subject_score` where `User_Email` = ?; Select distinct Assignment_ID from subject_list natural join assignments as a where a.`User_Email` = ?; Select Rubric_Id from rubric as r right join measure as m on r.`Rubric_Title` = m.`Tool_Name`;" ,
                [email,email], function(err, result, fields){
                            if (err) throw err;
                            count++;
                            
                            console.log(result[0])
                            if(result[1].length>0){
                                var average = (result[0].length/result[1].length)*100;

                           const obj ={
                                firstName: `${firstName}`,
                                lastName: `${lastName}`,
                                progress: `${average}`

                            }
                            noProgress.push(obj)
                        }

                        else{
                            const obj ={
                                firstName: `${firstName}`,
                                lastName: `${lastName}`,
                                progress: 'false'

                            }
                            progressBar.push(obj)
                        }

                        if(count === results.length){
                            var resu = []
                            resu[0] = noProgress;
                            resu[1] = progressBar;
                            res.send(resu)
                        }
                        })
        })
    }
})
})

module.exports = router;
