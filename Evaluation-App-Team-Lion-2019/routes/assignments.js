const express = require("express");
const router = express.Router();
const uuidv1 = require('uuid/v1')
var connection = require('../models/User');


//Create a new assignment
router.post('/createAssignment', (req,res) => {
    let Measure_ID = req.body.Measure_ID;
    let User_Email = req.body.User_Email;
    let Assignment_ID = uuidv1();

    console.log(Assignment_ID);

    let assignment = {
        Measure_ID: Measure_ID,
        User_Email: User_Email,
        Assignment_ID: Assignment_ID
    }

    console.log(assignment);

    connection.query("USE nodejs_login1");

    connection.query('INSERT INTO assignments SET ?', assignment, function (error, results, fields) {
        if (error) {
            res.json({
                status:false,
                message:'The assignment cannot be inserted into the subject_score table.',
                error: error
            })
          }else{
              res.json({
                status:true,
                data:results,
                message:'The assignment was inserted into the subject_scores table.'
            })
          }
    });
})


//Get outcomes and measures to load page.
router.get('/outcomesAndMeasures', (req, res) => {
    let outcomeList = [];

    let queryOutcomes = "SELECT Outcome_ID, Description FROM outcome"

    connection.query(queryOutcomes, function(error, results, fields) {
        if (error) 
        {
            res.status(404).json({
              status:false,
              error: error,
              message:'The outcomes could not be retrieved.'
              })
        }
        else
        {
            if (results.length > 0)
            {
                Object.values(JSON.parse(JSON.stringify(results))).forEach(outcome => {
                    tempOutcome = {
                        Outcome_ID: outcome.Outcome_ID,
                        Description: outcome.Description,
                        measures: []
                    }
                    outcomeList.push(tempOutcome);
                })
                getMeasures();
            }
            else
            {
                res.status(404).json({
                    status:false,
                    error: error,
                    message:'There are no outcomes.'
                })
            }
        }
    })

    function getMeasures()
    {
        for (let i = 0; i < outcomeList.length; i++)
        {
            let queryMeasures = "SELECT Measure_ID, Description FROM measure WHERE Outcome_ID=" + 
                                outcomeList[i].Outcome_ID;

            connection.query(queryMeasures, function(error, results, fields) {
                if (error) 
                {
                    res.status(404).json({
                    status:false,
                    error: error,
                    message:'The measures could not be retrieved for outcome ' + outcomeList[i].Outcome_ID
                    })
                }
                else
                {
                    Object.values(JSON.parse(JSON.stringify(results))).forEach(measure => {
                        outcomeList[i].measures.push(measure);
                    })

                    if (i == outcomeList.length - 1)
                    {
                        res.status(200).json({
                            outcomeList: outcomeList
                        })
                        console.log(outcomeList);
                    }
                }
            })
        }
    }
})

module.exports = router;