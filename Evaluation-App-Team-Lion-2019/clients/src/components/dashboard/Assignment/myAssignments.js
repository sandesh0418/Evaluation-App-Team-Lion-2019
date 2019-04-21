import React, {Component} from 'react';
import axios from "axios";


function ListDisplay(props)
{
    return props.assignments.map(a => {
        return (
            <div className="m-3 p-3 border rounded" key={a.assignmentId}>
                <p className="h5">{"Outcome name: " + a.outcomeName}</p>
                <div>{"Outcome description: " + a.outcomeDescription}</div>
                <div>{"Measure: " + a.measureDescription}</div>
                <button 
                    type="button" 
                    className="btn btn-secondary mt-2" 
                    id={a.rubricId + "/" + a.assignmentId}
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
        axios.get('/assignments/myAssignments/' + localStorage.getItem("email") + "/" + localStorage.getItem("Cycle_Id"))
            .then(res => {
                this.setState({
                    assignments: res.data.assignments
                })

                console.log(this.state.assignments);
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
                {this.state.assingments !== [] ? 
                    <ListDisplay assignments={this.state.assignments} onClick={this.handleEvaluateClick} /> 
                    : <p>You have no assignments.</p>
                }
            </div>
        );
    }
}