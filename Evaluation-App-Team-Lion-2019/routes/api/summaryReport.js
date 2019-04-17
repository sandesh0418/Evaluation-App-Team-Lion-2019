const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const isEmpty = require("is-empty");

var connection = require('../../models/User');

// @route GET summaryReport/measureStatistics
// @desc retrieve statistics on the measure.
// @access Private
router.get('/measureStatistics/:cycleId', passport.authenticate("jwt",{ session:false }), (req, res) => {
    let cycleId = req.params.cycleId;
    buildProgramSummary(true, req, res, cycleId);
})

// @route GET summaryReport/getSummary
// @desc retrieve the program summary.
// @access Private
router.get('/getSummary/:cycleId', passport.authenticate("jwt", { session: false }), (req, res) => {
    let cycleId = req.params.cycleId;
    buildProgramSummary(false, req, res, cycleId);
})

function buildProgramSummary(withStats, req, res, cycleId)
{
    let programSummary = {
        title: 'Assessment 2019',
        cycleId: cycleId,
        outcomes: []
    }

    //Get: outcomeId, outcomeDescription, measureId, measureDescription, percentToReachTarget, targetScore, toolName
    //      valueName
    let queryGetSummary = "" +
        "SELECT DISTINCT o.Outcome_ID as outcomeId, o.Description as outcomeDescription, o.Outcome_Name as outcomeName, " + 
            "m.Measure_ID as measureId, m.Description as measureDescription, m.Percent_to_reach_target as " +
            "percentToReachTarget, m.Target_Score as targetScore, m.Tool_Name as toolName, valueName " +
        "FROM outcome o LEFT JOIN measure m ON m.Outcome_ID=o.Outcome_ID LEFT JOIN " +
            "(SELECT s.Value_Name as valueName, m.Measure_ID as measureId " + 
            "FROM measure m LEFT JOIN rubric r ON m.Tool_Name=r.Rubric_Title JOIN scales s ON s.Rubric_Id=r.Rubric_Id " +
            "WHERE m.Target_Score=s.Value_Number) as rubricScore " +
            "ON m.Measure_ID=rubricScore.measureId " +
        "WHERE o.Cycle_Id='" + cycleId + "' " +
        "ORDER BY o.Outcome_ID DESC";

    connection.query(queryGetSummary, (error, results, fields) => {
        if (error)
        {
            res.json({
                status: false,
                error: error,
                message: "The summary could not be retrieved."
            })
        }
        else
        {
            let data = Object.values(JSON.parse(JSON.stringify(results)));
            data.forEach(row => {
                let outcomeIndex = programSummary.outcomes.findIndex(o => o.Outcome_ID === row.outcomeId);


                if (row.measureId === null && outcomeIndex === -1)
                {
                    let newOutcome = {
                        Outcome_ID: row.outcomeId,
                        Outcome_Name: row.outcomeName,
                        Description: row.outcomeDescription,
                        measures: []
                    }
                    programSummary.outcomes.push(newOutcome);
                }
                else if (row.measureId != null)
                {
                    let newMeasure = {
                        Measure_ID: row.measureId,
                        Description: row.measureDescription,
                        Percent_to_reach_target: row.percentToReachTarget,
                        Target_Score: row.targetScore,
                        Value_Name: row.valueName,
                        Tool_Name: row.toolName,
                        metTarget: 0,
                        totalEvaluated: 0,
                    }
    
                    if (outcomeIndex == -1)
                    {
                        let newOutcome = {
                            Outcome_ID: row.outcomeId,
                            Description: row.outcomeDescription,
                            Outcome_Name: row.outcomeName,
                            measures: [newMeasure]
                        }
                        programSummary.outcomes.push(newOutcome);
                    }
                    else
                    {
                        programSummary.outcomes[outcomeIndex].measures.push(newMeasure);
                    }
                }
            })
            
            if (withStats)
            {
                getMeasureStatisticsV2(req, res, programSummary);
            }
            else
            {
                res.json({
                    status: true,
                    message: "Sent program summary.",
                    programSummary: programSummary
                })
            }
        }
    })
}

function getMeasureStatisticsV2(req, res, programSummary)
{
    //Get: Subject_ID, measureId, Average, outcomeId
    let queryMeasureStatistics = "" + 
        "SELECT Subject_ID, s.Measure_ID as measureId, AVG(Score) as Average, m.Outcome_ID as outcomeId " +
        "FROM subject_score s JOIN measure m on s.Measure_ID=m.Measure_ID " +
        "GROUP BY Subject_ID, s.Measure_ID";

    connection.query(queryMeasureStatistics, (error, results, fields) => {
        if (error) 
        {
            res.json({
              status:false,
              error: error,
              message:'Outcomes could not be retrieved.'
            })
        }
        else
        {
            let data = Object.values(JSON.parse(JSON.stringify(results)));
            data.forEach(row => {
                let outcomeIndex = programSummary.outcomes.findIndex(o => o.Outcome_ID === row.outcomeId);
                let measureIndex = programSummary.outcomes[outcomeIndex].measures.findIndex(m => m.Measure_ID === row.measureId);

                if (row.Average >= programSummary.outcomes[outcomeIndex].measures[measureIndex].Target_Score)
                {
                    programSummary.outcomes[outcomeIndex].measures[measureIndex].metTarget++;
                }
                programSummary.outcomes[outcomeIndex].measures[measureIndex].totalEvaluated++;
            })
            res.json({
                status:true,
                message:'Outcomes and statistics were retrieved.',
                programSummary: programSummary
            })
        }
    })
}

module.exports = router;