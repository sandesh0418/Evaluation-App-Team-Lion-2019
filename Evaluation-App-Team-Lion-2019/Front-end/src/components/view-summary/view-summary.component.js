import React, {Component} from 'react';
import './view-summary.css';
import AdminNavBar from "../nav-bar/nav-bar.component";
import EvalNavBar from "../nav-bar/navEvaluator";
//import axios from 'axios';

//Dummy data
var outcome1 = {
    description: "Outcome 1 ",
    measures: ["1.1 Measure 1", "1.2 Measure 2"]
};

var outcome2 = {
    description: "Outcome 2",
    measures: ["2.1 Measure 1", "2.2 Measure 2 Look see how."]
};

var outcome3 = {
    description: "Outcome 3",
    measures: ["3.1 Measure 1", "3.2 Measure 2", "3.3 Measure 3"]
};

var programSummary = { 
    title: "Assessment 2019",
    outcomes: [outcome1, outcome2, outcome3]
};


function measureDisplay(outcome)
{
    return outcome.measures.map(function(currentMeasure, i){
        return <p key={i}>{currentMeasure}</p>
    });
}

const Outcome = props => (
    <tr>
        <th scope="row">{props.outcome.description}</th>
        <td>{measureDisplay(props.outcome)}</td>
    </tr>
)

const ProgramSummaryBody = props =>
{
    return programSummary.outcomes.map(function(currentOutcome, i){
        return <Outcome outcome={currentOutcome} key={i} />;
    });
}

export default class ViewSummary extends Component 
{
    
    constructor(props){
        super(props);
        this.handleEditModeClick = this.handleEditModeClick.bind(this);
        this.state = {editMode: false};
    }

    handleEditModeClick()
    {
        this.setState({editMode: true});
    }

    render()
    {
        const editMode = this.state.editMode;
        let addOutcomeButton;

        if (editMode)
        {
            addOutcomeButton = <div><button type="button" className="btn btn-primary">Add Outcome</button></div>
        }

        return (
            <div>
                {sessionStorage.getItem("userType")==="Administrator" ? <AdminNavBar /> : null}
                {sessionStorage.getItem("userType")==="Evaluator" ? <EvalNavBar /> : null}
                <h1>{programSummary.title}</h1>
            
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="outcome-width">Learning Outcomes</th>
                            <th scope="col" className="measure-width">Measures of Performace</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ProgramSummaryBody />
                    </tbody>
                </table>
                {addOutcomeButton}
                <button type="button" className="btn btn-primary" onClick={this.handleEditModeClick}>Edit Program Summary</button>
            </div>
        );
    }
}