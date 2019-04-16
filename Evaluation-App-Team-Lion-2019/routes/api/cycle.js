const express = require("express");
const router = express.Router();
var connection = require('../../models/User');
const passport = require('passport');

var uniqid = require('uniqid');


router.post("/", passport.authenticate("jwt", {session: false}), (req,res) => {
 
    var cycleId = uniqid();
    
    

    connection.query("INSERT INTO Cycle(`Dept_ID`,`Cycle_Id`, `Cycle_Name`,`Start_Date`,`End_Date`,`status`) Values(?,?,?,?,?,?)",[req.body.deptId,cycleId,req.body.Cycle_Name,req.body.Start_Date," ","In Progress"], function(err, result, fields){
        if (err) throw err;
        else{
            res.send("Data added");
        }
    })
})




router.get("/getPreviousCycles/:id",passport.authenticate("jwt", {session: false}),  (req, res) =>{
 var deptId = req.params.id;
 connection.query("Select * from Cycle where Dept_Id = ? and End_Date != '' and status = ?",[deptId, "done"], function(err, result, fields){
    if (err) throw err;
    else{
        res.send(result);
    }
 })   
    
})

router.get("/getCyclesInProgress/:id",passport.authenticate("jwt", {session: false}),  (req, res) =>{
    var deptId = req.params.id;
    

    connection.query("SELECT * from Cycle where Dept_Id = ? and status =?", [deptId, "In Progress"], function(err, result, fields){
        if (err) throw err;

        else{
            res.send(result);
        }
    })
    
})


// router.post('/useCycle',passport.authenticate("jwt", {session: false}), (req,res) =>{

//     var cycleId = req.body.Cycle_Id;

//     connection.query("update `cycle` SET `status`= ? where `Cycle_Id` = ?",["In Progress", cycleId], function(err, result, fields){
//         if (err) throw err;

//         else{
//             res.send("Cycle in Progress");
//         }
//     })
// })


router.post('/endCycle',passport.authenticate("jwt", {session: false}), (req,res) =>{

    var cycleId = req.body.Cycle_Id;
    console.log(cycleId)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    connection.query("update `cycle` set `status` = ?, `End_Date` = ? where `Cycle_Id` = ?",["done",today,cycleId], function(err, result, fields){
        if (err) throw err;

        else{
            res.send("Cycle is completed");
        }
    })
})
module.exports = router;