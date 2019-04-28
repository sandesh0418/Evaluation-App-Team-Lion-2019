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
router.get('/measureStatistics/:cycleId/:deptId', passport.authenticate("jwt",{ session:false }), (req, res) => {
    let cycleId = req.params.cycleId;
    let deptId = req.params.deptId;
    buildProgramSummary(true, req, res, cycleId, deptId);
})

// @route GET summaryReport/getSummary
// @desc retrieve the program summary.
// @access Private
router.get('/getSummary/:cycleId/:deptId', passport.authenticate("jwt", { session: false }), (req, res) => {
    let cycleId = req.params.cycleId;
    let deptId = req.params.deptId;
    buildProgramSummary(false, req, res, cycleId, deptId);
})

function buildProgramSummary(withStats, req, res, cycleId, deptId)
{
    let programSummary = {
        title: '',
        cycleId: cycleId,
        outcomes: []
    }

    //Get: outcomeId, outcomeDescription, measureId, measureDescription, percentToReachTarget, targetScore, toolName
    //      valueName
    let queryGetSummary = "" +
        "SELECT DISTINCT o.Outcome_ID as outcomeId, o.Description as outcomeDescription, o.Outcome_Name as outcomeName, " + 
            "m.Measure_ID as measureId, m.Measure_Name as measureName, m.Description as measureDescription, " +
            "m.Percent_to_reach_target as percentToReachTarget, m.Target_Score as targetScore, m.Tool_Name as toolName, " +
            "valueName, cy.Cycle_Name " +
        "FROM cycle cy JOIN outcome o ON cy.Cycle_Id=o.Cycle_Id LEFT JOIN measure m ON m.Outcome_ID=o.Outcome_ID LEFT JOIN " +
            "(SELECT s.Value_Name as valueName, m.Measure_ID as measureId " + 
            "FROM measure m LEFT JOIN rubric r ON m.Tool_Name=r.Rubric_Title JOIN scales s ON s.Rubric_Id=r.Rubric_Id " +
            "WHERE m.Target_Score=s.Value_Number) as rubricScore " +
            "ON m.Measure_ID=rubricScore.measureId JOIN cycle c ON o.Cycle_Id=c.Cycle_Id " +
        "WHERE o.Cycle_Id='" + cycleId + "' AND cy.Dept_Id='"  + deptId + "' " +
        "ORDER BY o.Outcome_Name ASC, m.Measure_Name ASC";

    connection.query(queryGetSummary, (error, results, fields) => {
        if (error)
        {
            res.json({
                status: false,
                error: error,
                message: "The summary could not be retrieved."
            })
        }
        else if (results.length < 1)
        {
            res.json({
                status: false,
                error: error,
                message: "There is no summary.",
                programSummary: programSummary
            })
        }
        else
        {
            let data = Object.values(JSON.parse(JSON.stringify(results)));

            programSummary.title = data[0].Cycle_Name;
            data.forEach(row => {
                let outcomeIndex = programSummary.outcomes.findIndex(o => o.Outcome_ID === row.outcomeId);


                if (row.measureId === null && outcomeIndex === -1)
                {
                    let newOutcome = {
                        Outcome_ID: row.outcomeId,
                        Outcome_Name: row.outcomeName,
                        Description: row.outcomeDescription,
                        measures: [],
                        courses: []
                    }
                    programSummary.outcomes.push(newOutcome);
                }
                else if (row.measureId != null)
                {
                    let newMeasure = {
                        Measure_ID: row.measureId,
                        Measure_Name: row.measureName,
                        Description: (row.measureDescription !== "null" ? row.measureDescription : null),
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
                            measures: [newMeasure],
                            courses: []
                        }
                        programSummary.outcomes.push(newOutcome);
                    }
                    else
                    {
                        programSummary.outcomes[outcomeIndex].measures.push(newMeasure);
                    }
                }
            })

            getOutcomeCourses(req, res, programSummary, withStats);
        }
    })
}

