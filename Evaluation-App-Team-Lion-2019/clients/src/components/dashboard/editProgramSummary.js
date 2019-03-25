import React, {Component} from 'react';
import axios from 'axios';
import uuid from 'uuid/v1';

var dummyMeasure = {
    Description: '',
    Percent_to_reach_target: 0,
    Target_Score: 0
}

var dummyOutcome = {
    Outcome_ID: 3,
    Description: 'outcome 3',
    measures: [dummyMeasure]
}

var dummySummary = {
    title: "Assessment 2019",
    outcomes: [dummyOutcome]
};

const OutcomeList = props => {
    return props.outcomes.map(function(currentOutcome) {
        return <Outcome 
                    key={currentOutcome.Outcome_ID} 
                    outcome={currentOutcome} 
                    handleOutcomeChange={props.handleOutcomeChange}  
                />
    })
}

const Outcome = props => {
    return (
        <div className="row">
            <div className="col border p-3">
                <textarea 
                    className="form-control" 
                    rows="7"
                    id={props.outcome.Outcome_ID} 
                    value={props.outcome.Description} 
                    onChange={props.handleOutcomeChange} 
                />
            </div>
            <div className="col-8 border p-3">
                <Measures measures={props.outcome.measures} />
                <button className="btn btn-primary">Add Measure</button>
            </div>
        </div>
    )
}

const Measures = props => {
    return props.measures.map(measure => {
        return <p key={measure.Description}>{measure.Description}</p>
    })
}

export default class EditProgramSummary extends Component
{

    constructor(props)
    {
        super(props);
        this.handleAddOutcome = this.handleAddOutcome.bind(this);
        this.handleOutcomeChange = this.handleOutcomeChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            programSummary: dummySummary
        }
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/summaryReport/getSummary')
            .then(res => {
                this.setState({
                    programSummary: res.data.programSummary
                })
            })
    }

    handleAddOutcome()
    {
        let tempSummary = this.state.programSummary;
        let newId = uuid();
        console.log(newId);
        tempSummary.outcomes.push({
            Outcome_ID: newId,
            Description: "Enter outcome description.",
            measures: []
        })

        this.setState({
            programSummary: tempSummary
        })
    }

    handleOutcomeChange(e)
    {
        let newDescription = e.target.value;
        let id = e.target.id;
        let index = this.state.programSummary.outcomes.findIndex(o => o.Outcome_ID === id);
        let tempSummary = this.state.programSummary;
        tempSummary.outcomes[index].Description = newDescription;

        this.setState({
            programSummary: tempSummary
        })
    }

    handleSave()
    {
        //stuff
    }

    render()
    {
        return (
            <>
            <h1>Edit Program Summary</h1>
            <OutcomeList 
                outcomes={this.state.programSummary.outcomes} 
                handleOutcomeChange={this.handleOutcomeChange} 
            />
            <button className="btn btn-primary mb-4" onClick={this.handleAddOutcome}>Add Outcome</button>
            <div><button className="btn btn-danger mb-4" onClick={this.handleSave}>Save Changes</button></div>
            
            </>
        )
    }
}

