const express = require("express");
const router = express.Router();
var connection = require('../models/User');

router.post('/rubricScore', (req, res) => {

    let subjectScore = {
        "Measure_ID": req.body.measureId,
        "Subject_ID": req.body.subjectId,
        "User_Email": req.body.userEmail
    }

    connection.query("USE nodejs_login1");

    connection.query('INSERT INTO subject_score SET ?', subjectScore, function (error, results, fields) {
        if (error) {
            res.json({
                status:false,
                message:'The subject score cannot be inserted into the subject_score table.'
            })
          }else{
              res.json({
                status:true,
                data:results,
                message:'The subject score was inserted into the subject_scores table.'
            })
          }
    });


    req.body.scores.map(function(currentScore){
        let subjectScores = {
            "Measure_ID": req.body.measureId,
            "Subject_ID": req.body.subjectId,
            "Criteria_Title": currentScore.criteriaTitle,
            "Score": currentScore.value
        }
        console.log(currentScore.criteriaTitle);

        connection.query('INSERT INTO subject_scores SET ?', subjectScores, function (error, results, fields) {});
    });
})

module.exports = router;