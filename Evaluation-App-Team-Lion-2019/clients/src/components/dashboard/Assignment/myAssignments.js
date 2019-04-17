import React, {Component} from 'react';
import axios from "axios";


function ListDisplay(props)
{
    return props.assignments.map(a => {
        return (
            <div className="m-3 p-3 border rounded" key={a.assignmentId}>
                <div>{"Outcome: " + a.outcomeDescription}</div>
                <div>{"Measure: " + a.measureDescription}</div>
                <button 
                    type="button" 
                    className="btn btn-secondary mt-2" 
                    id={a.rubricTitle + "/" + a.assignmentId}
                    onClick={props.onClick}>
                    {"Evaluate " + a.toolName}
                </button>
            </div>
        )
    });
}

export default class RubricList extends Component 
{
    constructor(props)
    {
        super(props);
        this.handleEvaluateClick = this.handleEvaluateClick.bind(this);
        this.state = {
            assignments: []
        }
    }

    componentDidMount()
    {
        axios.get('/assignments/myAssignments/' + localStorage.getItem("email"))
            .then(res => {
                this.setState({
                    assignments: res.data.assignments
                })
            })
    }

    handleEvaluateClick(e)
    {
        if (e.target.id.includes('null'))
        {
            this.props.history.push("/evaluateTest/" + e.target.id);
        }
        else
        {
            this.props.history.push("/gradeRubric/" + e.target.id);
        }
    }

    render()
    {
        return(
            <div>
                <h1>My Assignments</h1>
                <ListDisplay assignments={this.state.assignments} onClick={this.handleEvaluateClick} />
            </div>
        );
    }
}