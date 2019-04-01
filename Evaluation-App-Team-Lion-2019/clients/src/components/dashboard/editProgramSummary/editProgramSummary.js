import React, {Component} from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import uuid from 'uuid/v1';
import AddRubricMeasurePopup from './addRubricMeasurePopup';
import AddTestMeasurePopup from './addTestMeasurePopup';

var dummyMeasure = {
    Measure_ID: '',
    Description: '',
    Percent_to_reach_target: 0,
    Target_Score: 0
}

var dummyOutcome = {
    Outcome_ID: 0,
    Description: '',
    measures: [dummyMeasure]
}

var dummySummary = {
    title: "",
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
        this.handleInputChange = this.handleInputChange.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.addNewMeasure = this.addNewMeasure.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            programSummary: dummySummary,
            rubrics: null,
            showAddRubricMeasurePopup: false,
            showAddTestMeasurePopup: false,
            outcomeIdOfNewMeasure: "hello",
            //The following values are passed to and manipulated in the addRubricMeasurePopup.
            rubric: null,
            //The following values are passed to both the addRubricMeasure and addTestMeasurePopups
            description: "Enter measure description.  This will displayed in Program Assessment Summary.",
            targetScore: 0,
            percentToReachTarget: 0
        }
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/summaryReport/getSummary')
            .then(res => {
                this.setState({
                    programSummary: res.data.programSummary
                })
                console.log(res.data.programSummary);
        })
        axios.get('http://localhost:5000/rubric/getList')
            .then(res => {
                if(res.data.status)
                {
                    this.setState({
                        rubrics: res.data.rubrics,
                        rubric: res.data.rubrics[0].Rubric_Title
                    })
                }
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

    handleInputChange(e)
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleAddTestMeasure(e)
    {
        this.setState({
            showAddTestMeasurePopup: true,
            outcomeIdOfNewMeasure: e
        })
    }

    handleAddRubricMeasure(e)
    {
        this.setState({
            showAddRubricMeasurePopup: true,
            outcomeIdOfNewMeasure: e
        })
    }

    closePopup(e)
    {
        this.setState({
            showAddRubricMeasurePopup: false,
            showAddTestMeasurePopup: false
        })
    }

    addNewMeasure(e)
    {
        let newId = uuid();
        let tool_name = '';
        if (e.target.name == "rubricMeasure")
        {
            tool_name = this.state.rubric;
        }
        else
        {
            tool_name = "Test"
        }

        let newMeasure = {
            Measure_ID: newId,
            Description: this.state.description,
            Percent_to_reach_target: this.state.percentToReachTarget,
            Target_Score: this.state.targetScore,
            Tool_Name: tool_name
        }
        let index = this.state.programSummary.outcomes.findIndex(o => o.Outcome_ID === this.state.outcomeIdOfNewMeasure);
        let tempSummary = this.state.programSummary;
        tempSummary.outcomes[index].measures.push(newMeasure);
        this.setState({
            programSummary: tempSummary,
            showAddRubricMeasurePopup: false,
            showAddTestMeasurePopup: false,
            rubric: this.state.rubrics[0].Rubric_Title,
            description: "Enter measure description.  This will displayed in Program Assessment Summary.",
            targetScore: 0,
            percentToReachTarget: 0
        })
    }

    handleSave()
    {
        axios.post('http://localhost:5000/editProgramSummary/editProgramSummary', this.state.programSummary)
            .then(res => {
                this.props.history.push("/viewSummary");
            })
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
                                                        submit={this.addNewMeasure}
                                                        rubrics={this.state.rubrics}
                                                        handleInputChange={this.handleInputChange}
                                                        rubric={this.state.rubric}
                                                        description={this.state.description}
                                                        targetScore={this.state.targetScore}
                                                        percentToReachTarget={this.state.percentToReachTarget}
                                                    /> : null}
            {this.state.showAddTestMeasurePopup ? <AddTestMeasurePopup
                                                        closePopup={this.closePopup}
                                                        submit={this.addNewMeasure}
                                                        handleInputChange={this.handleInputChange}
                                                        description={this.state.description}
                                                        targetScore={this.state.targetScore}
                                                        percentToReachTarget={this.state.percentToReachTarget}
                                                    /> : null}
            </>
        )
    }
}

