const express = require("express");
const router = express.Router();
var connection = require('../models/User');
const passport = require('passport');
const secret = require('../config/keys');


//Path rubric/getRubric/<rubricTitle>
router.post("/createRubric", passport.authenticate("jwt", { session: false}),  (req,res) =>{
var rubricTitle = req.body.rubric_title;
var measureId = req.body.measureId;

var criteriaTitle = req.body.criteria.criteria_title;

var valueTitle = req.body.criteria.descriptions.value_title;
var valueName = req.body.criteria.descriptions.value_name;
var valueDescription = req.body.criteria.descriptions.value_description;


connection.query("INSERT INTO rubric Values(?,?)",[rubricTitle,measureId],function(error,results,fields){
    if(error){
        return res.send(err);
    }
})

connection.query("INSERT INTO rubric_criteria VALUES(?,?)",[rubricTitle,criteriaTitle],function(err,results,fields){
    if(err){
        return res.send(err);
    }
})


connection.query("INSERT INTO rubric_criteria_scale VALUES(?,?,?,?,?)",[rubricTitle,criteriaTitle,valueTitle,valueName,valueDescription], function(err,results,fields){
    if(err){
        return res.send(err);
    }
})

return res.send("Rubric has been added!");

})

router.get('/getRubric/:id', passport.authenticate("jwt", { session: false}), (req, res) => {
    let rubricTitle = req.params.id;
    console.log(rubricTitle);

    let rubric = {
        rubric_title: rubricTitle,
        measureId: '',
        criteria: []
    }

    let queryGetMeasureID = "SELECT Measure_ID FROM rubric WHERE Rubric_Title=\'" + rubricTitle + "\'";

    connection.query(queryGetMeasureID, function(error, results, fields) {
        if (error) 
        {
            res.status(404).json({
              status:false,
              error: error,
              message:'The measure ID for this rubric could not be retrieved.'
              })
        }
        else
        {
            if (results.length > 0)
            {
                rubric.measureId = Object.values(JSON.parse(JSON.stringify(results)))[0].Measure_ID;
                getCriteria();
            }
            else
            {
                res.status(404).json({
                    status:false,
                    error: error,
                    message:'There is no rubric with this title.'
                    })
            }
            
        }
    })

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
                            value_title: description.Value_Number,
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
            res.json({
                rubrics: Object.values(JSON.parse(JSON.stringify(results)))
            })
        }
        
    })
})

module.exports = router;