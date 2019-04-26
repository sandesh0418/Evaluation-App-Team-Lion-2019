import React, {Component} from 'react';
import axios from "axios";
import AddSubjects from './addSubjects';
import './myAssignments.css';
import Loader from 'react-loader-spinner';
import { isNullOrUndefined } from 'util';


function ListDisplay(props)
{
    let type = (props.finished ? "Complete" : "Incomplete");

    let list = props.assignments.map(a => {
        return (
            <div className="m-3 p-3 border rounded" key={a.assignmentId}>
                <p className="h5">{"Outcome name: " + a.outcomeName}</p>
                <div>{"Outcome description: " + a.outcomeDescription}</div>
                <p className="h5">{"Measure name: " + a.measureName}</p>
                {a.subjects[0] && a.subjects[0].subjectId !== null ? 
                    <>
                        <button 
                            type="button" 
                            className="btn btn-primary mt-2 mb-2" 
                            id={a.rubricId + "/" + a.assignmentId}
                            onClick={props.onClick}>
                            {"Evaluate " + a.toolName}
                        </button>
                        <details>
                            <summary>Subjects:</summary>
                            <table className="table table-bordered p-3">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Id</th> 
                                        <th>Graded?</th>
                                        <th>Remove Subject</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <SubjectList 
                                        assignmentId={a.assignmentId} 
                                        subjects={a.subjects}
                                        removeSubject={props.removeSubject} 
                                        type={type}
                                    />
                                </tbody>
                            </table>
                        </details>
                    </>
                : <p>There are no subjects in this assignments yet. Add subjects to evaluate.</p> }
                <AddSubjects assignmentId={a.assignmentId} />
            </div>
        )
    });

    let display;
    if(props.assignments.length > 0)
    {
        display = list
    }
    else
    {
        display = <p>There are no {id} assignments.</p>
    }

    let id = (props.finished ? "complete" : "incomplete");
        
    return (
        <div id={id}>
            <h2>{type + " Assignments"}</h2>
            {display}
        </div>
    )
}

function SubjectList(props)
{
    return props.subjects.map(s => {
        
        return (
            <tr key={s.subjectId}>
                <td className="p-2">{s.subjectName}</td>
                <td className="p-2">{s.subjectId}</td>
                <td className="p-2">{s.scores[0].score === null ? "No" : "Yes"}</td>
                <td className="p-2">
                    <button 
                        className="btn btn-sm btn-danger"
                        id={s.subjectId + "/" + props.type}
                        name={props.assignmentId}
                        onClick={props.removeSubject}>
                        X
                    </button>
                </td>
            </tr>
        )
    })
}

export default class RubricList extends Component 
{
    constructor(props)
    {
        super(props);
        this.handleEvaluateClick = this.handleEvaluateClick.bind(this);
        this.removeSubject = this.removeSubject.bind(this);
        this.state = {
            assignments: null
        }
    }

    componentDidMount()
    {
        axios.get('/assignments/myAssignments/' + localStorage.getItem("email") + "/" + localStorage.getItem("Cycle_Id"))
            .then(res => {
                this.setState({
                    assignments: res.data.assignments
                })
                console.log(res.data.assignments);
            })
    }

    removeSubject(e)
    {
        let subjectId_type = e.target.id.split("/");
        let assignmentId = e.target.name;
        let tempAssignments = this.state.assignments;
        let assignmentIndex;
        let subjectIndex;

        if (subjectId_type[1] === "Complete")
        {
            assignmentIndex = tempAssignments.complete.findIndex(a => a.assignmentId === assignmentId);
            subjectIndex = tempAssignments.complete[assignmentIndex].subjects.
                findIndex(s => s.subjectId === subjectId_type[0]);
            tempAssignments.complete[assignmentIndex].subjects.splice(subjectIndex, 1);
            if (tempAssignments.complete[assignmentIndex].subjects.length < 1)
            {
                tempAssignments.incomplete.push(tempAssignments.complete[assignmentIndex]);
                tempAssignments.complete.splice(assignmentIndex, 1);
            }
        }
        else
        {
            assignmentIndex = tempAssignments.incompelete.findIndex(a => a.assignmentId === assignmentId);
            subjectIndex = tempAssignments.incomplete[assignmentIndex].subjects.
                findIndex(s => s.subjectId === subjectId_type[0]);
            tempAssignments.incomplete[assignmentIndex].subjects.splice(subjectIndex, 1);
        }

        this.setState({
            assignments: tempAssignments
        })

        let data = {
            subjectId: subjectId_type[0],
            assignmentId: assignmentId
        }

        axios.post('/assignments/deleteSubject', data)
            .then(res => {
                if (!res.data.deleted)
                {
                    alert("Subject not deleted.");
                }
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
        if (this.state.assignments === null)
        {
            return <Loader 
                type="Oval"
                color="black"
                height="100"	
                width="100"
            />
        }
        else
        {
            return(
                <div>
                    <h1>My Assignments</h1>
                    <div className="row">
                        {this.state.assignments !== [] ? 
                            <>
                                {/* show incomplete assignments */}
                                <div className="col-sm-6">
                                <ListDisplay
                                    finished={false} 
                                    assignments={this.state.assignments.incomplete} 
                                    onClick={this.handleEvaluateClick}
                                    removeSubject={this.removeSubject} 
                                />
                                </div>
                                {/* show complete assignments */}
                                <div className="col-sm-6">
                                <ListDisplay
                                    finished={true} 
                                    assignments={this.state.assignments.complete} 
                                    onClick={this.handleEvaluateClick}
                                    removeSubject={this.removeSubject} 
                                /> </div>
                            </>
                            : <p>You have no assignments.</p>
                        }
                     </div>
                </div>
            );
        }
    }
}