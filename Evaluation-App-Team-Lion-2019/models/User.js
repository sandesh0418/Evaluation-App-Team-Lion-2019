var mysql = require("mysql");
// var connection = mysql.createConnection({
// host     : 'localhost',
// user     : 'root',
// password : '',

// });
// function handleDisconnect() {
//   connection = mysql.createConnection({
//     host: "us-cdbr-iron-east-02.cleardb.net",
//     user: "b6472b8eab1045",
//     password: "445bfe4e",
// 		database: "heroku_80ed5181cd55b28"

// 	// host : 'localhost',
//   // user : 'root',
//   // password : ''
//   });

//   connection.connect(function(err) {
//     // The server is either down
//     if (err) {
//       // or restarting (takes a while sometimes).
//       console.log("Error while connecting with database:", err);
//       // setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
//     } else {
//       connection.query("USE heroku_80ed5181cd55b28", function(err, results) {});
//       console.log("Server is connected to database");
//     } // to avoid a hot loop, and to allow our node script to
//   }); // process asynchronous requests in the meantime.
//   // If you're also serving http, display a 503 error.
//   connection.on("error", function(err) {
//     console.log("db error", err);
//     if (err.code === "PROTOCOL_CONNECTION_LOST") {
//       // Connection to the MySQL server is usually
//       handleDisconnect(); // lost due to either server restart, or a
//     } else {
//       // connnection idle timeout (the wait_timeout
//       throw err; // server variable configures this)
//     }
//   });
// }

// handleDisconnect();

var connection = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-iron-east-02.cleardb.net",
  user: "b6472b8eab1045",
  password: "445bfe4e",
  database: "heroku_80ed5181cd55b28"

  // host : 'localhost',
  // user : 'root',
  // password : '',
  // database : 'nodejs_login1'
});
connection.on("connection", function(connection) {
  console.log("Server is connected to database");
});

// var connection = mysql.createConnection({
//   host     : 'us-cdbr-iron-east-02.cleardb.net',
//   user     : 'b6472b8eab1045',
//   password : '445bfe4e',
//   database : 'heroku_80ed5181cd55b28'
// });
// connection.connect(function(err){
// if(!err) {

// 	// connection.query("CREATE DATABASE IF NOT EXISTS `nodejs_login1`",function(err,results){

// 	connection.query("USE heroku_80ed5181cd55b28",function(err,results){

// 	});
// 		console.log("Server is connected to database");
// 	// });

// } else {
//     console.log("Error while connecting with database");
// }
// });

module.exports = connection;
