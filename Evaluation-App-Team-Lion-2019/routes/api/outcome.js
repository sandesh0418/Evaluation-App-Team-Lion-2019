

const express = require("express");
const router = express.Router();
var connection = require('../../models/User');
const passport = require('passport');

router.get("/:Cycle_Id", passport.authenticate("jwt", {session: false}), (req, res) =>{
    var Cycle_Id = req.params.Cycle_Id;

    connection.query("SELECT * from `outcome` where `Cycle_Id` = ?", Cycle_Id, function(err, result, fields){
        if (err) throw err;

        if(result.length>0){
            res.send(result)
        }

        else{
            res.json({status: false})
        }
    })
   

})



module.exports = router;