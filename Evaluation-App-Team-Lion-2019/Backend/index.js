var express=require("express");
var bodyParser=require('body-parser');
var cors = require('cors');
 
var connection = require('./config');
var app = express();
var PORT = process.env.PORT || 8000;
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var scoreController= require('./controllers/score-controller');
var getScoreController = require('./controllers/scoreGet-controller');
 app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'build')));

 
/* route to handle login and registration */
app.post('/register',registerController.register);
app.post('/',authenticateController.authenticate);
app.post('/gradeRubric',scoreController.savescore);
app.get('/viewRubric',getScoreController.getscore);
 

app.listen(PORT, function(){
	console.log("Server is up and running on Port: " + PORT );
});