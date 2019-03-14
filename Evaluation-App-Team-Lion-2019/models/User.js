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

		connection.query("CREATE TABLE IF NOT EXISTS `rubric`(`Rubric_Title` VARCHAR(40) NOT NULL, `Measure_ID` int(11) NOT NULL)", function(err,results){

		});

		connection.query("CREATE TABLE IF NOT EXISTS `rubric_criteria`(`Rubric_Title` VARCHAR(40) NOT NULL, `Criteria_Title` VARCHAR(40) NOT NULL)", function(err,results){
			
		});

		connection.query("CREATE TABLE IF NOT EXISTS `rubric_criteria_scale`(`Rubric_Title` VARCHAR(40) NOT NULL, `Criteria_Title` VARCHAR(40) NOT NULL, `Value_Number` int(11) NOT NULL, `Value_Name` varchar(20) NOT NULL, `Value_Description` text Not NULL)", function(err,results){
			
		});

		
		
	});
		console.log("Server is connected to database");
	});
	
	
} else {
    console.log("Error while connecting with database");
}
});

module.exports = connection; 
