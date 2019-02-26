import React, {Component} from 'react';
import './view-summary.css';
import PickNavBar from "../nav-bar/pick-nav-bar";
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

const ProgramSummaryBody = props =>
{
    return programSummary.outcomes.map(function(currentOutcome, i){
        return <Outcome outcome={currentOutcome} reportMode={props.reportMode} key={i} />;
    });
}

const Outcome = props => (
    <tr>
        <th scope="row">{props.outcome.description}</th>
        <td><Measures outcome={props.outcome} reportMode={props.reportMode}  /></td>
    </tr>
)

function Measures(props)
{
    return props.outcome.measures.map(function(currentMeasure, i){
        return (
            <div>
                <p key={i}>{currentMeasure}</p>
                {props.reportMode ? <Statistics /> : null}
            </div>
        )
    });
}

function Statistics(props)
{
    return <p>Measure statistics.</p>
}

export default class ViewSummary extends Component 
{
    
    constructor(props){
        super(props);
        this.handleEditModeClick = this.handleEditModeClick.bind(this);
        this.state = {editMode: false,
                      reportMode: false};
    }

    componentDidMount()
    {
        this.setView();
    }

    setView()
    {
        if (window.location.pathname==="/summary-report")
        {
            this.setState({
                editMode: false,
                reportMode: true
            })
        }
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
                <PickNavBar />
                <h1>{programSummary.title}</h1>
            
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="outcome-width">Learning Outcomes</th>
                            <th scope="col" className="measure-width">Measures of Performace</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ProgramSummaryBody reportMode={this.state.reportMode} />
                    </tbody>
                </table>
                {addOutcomeButton}
                <button type="button" className="btn btn-primary" onClick={this.handleEditModeClick}>Edit Program Summary</button>
            </div>
        );
    }
}