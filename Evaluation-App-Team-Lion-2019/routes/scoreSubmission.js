const express = require("express");
const router = express.Router();
var connection = require('../models/User');
const passport = require('passport');

const secret = require('../config/keys');

router.post('/rubricScore', passport.authenticate("jwt", { session:false }), (req, res) => {

    let standardIds = "'" + req.body.measureId + "', '" + req.body.subjectId + "', '" + req.body.userEmail + "'";
    let scoresToInsert = "";
    for (let i = 0; i < req.body.scores.length; i++)
    {
        if (i == req.body.scores.length - 1)
        {
            scoresToInsert += "(" + standardIds + ", '" + req.body.scores[i].criteriaTitle + "', '" + 
                req.body.scores[i].value + "') ";
        }
        else
        {
            scoresToInsert += "(" + standardIds + ", '" + req.body.scores[i].criteriaTitle + "', '" + 
                req.body.scores[i].value + "'), ";
        }
    }

    let queryInsertScores = "" + 
        "INSERT INTO subject_score (Measure_ID, Subject_ID, User_Email, Criteria_Title, Score) VALUES " + 
        scoresToInsert;

    connection.query("USE nodejs_login1");

    connection.query(queryInsertScores, function (error, results, fields) {
        if (error) 
        {
            res.json({
                status:false,
                message:'The subject score cannot be inserted into the subject_score table.'
            })
        }
        else
        {
            res.json({
                status:true,
                data:results,
                message:'The subject score was inserted into the subject_scores table.'
            })
        }
    });
})

module.exports = router;