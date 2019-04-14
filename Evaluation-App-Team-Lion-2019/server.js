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
app.use('/summaryReport', summaryReport);
app.use('/scoreSubmission', scoreSubmission);
app.use('/api/rubric', rubric);
app.use('/assignments', assignments);
app.use('/evaluators', evaluators);
app.use('/editProgramSummary', editProgramSummary);
app.use('/cycle', cycle);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
