const express = require("express");
const router = express.Router();
var connection = require('../../models/User');

//PATH: evaluators/evaluatorsList
router.get('/evaluatorList', (req, res) => {
    let evaluatorList;
    console.log("INside eval route");

    let queryGetEvaluators = "SELECT firstName, lastName, email FROM users";
    
    connection.query(queryGetEvaluators, function(error, results, fields) {
        if (error) 
        {
            res.status(404).json({
              status:false,
              error: error,
              message:'The evaluators could not be retrieved.'
              })
        }
        else
        {
            if (results.length > 0)
            {
                evaluatorList = Object.values(JSON.parse(JSON.stringify(results)))
                res.status(200).json({
                    status: true,
                    evaluatorList: evaluatorList
                })
            }
            else
            {
                res.status(404).json({
                    status:false,
                    message:'There are no evaluators.'
                })
            }
        }
    })
})

module.exports = router;