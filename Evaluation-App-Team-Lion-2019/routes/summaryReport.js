const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
const isEmpty = require("is-empty");

var connection = require('../models/User');

// @route GET summaryReport/measureStatistics
// @desc retrieve statistics on the measure.
// @access Private
router.get('/measureStatistics', (req, res) => {
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
})

// @route GET summaryReport/getSummary
// @desc retrieve the program summary.
// @access Private
router.get('/getSummary', (req, res) => {
    console.log("in /geSummary route");
    let programSummary = {
        title: 'Assessmentt 2019',
        outcomes: []
    }

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
            console.log("in getOutcomes query");
            getOutcomeMeasures();
        }
    })

    function getOutcomeMeasures()
    {
        console.log("in getOutcomeMeasures");
        for (let i = 0; i < programSummary.outcomes.length; i++) {
            let queryMeasures = "SELECT Description, Percent_to_reach_target, Target_Score FROM measure WHERE Outcome_ID=\'"  + programSummary.outcomes[i].Outcome_ID + "\'";

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
                    console.log("in else statement");

                    if (i == programSummary.outcomes.length - 1)
                    {
                        console.log(programSummary);
                        res.json({
                            programSummary: programSummary
                        })
                    }
                }
            })
        }
    }
})

module.exports = router;

/*
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