function getOutcomeCourses(req, res, programSummary, withStats)
{
    let outcomeIds = [];
    programSummary.outcomes.forEach(o => {
        outcomeIds.push("'" + o.Outcome_ID + "'");
    })

    let queryGetOutcomeCourses = "" + 
        "SELECT o.Outcome_ID as outcomeId, cu.Department_Code as departmentCode, cu.Course_Code as courseCode, " + 
            "cu.Credit_Hours as creditHours, cu.Name as name, cu.Course_ID as courseId, com.Relevant_Hours as " + 
            "relevantHours " +
        "FROM outcome o JOIN curriculum_outcome_mapping com ON o.Outcome_ID=com.Outcome_ID JOIN " + 
            "curriculum cu ON com.Course_ID=cu.Course_ID " +
        "WHERE o.Outcome_ID IN (" + outcomeIds.join() + ") AND cu.Cycle_Id='" + programSummary.cycleId + "'";

    connection.query(queryGetOutcomeCourses, (error, results, fields) => {
        if (error)
        {
            res.status(400).json({
                status: false,
                error: error,
                message: "The curriculum for the summary could not be retrieved."
            })
        }
        else
        {
            let data = Object.values(JSON.parse(JSON.stringify(results)));
            data.forEach(r => {
                let outcomeIndex = programSummary.outcomes.findIndex(o => o.Outcome_ID === r.outcomeId);

                let newOutcomeCourse = {
                    departmentCode: r.departmentCode,
                    courseCode: r.courseCode,
                    name: r.name,
                    relevantHours: r.relevantHours,
                    courseId: r.courseId
                }

                programSummary.outcomes[outcomeIndex].courses.push(newOutcomeCourse);
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
        "SELECT o.Outcome_ID as outcomeId, m.Measure_ID as measureId, ss.User_Email, ss.Subject_ID, ss.Criteria_Title, " +
            "ss.Score, r.weight, r.weighted " +
        "FROM outcome o JOIN measure m ON o.Outcome_ID=m.Outcome_ID JOIN subject_score ss ON " +
            "ss.Measure_ID=m.Measure_ID " +
            "LEFT JOIN (SELECT r.Rubric_Title, r.weight as weighted, c.Criteria_Title, c.weight " +
                    "FROM rubric r JOIN criteria c ON r.Rubric_Id=c.Rubric_Id " +
                    "WHERE r.Cycle_Id='" + programSummary.cycleId + "') as r " +
            "ON r.Rubric_Title=m.Tool_Name AND r.Criteria_Title=ss.Criteria_Title " +
        "WHERE o.Cycle_Id='" + programSummary.cycleId + "'";

    connection.query(queryMeasureStatistics, (error, results, fields) => {
        if (error) 
        {
            console.log(error);
            res.json({
              status:false,
              error: error,
              message:'Outcomes could not be retrieved.'
            })
        }
        else
        {
            let summaryWithFullScores = programSummary;
            let data = Object.values(JSON.parse(JSON.stringify(results)));
            data.forEach(row => {
                let outcomeIndex = summaryWithFullScores.outcomes.findIndex(o => o.Outcome_ID === row.outcomeId);
                let measureIndex = summaryWithFullScores.outcomes[outcomeIndex].
                    measures.findIndex(m => m.Measure_ID === row.measureId);

                let newScore = {
                    criteriaTitle: row.Criteria_Title,
                    weight: row.weight,
                    score: row.Score
                }

                let weighted;
                if (row.weighted === 1)
                {
                    weighted = true;
                }
                else if (row.weighted === 0)
                {
                    weighted = false;
                }
                else
                {
                    weighted = null;
                }

                if (summaryWithFullScores.outcomes[outcomeIndex].measures[measureIndex].subjectList)
                {
                    let subjectIndex = summaryWithFullScores.outcomes[outcomeIndex].measures[measureIndex].
                        subjectList.findIndex(s => s.Subject_ID === row.Subject_ID && s.User_Email === row.User_Email);

                    if (subjectIndex === -1)
                    {
                        summaryWithFullScores.outcomes[outcomeIndex].measures[measureIndex].subjectList.
                            push({
                                Subject_ID: row.Subject_ID,
                                User_Email: row.User_Email,
                                weighted: weighted,
                                scores: [newScore]
                            })
                    }
                    else
                    {
                        summaryWithFullScores.outcomes[outcomeIndex].measures[measureIndex].subjectList[subjectIndex].
                            scores.push(newScore);
                    }
                }
                else
                {
                    summaryWithFullScores.outcomes[outcomeIndex].measures[measureIndex].subjectList =
                        [{
                            Subject_ID: row.Subject_ID,
                            User_Email: row.User_Email,
                            weighted: weighted,
                            scores: [newScore]
                        }] 
                }
            })

            for (let i = 0; i < summaryWithFullScores.outcomes.length; i++)
            {
                for (let j = 0; j < summaryWithFullScores.outcomes[i].measures.length; j++)
                {
                    if (summaryWithFullScores.outcomes[i].measures[j].subjectList)
                    {
                        for (let k = 0; k < summaryWithFullScores.outcomes[i].measures[j].subjectList.length; k++)
                        {
                            let subject = summaryWithFullScores.outcomes[i].measures[j].subjectList[k];
                            let averageScore;
                            if (subject.weighted === true)
                            {
                                averageScore = calculateWeightedAverage(subject);
                            }
                            else if (subject.weighted === false)
                            {
                                averageScore = calculateUnweightedAverage(subject);
                            }
                            else if (subject.weighted === null)
                            {
                                averageScore = subject.scores[0].score
                            }

                            console.log(subject);

                            console.log(averageScore);
                            console.log(programSummary.outcomes[i].measures[j].Target_Score);

                            if (averageScore >= programSummary.outcomes[i].measures[j].Target_Score)
                            {
                                programSummary.outcomes[i].measures[j].metTarget++;
                            }
                            programSummary.outcomes[i].measures[j].totalEvaluated++;
                        }
                    }
                }
            }

            res.json({
                status:true,
                message:'Outcomes and statistics were retrieved.',
                programSummary: programSummary
            })
        }
    })
}

function calculateUnweightedAverage(subject)
{
    let totalScore = 0;
    let numberOfCriteria = 0;
    subject.scores.forEach(s => {
            totalScore = totalScore + parseInt(s.score);
            numberOfCriteria++;
    });
    return Math.round((totalScore / numberOfCriteria) * 100000) / 100000;
}

function calculateWeightedAverage(subject)
{
    let totalScore = 0;
    subject.scores.forEach(s => {
        totalScore = totalScore + (s.score * (s.weight / 100))
    });
    
    return Math.round(totalScore * 100000) / 100000;
}

module.exports = router;