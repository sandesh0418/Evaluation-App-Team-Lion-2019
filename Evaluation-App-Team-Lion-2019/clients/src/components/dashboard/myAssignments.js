import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


function ListDisplay(props)
{
    return props.assignments.map(a => {
        return (
            <div className="m-3 p-3 border rounded" key={a.assignmentId}>
                <div>{"Outcome: " + a.outcomeDescription}</div>
                <div>{"Measure: " + a.measureDescription}</div>
                <Link>Evaluate</Link>
            </div>
        )
    });
}

export default class RubricList extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            assignments: []
        }
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/assignments/myAssignments/' + localStorage.getItem("email"))
            .then(res => {
                this.setState({
                    assignments: res.data.assignments
                })
            })
    }

    render()
    {
        return(
            <div>
                <h1>My Assignments</h1>
                <ListDisplay assignments={this.state.assignments} />
            </div>
        );
    }
}