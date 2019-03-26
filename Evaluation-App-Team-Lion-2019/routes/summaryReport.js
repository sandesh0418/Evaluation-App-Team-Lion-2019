const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
const isEmpty = require("is-empty");

var connection = require('../models/User');

let programSummary = {
    title: 'Assessmentt 2019',
    outcomes: []
}

// @route GET summaryReport/measureStatistics
// @desc retrieve statistics on the measure.
// @access Private
router.get('/measureStatistics', passport.authenticate("jwt",{ session:false }), (req, res) => {
    buildProgramSummary(true, req, res);
})

// @route GET summaryReport/getSummary
// @desc retrieve the program summary.
// @access Private
router.get('/getSummary', passport.authenticate("jwt", { session: false }), (req, res) => {
    buildProgramSummary(false, req, res);
})


function buildProgramSummary(withStats, req, res)
{
    let queryGetOutcomes = "SELECT * FROM outcome";

    connection.query(queryGetOutcomes, function(error, results, fields) {
        if (error) 
        {
            res.json({
              status:false,
              error: error,
              message:'Outcomes could not be retrieved'
              })
        }
        else
        {
            programSummary.outcomes = Object.values(JSON.parse(JSON.stringify(results)));
            getOutcomeMeasures(withStats, req, res);
        }
    })
}

function getOutcomeMeasures(withStats, req, res)
{
    for (let i = 0; i < programSummary.outcomes.length; i++) 
    {
        let queryMeasures = "SELECT Measure_ID, Description, Percent_to_reach_target, Target_Score FROM measure WHERE Outcome_ID=\'"  + programSummary.outcomes[i].Outcome_ID + "\'";

        connection.query(queryMeasures, function(error, results, fields) {
            if (error) 
            {
                res.json({
                status:false,
                error: error,
                message:'Measures could not be retrieved'
                })
            }
            else
            {
                programSummary.outcomes[i].measures = Object.values(JSON.parse(JSON.stringify(results)));

                if (withStats)
                {
                    for (let j = 0; j < programSummary.outcomes[i].measures.length; j++)
                    {
                        getMeasureStatistics(i, j, req, res);
                    }
                }

                //If not requesting stats, send the data.  Else data is sent in getMeasureStatistics.
                if (i == programSummary.outcomes.length - 1  && !withStats)
                {
                    res.json({
                        programSummary: programSummary
                    })
                }
            }
        })
    }
}

function getMeasureStatistics(currentOutcome, currentMeasure, req, res)
{
    let measure = programSummary.outcomes[currentOutcome].measures[currentMeasure];

    let queryAverageScoreOfEachStudent = "SELECT Subject_ID, AVG(Score) as Average FROM subject_scores WHERE Measure_ID = \'" + 
                                            measure.Measure_ID + "\' GROUP BY Subject_ID";
    let subjectAveragesByMeasure = [];

    let metTarget = 0;
    let total = 0;
    function makeData(subjects)
    {
        let target = measure.Target_Score;
 
        subjects.forEach(function(currentSubject)
        {
            
            if (currentSubject.Average >= target)
            {
                metTarget++;
            }
            total++;
        })
    }

    connection.query(queryAverageScoreOfEachStudent, function(error, results, fields) {

        if (error) 
        {
            return "error getting measure statistics";
        }
        else
        {
            if (results.length > 0)
            {
                subjectAveragesByMeasure = Object.values(JSON.parse(JSON.stringify(results)));
                makeData(subjectAveragesByMeasure);

                programSummary.outcomes[currentOutcome].measures[currentMeasure] = {
                    Measure_ID: measure.Measure_ID,
                    Description: measure.Description,
                    Percent_to_reach_target: measure.Percent_to_reach_target,
                    Target_Score: measure.Target_Score,
                    metTarget: metTarget,
                    totalEvaluated: total
                }

                let endOfOutcomes = programSummary.outcomes.length;
                let endOfMeasures = programSummary.outcomes[currentOutcome].measures.length;
                if (currentOutcome == endOfOutcomes - 1 && currentMeasure == endOfMeasures - 1)
                {
                    res.json({
                        programSummary: programSummary
                    })
                }
            }
            else
            {
                programSummary.outcomes[currentOutcome].measures[currentMeasure] = {
                    Measure_ID: measure.Measure_ID,
                    Description: measure.Description,
                    Percent_to_reach_target: measure.Percent_to_reach_target,
                    Target_Score: measure.Target_Score,
                    metTarget: 0,
                    totalEvaluated: 0
                };

                let endOfOutcomes = programSummary.outcomes.length;
                let endOfMeasures = programSummary.outcomes[currentOutcome].measures.length;
                if (currentOutcome == endOfOutcomes - 1 && currentMeasure == endOfMeasures - 1)
                {
                    res.json({
                        programSummary: programSummary
                    })
                }
            }
        }
    })
}

module.exports = router;

/* The following code will find the number of evaluations on each measure.
module.exports.calculateAverageOfEachStudent = function(req,res)
{

    /*
    let countQuery = "SELECT Measure_ID, Count(Subject_ID) FROM subject_score GROUP BY Measure_ID";

    let numberOfEvaluationsOnEachMeasure;

    connection.query(countQuery, function(error, results, fields) {

        if (error) 
        {
            res.json({
              status:false,
              error: error,
              message:'Counts of each measures evaluations could not be retrieved'
              })
        }
        else
        {
            if (results.length > 0)
            {
                numberOfEvaluationsOnEachMeasure = results;
            }
            else
            {
                numberOfEvaluationsOnEachMeasure = "there are no completed evaluations.";
            }
        }
    });
    
    let queryAverageScoreOfEachStudent = "SELECT Subject_ID, AVG(Score) as Average FROM subject_scores WHERE Measure_ID = 1 GROUP BY Subject_ID";
    let subjectAveragesByMeasure = [];


    let metTarget = 0;
    let total = 0;
    function makeData(subjects)
    {
        let target = 3;
 
        subjects.forEach(function(currentSubject)
        {
            
            if (currentSubject.Average >= target)
            {
                metTarget++;
            }
            total++;
        })
    }

    connection.query(queryAverageScoreOfEachStudent, function(error, results, fields) {

        if (error) 
        {
            res.json({
              status:false,
              error: error,
              message:'Subject averages could not be retrieved'
              })
        }
        else
        {
            if (results.length > 0)
            {
                subjectAveragesByMeasure = Object.values(JSON.parse(JSON.stringify(results)));
                makeData(subjectAveragesByMeasure);
                res.json({
                    metTarget: metTarget,
                    total: total
                })
            }
            else
            {
                subjectAveragesByMeasure = "there are no completed evaluations.";
            }
        }
    })

}

*/

}

*/
