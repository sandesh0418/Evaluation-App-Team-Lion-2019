import React, {Component} from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import uuid from 'uuid/v1';
import AddRubricMeasurePopup from './addRubricMeasurePopup';

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
                    handleAddRubricMeasure={props.handleAddRubricMeasure}
                    handleAddTestMeasure={props.handleAddTestMeasure}
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
                <DropdownButton id="dropdown-basic-button" title="Add Measure">
                    <Dropdown.Item 
                        onSelect={props.handleAddTestMeasure}
                        eventKey={props.outcome.Outcome_ID}>
                        Add Test Measure
                    </Dropdown.Item>
                    <Dropdown.Item 
                        onSelect={props.handleAddRubricMeasure}
                        eventKey={props.outcome.Outcome_ID}>
                        Add Rubric Measure
                    </Dropdown.Item>
                </DropdownButton>
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
        this.handleAddRubricMeasure = this.handleAddRubricMeasure.bind(this);
        this.handleAddTestMeasure = this.handleAddTestMeasure.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.addNewRubricMeasure = this.addNewRubricMeasure.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            programSummary: dummySummary,
            rubrics: null,
            showAddRubricMeasurePopup: false,
            showAddTestMeasurePopup: false,
            outcomeOfNewMeasure: "hello"
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
        axios.get('http://localhost:5000/rubric/getList')
            .then(res => {
                this.setState({
                    rubrics: res.data.rubrics
                })
        })
    }

    handleAddOutcome()
    {
        let tempSummary = this.state.programSummary;
        let newId = uuid();
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
            programSummary: tempSummary,
        })
    }

    handleAddTestMeasure(e)
    {
        this.setState({
            showAddTestMeasurePopup: true
        })
    }

    handleAddRubricMeasure(e)
    {
        this.setState({
            showAddRubricMeasurePopup: true,
            outcomeOfNewMeasure: e
        })
    }

    closePopup(e)
    {
        this.setState({
            showAddRubricMeasurePopup: false,
            showAddTestMeasurePopup: false
        })
    }

    addNewRubricMeasure(e)
    {
        /*
        let newMeasure = {
            Description: e.target.description,
            Percent_to_reach_target: e.target.state.percentToReachTarget,
            Target_Score: e.target.state.targetScore
        }
        */
        console.log(e.description);
        let tempSummary = this.state.programSummary;


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
                handleAddRubricMeasure={this.handleAddRubricMeasure}
                handleAddTestMeasure={this.handleAddTestMeasure} 
            />
            <button className="btn btn-primary mb-4" onClick={this.handleAddOutcome}>Add Outcome</button>
            <div><button className="btn btn-danger mb-4" onClick={this.handleSave}>Save Changes</button></div>
            {this.state.showAddRubricMeasurePopup ? <AddRubricMeasurePopup 
                                                        closePopup={this.closePopup} 
                                                        submit={this.addNewRubricMeasure}
                                                        rubrics={this.state.rubrics}
                                                    /> : null}

            <p>{"The showRubricMeasure: " + this.state.showAddRubricMeasurePopup}</p>
            <p>{"The showTestMeasure: " + this.state.showAddTestMeasurePopup}</p>
            <p>{"The outcome of the new measure: " + this.state.outcomeOfNewMeasure}</p>
            </>
        )
    }
}

