const express = require("express");
const router = express.Router();
var connection = require('../models/User');

//Path rubric/getRubric/<rubricTitle>
router.get('/getRubric/:id', (req, res) => {
    let rubricTitle = req.params.id;

    let rubric = {
        rubric_title: rubricTitle,
        measureId: '',
        criteria: []
    }

    let queryGetMeasureID = "SELECT Measure_ID FROM rubric WHERE Rubric_Title=\'" + rubricTitle + "\'";

    connection.query(queryGetMeasureID, function(error, results, fields) {
        if (error) 
        {
            res.json({
              status:false,
              error: error,
              message:'The measure ID for this rubric could not be retrieved.'
              })
        }
        else
        {
            rubric.measureId = Object.values(JSON.parse(JSON.stringify(results)))[0].Measure_ID;
            getCriteria();
        }
    })

    function getCriteria()
    {
        let queryGetCriteriaTitles = "SELECT Criteria_Title FROM rubric_criteria WHERE Rubric_Title=\'" + rubricTitle + "\'";

        connection.query(queryGetCriteriaTitles, function(error, results, fields) {
            if (error) 
            {
                res.json({
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
                    res.json({
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

//Path rubric/getList
router.get('/getList', (req, res) => {
    let queryGetRubrics = "SELECT Rubric_Title FROM rubric";

    connection.query(queryGetRubrics, function(error, results, fields) {
        if (error) 
        {
            res.json({
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

router.post("/create", (req,res) => {
    
})
module.exports = router;