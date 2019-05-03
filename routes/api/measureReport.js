const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const isEmpty = require("is-empty");
const connection = require('../../models/User');

router.get('/measureReport/:measureId', passport.authenticate("jwt",{ session:false }), (req, res) => {

    let measure = {
        measureName: "",
        measureDescription: "",
        toolName: "",
        percentToReachTarget: 0,
        targetScore: 0,
        weighted: false,
        scale: [],
        subjectList: [],
        criteria: []
    }

    let queryGetMeasureData = "" +
        "SELECT DISTINCT m.Tool_Name as toolName, r.Rubric_Title, m.Percent_to_reach_target as percentToReachTarget, " +
            "m.Target_Score as targetScore, m.Measure_Name as measureName, m.Description as measureDescription, " + 
            "r.weight as weighted, s.Value_Name as valueName, s.Value_Number as valueNumber, c.Criteria_Title as criteriaTitle " +
        "FROM outcome o JOIN measure m ON o.Outcome_ID=m.Outcome_ID LEFT JOIN rubric r ON m.Tool_Name=r.Rubric_Title " +
            "AND o.Cycle_Id=r.Cycle_Id LEFT JOIN criteria c ON c.Rubric_Id=r.Rubric_Id LEFT JOIN scales s ON " +
            "r.Rubric_Id=s.Rubric_Id " +
        "WHERE m.Measure_ID='" + req.params.measureId + "' " + 
        "ORDER BY c.Row_Id";

        connection.query(queryGetMeasureData, (error, results, fields) => {
            if (error)
            {
                res.status(400).json({
                    status: false,
                    error: error,
                    message: "The measure could not be retrieved."
                })
            }
            else
            {
                measure.measureName = results[0].measureName;
                measure.measureDescription = results[0].measureDescription;
                measure.toolName = results[0].toolName;
                measure.percentToReachTarget = results[0].percentToReachTarget;
                measure.targetScore = results[0].targetScore;
                measure.weighted = (results[0].weighted === 1 ? true : false);
                
                results.forEach(r => {
                    let newScale = {
                        valueNumber: r.valueNumber,
                        valueName: r.valueName
                    }

                    if (!measure.scale.find(s => s.valueNumber === r.valueNumber))
                    {
                        console.log("adding new scale");
                        measure.scale.push(newScale);
                    }

                    if (!measure.criteria.includes(r.criteriaTitle))
                    {
                        measure.criteria.push(r.criteriaTitle)
                    }
                })

                console.log(measure);

                getMeasureStatistics(req, res, measure, req.params.measureId);
            }
        })

    function getMeasureStatistics(req, res, measure, measureId)
    {
        let queryGetMeasureStatistics = "" + 
        "SELECT sl.Subject_Name as subjectName, ss.Subject_ID as subjectId, u.lastName as evaluatorName, " +
            "u.email as evaluatorEmail, ss.Score as score, ss.Criteria_Title criteriaTitle, c.weight, " +
            "s.Value_Name as valueName " +
        "FROM subject_list sl JOIN assignments a ON sl.Assignment_ID=a.Assignment_ID JOIN measure m ON " +
            "a.Measure_ID=m.Measure_ID JOIN subject_score ss ON m.Measure_ID=ss.Measure_ID AND " +
            "sl.Subject_ID=ss.Subject_ID AND a.User_Email=ss.User_Email JOIN outcome o ON m.Outcome_ID=o.Outcome_ID " +
            "JOIN users u ON ss.User_Email=u.email LEFT JOIN rubric r ON m.Tool_Name=r.Rubric_Title AND " +
            "o.Cycle_Id=r.Cycle_Id LEFT JOIN criteria c ON r.Rubric_Id=c.Rubric_Id AND " +
            "ss.Criteria_Title=c.Criteria_Title LEFT JOIN scales s ON r.Rubric_Id=s.Rubric_Id AND " +
            "ss.Score=s.Value_Number " +
        "WHERE m.Measure_ID='" + measureId + "' " + 
        "ORDER BY criteriaTitle";

        connection.query(queryGetMeasureStatistics, (error, results, fields) => {
            if (error)
            {
                console.log("in error");
                res.status(400).json({
                    status: false,
                    error: error,
                    message: "The measure statistics could not be retrieved."
                })
            }
            else if (results.length < 1)
            {
                console.log("in low length");
                res.status(200).json({
                    status: true,
                    error: error,
                    message: "There is no data on this measure.",
                    measure: measure
                })
            }
            else
            {
                results.forEach(r => {
                    let subjectIndex = measure.subjectList.findIndex(s => s.subjectId === r.subjectId);

                    let newScore = {
                        criteriaTitle: r.criteriaTitle,
                        score: r.score,
                        valueName: r.valueName,
                        weight: r.weight
                    }
                    
                    if (subjectIndex === -1)
                    {
                        let newEvaluator = {
                            evaluatorName: r.evaluatorName,
                            evaluatorEmail: r.evaluatorEmail,
                            scores: [newScore]
                        }

                        let newSubject = {
                            subjectId: r.subjectId,
                            subjectName: r.subjectName,
                            evaluators: [newEvaluator]
                        }
                        measure.subjectList.push(newSubject);
                    }
                    else
                    {
                        let evaluatorIndex = measure.subjectList[subjectIndex].evaluators.findIndex(e => e.evaluatorEmail 
                            === r.evaluatorEmail);

                        if (evaluatorIndex === -1)
                        {
                            let newEvaluator = {
                                evaluatorName: r.evaluatorName,
                                evaluatorEmail: r.evaluatorEmail,
                                scores: [newScore]
                            }

                            measure.subjectList[subjectIndex].evaluators.push(newEvaluator);
                        }
                        else
                        {
                            measure.subjectList[subjectIndex].evaluators[evaluatorIndex].scores.push(newScore);
                        }
                    }
                })

                res.status(200).json({
                    status: true,
                    measure: measure
                })
            }
        })
    }
})

module.exports = router;