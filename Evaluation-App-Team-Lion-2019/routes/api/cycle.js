const express = require("express");
const router = express.Router();
var connection = require('../../models/User');
const passport = require('passport');

var uniqid = require('uniqid');


router.post("/", passport.authenticate("jwt", {session: false}), (req,res) => {

    console.log(req.body);
})

module.exports = router;