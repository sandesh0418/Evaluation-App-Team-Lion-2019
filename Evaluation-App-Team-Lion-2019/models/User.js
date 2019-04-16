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

		connection.query("CREATE TABLE IF NOT EXISTS `rubric`(`Rubric_Title` VARCHAR(40) PRIMARY KEY, `Rows` int(20), `scores` int(20), `weight` int(1) )", function(err,results){

		});

		connection.query("CREATE TABLE IF NOT EXISTS `rubric_criteria`(`Row_Id` VARCHAR(40) NOT NULL,`Rubric_Title` VARCHAR(40) NOT NULL, `Criteria_Title` VARCHAR(40) NOT NULL, `Weight` float(5), PRIMARY KEY(`Rubric_Title`,`Criteria_Title`, `Row_Id`))", function(err,results){
			
		});

		connection.query("CREATE TABLE IF NOT EXISTS `rubric_criteria_scale`(`Row_Id` VARCHAR(40) NOT NULL,`Rubric_Title` VARCHAR(40) NOT NULL, `Criteria_Title` VARCHAR(40) NOT NULL, `Value_Number` int(11) NOT NULL, `Value_Name` varchar(20) , `Value_Description` text, PRIMARY KEY(`Row_Id`,`Value_Number`))", function(err,results){
			
		});
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
