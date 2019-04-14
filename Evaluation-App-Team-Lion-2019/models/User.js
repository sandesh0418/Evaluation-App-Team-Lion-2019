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

	
		connection.query("CREATE TABLE IF NOT EXISTS `Cycle`(`Dept_ID` VARCHAR(25) NOT NULL, `Cycle_Id` VARCHAR(25) NOT NULL, `Cycle_Name` VARCHAR(50) NOT NULL, `Start_Date` VARCHAR(20) NOT NULL, `End_Date` VARCHAR(20), Primary Key(`Cycle_Id`))", function(err, result){
		
	});

		
		
	});
		console.log("Server is connected to database");
	});
	
	
} else {
    console.log("Error while connecting with database");
}
});

module.exports = connection; 
