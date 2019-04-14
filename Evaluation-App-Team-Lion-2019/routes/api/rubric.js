const express = require("express");
const router = express.Router();
var connection = require('../../models/User');
const passport = require('passport');
const secret = require('../../config/keys');
const validateRubric = require('../../validation/rubricValidation');
var uniqid = require('uniqid');



/*
* Post method that stores rubric title, no. of rows, no. of columns and weight into rubric table
*/
router.post("/createRubric",  (req,res) =>{

   
    let { errors, isValid} = validateRubric(req.body);
  

    
    if(!isValid){
        return res.status(400).json(errors);
    }
    else{
        let rows = req.body.rows;
        let scores = req.body.scores;
        let title = req.body.Rubric_Title;
        let weight;
        let rubric_Id = uniqid();
        let dept_Id = uniqid();
        if(req.body.weight){
            weight = 1;
        }
        else{
            weight = 0;
        }
        console.log(rows+" "+scores+ " "+ title+" "+req.body.weight)

        connection.query("Insert INTO `rubric`(`Rubric_Id`,`Rubric_Title`,`Rows`,`scores`,`weight`,`dept_Id`) VALUES(?,?,?,?,?,?)",[rubric_Id, title,rows, scores, weight, dept_Id], function(err, result, fields){
            if (err) throw err;

            else{

                Scale();
            }
        })
        
        function Scale(){

            for(var i = 0 ; i<scores;i++){

            
            connection.query("INSERT INTO `scales`(`Rubric_Id`, `Value_Name`, `Value_Number`) VALUES(?,?,?)",[rubric_Id, " ",i+1], function(err, result, field){
                if (err) throw err;
               
            })
        }
        Criteria();
        }

        function Criteria(){

            for(var i = 0; i<rows;i++){

                
                connection.query("Insert Into `criteria`(`Rubric_Id`, `Criteria_Title`, `Row_Id`, `weight`) VALUES(?,?,?,?)",[rubric_Id," ",i+1,0],function(err, result, field){
                    if (err) throw err;

                })
                
                

                }
                Data();
            }

            let breakPoint = 0;
            function Data(){
                for(var j = 0 ; j<rows;j++){
                
                    if(j<breakPoint){
                        break;
                    }
                    
                    else{
                    for(var i = 0; i<scores;i++){
                        
                        
                        connection.query("Insert Into `data`(`Row_Id`,`Rubric_Id`,`Data`,`index`) VALUES(?,?,?,?)",[j+1,rubric_Id,"",i+1],function(error, result, fields){
                            if (error) 
                            {
                                console.log(error)
                            }
                            else{
                                console.log("added");
                            }
                           
                        })
                    }
                }
                
                    breakPoint = j;
                }

            }

       



    return res.send(isValid);
    }


})





router.get("/getRubric/:title", (req, res)=>{

    rubricTitle = req.params.title;
    dept_Id = "969gcjug13b6g";
    var topRow = [];
    var Rubric =[];
    let Rubric_Id;
    var score = 0;
    var row = 0;
    var weight = 0;
    connection.query("SELECT `Rubric_Id`, `scores`,`weight`,`Rows` from `rubric` where `Rubric_Title` = ? and `dept_Id` = ?", [rubricTitle, dept_Id], function(err, result, fields){
        if (err) throw err;

        if(result.length > 0){
            score = result[0].scores;
            row = result[0].Rows;
            Rubric_Id = result[0].Rubric_Id;  
            weight = result[0].weight;  
        }
       
         
        
    connection.query("SELECT * from `scales` where `Rubric_Id` = ? ORDER BY `Value_Number` ASC", Rubric_Id, function(err, result, fields){
        if (err) throw err;

        
        for(var i = 0 ;i<result.length;i++){
            topRow[i]={
                Rubric_Id: Rubric_Id,
                Value_Number: `${result[i].Value_Number}`,
                Value_Name: `${result[i].Value_Name}`
            }
        }

        Rubric[0] = topRow;
        
       if((Number) (weight) === 1){
        connection.query("Select * from `data` NATURAL JOIN `criteria` where data.Rubric_Id = ? ORDER BY `Row_Id` ASC", Rubric_Id, function(err, result, field){
            if (err) throw err;

            var r = [];
            
            for(var i = 0 ; i<row; i++){
                
                let column = [];
                let count = 0;
                for(var j = i; j< score+i; j++){
                    column[count] = result[i+j];
                    count++;
                }
                r[i] = column;
                
                

                 
            }
            Rubric[1] = r;
        
        



        res.json(Rubric);
        
    })
    }
    else{
        connection.query("Select d.Rubric_Id, d.Row_Id,d.Data, d.index, c.Criteria_Title from `data` as d NATURAL JOIN `criteria` as c where d.Rubric_Id = ? ORDER BY `Row_Id` ASC", Rubric_Id, function(err, result, field){
            if (err) throw err;

            var r = [];
            
            for(var i = 0 ; i<row; i++){
                
                let column = [];
                let count = 0;
                for(var j = i; j< score+i; j++){
                    column[count] = result[i+j];
                    count++;
                }
                r[i] = column;
                
                

                 
            }
            Rubric[1] = r;
        
        



        res.json(Rubric);
    
    })
}

})
})
})



