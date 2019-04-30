const express = require("express");
const router = express.Router();
const uuidv1 = require('uuid/v1');
const connection = require('../../models/User');
const format = require('string-format');

router.get('/getCurriculum/:cycleId', (req, res) => {
    let queryGetCurriculum = "" + 
        "SELECT Department_Code as departmentCode, Course_Code as courseCode, Credit_Hours as creditHours, " + 
            "Course_ID as courseId, Name as name " +
        "FROM curriculum " +
        "WHERE Cycle_Id='" + req.params.cycleId + "' " +
        "ORDER BY Department_Code ASC, Course_Code ASC";

    connection.query(queryGetCurriculum, (error, results, fields) => {
        if (error)
        {
            res.status(400).json({
                status: false,
                error: error,
                message: 'Could not retrieve curriculum for this cycle.'
            })
        }
        else
        {
            res.status(200).json({
                status: true,
                curriculum: Object.values(JSON.parse(JSON.stringify(results)))
            })
        }
    })
})

router.post('/editCurriculum', (req,res) => {
    let curriculum = req.body.curriculum;

    let curriculumValues = [];

    curriculum.forEach(c => {
        curriculumValues.push(
            format("('{courseId}', '{departmentCode}', {courseCode}, {creditHours}, '{name}', '" + req.body.cycleId + 
                    "')", c));
    })

    let joinedValues = curriculumValues.join();
    
    let queryCurriculum = "" + 
        "INSERT INTO curriculum (Course_ID, Department_Code, Course_Code, Credit_Hours, Name, Cycle_Id) VALUES " + 
            joinedValues + " ON DUPLICATE KEY UPDATE Department_Code=VALUES(Department_Code), " + 
            "Course_Code=VALUES(Course_Code), Credit_Hours=VALUES(Credit_Hours), Name=VALUES(Name)";

    connection.query(queryCurriculum, (error, results, fields) => {
        if (error)
        {
            res.status(400).json({
                status: false,
                error: error,
                message: 'Could not update or edit the courses.'
            })
        }
        else
        {
            res.status(200).json({
                status: true,
                message: 'The courses were updated.'
            })
        }
    })
})

router.post('/deleteCourses', (req, res) => {
    let deletedIds = req.body;
    let formattedIds = [];

    deletedIds.forEach(id => {
        formattedIds.push("'" + id + "'");
    })

    let queryDeleteCurriculumOutcomeMapping = "" +
        "DELETE FROM curriculum_outcome_mapping WHERE Course_ID IN (" + formattedIds.join() + ")";

    connection.query(queryDeleteCurriculumOutcomeMapping, (error, results, fields) => {
        if (error)
        {
            res.status(400).json({
                status: false,
                error: error,
                message: "The courses could not be deleted."
            })
        }
        else
        {
            deleteCurriculumCourses(req, res, formattedIds);
        }
    })

    function deleteCurriculumCourses(req, res, formattedIds)
    {
        let queryDeleteCurriculumCourses = "" + 
            "DELETE FROM curriculum WHERE Course_ID IN (" + formattedIds.join() + ")";

        connection.query(queryDeleteCurriculumCourses, (error, results, fields) => {
            if (error)
            {
                res.status(400).json({
                    status: false,
                    error: error,
                    message: "The courses could not be deleted."
                })
            }
            else
            {
                res.status(200).json({
                    status: true,
                    error: error,
                    message: "The courses were deleted."
                })
            }
        })
    }
})

router.post('/deleteOutcomeCurriculumMappings', (req, res) => {
    let deletedOutcomeCurriculumMappings = req.body;

    let deletedIds = [];

    deletedOutcomeCurriculumMappings.forEach(d => {
        deletedIds.push(format("('{outcomeId}', '{deletedCourseId}')", d));
    })

    let queryDeleteCurriculumMappings = "" + 
        "DELETE FROM curriculum_outcome_mapping WHERE (Outcome_ID, Course_ID) IN (" + 
        deletedIds.join() + ")";

    connection.query(queryDeleteCurriculumMappings, (error, results, fields) => {
        if (error)
        {
            console.log("curriculum/deleteOutcomeCurriculumMappings -- queryDeleteCurriculumMappings");
            console.log(error);
        }
    })
})

module.exports = router;