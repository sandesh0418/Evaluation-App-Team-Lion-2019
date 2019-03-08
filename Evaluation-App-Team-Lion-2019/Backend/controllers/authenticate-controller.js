const bcrypt = require('bcrypt');
const saltRounds = 10; 
var VerifyToken = require('./VerifyToken');
var connection = require('../config');
var jwt = require('jsonwebtoken'); 
var key = require('../key');

module.exports.authenticate=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
   
    console.log(email);
    console.log(password);
   
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
      
      if (error) {
          res.json({
            auth:false,
            toke: null,
            message:'there are some error with query'
            })
      }else{
       
        if(results.length >0){
          bcrypt.compare(req.body.password, results[0].password, function(err, response) {
            
  
                    if(response === true){
                      var token = jwt.sign({id: email},key.secret, {
                        expiresIn: 86400
                      });
                        res.status(200).send({
                          auth: true,
                          token: token,
                          role: results[0].role
                        });
                       
                    }else{
                      res.status(401).send({
                       auth: false,
                       token: null
                    
                    });
                  }
                });
              }

        else{
          res.status(404).send({
              auth:false, 
              token: null,   
            message:"Email does not exits"
          });
        }
      }
    });
}
