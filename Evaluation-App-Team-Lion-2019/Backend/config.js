var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  
});
connection.connect(function(err){
if(!err) {
    
	connection.query("CREATE DATABASE IF NOT EXISTS `nodejs_login1`",function(err,results){
		connection.query("USE nodejs_login1");
		 var sql="CREATE TABLE IF NOT EXISTS `users`(`CWID` int(8) PRIMARY KEY, `firstName` varchar(20), `lastName` varchar(20), `email` varchar(100), `password` varchar(200), `role` varchar(20))";
		// var sql="CREATE TABLE IF NOT EXISTS `scores`(`rubricID` int (100), `score1` int (2), `score2` int(2), `score3` int(2))";
	connection.query(sql,function(err,results){
		
		
	});
		console.log("Server is connected to database");
	});
	
	
} else {
    console.log("Error while connecting with database");
}
});

module.exports = connection; 
