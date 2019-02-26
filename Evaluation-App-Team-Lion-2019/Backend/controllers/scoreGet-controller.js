var express = require("express");

module.exports.getscore = function(req, res){
    console.log("passed");
    var connection = require('../config');

    connection.query('SELECT * FROM scores', function (error, results, fields) {
        console.log(results);
        res.send(results)
    })
}