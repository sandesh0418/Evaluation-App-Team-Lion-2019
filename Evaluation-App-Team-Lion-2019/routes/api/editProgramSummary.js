const express = require("express");
const router = express.Router();
const connection = require('../../models/User');
const uuidv1 = require('uuid/v1');

router.post('/editProgramSummary', (req, res) => {
    let newProgramSummary = req.body;

    newProgramSummary.outcomes.forEach(o => {
        let queryAddOutcome = "INSERT INTO outcome (Outcome_ID, Description) VALUES (\'" + o.Outcome_ID +
                        "\', \'" + o.Description + "\') ON DUPLICATE KEY UPDATE Description=\'" + o.Description + "\'";

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
            let queryAddMeasure = "INSERT INTO measure (Measure_ID, Outcome_ID, Description, Percent_to_reach_target," + 
                    "Target_Score) VALUES (\'" + m.Measure_ID + "\', \'" + outcome.Outcome_ID +"\', \'" +
                    m.Description + "\', " + m.Percent_to_reach_target + ", " + m.Target_Score +") ON DUPLICATE KEY" +
                    " UPDATE Measure_ID=\'" + m.Measure_ID + "\'";

            connection.query(queryAddMeasure, (error, results, fields) => {
                if (error)
                {
                    console.log(error);
                    console.log("not inserted");
                }
                else
                {
                    console.log("inserted.");
                }
            })
        })
    }
})

module.exports = router;