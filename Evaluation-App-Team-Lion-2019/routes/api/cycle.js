const express = require("express");
const router = express.Router();
var connection = require('../../models/User');
const passport = require('passport');

var uniqid = require('uniqid');


router.post("/", passport.authenticate("jwt", {session: false}), (req,res) => {
 var deptId = uniqid();
    var cycleId = uniqid();

    

    connection.query("INSERT INTO Cycle(`Dept_ID`,`Cycle_Id`, `Cycle_Name`,`Start_Date`,`End_Date`) Values(?,?,?,?,?)",[deptId,cycleId,req.body.Cycle_Name,req.body.Start_Date," "], function(err, result, fields){
        if (err) throw err;
        else{
            res.send("Data added");
        }
    })
})


router.get("/getCycles", passport.authenticate("jwt", {session: false}), (req, res) =>{

    connection.query("Select * from Cycle",function(err, result){
        if (err) throw err;
        else{
            res.send(result);
        }
    })
})

module.exports = router;