import React, {Component} from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import uuid from 'uuid/v1';
import AddRubricMeasurePopup from './addRubricMeasurePopup';
import AddTestMeasurePopup from './addTestMeasurePopup';
import Loader from 'react-loader-spinner';
import OutcomeCurriculum from './curriculumMapping';

const OutcomeList = props => {

    if(props.outcomes){
        return props.outcomes.map(function(currentOutcome) {
            return <Outcome 
                        key={currentOutcome.Outcome_ID} 
                        outcome={currentOutcome} 
                        handleOutcomeChange={props.handleOutcomeChange}
                        handleDeleteOutcome={props.handleDeleteOutcome}
                        handleOutcomeNameChange={props.handleOutcomeNameChange}
                        handleAddRubricMeasure={props.handleAddRubricMeasure}
                        handleAddTestMeasure={props.handleAddTestMeasure}
                        handleDeleteMeasure={props.handleDeleteMeasure}
                        curriculumList={props.curriculumList}
                        changeCurriculum={props.changeCurriculum}
                    />
        })
    }
    else{
        return null;
    }
}

const Outcome = props => {
    return (
        <div className="row">
            <div className="col border p-3">
                <input 
                    className="form-control"
                    type="text" 
                    name={props.outcome.Outcome_ID}
                    value={props.outcome.Outcome_Name} 
                    onChange={props.handleOutcomeNameChange}
                />
                <textarea 
                    className="form-control mb-3" 
                    rows="7"
                    name={props.outcome.Outcome_ID} 
                    value={props.outcome.Description} 
                    onChange={props.handleOutcomeChange} 
                />
                <button 
                    className="btn btn-danger"
                    id={props.outcome.Outcome_ID}
                    onClick={props.handleDeleteOutcome}>
                    Delete Outcome
                </button>
            </div>
            <div className="col-8 border p-3">
                {props.outcome.measures[0] ? 
                    <Measures 
                        measures={props.outcome.measures} 
                        outcomeId={props.outcome.Outcome_ID}
                        handleDeleteMeasure={props.handleDeleteMeasure} /> 
                    : null}
                <DropdownButton id="dropdown-basic-button" className="mb-3" title="Add Measure">
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
                <details>
                    <summary>Outcome's Curriculum Elements</summary>
                    <OutcomeCurriculum 
                        courses={props.outcome.courses} 
                        outcomeId={props.outcome.Outcome_ID}
                        curriculumList={props.curriculumList}
                        changeCurriculum={props.changeCurriculum} />
                </details>
            </div>
        </div>
    )
}

const Measures = props => {
    return props.measures.map(measure => {
        return (
            <div key={measure.Measure_ID}>
                <p>
                    <button 
                        className="btn btn-sm btn-danger mr-2"
                        name={props.outcomeId}
                        id={measure.Measure_ID}
                        onClick={props.handleDeleteMeasure}
                        title="delete measure">
                    X
                    </button>
                    <span className="bold mr-3"><strong>{measure.Measure_Name}</strong></span>
                    {"At least " + (measure.Percent_to_reach_target * 100) + "% of subjects score " + 
                    (measure.Value_Name ? "'" + measure.Value_Name + "'" : 
                    (measure.Target_Score * 100) + "%") +" or higher on " + measure.Tool_Name + "."}
                 </p>
                {measure.Description ? 
                    <details className="ml-3 mb-3">
                        <summary>Additional description: </summary>
                        <p className="ml-3">{measure.Description}</p>
                    </details> 
                    : null}
            </div>
        )
    })
}