router.put("/updateRubric/", (req, res) =>{
    var id = req.body.Rubric_Id;
    var column =req.body.Row;
    var value = req.body.value;
    var category = column.split(" ");
    console.log(category)
    if(value != null){
        if(category[0] === "scale"){
            var number = (Number) (category[1]);
            connection.query("Update `scales` SET Value_Name = ? where Rubric_Id = ? and Value_Number = ?", [value, id, number], function(err, result, fields){
                if(err) throw err;

                else{
                    res.send("good");
                }
            })

        }

        else if(category[0] === "criteria"){
            var number = (Number) (category[1]);

            connection.query("Update `criteria` SET `Criteria_Title`= ? where Rubric_Id = ? and Row_Id = ?", [value,id, number], function(err, result, fields){
                if(err) throw err;

                else{
                    res.send("good");
                }
        })
        }


        else if(category[0] === "data"){
            var number1 = (Number) (category[1]);
            var number2 = (Number) (category[2]);

            connection.query("UPDATE `data` SET `Data` = ? where `Rubric_Id` = ? and `Row_Id` = ? and `index` = ?", [value, id, number1,number2], function(err, result, fields){
                if(err) throw err;

                else{
                    res.send("good");
                }
        })
    }

    else if(category[0] === "weight"){

        
        var number = (Number) (category[1]);
        if( value !== null && value !== ''){
            value = parseFloat(value);}
        else{
            value = 0.0;
        }
        console.log(value)

        connection.query("Update `criteria` SET `weight`= ? where Rubric_Id = ? and Row_Id = ?", [value,id, number], function(err, result, fields){
            if(err) throw err;

            else{
                res.send("good");
            }
        })
    }
}
else{
    res.send("No need to update")
}

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

/**
 * Get rubric list with rubric scale.
 * Used by: editProgramSummary
 */
router.get('/getListWithScale', passport.authenticate("jwt", { session: false }),(req, res) => {
    let queryGetRubrics = "" +
        "SELECT Rubric_Title as rubricTitle, Value_Number as valueNumber, Value_Name as valueName " +
        "FROM rubric_criteria_scale " +
        "GROUP BY Rubric_Title, Value_Number, Value_Name " +
        "ORDER BY Rubric_Title"

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
            data = Object.values(JSON.parse(JSON.stringify(results)))
            let rubrics = [];

            data.forEach(row => {
                rubricIndex = rubrics.findIndex(r => r.Rubric_Title === row.rubricTitle);
                let newScore = {
                    Value_Number: row.valueNumber,
                    Value_Name: row.valueName
                }
                if (rubricIndex === -1)
                {
                    let newRubric = {
                        Rubric_Title: row.rubricTitle,
                        scale: [newScore]
                    }
                    rubrics.push(newRubric);
                }
                else
                {
                    rubrics[rubricIndex].scale.push(newScore);
                }
            })

            res.json({
                status: true,
                rubrics: rubrics
            })
        }
    })
})

module.exports = router;