const bcrypt = require('bcrypt');
const saltRounds = 10; 
var connection = require('../config');


module.exports.authenticate=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
   
    console.log(email);
    console.log(password);
   
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
      
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
       
        if(results.length >0){
          bcrypt.compare(password, results[0].password).then(function(response) {
            //console.log(password);
           // console.log(response);
           // console.log(bcrypt.compareSync(password, results[0].password)); 
                    if(response === true){
                        res.send(results[0].role)
                        //console.log(password);
                      //  console.log(results[0].password);
                    }else{
                      //console.log("dsf");
                      res.send("Email and password do not match");
                    
                    }
                  });
                }

        else{
          res.json({
              status:false,    
            message:"Email does not exist"
          });
        }
      }
    });
}
