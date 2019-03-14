var VerifyToken = require('./VerifyToken');
var connection = require('../config');
var jwt = require('jsonwebtoken'); 
var key = require('../key');


module.exports.user = function(req,res){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ 
        auth: false, 
        message: 'No token provided.' });
  
  jwt.verify(token, key.secret, function(err, decoded) {
    if (err) return res.status(500).send({ 
        auth: false, 
        message: 'Failed to authenticate token.' });
    
        connection.query('SELECT * FROM users WHERE email = ?',[decoded.id], function (error, results, fields) {
        if(error){
            return res.status(500).send("There was a problem finding the user.");

        }

        if(results.length>0){
            
            res.status(200).send({
                cwid: results[0].CWID,
                firstName: results[0].firstName,
                lastName: results[0].lastName,
                email: results[0].email,    
                role: results[0].role 
                
            });
        }
        else{
            return res.status(404).send("No user found");
        }
  });
});
}