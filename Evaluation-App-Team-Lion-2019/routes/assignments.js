const express = require("express");
const router = express.Router();
const uuidv1 = require('uuid/v1');
var connection = require('../models/User');

/**
 * Create a new assignment
 * PATH: /assignments/createAssignments
 */
router.post('/createAssignment', (req,res) => {
    let Measure_ID = req.body.Measure_ID;
    let User_Email = req.body.User_Email;
    let Assignment_ID = uuidv1();

    let assignment = {
        Measure_ID: Measure_ID,
        User_Email: User_Email,
        Assignment_ID: Assignment_ID
    }

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

/**
 * Get outcomes and measures for createAssignment.
 * PATH: /assignments/outcomesAndMeasures
 */
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
            let queryMeasures = "SELECT Measure_ID, Description FROM measure WHERE Outcome_ID=\'" + 
                                outcomeList[i].Outcome_ID + "\'";

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
                    }
                }
            })
        }
    }
})

/**
 * Get assignments by User_Email for myAssignments
 * PATH: /assignments/myAssignments 
 */
router.get('/myAssignments/:email', (req, res) => {
    console.log("this is the req.body: ")
    console.log(req.params.email);
    let queryGetAssignments = "SELECT o.Description as outcomeDescription, m.Description as measureDescription, " + 
                                "a.Assignment_ID as assignmentId, m.Tool_Name as toolName " + 
                            "FROM outcome o JOIN measure m ON o.Outcome_ID=m.Outcome_ID JOIN assignments a ON " +
                                "a.Measure_ID=m.Measure_ID " + 
                            "WHERE a.User_Email='" + req.params.email + "'";

    connection.query(queryGetAssignments, (error, results, field) => {
        if (error) 
        {
            console.log(error);
            res.status(404).json({
            status:false,
            error: error,
            message:'Could not get assignments for user with email' + req.body
            })
        }
        else
        {
            res.status(200).json({
                assignments: Object.values(JSON.parse(JSON.stringify(results)))
            })
        }
    })
})

module.exports = router;