export default class EditProgramSummary extends Component
{
    constructor(props)
    {
        super(props);
        this.handleAddRubricMeasure = this.handleAddRubricMeasure.bind(this);
        this.handleAddTestMeasure = this.handleAddTestMeasure.bind(this);
        this.handleOutcomeChange = this.handleOutcomeChange.bind(this);
        this.handleOutcomeNameChange = this.handleOutcomeNameChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddOutcome = this.handleAddOutcome.bind(this);
        this.addNewMeasure = this.addNewMeasure.bind(this);  
        this.handleDeleteMeasure = this.handleDeleteMeasure.bind(this);
        this.handleDeleteOutcome = this.handleDeleteOutcome.bind(this);
        this.changeCurriculum = this.changeCurriculum.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            programSummary: null,
            curriculum: null,
            showAddRubricMeasurePopup: false,
            showAddTestMeasurePopup: false,
            outcomeIdOfNewMeasure: "hello",
            deletedOutcomeIds: [],
            deletedMeasureIds: [],
            deletedCourseMappings: [],
            //The following values are passed to and manipulated in the addRubricMeasurePopups.
            rubrics: null,
            toolName: null,
            measureName: 'Measure #',
            //The following values are passed to both the addRubricMeasure and addTestMeasurePopups
            description: null,
            targetScore: 0,
            percentToReachTarget: 0
        }
    }

    componentDidMount()
    {
        axios.get('/api/summaryReport/getSummary/' + localStorage.getItem("Cycle_Id"))
            .then(res => {
                this.setState({
                    programSummary: res.data.programSummary
                })
        })
        axios.get('/api/rubric/getListWithScale/' + localStorage.getItem("Cycle_Id"))
            .then(res => {
                if(res.data.status)
                {
                    this.setState({
                        rubrics: res.data.rubrics,
                        toolName: (res.data.rubrics[0].Rubric_Title ? res.data.rubrics[0].Rubric_Title : null)
                    })
                }
        })
        axios.get('/api/curriculum/getCurriculum/' + localStorage.getItem("Cycle_Id"))
            .then(res => {
                console.log(res.data.curriculum);
                this.setState({
                    curriculum: res.data.curriculum
                })
            })
    }

    handleAddOutcome()
    {
        let tempSummary = this.state.programSummary;
        let newId = uuid();
        tempSummary.outcomes.push({
            Outcome_ID: newId,
            Outcome_Name: "Outcome #",
            Description: "Enter outcome description.",
            measures: []
        })

        this.setState({
            programSummary: tempSummary
        })
    }

    handleDeleteOutcome(e)
    {
        let tempSummary = this.state.programSummary
        let outcomeIndex = tempSummary.outcomes.findIndex(o => o.Outcome_ID === e.target.id);
        tempSummary.outcomes.splice(outcomeIndex, 1);

        let tempDeletedOutcomeIds = this.state.deletedOutcomeIds;
        tempDeletedOutcomeIds.push(e.target.id);

        this.setState({
            programSummary: tempSummary,
            deletedOutcomeIds: tempDeletedOutcomeIds
        })
    }

    handleOutcomeChange(e)
    {
        let newDescription = e.target.value;
        let id = e.target.name;
        let index = this.state.programSummary.outcomes.findIndex(o => o.Outcome_ID === id);
        let tempSummary = this.state.programSummary;
        tempSummary.outcomes[index].Description = newDescription;

        this.setState({
            programSummary: tempSummary
        })
    }

    handleOutcomeNameChange(e)
    {
        let index = this.state.programSummary.outcomes.findIndex(o => o.Outcome_ID === e.target.name);
        let tempSummary = this.state.programSummary;
        tempSummary.outcomes[index].Outcome_Name = e.target.value;

        this.setState({
            programSummary: tempSummary
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
            targetScore: 0,
            toolName: "Test",
            outcomeIdOfNewMeasure: e
        })
    }

    handleAddRubricMeasure(e)
    {
        if (this.state.rubrics)
        {
            this.setState({
                showAddRubricMeasurePopup: true,
                outcomeIdOfNewMeasure: e,
                targetScore: this.state.rubrics[0].scale[0].Value_Number,
                toolName: this.state.rubrics[0].Rubric_Title
            })
        }
        else
        {
            alert("There are no rubrics associated with the current cycle. \n\nMigrate or create rubrics before making " +
            "rubric measures.");
        }
    }

    handleDeleteMeasure(e)
    {
        let tempSummary = this.state.programSummary;
        let outcomeIndex = tempSummary.outcomes.findIndex(o => o.Outcome_ID === e.target.name);
        let measureIndex = tempSummary.outcomes[outcomeIndex].measures.findIndex(m => m.Measure_ID === e.target.id);
        tempSummary.outcomes[outcomeIndex].measures.splice(measureIndex, 1);

        let tempDeletedMeasureIds = this.state.deletedMeasureIds;
        tempDeletedMeasureIds.push(e.target.id);

        this.setState({
            programSummary: tempSummary,
            deletedMeasureIds: tempDeletedMeasureIds
        })
    }

    changeCurriculum(newCourses, deletedIds, outcomeId)
    {
        let tempSummary = this.state.programSummary;
        let outcomeIndex = tempSummary.outcomes.findIndex(o => o.Outcome_ID === outcomeId);
        tempSummary.outcomes[outcomeIndex].courses = newCourses;

        let tempDeletedCourseMappings = this.state.deletedCourseMappings;
        deletedIds.forEach(d => {
            tempDeletedCourseMappings.push({
                outcomeId: outcomeId,
                deletedCourseId: d
            })
        })

        console.log(tempDeletedCourseMappings);

        this.setState({
            programSummary: tempSummary,
            deletedCourseMappings: tempDeletedCourseMappings
        })
    }

    closePopup(e)
    {
        this.setState({
            showAddRubricMeasurePopup: false,
            showAddTestMeasurePopup: false,
            targetScore: 0,
            toolName: "",
        })
    }

    addNewMeasure(e)
    {
        let newId = uuid();

        let rubricIndex = this.state.rubrics.findIndex(r => r.Rubric_Title === this.state.toolName);
        let valueName = null;
        let targetScore = this.state.targetScore;

        if (rubricIndex > -1)
        {
            valueName = this.state.rubrics[rubricIndex].scale[this.state.targetScore - 1].Value_Name;
        }
        else
        {
            targetScore = targetScore / 100;
        }

        let newMeasure = {
            Measure_ID: newId,
            Measure_Name: this.state.measureName,
            Description: (this.state.description ? this.state.description : null),
            Percent_to_reach_target: (this.state.percentToReachTarget / 100),
            Value_Name: valueName,
            Target_Score: targetScore,
            Tool_Name: this.state.toolName
        }

        let index = this.state.programSummary.outcomes.findIndex(o => o.Outcome_ID === this.state.outcomeIdOfNewMeasure);
        let tempSummary = this.state.programSummary;
        tempSummary.outcomes[index].measures.push(newMeasure);
        this.setState({
            programSummary: tempSummary,
            showAddRubricMeasurePopup: false,
            showAddTestMeasurePopup: false,
            measureName: 'Measure #',
            toolName: "",
            description: null,
            targetScore: 0,
            percentToReachTarget: 0
        })
    }
    
    handleSave()
    {
        axios.post('/api/editProgramSummary/editProgramSummary', this.state.programSummary)
            .then(res => {
                window.location.replace("/viewSummary");
            })

        if (this.state.deletedOutcomeIds.length > 0)
        {
            axios.post('/api/editProgramSummary/deleteOutcomes', this.state.deletedOutcomeIds)
                .then(res => {})
        }

        if (this.state.deletedMeasureIds.length > 0)
        {
            axios.post('/api/editProgramSummary/deleteMeasures', this.state.deletedMeasureIds)
                .then(res => {})
        }

        if (this.state.deletedCourseMappings.length > 0)
        {
            axios.post('/api/curriculum/deleteOutcomeCurriculumMappings', this.state.deletedCourseMappings)
        }
    }

    render()
    {
        if (this.state.programSummary === null || this.state.curriculum === null || this.state.rubrics === null)
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
            var outcomes = '';
        
            if(this.state.programSummary){
                outcomes=this.state.programSummary.outcomes 
            }

            let curriculumList = this.state.curriculum.map(c => {
                return <option value={c.courseId}>{c.departmentCode + " " + c.courseCode + " " + c.name}</option>
            })
        
            return (
                <>
                <h1>Edit Program Summary</h1>
                <OutcomeList 
                    outcomes={outcomes}
                    handleOutcomeNameChange={this.handleOutcomeNameChange}
                    handleDeleteOutcome={this.handleDeleteOutcome}
                    handleOutcomeChange={this.handleOutcomeChange}
                    handleAddRubricMeasure={this.handleAddRubricMeasure}
                    handleAddTestMeasure={this.handleAddTestMeasure}
                    handleDeleteMeasure={this.handleDeleteMeasure}
                    curriculumList={this.state.curriculum}
                    changeCurriculum={this.changeCurriculum}
                />
                <button className="btn btn-primary mb-4" onClick={this.handleAddOutcome}>Add Outcome</button>
                <div><button className="btn btn-success mb-4" onClick={this.handleSave}>Save Changes</button></div>
                {this.state.showAddRubricMeasurePopup ? <AddRubricMeasurePopup 
                                                            closePopup={this.closePopup} 
                                                            submit={this.addNewMeasure}
                                                            rubrics={this.state.rubrics}
                                                            handleInputChange={this.handleInputChange}
                                                            rubric={this.state.toolName}
                                                            measureName={this.state.measureName}
                                                            description={this.state.description}
                                                            targetScore={this.state.targetScore}
                                                            percentToReachTarget={this.state.percentToReachTarget}
                                                        /> : null}
                {this.state.showAddTestMeasurePopup ? <AddTestMeasurePopup
                                                            closePopup={this.closePopup}
                                                            submit={this.addNewMeasure}
                                                            handleInputChange={this.handleInputChange}
                                                            testName={this.state.toolName}
                                                            measureName={this.state.measureName}
                                                            description={this.state.description}
                                                            targetScore={this.state.targetScore}
                                                            percentToReachTarget={this.state.percentToReachTarget}
                                                        /> : null}
                </>
            )
        }
    }
}

