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
            let lines = req.body.studentList;
            if (lines == "Name,ID\n")
            {
                res.status(200).json({
                    status:true,
                    error: error,
                    message:'The assignment has been added.'
                })
            }
            else
            {
                insertSubjectList(req, res, lines, Assignment_ID, true);
            }
            
        }
    });

})

router.post('/addSubjects', (req,res) => {
    let lines = req.body.subjectList;
    insertSubjectList(req, res, lines, req.body.assignmentId, false);
})

function insertSubjectList(req, res, data, Assignment_ID, fromCreateAssignment)
{
    let separatedList = "";
    let lines = data.split("\n");
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
                message: (fromCreateAssignment ? 'The assignment has been added.' : 'The new subjects have been added.')
            })
        }
    })
}

/**
 * Get outcomes and measures for createAssignment.
 * PATH: /assignments/outcomesAndMeasures
 */
//Get outcomes and measures to load page.
router.get('/outcomesAndMeasures/:cycleId', (req, res) => {
    let cycleId = req.params.cycleId
    let outcomeList = [];

    let queryOutcomesWithMeasures = "" +
        "SELECT o.Outcome_ID, o.Outcome_Name, o.Description as oDescription, m.Measure_ID, m.Measure_Name, " + 
        "m.Description as mDescription " +
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
                    Measure_Name: r.Measure_Name,
                    Description: r.mDescription
                }

                if (index === -1)
                {
                    let newOutcome = {
                        Outcome_ID: r.Outcome_ID,
                        Outcome_Name: r.Outcome_Name,
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
router.get('/myAssignments/:email/:cycleId', (req, res) => {
    let queryGetAssignments = "" + 
        "SELECT DISTINCT o.Outcome_Name as outcomeName, o.Description as outcomeDescription, m.Description " +
            "as measureDescription, a.Assignment_ID as assignmentId, m.Tool_Name as toolName, r.Rubric_Title as " +
            "rubricTitle, r.Rubric_Id as rubricId, m.Measure_Name as measureName, sl.Subject_Name as subjectName, " +
            "sl.Subject_ID as subjectId, ss.Criteria_Title as criteriaTitle, ss.Score as score " +
        "FROM outcome o JOIN measure m ON o.Outcome_ID=m.Outcome_ID JOIN assignments a ON " +
            "a.Measure_ID=m.Measure_ID LEFT JOIN subject_list sl ON a.Assignment_ID=sl.Assignment_ID LEFT JOIN " + 
            "(SELECT Rubric_Title, Rubric_Id " +
            "FROM measure mm JOIN rubric rr on mm.Tool_Name=rr.Rubric_Title " +
            "WHERE rr.Cycle_Id='" + req.params.cycleId + "') as r ON " +
            "m.Tool_Name=r.Rubric_Title LEFT JOIN subject_score ss ON m.Measure_ID=ss.Measure_ID AND " +
            "sl.Subject_ID=ss.Subject_ID AND a.User_Email=ss.User_Email " +
        "WHERE a.User_Email='" + req.params.email + "' AND o.Cycle_Id='" + req.params.cycleId + "' " + 
        "ORDER BY assignmentId";

        let assignments = [];

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
            let data = Object.values(JSON.parse(JSON.stringify(results)));
            data.forEach(r => {
                let assignmentIndex = assignments.findIndex(a => a.assignmentId === r.assignmentId);

                let newScore = {
                    criteriaTitle: r.criteriaTitle,
                    score: r.score
                }

                if (assignmentIndex === -1)
                {
                    let newSubject = {
                        subjectName: r.subjectName,
                        subjectId: r.subjectId,
                        scores: [newScore]
                    }

                    let newAssignment = {
                        outcomeName: r.outcomeName,
                        outcomeDescription: r.outcomeDescription,
                        measureName: r.measureName,
                        measureDescription: r.measureDescription,
                        assignmentId: r.assignmentId,
                        toolName: r.toolName,
                        rubricTitle: r.rubricTitle,
                        rubricId: r.rubricId,
                        finished: (r.score === null ? false : true),
                        subjects: [newSubject]
                    }

                    assignments.push(newAssignment);
                }
                else
                {
                    if (assignments[assignmentIndex].finished && (r.score === null))
                    {
                        assignments[assignmentIndex].finished = false;
                    }

                    let subjectIndex = assignments[assignmentIndex].subjects.findIndex(s => s.subjectId === r.subjectId);

                    if (subjectIndex === -1)
                    {
                        let newSubject = {
                            subjectName: r.subjectName,
                            subjectId: r.subjectId,
                            scores: [newScore]
                        }

                        assignments[assignmentIndex].subjects.push(newSubject);
                    }
                    else
                    {
                        assignments[assignmentIndex].subjects[subjectIndex].scores.push(newScore);
                    }
                }
            })

            var completedAssignment= [];

            var inCompleteAssignment = [];
            var count1= 0;
            var count2 = 0;

         

            for(var i = 0; i<assignments.length;i++){
                
                if(assignments[i].finished === false){
                        inCompleteAssignment[count1]= assignments[i];
                        count1++;
                }
                else{
                    completedAssignment[count2] = assignments[i];
                    count2++;
                }
            }

            assignments = [];
            assignments[0] = completedAssignment;
            assignments[1] = inCompleteAssignment;

            console.log(assignments)
            


            res.status(200).json({
                assignments: assignments
            })
        }
    })
})


