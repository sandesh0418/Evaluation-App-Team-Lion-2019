const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
// aa test
const users = require("./routes/api/users");
const summaryReport = require('./routes/api/summaryReport');
const scoreSubmission = require('./routes/api/scoreSubmission');
const rubric = require('./routes/api/rubric');
const assignments = require('./routes/api/assignments');
const evaluators = require('./routes/api/evaluators');
const editProgramSummary = require('./routes/api/editProgramSummary');
const cycle = require('./routes/api/cycle');
const coordinator = require('./routes/api/Coordinator');
const outcome = require('./routes/api/outcome');
const measureReport = require('./routes/api/measureReport');
const curriculum = require('./routes/api/curriculum');
const messageBroadcast = require('./routes/api/messageBroadcast');


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

app.use(express.static(path.join(__dirname, 'clients/build')))

// Routes
app.use('/api/users', users);
app.use('/api/summaryReport', summaryReport);
app.use('/api/scoreSubmission', scoreSubmission);
app.use('/api/rubric', rubric);
app.use('/api/assignments', assignments);
app.use('/api/evaluators', evaluators);
app.use('/api/editProgramSummary', editProgramSummary);
app.use('/api/cycle', cycle);
app.use('/api/Coordinator', coordinator);
app.use('/api/outcome', outcome);
app.use('/api/measureReport', measureReport);
app.use('/api/curriculum', curriculum);
app.use('/api/messageBroadcast', messageBroadcast);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("clients/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "clients", "build", "index.html"));
  });
} else {
  express.static("static");

  app.get("/", function(req, res) {
    res.send("hello world");
  });
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
