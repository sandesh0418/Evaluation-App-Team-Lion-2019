const express = require("express");
const router = express.Router();
const uuidv1 = require('uuid/v1');
const connection = require('../../models/User');
const format = require('string-format');

/* router.get('/getMessages', (req, res) => {

}) */

router.post('/postMessage', (req, res) => {

    let message = req.body;
    console.log(message);

    let values = format("('{senderEmail}', '{dateTime}', '{messageSubject}', '{message}')", message)

    let queryInsertMessage = "INSERT INTO messages (Sender_Email, Date_Time, Message_Subject, Message) VALUES" + values;

    connection.query(queryInsertMessage, (error, results, fields) => {
        if (error)
        {
            res.status(400).json({
                status: false,
                error: error,
                message: "The message could not be posted."
            })
        }
        else
        {
            /* res.status(200).json({
                status: true,
                message: "The message was posted."
            }) */
            insertMessageRecipients(req, res, message);
        }
    })
})

module.exports = router;