/**
 * Get the subject list by measure ID
 * PATH: /assignments/subjectList/:id
 */
router.get('/subjectList/:id', (req, res) => {
    let subjectList = [];
    
    let queryGetSubjectList = "" + 
        "SELECT sl.Subject_Name as subjectName, sl.Subject_ID as subjectId, ss.Criteria_Title, ss.Score " +
        "FROM subject_list sl JOIN assignments a ON sl.Assignment_ID=a.Assignment_ID JOIN measure m ON " + 
            "a.Measure_ID=m.Measure_ID LEFT JOIN subject_score ss ON m.Measure_ID=ss.Measure_ID AND " +
            "sl.Subject_ID=ss.Subject_ID AND a.User_Email=ss.User_Email " +
        "WHERE a.Assignment_ID='" + req.params.id + "'";

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
            data = Object.values(JSON.parse(JSON.stringify(results)))
            data.forEach(r => {
                subjectIndex = subjectList.findIndex(s => s.subjectId === r.subjectId);

                let newScore = {
                    criteriaTitle: r.Criteria_Title,
                    score: r.Score
                }

                if(subjectIndex === -1)
                {
                    let newSubject = {
                        subjectName: r.subjectName,
                        subjectId: r.subjectId,
                        scores: [newScore]
                    }

                    subjectList.push(newSubject);
                }
                else
                {
                    subjectList[subjectIndex].scores.push(newScore);
                }
            })

            console.log(subjectList);

            res.status(200).json({
                subjectList: subjectList
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
        "SELECT a.Measure_ID as measureId, m.Description as description, m.Measure_Name as measureName " +
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

/**
 * Delete a subject from the subject list.
 * PATH: /assignments/deleteSubject
 */
router.post('/deleteSubject', (req, res) => {
    let queryDeleteSubject = "DELETE FROM subject_list WHERE Assignment_ID='" + req.body.assignmentId + "' " +
        "AND Subject_ID='" + req.body.subjectId + "'";

    connection.query(queryDeleteSubject, (error, results, field) => {
        if (error) 
        {
            res.status(404).json({
                deleted:false,
                error: error,
                message:'Could not delete subject'
            })
        }
        else
        {
            res.status(200).json({
                deleted:true,
                error: error,
                message:'Subject was deleted.'
            })
        }
    })

    let queryGetSubjectScoreBySubjectIdAndAssignment = "" + 
        "SELECT ss.Subject_ID, a.User_Email, m.Measure_ID " +
        "FROM assignments a JOIN measure m ON a.Measure_ID=m.Measure_ID LEFT JOIN subject_score ss " +
            "ON m.Measure_ID=ss.Measure_ID AND a.User_Email=ss.User_Email " +
        "WHERE a.Assignment_ID='" + req.body.assignmentId + "' AND ss.Subject_ID='" + req.body.subjectId + "'";

    connection.query(queryGetSubjectScoreBySubjectIdAndAssignment, (error, results, field) => {
        if(error)
        {
            console.log(error);
        }
        else if (results.length > 0)
        {
            let queryDeleteSubjectScores = "" +
                "DELETE FROM subject_score WHERE Subject_ID='" + results[0].Subject_ID + "' AND " +
                "User_Email='" + results[0].User_Email + "' AND Measure_ID='" + results[0].Measure_ID + "'";

            connection.query(queryDeleteSubjectScores, (error, results, field) => {
                if(error)
                {
                    console.log(error);
                }
            })
        }
    })
})

module.exports = router;