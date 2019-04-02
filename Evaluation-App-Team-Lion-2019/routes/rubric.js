const express = require("express");
const router = express.Router();
var connection = require('../models/User');
const passport = require('passport');
const secret = require('../config/keys');
const validateRubric = require('../validation/rubricValidation');
var uniqid = require('uniqid');

router.post("/createRubric", passport.authenticate("jwt", { session: false}), (req,res) =>{

   
    let { errors, isValid} = validateRubric(req.body);
  

    
    if(!isValid){
        return res.status(400).json(errors);
    }
    else{
        let rows = req.body.rows;
        let scores = req.body.scores;
        let title = req.body.Rubric_Title;
        let weight;
        if(req.body.weight == true){
            weight = 1;
        }
        else{
            weight = 0;
        }
        console.log(rows+" "+scores+ " "+ title+" "+req.body.weight)
        connection.query("Insert Into rubric(`Rubric_Title`,`Rows`,`scores`,`weight`) VALUES(?,?,?,?)",[title,rows,scores,weight],function(error, result, fields){
            if (error) 
            {
               console.log(error)
            }
            else
            {
                insertCriteria();
            }
        })

        criteriatitle = [];

        function insertCriteria()
        {
            for(var i = 0; i<rows;i++){
                let criteriaTitle = "criteria";
                criteriaTitle+=i;
                var rowId = uniqid();
                criteriatitle[i]=criteriaTitle;
                console.log(criteriaTitle)
        
                connection.query("Insert Into rubric_criteria(`Row_Id`,`Rubric_Title`,`Criteria_Title`,`Weight`) VALUES(?,?,?,?)",[rowId,title,criteriaTitle," "],function(error, result, fields){
                    if (error) 
                    {
                        console.log(error)     
                    }
                    else
                    {
                        insertCriteriaScale();
                    }
            })
        }

        function insertCriteriaScale()
        {
            for(var j = 0 ; j<criteriatitle.length;j++){
                for(var i = 0; i<scores;i++){
                    var rowId = uniqid();
                    connection.query("Insert Into rubric_criteria_scale(`Row_Id`,`Rubric_Title`,`Criteria_Title`,`Value_Number`,`Value_Name`, `Value_Description`) VALUES(?,?,?,?,?,?)",[rowId,title,criteriatitle[j],i+1," ", " "],function(error, result, fields){
                        if (error) 
                        {
                            console.log(error)
                        }
                    })
                }
            }
        }
        
        
        
    }



    return res.send(isValid);
    }


})




router.get("/getRow/:title", (req, res)=>{

    rubricTitle = req.params.title;
    
    var criteria = [];
    var dataRow = [];


    connection.query("SELECT * from rubric_criteria where Rubric_Title = ?", rubricTitle, function(err, result, fields){
        if (err) throw err;

        else{
            criteria = result;
        }
        
    connection.query("SELECT Row_Id, Value_Description from rubric_criteria_scale where Rubric_Title = ?",rubricTitle,function(err, result, fields){
        if (err) throw err

        
        else{
          
           let length = 0;
           let count = 0;
           
           while(length != result.length){
            let arr = new Array();
            
            for(var m = 0; m<criteria.length; m++){
                
                arr[m]={
                    Row_Id: `${result[length+m].Row_Id}`,
                    description: `${result[length+m].Value_Description}`
                }
            
            }
            
            dataRow[count] = arr;
            count++;
            length+=criteria.length;
        }
        }

        res.json(dataRow);

    })
})
})

router.get("/getCriteria/:title", (req, res) =>{
    
    rubricTitle = req.params.title;
    var weight = 0;
    var criteria = [];
    
    
    connection.query("Select `weight` from `rubric` where Rubric_Title=\'" + rubricTitle + "\'",function(error, result, fields){
        if(!error && result.length > 0){
            weight += result[0].weight;
        }
        else{
            throw error;
        }


    connection.query("Select Row_Id, Criteria_Title, Weight from rubric_criteria where Rubric_Title = ?",rubricTitle, function(err, result, fields){
        if (err) throw err;
        else{
            if(weight == 1){
            for(var j = 0; j<result.length;j++){
                criteria[j]= [{
                    Row_Id: `${result[j].Row_Id}`,
                    criteria: `${result[j]. Criteria_Title}`,
                    weight: `${result[j].Weight}`
                }]
            }
            }
            else{
                for(var j = 0; j<result.length;j++){
                    criteria[j]= [{
                        Row_Id: `${result[j].Row_Id}`,
                        criteria: `${result[j]. Criteria_Title}`
                        
                    }]
                }
            }

        }

        res.json(criteria);

})
})
})


