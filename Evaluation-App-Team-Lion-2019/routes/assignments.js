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

//Get outcomes, measures, and evaluators to load page.
router.get('/outcomesMeasuresAndEvaluators', (req, res) => {
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
                outcomeList = Object.values(JSON.parse(JSON.stringify(results)));
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
})

module.exports = router;