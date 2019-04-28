const express = require("express");
const router = express.Router();
var connection = require('../../models/User');
const passport = require('passport');

const secret = require('../../config/keys');

router.post('/rubricScore', passport.authenticate("jwt", { session:false }), (req, res) => {

    let standardIds = "'" + req.body.measureId + "', '" + req.body.subjectId + "', '" + req.body.userEmail + "', '" +req.body.Assignment_ID +"'";
    
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
        "INSERT INTO subject_score (Measure_ID, Subject_ID, User_Email, Assignment_ID, Criteria_Title, Score) VALUES " + 
            scoresToInsert + " ON DUPLICATE KEY UPDATE Score=VALUES(Score)";

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

router.post('/testScore', passport.authenticate("jwt", { session:false }), (req, res) => {
    console.log(req.body)
    let standardData = "'" + req.body.measureId + "', '" + req.body.userEmail + "', '" + req.body.criteriaTitle + "', '" +req.body.Assignment_ID +"'";
    console.log(standardData)
    let scoresToInsert = "";

    for (let i = 0; i < req.body.scores.length; i++)
    {
        if (i == req.body.scores.length - 1)
        {
            scoresToInsert += "(" + standardData + ", '" + req.body.scores[i].subjectId + "', " + 
                (req.body.scores[i].score / 100) + ")";
        }
        else
        {
            scoresToInsert += "(" + standardData + ", '" + req.body.scores[i].subjectId + "', " + 
                (req.body.scores[i].score / 100) + "),";
        }
    }

    let queryInsertScores = "" + 
        "INSERT INTO subject_score (Measure_ID, User_Email, Criteria_Title, Assignment_ID, Subject_ID , Score) VALUES " + 
        scoresToInsert + " ON DUPLICATE KEY UPDATE Score=VALUES(Score)";

    connection.query(queryInsertScores, function (error, results, fields) {
        if (error) 
        {
            res.json({
                inserted:false,
                error: error,
                message:'The subject scores cannot be inserted into the subject_score table.'
            })
        }
        else
        {
            res.json({
                inserted:true,
                data:results,
                message:'The subject scores were inserted into the subject_scores table.'
            })
        }
    });
})

module.exports = router;