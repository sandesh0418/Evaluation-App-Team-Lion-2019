import React, {Component} from 'react';
import axios from 'axios';

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

const Outcome = props => {
    return (
        <div className="row">
            <div className="col border p-3">
                <textarea className="form-control" rows="7" value={props.outcome.Description} />
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
                console.log(res.data);
                this.setState({
                    programSummary: res.data.programSummary
                })
            })
    }

    handleAddOutcome()
    {
        let tempSummary = this.state.programSummary;
        tempSummary.outcomes.push({
            Description: "Enter outcome description.",
            measures: []
        })

        this.setState({
            programSummary: tempSummary
        })
    }

    handleOutcomeChange(e)
    {
        let value = e.target.value
        this.setState({

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
            {
                this.state.programSummary.outcomes.map(function(currentOutcome) {
                    return <Outcome key={currentOutcome.Outcome_ID} outcome={currentOutcome}  />
                })
            }
            <button className="btn btn-primary mb-4" onClick={this.handleAddOutcome}>Add Outcome</button>
            <div><button className="btn btn-danger" onClick={this.handleSave}>Save Changes</button></div>
            
            </>
        )
    }
}

