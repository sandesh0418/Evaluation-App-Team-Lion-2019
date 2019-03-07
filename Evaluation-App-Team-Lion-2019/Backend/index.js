var express=require("express");
var bodyParser=require('body-parser');
var cors = require('cors');
var session = require('express-session');
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var connection = require('./config');
global.__root   = __dirname + '/'; 



 var PORT = process.env.PORT || 8000;
 var authenticateController=require(__root + './controllers/authenticate-controller');
 var registerController=require(__root +'./controllers/register-controller');
 var insertSubjectId = require(__root +'./controllers/insert-subjectid-controler');
 var measureStatistics = require(__root +'./controllers/measure-statistics');
 var users = require(__root+'./controllers/users');
 var verifyToken = require(__root+'./controllers/VerifyToken')
  

 
/* route to handle login and registration */
app.post('/api/register',registerController.register);
app.post('/api/login',authenticateController.authenticate);

app.post('/subjectScore', insertSubjectId.insertSubjectId);
app.get('/measureStatistics', measureStatistics.calculateAverageOfEachStudent);
app.get('/users',verifyToken, users.user);
 

app.listen(PORT, function(){
	console.log("Server is up and running on Port: " + PORT );
});