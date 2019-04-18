const express = require("express");
const router = express.Router();
const uuidv1 = require('uuid/v1');
const connection = require('../../models/User');

/**
 * Create a new assignment
 * PATH: /assignments/createAssignment
 */
router.post('/createAssignment/', (req,res) => {
    let Measure_ID = req.body.Measure_ID;
    let User_Email = req.body.User_Email;
    let Assignment_ID = uuidv1();

    let assignment = {
        Measure_ID: Measure_ID,
        User_Email: User_Email,
        Assignment_ID: Assignment_ID
    }

    connection.query('INSERT INTO assignments SET ?', assignment, function (error, results, fields) {
        if (error) 
        {
            res.status(404).json({
                status:false,
                error: error,
                message:'The assignment could not be added.'
            })
        }
        else
        {
            insertSubjectList();
        }
    });

    function insertSubjectList()
    {
        let separatedList = "";
        let lines = req.body.studentList.split("\n");
        lines.splice(0, 1);

        for (let i = 0; i < lines.length; i++)
        {
            if (i == lines.length - 1)
            {
                separatedList += "(" + formatLine(lines[i].trim()) + " '" + Assignment_ID + "')"
            }
            else
            {
                separatedList += "(" + formatLine(lines[i].trim()) + " '" + Assignment_ID + "'),";
            }
        }

        function formatLine(line)
        {
            let newLines = line.split(",");
            let returnValue = "";
            newLines.forEach(l => {
                returnValue += "'" + l + "',";
            })
            return returnValue;
        }

        console.log(separatedList);

        let queryInsertSubjects = "INSERT INTO subject_list (Subject_Name, Subject_ID, Assignment_ID) VALUES " +
            separatedList;

        connection.query(queryInsertSubjects, function (error, results, fields) {
            if (error) 
            {
                res.status(404).json({
                    status:false,
                    error: error,
                    message:'The subject list could not be added.'
                })
            }
            else
            {
                res.status(200).json({
                    status: true,
                    error: error,
                    message:'The assignment has been added.'
                })
            }
        })
    }
})

/**
 * Get outcomes and measures for createAssignment.
 * PATH: /assignments/outcomesAndMeasures
 */
//Get outcomes and measures to load page.
router.get('/outcomesAndMeasures/:cycleId', (req, res) => {
    let cycleId = req.params.cycleId
    let outcomeList = [];

    let queryOutcomesWithMeasures = "" +
        "SELECT o.Outcome_ID, o.Description as oDescription, m.Measure_ID, m.Description as mDescription " +
        "FROM outcome o JOIN measure m ON o.Outcome_ID=m.Outcome_ID " +
        "WHERE o.Cycle_Id='" + cycleId + "'";   

    connection.query(queryOutcomesWithMeasures, (error, results, fields) => {
        if (error || results.length === 0) 
        {
            res.status(404).json({
              status:false,
              error: error,
              message:'The outcomes could not be retrieved.'
              })
        }
        else
        {
            results = Object.values(JSON.parse(JSON.stringify(results)));
            results.forEach(r => {
                index = outcomeList.findIndex(o => o.Outcome_ID === r.Outcome_ID);

                let newMeasure = {
                    Measure_ID: r.Measure_ID,
                    Description: r.mDescription
                }

                if (index === -1)
                {
                    let newOutcome = {
                        Outcome_ID: r.Outcome_ID,
                        Description: r.oDescription,
                        measures:[newMeasure]
                    }

                    outcomeList.push(newOutcome);
                }
                else
                {
                    outcomeList[index].measures.push(newMeasure);
                }
            })

            res.status(200).json({
                status: true,
                outcomeList: outcomeList
            })
        }
    })
})

/**
 * Get assignments by User_Email for myAssignments
 * PATH: /assignments/myAssignments 
 */
router.get('/myAssignments/:email', (req, res) => {
    let queryGetAssignments = "" + 
        "SELECT o.Description as outcomeDescription, m.Description as measureDescription, " + 
            "a.Assignment_ID as assignmentId, m.Tool_Name as toolName, r.Rubric_Title as rubricTitle " + 
        "FROM outcome o JOIN measure m ON o.Outcome_ID=m.Outcome_ID JOIN assignments a ON " +
            "a.Measure_ID=m.Measure_ID LEFT JOIN rubric r ON m.Tool_Name=r.Rubric_Title " + 
        "WHERE a.User_Email='" + req.params.email + "' " +
        "ORDER BY assignmentId";


    connection.query(queryGetAssignments, (error, results, field) => {
        if (error) 
        {
            res.status(404).json({
            status:false,
            error: error,
            message:'Could not get assignments for user with email' + req.body
            })
        }
        else
        {
            res.status(200).json({
                assignments: Object.values(JSON.parse(JSON.stringify(results)))
            })
        }
    })
})


/**
 * Get the subject list by measure ID
 * PATH: /assignments/subjectList/:id
 */
router.get('/subjectList/:id', (req, res) => {
    let queryGetSubjectList = "" + 
        "SELECT Subject_Name as subjectName, Subject_ID as subjectId " +
        "FROM subject_list " + 
        "WHERE Assignment_ID='" + req.params.id + "'";

    connection.query(queryGetSubjectList, (error, results, field) => {
        if (error) 
        {
            res.status(404).json({
            status:false,
            error: error,
            message:'Could not get subjects'
            })
        }
        else
        {
            res.status(200).json({
                subjectList: Object.values(JSON.parse(JSON.stringify(results)))
            })
        }
    })
})

/**
 * Get assignment's measureId by assignmentId for grading measures.
 * PATH: /assignments/assignmentMeasureId/:id 
 */
router.get('/assignmentMeasure/:id', (req, res) => {
    let queryGetAssignment = "" + 
        "SELECT a.Measure_ID as measureId, m.Description as description " +
        "FROM assignments a JOIN measure m ON a.Measure_ID=m.Measure_ID " +
        "WHERE Assignment_ID='" + req.params.id + "'";

    connection.query(queryGetAssignment, (error, results, field) => {
        if (error) 
        {
            res.status(404).json({
            status:false,
            error: error,
            message:'Could not get assignment Measure ID'
            })
        }
        else
        {
            res.status(200).json({
                measure: Object.values(JSON.parse(JSON.stringify(results)))[0]
            })
        }
    })
})

module.exports = router;