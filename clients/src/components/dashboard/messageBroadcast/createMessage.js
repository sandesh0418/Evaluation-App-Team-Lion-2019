import React, {Component} from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';
import Loader from 'react-loader-spinner';

const textareaStyle = {
    textAlign: 'left',
}

function Evaluators(props)
{
    return props.evaluatorList.map((e, index) => {
        return <option value={e.email} key={index}>{e.firstName + " " + e.lastName}</option>
    })
}

export default class CreateMessage extends Component 
{
    constructor(props)
    {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRecipientSelected = this.handleRecipientSelected.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            evaluatorList: null,
            recipients: [],
            messageSubject: "",
            message: "",
        }
    }

    componentDidMount()
    {
        axios.get('/api/evaluators/memberList/' + localStorage.getItem("dept_Id") + "/" + localStorage.getItem("email"))
            .then(res => {
                this.setState({
                    evaluatorList: res.data.evaluatorList,
                })
            })
    }

    handleInputChange(e)
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRecipientSelected(e)
    {
        let tempRecipients = this.state.recipients;
        let recipIndex = tempRecipients.findIndex(r => r === e.target.value);
        
        if (recipIndex === -1)
        {
            tempRecipients.push(e.target.value);
        }
        else
        {
            tempRecipients.splice(recipIndex, 1);
        }

        this.setState({
            recipients: tempRecipients
        })
    }

    onSubmit(e)
    {
        e.preventDefault();

        let recipients;

        if (this.state.recipients.includes("all"))
        {
            recipients = this.state.evaluatorList.map(e => {
                return e.email;
            });
        }
        else
        {
            recipients = this.state.recipients
        }

        let d = new Date();
        d.setTime(d.getTime() - d.getTimezoneOffset()*60*1000);

        let newMessage = {
            senderEmail: localStorage.getItem("email"),
            dateTime: d,
            messageSubject: this.state.messageSubject,
            message: this.state.message,
            recipients: recipients
        }

        axios.post('/api/messageBroadcast/postMessage', newMessage)
            .then(res => {
                alert(res.data.message);
                window.location.reload();
            })
    }

    render()
    {
        if (this.state.evaluatorList === null)
        {
            return <Loader 
                type="Oval"
                color="black"
                height="100"	
                width="100"
            />
        }
        else if (this.state.evaluatorList.length === 0)
        {
            return <p>There is no one to send the message to. Add other users to the system.</p>
        }
        else
        {
            return(
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Select Recipients</label>
                        <select className="form-control" multiple required value={this.state.recipients}
                            onChange={this.handleRecipientSelected} name="recipients">
                            <option value="all">Entire Department</option>
                            <Evaluators evaluatorList={this.state.evaluatorList} />
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Message Subject</label>
                        <input type="text" name="messageSubject" onChange={this.handleInputChange} 
                            value={this.state.messageSubject} required />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea className="form-control" name="message" onChange={this.handleInputChange} value={this.state.message} 
                        rows="7" style={textareaStyle} required />
                    </div>
                    <div className="form-group">
                        <input className="btn btn-success" type="submit" value="Send Message" />
                    </div>
                </form>
            )
        }
    }
}