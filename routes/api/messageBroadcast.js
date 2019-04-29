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
            insertMessageRecipients(req, res, message);
        }
    })

    function insertMessageRecipients(req, res, message)
    {
        let values = message.recipients.map(r => {
            return format("('{senderEmail}', '{dateTime}', ", message) + format("'{}')", r);
        })

        let queryInsertMessageRecipients = "INSERT INTO message_recipients (Sender_Email, Date_Time, Recipient_Email) " + 
            "VALUES " + values.join();

        connection.query(queryInsertMessageRecipients, (error, results, fields) => {
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
                res.status(200).json({
                    status: true,
                    message: "The message was posted."
                })
            }
        })
    }
})

router.get('/getSentMessages/:email', (req, res) => {

    //Get senderEmail, dateTime, messageSubject, message, recipientEmail, firstName, lastName
    let queryGetSentMessage = "" +
        "SELECT m.Sender_Email as senderEmail, m.Date_Time as dateTime, m.Message_Subject as messageSubject, " +
            "m.Message as message, mr.Recipient_Email as recipientEmail, CONCAT(u.firstName, ' ', u.lastName) as " + 
            "senderName, CONCAT(ur.firstName, ' ', ur.lastName) as recipientName " +
        "FROM messages m JOIN message_recipients mr ON m.Sender_Email=mr.Sender_Email AND m.Date_Time=mr.Date_Time " +
            "JOIN users u ON m.Sender_Email=u.email JOIN users ur ON ur.email=mr.Recipient_Email " +
        "WHERE m.sender_Email='" + req.params.email + "' " +
        "ORDER BY m.Date_Time DESC";

    connection.query(queryGetSentMessage, (error, results, fields) => {
        if (error)
        {
            res.status(400).json({
                status: false,
                error: error,
                message: "Sent messages could not be retrieved."
            })
        }
        else
        {
            let messages = [];

            results.forEach(r => {
                messageIndex = messages.findIndex(m => (m.dateTime + "") === (r.dateTime + ""));

                if (messageIndex === -1)
                {
                    let newMessage = {
                        dateTime: r.dateTime,
                        messageSubject: r.messageSubject,
                        message: r.message,
                        recipients: [r.recipientName]
                    }

                    messages.push(newMessage);
                }
                else
                {
                    messages[messageIndex].recipients.push(r.recipientName);
                }
            })

            res.status(200).json({
                status: true,
                message: "Sent messages were retrieved.",
                messages: messages
            })
        }
    })
})

router.get('/getReceivedMessages/:email', (req, res) => {

    //senderEmail, dateTime, messageSubject, message, senderName
    let queryGetReceivedMessages = "" +
        "SELECT m.Sender_Email as senderEmail, m.Date_Time as dateTime, m.Message_Subject as messageSubject, " +
            "m.Message as message, CONCAT(u.firstName, ' ', u.lastName) as senderName " +
        "FROM messages m JOIN message_recipients mr ON m.Sender_Email=mr.Sender_Email AND m.Date_Time=mr.Date_Time " +
            "JOIN users u ON m.Sender_Email=u.email JOIN users ur ON ur.email=mr.Recipient_Email " +
        "WHERE mr.Recipient_Email='" + req.params.email + "' " +
        "ORDER BY m.Date_Time DESC";

    connection.query(queryGetReceivedMessages, (error, results, fields) => {
        if (error)
        {
            res.status(400).json({
                status: false,
                error: error,
                message: "Sent messages could not be retrieved."
            })
        }
        else
        {
            res.status(200).json({
                status: true,
                message: "Sent messages were retrieved.",
                messages: Object.values(JSON.parse(JSON.stringify(results)))
            })
        }
    })
})

module.exports = router;