router.get("/getTopRow/:title",  (req,res) =>{
    rubricTitle = req.params.title;
   
    
    var TopRow = [];
    
    var scales = 0;
    connection.query("Select scores from rubric where Rubric_Title=\'" + rubricTitle + "\'", function(err, result, fields){
        if (err) throw err;

        else{
            scales = result[0].scores;
        }
        
    
    
        connection.query("Select Row_Id, Value_Number, Value_Name from rubric_criteria_scale where Rubric_Title = ? and Criteria_Title = ?", [rubricTitle, "criteria0"], function(err, result, fields){
            if (err) throw err;
            else{
                for(var i = 0; i<scales; i++){
                    TopRow[i]= {
                        Row_Id: `${result[i].Row_Id}`,
                        value: `${result[i].Value_Number}`,
                        name: `${result[i].Value_Name}`
                    }
                }
            }
            res.json(TopRow);
        })
    })
})


router.post("/setTopRow/:handle", passport.authenticate("jwt" , {session: false}), (req, res)=>{
    connection.query("Update rubric_criteria_scale set Value_name = ? where Row_Id = ?", [req.body.value, req.body.row], function(err, result, fields){
        if (err) throw err;
        else{
            res.send("good");
        }
    })
    
})

router.post("/setCriteria/:handle", passport.authenticate("jwt" , {session: false}), (req, res)=>{

   
    connection.query("Update rubric_criteria set criteria_title = ? where Row_Id = ?", [req.body.value, req.body.row], function(err, result, fields){
        if (err) throw err;
        else{
            res.send("good");
        }
    })



    
})

router.post("/setData/:handle", passport.authenticate("jwt" , {session: false}), (req, res)=>{
    connection.query("Update rubric_criteria_scale set Value_Description = ? where Row_Id = ?", [req.body.value, req.body.row], function(err, result, fields){
        if (err) throw err;
        else{
            res.send("good");
        }
    })
    
})


router.get('/getRubric/:id', (req, res) => {
    let rubricTitle = req.params.id;

    let rubric = {
        rubric_title: rubricTitle,
        criteria: []
    }

    getCriteria();

    function getCriteria()
    {
        let queryGetCriteriaTitles = "SELECT Criteria_Title FROM rubric_criteria WHERE Rubric_Title=\'" + rubricTitle + "\'";

        connection.query(queryGetCriteriaTitles, function(error, results, fields) {
            if (error) 
            {
                res.status(404).json({
                status:false,
                error: error,
                message:'The criteria for this rubric could not be retrieved.'
                })
            }
            else
            {
                let criteriaTitles = Object.values(JSON.parse(JSON.stringify(results)));
                criteriaTitles.forEach((title) => {
                    let tempCriteriaObj = {
                        criteria_title: title.Criteria_Title,
                        descriptions: []
                    }

                    rubric.criteria.push(tempCriteriaObj);
                })

                getCriteriaDescriptions();
            }
        })
    }

    function getCriteriaDescriptions() 
    {
        for (let i = 0; i < rubric.criteria.length; i++) 
        {
            let queryCriteriaScale = "SELECT Value_Number, Value_Name, Value_Description FROM rubric_criteria_scale WHERE Rubric_Title=\'" +
                                        rubricTitle + "\' AND Criteria_Title=\'" + rubric.criteria[i].criteria_title + "\'";

            connection.query(queryCriteriaScale, function(error, results, fields) {
                if (error) 
                {
                    res.status(404).json({
                    status:false,
                    error: error,
                    message:'The criteria for this rubric could not be retrieved.'
                    })
                }
                else
                {
                    let descriptions = Object.values(JSON.parse(JSON.stringify(results)));
        
                    descriptions.forEach((description) => {
                        tempDescription = {
                            value_number: description.Value_Number,
                            value_name: description.Value_Name,
                            value_description: description.Value_Description
                        }

                        rubric.criteria[i].descriptions.push(tempDescription);
                    })

                    //Send the data if we have traversed all criteria.  If we have time we should refactor this to work naturally with async.
                    if (i == rubric.criteria.length - 1)
                    {
                        res.json({
                            rubric: rubric
                        })
                    }
                }
            })
        }

    }
})

//Path /rubric/getList
router.get('/getList', passport.authenticate("jwt", { session: false }),(req, res) => {
    let queryGetRubrics = "SELECT Rubric_Title FROM rubric ORDER BY Rubric_Title ASC";

    connection.query(queryGetRubrics, function(error, results, fields) {
        if (error) 
        {
            res.status(404).json({
            status:false,
            error: error,
            message:'The rubrics could not be retrieved.'
            })
        }
        else
        {
            if(results.length > 0)
            {
                res.json({
                    status: true,
                    rubrics: Object.values(JSON.parse(JSON.stringify(results)))
                })
            }
            else
            {
                res.json({
                    status: false
                })
            }
            
        }
        
    })
})

module.exports = router;