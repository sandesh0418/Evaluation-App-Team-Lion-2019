const express = require("express");
const router = express.Router();
var connection = require('../../models/User');
const passport = require('passport');
const uuidv1 = require('uuid/v1');
var uniqid = require('uniqid');


router.post("/", passport.authenticate("jwt", {session: false}), (req,res) => {
 
    var cycleId = uniqid();
    
    

    connection.query("INSERT INTO `cycle`(`Dept_ID`,`Cycle_Id`, `Cycle_Name`,`Start_Date`,`End_Date`,`status`) Values(?,?,?,?,?,?)",[req.body.deptId,cycleId,req.body.Cycle_Name,req.body.Start_Date," ","In Progress"], function(err, result, fields){
        if (err) throw err;
        else{
            res.send("Data added");
        }
    })
})




router.get("/getPreviousCycles/:id",passport.authenticate("jwt", {session: false}),  (req, res) =>{
 var deptId = req.params.id;
 connection.query("Select * from `cycle` where Dept_Id = ? and End_Date != '' and status = ?",[deptId, "done"], function(err, result, fields){
    if (err) throw err;

    
    else{
        res.send(result);
    }
 })   
    
})

router.get("/getCyclesInProgress/:id",passport.authenticate("jwt", {session: false}),  (req, res) =>{
    var deptId = req.params.id;
    

    connection.query("SELECT * from `cycle` where Dept_Id = ? and status =?", [deptId, "In Progress"], function(err, result, fields){
        if (err) throw err;

        else{
            res.send(result);
        }
    })
    
})

router.post("/migrateCycle",passport.authenticate("jwt", {session: false}),  (req, res) =>{
    var OldCycleId = req.body.migrate_Id;
    var Cycle_Name = req.body.Cycle_Name;
    var Cycle_Start_Date = req.body.Start_Date;
    var Dept_Id = req.body.deptId;

    var newCycleId = uniqid();
    
    
    var myMap = new Map();
    var key ;


    function scales(Rubric_Id, newRubricId){
       
        connection.query("SELECT * from `scales` where `Rubric_Id` = ?", Rubric_Id, function(err, results, fields){
            if (err) throw err;

            if(results.length>0){
                for(var j = 0 ; j<results.length;j++){
                    
                    connection.query("INSERT INTO `scales`(`Rubric_Id`, `Value_Name`, `Value_Number`) VALUES(?,?,?)",
                    [newRubricId, results[j].Value_Name, results[j].Value_Number], function(err, result, fields){
                        if (err) throw err;
                    })

                }
            }
        })
    }

    function data(Rubric_Id, newRubricId){
        
        connection.query("Select * from `data` where `Rubric_Id` = ?",Rubric_Id,function(err, results, fields){
            if(err) throw err;

            if(results.length>0){
                for(var l = 0;l<results.length;l++){
                    connection.query("INSERT INTO `data`(`Rubric_Id`, `Row_Id`, `Data`, `index`) VALUES(?,?,?,?)",
                    [newRubricId, results[l].Row_Id,results[l].Data, results[l].index], function(err, result, fields){
                        if(err) throw err;
                    })
                }
            }

            
        })

    }

    function criteria(Rubric_Id, newRubricId){
        
        connection.query("Select * from `criteria` where `Rubric_Id` = ? ", Rubric_Id, function(err, results, fields){
            if(err) throw err;

            if(results.length>0){
                for(var k = 0; k<results.length;k++){
                    connection.query("INSERT INTO `criteria`(`Rubric_Id`, `Criteria_Title`, `weight`, `Row_Id`) VALUES(?,?,?,?)",
                    [newRubricId, results[k].Criteria_Title,results[k].weight, results[k].Row_Id], function(err, result, fields){
                        if(err) throw err;
                    })
                }
            }
        })
    }

    function measure(oldOutcomeId, Outcome_ID){
        connection.query("Select * from `measure` where `Outcome_ID` = ?",oldOutcomeId, function(err, results, fields){
            if (err) throw err;

           

            if(results.length>0){
                for(var k = 0; k<results.length;k++){
                    var measureId = uuidv1();
                    connection.query("INSERT INTO `measure`(`Measure_ID`, `Outcome_ID`, `Description`, `Percent_to_reach_target`, `Target_Score`, `Tool_Name`, `Measure_Name`) VALUES(?,?,?,?,?,?,?)",
                    [measureId, Outcome_ID, results[k].Description, results[k].Percent_to_reach_target, results[k].Target_Score, results[k].Tool_Name,results[k].Measure_Name], function(err, result, fields){
                        if (err) throw err;
                    })
                }
            }
        })
    }

    connection.query("INSERT INTO `cycle`(`Cycle_Id`, `Cycle_Name`, `Start_Date`, `End_Date`, `Dept_Id`, `status`) VALUES(?,?,?,?,?,?)",
    [newCycleId,Cycle_Name,Cycle_Start_Date,"",Dept_Id,"In Progress"], function(err, result, fields){
        
        if (err) throw err;

    })


    connection.query("Select * from `rubric` where `Cycle_Id` = ? ",OldCycleId, function(err, results, fields){
        if (err) throw err;

        
            
        if(results.length> 0){
           
            for(var i =0; i<results.length;i++){
                myMap.set(results[i].Rubric_Id, uniqid());
            }

           
            key = Array.from(myMap.keys());
            
            for(var i = 0 ; i<key.length;i++){
                
                
                
                connection.query("INSERT INTO `rubric`(`Rubric_Id`, `Rubric_Title`, `Rows`, `scores`, `weight`, `Cycle_Id`) VALUES(?,?,?,?,?,?)",
                [myMap.get(key[i]), results[i].Rubric_Title,results[i].Rows,results[i].scores, results[i].weight, newCycleId], function(err, result, fields){
                    if(err) throw err;

                })

                criteria(key[i], myMap.get(key[i]))
                scales(key[i], myMap.get(key[i]))
                data(key[i], myMap.get(key[i]))

            }
            connection.query("Select * from `outcome` where `Cycle_Id` = ?", OldCycleId, function(err, result, fields){
                if (err) throw err;
            
                
            
                if(result.length>0){
                    for(var i = 0; i<result.length;i++){
                        let Outcome_ID = uuidv1();
                        measure(result[i].Outcome_ID, Outcome_ID)
                        connection.query("INSERT INTO `outcome`(`Outcome_ID`, `Description`, `Outcome_Name`, `Cycle_Id`) VALUES(?,?,?,?)",
                        [Outcome_ID, result[i].Description,result[i].Outcome_Name, newCycleId], function(err, result, fields){
                            if (err) throw err; 
                        })
            
                        
                    }
                }
            
            
            
            })
    
        }
       


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
