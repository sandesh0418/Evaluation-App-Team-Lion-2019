import React, {Component} from 'react';
import './view-summary.css';
import PickNavBar from "../nav-bar/pick-nav-bar";
import axios from 'axios';

/*
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
*/

var outcome1 = {
    description: "Communicate effectively in a variety of professional contexts.",
    measures: ["75% or more of students evaluated on oral presentation skills will have an average BUSN 3005 rubric score of 3 or better."]
};

var programSummary = {
    title: "Assessment 2019",
    outcomes: [outcome1]
};

const ProgramSummaryBody = props =>
{
    return programSummary.outcomes.map(function(currentOutcome, i){
        return <Outcome outcome={currentOutcome} reportMode={props.reportMode} state={props.state} key={i} />;
    });
}

const Outcome = props => (
    <tr>
        <th scope="row">{props.outcome.description}</th>
        <td><Measures outcome={props.outcome} reportMode={props.reportMode} state={props.state}  /></td>
    </tr>
)

function Measures(props)
{
    return props.outcome.measures.map(function(currentMeasure, i){
        return (
            <div>
                <p key={i}>{currentMeasure}</p>
                {props.reportMode ? <Statistics state={props.state} /> : null}
            </div>
        )
    });
}

function Statistics(props)
{
    return <p>
            Measure statistics: {((props.state.metTarget /props.state.total) * 100).toFixed(2)}% of 
            evaluations have met the target score. {props.state.total} subjects have been evaluated.
            </p>
}

export default class ViewSummary extends Component 
{
    
    constructor(props){
        super(props);
        this.handleEditModeClick = this.handleEditModeClick.bind(this);
        this.setView = this.setView.bind(this);
        this.state = {
            editMode: false,
            reportMode: false,
            total: 0,
            metTarget: 0
        };
    }

    componentDidMount()
    {
        this.setView();
    }

    setView()
    {
        if (window.location.pathname==="/summary-report")
        {
            this.getStatistics();
            this.setState({
                reportMode: true
            });
        }
    }

    getStatistics()
    {
        axios.get('http://localhost:8000/measureStatistics')
            .then(res => {
                console.log(res.data);
                this.setState({
                    total: res.data.total,
                    metTarget: res.data.metTarget
                })
            })
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
                        <ProgramSummaryBody reportMode={this.state.reportMode} state={this.state} />
                    </tbody>
                </table>
                {addOutcomeButton}
                <button type="button" className="btn btn-primary" onClick={this.handleEditModeClick}>Edit Program Summary</button>
            </div>
        );
    }
}