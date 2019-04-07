const express = require("express");
const router = express.Router();
var connection = require('../../models/User');
var passport = require('passport');
var connection = require('../../models/User')
var validator = require('../../validation/evaluatorValidator');
//PATH: evaluators/evaluatorsList


router.post('/addEvaluator', passport.authenticate("jwt", {session: false}), (req,res) =>{

    const { errors , isValid } = validator(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
      }
      
    connection.query("INSERT INTO `users`(`firstName`, `lastName`, `email`) VALUES(?,?,?)", [req.body.firstName, req.body.lastName, req.body.email], function(err, result){
        if (err) throw err;
        else{
            res.send("Evaluator has been added");
        }
    })
})
router.get('/evaluatorList', (req, res) => {
    let evaluatorList;

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