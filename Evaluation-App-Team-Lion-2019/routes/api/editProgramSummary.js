const express = require("express");
const router = express.Router();
const connection = require('../../models/User');
const uuidv1 = require('uuid/v1');
const format = require('string-format');

router.post('/editProgramSummary', (req, res) => {
    let newProgramSummary = req.body;

    newProgramSummary.outcomes.forEach(o => {
        let queryAddOutcome = "INSERT INTO outcome (Outcome_ID, Outcome_Name, Description, Cycle_Id) VALUES ('" + 
            o.Outcome_ID + "', '" + o.Outcome_Name + "', '" + o.Description + "', '" + newProgramSummary.cycleId + 
            "') ON DUPLICATE KEY UPDATE Outcome_Name='" + o.Outcome_Name + "', Description='" + o.Description + "'";

        connection.query(queryAddOutcome, (error, results, fields) => {
            if (error) 
            {
                console.log(error);
            }
            else
            {
                insertMeasures(o);
                addCurriculumMappings(o);
            }
        })
    })

    res.send("good");

    function insertMeasures(outcome)
    {
        outcome.measures.forEach(m => {
            let queryAddMeasure = "INSERT INTO measure (Measure_ID, Measure_Name, Outcome_ID, Description, " +
                    "Percent_to_reach_target, Target_Score, Tool_Name) VALUES ('" + m.Measure_ID + "', '" + 
                    m.Measure_Name + "', '" + outcome.Outcome_ID +"', '" + m.Description + "', '" + 
                    m.Percent_to_reach_target + "', '" + m.Target_Score + "', '" + m.Tool_Name + "') " +
                    "ON DUPLICATE KEY UPDATE Measure_Name='" + m.Measure_Name + "', Description='" + 
                    m.Description + "', Percent_to_reach_target='" + m.Percent_to_reach_target + "', " +
                    "Target_Score='" + m.Target_Score + "', Tool_Name='" + m.Tool_Name + "'";

            connection.query(queryAddMeasure, (error, results, fields) => {
                if (error)
                {
                    console.log(error);
                }
                else
                {
                    
                }
            })
        })
    }

    function addCurriculumMappings(outcome)
    {
        let mappings = [];

        outcome.courses.forEach(c => {
            mappings.push(format("('" + outcome.Outcome_ID + "', '{courseId}', '{relevantHours}')", c));
        })

        let queryInsertCurriculumMappings = "" + 
            "INSERT INTO curriculum_outcome_mapping (Outcome_ID, Course_ID, Relevant_Hours) VALUES " +
            mappings.join() + " ON DUPLICATE KEY UPDATE Relevant_Hours=VALUES(Relevant_Hours)";

        connection.query(queryInsertCurriculumMappings, (error, results, fields) => {
            if (error)
            {
                console.log(error);
            }
        })
    }
})

router.post('/deleteOutcomes', (req, res) => {
    let deletedOutcomeIds = req.body;

    let stringifiedOutcomeIds = "";

    for (let i = 0; i < deletedOutcomeIds.length; i++)
    {
        if (i === deletedOutcomeIds.length - 1)
        {
            stringifiedOutcomeIds += "'" + deletedOutcomeIds[i] + "'";
        }
        else
        {
            stringifiedOutcomeIds += "'" + deletedOutcomeIds[i] + "', ";
        }
    }

    let queryDeleteFromMeasures = "DELETE FROM measure WHERE Outcome_ID IN (" + stringifiedOutcomeIds + ")";
    connection.query(queryDeleteFromMeasures, (error, results, field) => {
        if (error)
        {
            res.status(400).json({
                status:false,
                error: error,
                message:'Measures associated with deleted outcomes could not be deleted.  ' + 
                    'Therefore, the outcomes and measures were not deleted.'
            })
        }
        else
        {
            deleteOutcomeIds(req, res, stringifiedOutcomeIds);
        }
    })

    function deleteOutcomeIds(req, res, stringifiedOutcomeIds)
    {
        let queryDeleteFromMeasures = "DELETE FROM outcome WHERE Outcome_ID IN (" + stringifiedOutcomeIds + ")";
        connection.query(queryDeleteFromMeasures, (error, results, field) => {
            if (error)
            {
                res.status(400).json({
                    status:false,
                    error: error,
                    message:'The outcomes could not be deleted.'
                })
            }
            else
            {
                
            }
        })
    }
})

router.post('/deleteMeasures', (req, res) => {
    let deletedMeasureIds = req.body;

    let stringifiedMeasureIds = "";

    for (let i = 0; i < deletedMeasureIds.length; i++)
    {
        if (i === deletedMeasureIds.length - 1)
        {
            stringifiedMeasureIds += "'" + deletedMeasureIds[i] + "'";
        }
        else
        {
            stringifiedMeasureIds += "'" + deletedMeasureIds[i] + "', ";
        }
    }

    let queryDeleteFromMeasures = "DELETE FROM measure WHERE Measure_ID IN (" + stringifiedMeasureIds + ")";
    connection.query(queryDeleteFromMeasures, (error, results, field) => {
        if (error)
        {
            res.status(400).json({
                status:false,
                error: error,
                message:'Measures could not be deleted.'
            })
        }
        else
        {
            res.status(200).json({
                status:true,
                message:'Measures were deleted.'
            })
        }
    })
    
})

module.exports = router;