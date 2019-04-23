const express = require("express");
const router = express.Router();
const connection = require('../../models/User');
const uuidv1 = require('uuid/v1');

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
})

module.exports = router;