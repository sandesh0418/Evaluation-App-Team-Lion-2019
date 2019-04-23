const express = require("express");
const router = express.Router();
var connection = require('../../models/User');
const passport = require('passport');
const uuidv1 = require('uuid/v1');
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

router.post("/migrateCycle", passport.authenticate("jwt", {session: false}), (req, res) =>{
    var OldCycleId = req.body.migrate_Id;
    var Cycle_Name = req.body.Cycle_Name;
    var Cycle_Start_Date = req.body.Start_Date;
    var Dept_Id = req.body.deptId;

    var newCycleId = uniqid();
    var Rubric_Id = uniqid();
    var OldRubricId = "";


    connection.query("INSERT INTO `cycle`(`Cycle_Id`, `Cycle_Name`, `Start_Date`, `End_Date`, `Dept_Id`, `status`) VALUES(?,?,?,?,?,?)",[newCycleId,Cycle_Name,Cycle_Start_Date,"",Dept_Id,"In Progress"], function(err, result, fields){
        if (err) throw err;


    connection.query("Select * from `rubric` where `Cycle_Id` = ? ",OldCycleId, function(err, result, fields){
        if (err) throw err;
            OldRubricId = result[0].Rubric_Id;
        if(result.length> 0){
            for(var i =0 ; i<result.length;i++){
                connection.query("INSERT INTO `rubric`(`Rubric_Id`, `Rubric_Title`, `Rows`, `scores`, `weight`, `Cycle_Id`) VALUES(?,?,?,?,?,?)",
                [Rubric_Id, result[i].Rubric_Title,result[i].Rows,result[i].scores, result[i].weight, newCycleId], function(err, result, fields){
                    if(err) throw err;

                })
            }
        }

        connection.query("SELECT * from `scales` where `Rubric_Id` = ?", OldRubricId, function(err, result, fields){
            if (err) throw err;

            if(result.length>0){
                for(var i =0 ; i<result.length;i++){

                    connection.query("INSERT INTO `scales`(`Rubric_Id`, `Value_Name`, `Value_Number`) VALUES(?, ?, ?)",
                    [Rubric_Id, result[i].Value_Name, result[i].Value_Number], function(err, result, fields){
                        if (err) throw err;
                    })

                }
            }
        })

        connection.query("Select * from `criteria` where `Rubric_Id` = ? ", OldRubricId, function(err, result, fields){
            if(err) throw err;

            if(result.length>0){
                for(var i = 0; i<result.length;i++){
                    connection.query("INSERT INTO `criteria`(`Rubric_Id`, `Criteria_Title`, `weight`, `Row_Id`) VALUES(?,?,?,?)",
                    [Rubric_Id, result[i].Criteria_Title,result[i].weight, result[i].Row_Id], function(err, result, fields){
                        if(err) throw err;
                    })
                }
            }
        })

        connection.query("Select * from `data` where `Rubric_Id` = ?",OldRubricId,function(err, result, fields){
            if(err) throw err;

            if(result.length>0){
                for(var i = 0;i<result.length;i++){
                    connection.query("INSERT INTO `data`(`Rubric_Id`, `Row_Id`, `Data`, `index`) VALUES(?,?,?,?)",
                    [Rubric_Id, result[i].Row_Id,result[i].Data, result[i].index], function(err, result, fields){
                        if(err) throw err;
                    })
                }
            }

            
        })

        connection.query("Select * from `outcome` where `Cycle_Id` = ?", OldCycleId, function(err, result, fields){
            if (err) throw err;

            var outcomeId = [];

            if(result.length>0){
                for(var i = 0; i<result.length;i++){
                    let Outcome_ID = uuidv1();
                    outcomeId[i] = Outcome_ID;
                    connection.query("INSERT INTO `outcome`(`Outcome_ID`, `Description`, `Outcome_Name`, `Cycle_Id`) VALUES(?,?,?,?)",
                    [Outcome_ID, result[i].Description,result[i].Outcome_Name, newCycleId], function(err, result, fields){
                        if (err) throw err; 
                    })
                }
            }


            for(var j = 0; j<outcomeId.length;j++){
                connection.query("Select * from `measure` where `Outcome_ID` = ?",outcomeId[j], function(err, result, fields){
                    if (err) throw err;

                    if(result.length>0){
                        for(var k = 0; k<result.length;k++){
                            var measureId = uuidv1();
                            connection.query("INSERT INTO `measure`(`Measure_ID`, `Outcome_ID`, `Description`, `Percent_to_reach_target`, `Target_Score`, `Tool_Name`, `Measure_Name`) VALUES(?,?,?,?,?,?,?)",
                            [measureId, outcomeId[j], result[k].Description, result[k].Percent_to_react_target, result[k].Target_Score, result[k].Tool_Name,result[k].Measure_Name], function(err, result, fields){
                                if (err) throw err;
                            })
                        }
                    }
                })
            }





        })


    })

})
})


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