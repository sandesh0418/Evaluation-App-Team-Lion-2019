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
  
    var cycle = "";

    
    if(!isValid){
        return res.status(400).json(errors);
    }
    else{
        let rows = req.body.rows;
        let scores = req.body.scores;
        let title = req.body.Rubric_Title;
        let weight;
        let rubric_Id = uniqid();
        let Cycle_Id = req.body.Cycle_Id;
        cycle ={
            Rubric_Id: rubric_Id
        }
        if(req.body.weight){
            weight = 1;
        }
        else{
            weight = 0;
        }
        

        connection.query("Insert INTO `rubric`(`Rubric_Id`,`Rubric_Title`,`Rows`,`scores`,`weight`,`Cycle_Id`) VALUES(?,?,?,?,?,?)",[rubric_Id, title,rows, scores, weight, Cycle_Id], function(err, result, fields){
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
              
                return res.send(cycle);

            }

       



   
    }


})





router.get("/getRubric/:title", (req, res)=>{
    var Rubric_Id = req.params.title;
    
    var topRow = [];
    var Rubric =[];
    
    var score = 0;
    var row = 0;
    var weight = 0;
    connection.query("SELECT `scores`,`weight`,`Rows` from `rubric` where `Rubric_Id` = ?", Rubric_Id, function(err, result, fields){
        if (err) throw err;

        if(result.length > 0){
            score = result[0].scores;
            row = result[0].Rows;
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
        connection.query("Select * from `data` NATURAL JOIN `criteria` where data.Rubric_Id = ? ORDER BY data.Row_Id ASC", Rubric_Id, function(err, result, field){
            if (err) throw err;

            var r = [];
            let count = 0;
            for(var i = 0; i<row; i++){
                
                let column = [];
                
                for(var j = 0; j< score; j++){
                    column[j] = result[count];
                    count++;
                }
                
                r[i] = column;

                 
                
                

                 
            }
            Rubric[1] = r;

            connection.query("Select `weight` from `criteria` where `Rubric_Id` = ? ",Rubric_Id, function(err, result, fields){

            if (err) throw err; 
                var totalWeight = 0;
            if(result.length>0){

                for(var i = 0 ; i<result.length; i++){
                    totalWeight+= result[i].weight;
                }
            }

            if(totalWeight === 100){
                Rubric[2] = {weight: true}
            }
            else{
                Rubric[2] = {weight: false}
            }

        
        



        res.json(Rubric);
    })
    })
    }
    else{
        connection.query("Select d.Rubric_Id, d.Row_Id,d.Data, d.index, c.Criteria_Title from `data` as d NATURAL JOIN `criteria` as c where d.Rubric_Id = ? ORDER BY `Row_Id` ASC", Rubric_Id, function(err, result, field){
            if (err) throw err;

            var r = [];
            let count = 0;
            for(var i = 0 ; i<row; i++){
                
                let column = [];
                
                for(var j = 0; j< score; j++){
                    column[j] = result[count];
                    count++;
                }
                r[i] = column;
                
                console.log(column)

                 
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


router.get('/getViewRubric/:id/:cycleId', (req, res) => {
    let rubricId = req.params.id;
    let cycleId = req.params.cycleId;
    

    let rubric = {
        rubric_title: '',
        Rubric_Id: '',
        weighted: false,
        criteria: []
    }

    let queryGetRubric = "" +
        "SELECT r.Rubric_Id, r.Rubric_Title, r.Weight, c.Criteria_Title, c.Row_Id, c.weight as critWeight, d.data, s.Value_Name, " + 
            "s.Value_Number " +
        "FROM rubric r JOIN criteria c ON r.Rubric_Id=c.Rubric_Id JOIN data d ON r.Rubric_Id=d.Rubric_Id " +
            "JOIN scales s ON r.Rubric_Id=s.Rubric_Id " +
        "WHERE r.Rubric_Id='" + rubricId + "' AND r.Cycle_Id='" + cycleId + "' AND c.Row_Id=d.Row_Id " +
            "AND d.index=s.Value_Number";

    connection.query(queryGetRubric, function(error, results, fields) {
        rubric.rubric_title= results[0].Rubric_Title;
        if (error || results.length < 1) 
        {
            res.status(404).json({
                status:false,
                error: error,
                message:'This rubric could not be retrieved.'
            })
        }
        else
        {
            results = Object.values(JSON.parse(JSON.stringify(results)));
            
            rubric.rubric_title = results[0].Rubric_Title;
            rubric.Rubric_Id = results[0].Rubric_Id;
            rubric.weighted = (results[0].Weight === 1 ? true : false);
            results.forEach(r => {
                index = rubric.criteria.findIndex(c => c.row_id === r.Row_Id);

                let newDescription = {
                    value_number: r.Value_Number,
                    value_name: r.Value_Name,
                    value_description: r.data
                }

                if (index === -1)
                {
                    let newCrit = {
                        criteria_title: r.Criteria_Title,
                        row_id: r.Row_Id,
                        weight: r.critWeight,
                        descriptions: [newDescription]
                    }
                    rubric.criteria.push(newCrit);
                }
                else
                {
                    rubric.criteria[index].descriptions.push(newDescription);
                }
            })
            
            
            res.status(200).json({
                status: true,
                rubric: rubric
            })
        }
    })

})

//Path /rubric/getList
router.get('/getList/:id', passport.authenticate("jwt", { session: false }),(req, res) => {

    var Cycle_Id = req.params.id;
    console.log(Cycle_Id)
    let queryGetRubrics = "SELECT `Rubric_Title`, `Rubric_Id` FROM rubric where Cycle_Id = ? ORDER BY Rubric_Title ASC";

    connection.query(queryGetRubrics, Cycle_Id, function(error, results, fields) {
        if (error) 
        {
            res.status(404).json({
            status:false,
            error: error,
            message:'The rubrics could not be retrieved.',
            rubrics: []
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
        "FROM rubric JOIN scales ON rubric.Rubric_Id=scales.Rubric_Id " +
        "GROUP BY Rubric_Title, Value_Number, Value_Name " +
        "ORDER BY Rubric_Title"

    connection.query(queryGetRubrics, function(error, results, fields) {
        if (error || results.length < 1) 
        {
            res.status(404).json({
                status:false,
                error: error,
                message:'The rubrics could not be retrieved.',
                rubric: []
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