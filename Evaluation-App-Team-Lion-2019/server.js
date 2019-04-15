const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');

const users = require("./routes/api/users");
const summaryReport = require('./routes/api/summaryReport');
const scoreSubmission = require('./routes/api/scoreSubmission');
const rubric = require('./routes/api/rubric');
const assignments = require('./routes/api/assignments');
const evaluators = require('./routes/api/evaluators');
const editProgramSummary = require('./routes/api/editProgramSummary');
const cycle = require('./routes/api/cycle');
const coordinator = require('./routes/api/Coordinator');


const app = express();
app.use(cors());
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());



// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use('/api/users', users);
app.use('/api/summaryReport', summaryReport);
app.use('/api/scoreSubmission', scoreSubmission);
app.use('/api/rubric', rubric);
app.use('/api/assignments', assignments);
app.use('/api/evaluators', evaluators);
app.use('/api/editProgramSummary', editProgramSummary);
app.use('/api/cycle', cycle);
app.use('/api/coordinator', coordinator);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
