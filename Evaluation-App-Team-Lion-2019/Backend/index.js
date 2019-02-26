var express=require("express");
var bodyParser=require('body-parser');
var cors = require('cors');
 
var connection = require('./config');
var app = express();
var PORT = process.env.PORT || 8000;
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var insertSubjectId = require('./controllers/insert-subjectid-controler');
 app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
  

 
/* route to handle login and registration */
app.post('/register',registerController.register);
app.post('/',authenticateController.authenticate);
app.post('/subjectScore', insertSubjectId.insertSubjectId);
 

app.listen(PORT, function(){
	console.log("Server is up and running on Port: " + PORT );
});