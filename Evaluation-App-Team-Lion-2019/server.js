const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');

const users = require("./routes/api/users");
const summaryReport = require('./routes/summaryReport');
const scoreSubmission = require('./routes/scoreSubmission');
const rubric = require('./routes/rubric.js');

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
app.use("/api/users", users);
app.use('/summaryReport', summaryReport);
app.use('/scoreSubmission', scoreSubmission)
app.use('/rubric', rubric);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
