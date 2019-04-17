const express = require("express");
const router = express.Router();
var connection = require('../../models/User');
const passport = require('passport');

var uniqid = require('uniqid');

router.post('/addCoordinator', passport.authenticate("jwt", {session: false}), (req, res) =>{

    var email = req.body.email;
    var department= req.body.department;
    
    var cwid = (Number) (req.body.cwid);
    var dept_id = uniqid();
    connection.query("SELECT * from `users` where email = ? OR CWID = ?",[email, cwid], function(err, result, fields){
        if (err) throw err;

        if(result.length>0){
            return res.status(400).json({ email: "Coordinator already exists" });
        }
        
        connection.query("INSERT INTO users(`CWID`, `email`, `Dept_Id`, `role`) VALUES(?,?,?,?)",[cwid,email, dept_id , "Administrator"], function(err, result, fields){
            if(err) throw err;

            connection.query("INSERT INTO  `department`(department_Id , department_Name) Values(?,?)",[dept_id, department], function(err, result, fields){
                if (err) throw err;

              
                    res.send('Coordinator has been added');
                
            })
        })
    })
})


router.get('/viewCoordinator', passport.authenticate("jwt", {session: false}), (req, res) =>{
    var Coordinator = [];
    connection.query("SELECT * from users where role =? and password!='deleted' ","Administrator", function(err, result, fields){
        // 
        console.log(result);
        if (err) throw err;

        if(result.length>0){
            for(var i = 0; i<result.length; i++){
                Coordinator[i] = {
                    firstName: `${result[i].firstName}`,
                    lastName: `${result[i].lastName}`,
                    email: `${result[i].email}`
                }
            }
        }

        res.send(Coordinator);
    })
})

router.get('/viewCoordinatorDeleted', passport.authenticate("jwt", {session: false}), (req, res) =>{
    var Coordinator = [];
    connection.query("SELECT * from users where role =? and password='deleted'","Administrator", function(err, result, fields){
        // 
        // 
        if (err) throw err;
        console.log(result)
        if(result.length>0){
            for(var i = 0; i<result.length; i++){
                Coordinator[i] = {
                    firstName: `${result[i].firstName}`,
                    lastName: `${result[i].lastName}`,
                    email: `${result[i].email}`
                }
            }
        }

        res.send(Coordinator);
    })
})

router.post('/removeCoordinator', passport.authenticate("jwt", {session: false}), (req, res) =>{

    var email = req.body.email;
    console.log(email);
    connection.query("SELECT * from `users` where email = ?",[email], function(err, result, fields){
        if (err) throw err;

        if(result.length<=0){
            // return res.status(400).json({ "Coordinator doesn't exist" });
        }
        
        connection.query("UPDATE users SET password='deleted' where email =?",[email], function(err, result, fields){
            if(err) throw err;


              
                    res.send('Coordinator has been removed');
                
            
        })
    })
})


module.exports = router;
