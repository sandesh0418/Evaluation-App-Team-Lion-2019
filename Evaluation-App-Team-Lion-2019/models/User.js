var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  
});
connection.connect(function(err){
if(!err) {
    
	connection.query("CREATE DATABASE IF NOT EXISTS `nodejs_login1`",function(err,results){
		
	connection.query("USE nodejs_login1",function(err,results){
		
		
	});
		console.log("Server is connected to database");
	});
	
	
} else {
    console.log("Error while connecting with database");
}
});

module.exports = connection; 
