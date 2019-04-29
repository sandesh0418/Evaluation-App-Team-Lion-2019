import React, {Component} from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';
import Loader from 'react-loader-spinner';


function SentMessages(props)
{
    return props.messages.map(m => {
        return (
            <div key={m.dateTime} className="border rounded border-dark mb-3 p-2">
                <details>
                    <summary>Subject: {m.messageSubject}</summary>
                    <p>Date and time sent: {(new Date(m.dateTime)) + ""}</p>
                    {m.recipients ? 
                        <p>{"Recipients: " + m.recipients.join(", ")}</p> 
                        : <p>{"Sender: " + m.senderName}</p>}
                    <p>Message:</p>
                    <p>{m.message}</p>
                </details>
            </div>
        )
    })
}

function Recipients(props)
{
    return props.recipients.map(r => {
        return <span key={r.subjectName}>{r + ", "}</span>
    })
}

export default class DisplaySentMessages extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            messages: null,
            receivedMode: false
        }
    }

    componentDidMount()
    {
        if (window.location.pathname.includes('receivedMessages'))
        {
            axios.get('/api/messageBroadcast/getReceivedMessages/' + localStorage.getItem("email"))
            .then(res => {
                this.setState({
                    messages: res.data.messages,
                    receivedMode: true
                })
            })
        }
        else
        {
            axios.get('/api/messageBroadcast/getSentMessages/' + localStorage.getItem("email"))
            .then(res => {
                this.setState({
                    messages: res.data.messages
                })
            })
        }
    }

    render()
    {
        if (this.state.messages === null)
        {
            return <Loader 
                type="Oval"
                color="black"
                height="100"	
                width="100"
            />
        }
        else if (this.state.messages.length === 0)
        {
            return <p>There are no messages.</p>
        }
        else
        {
            return (
                <>
                    {this.state.receivedMode ? <h1>Received Messages</h1> : <h1>Sent Messages</h1>}
                    <SentMessages messages={this.state.messages} />
                </>
            )
        }
    }
}