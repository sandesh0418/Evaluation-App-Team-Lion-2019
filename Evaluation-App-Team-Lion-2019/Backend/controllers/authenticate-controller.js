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
          bcrypt.compare(password, results[0].password).then(function(response) {
            //console.log(password);
           // console.log(response);
           // console.log(bcrypt.compareSync(password, results[0].password)); 
                    if(response === true){
<<<<<<< HEAD
                        res.send(results[0].role)
                        //console.log(password);
                      //  console.log(results[0].password);
                    }else{
                      //console.log("dsf");
                      res.send("Email and password do not match");
=======
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
>>>>>>> master
                    
                    });
                  }
                });
              }

        else{
<<<<<<< HEAD
          res.json({
              status:false,    
            message:"Email does not exist"
=======
          res.status(404).send({
              auth:false, 
              token: null,   
            message:"Email does not exits"
>>>>>>> master
          });
        }
      }
    });
}
