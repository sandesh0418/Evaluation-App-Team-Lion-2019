import React, {Component} from 'react';
import axios from "axios";

//dummy data
var dummyOutcomeList = [{ Outcome_ID: 1, Description: '', measures: [{ Measure_ID: 1, Description: ''}]}];
var evalList = [{ email: '', firstName: '', lastName: ''}];

function SelectOutcome(props)
{
    return props.outcomeList.map((outcome, index) => {
        return <option key={outcome.Outcome_ID} value={index}>{outcome.Description}</option>
    })
}

function SelectMeasure(props)
{
    return props.measureList.map(measure => {
        return <option key={measure.Measure_ID} value={measure.Measure_ID}>{measure.Measure_ID}</option>
    })
}

function SelectEvaluator(props)
{
    return props.evaluatorList.map(e => {
        return <option key={e.email} value={e.email}>{e.firstName + ' ' + e.lastName}</option>
    })
}

function ManualStudentEntry(props)
{
    return props.formData.map((d, index) => {
        return (
            <div key={index} className="row">
                <div className="col-5">
                    <span>Full Name:</span>
                    <input 
                        className="form-control" 
                        id={index}
                        name="subjectName" 
                        value={props.formData[index].subjectName}
                        onChange={props.onChange} 
                        type="text" 
                    />
                </div>
                <div className="col-5">
                    <span>Unique Identifier:</span>
                    <input 
                        className="form-control" 
                        id={index}
                        name="subjectId" 
                        value={props.formData[index].subjectId}
                        onChange={props.onChange} 
                        type="text" 
                    />
                </div>
            </div>
        )
    })
}

function manualStudentEntryToString(list)
{
    let studentList = "";

    list.forEach(i => {
        studentList += i.subjectName + "," + i.subjectId + "\n";
    })

    return studentList;
}

export default class CreateAssignment extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSelectOutcome = this.handleSelectOutcome.bind(this);
        this.handleSelectMeasure = this.handleSelectMeasure.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateManualStudentEntry = this.updateManualStudentEntry.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.changeFile = this.changeFile.bind(this);
        this.fileInput = React.createRef();
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            outcomeList: dummyOutcomeList,
            evaluatorList: evalList,
            selectedOutcomeIndex: 0,
            selectedMeasure: undefined,
            selectedEvaluator: '',
            showFileAlert: false,
            manualStudentEntry: []
        }
    }

    componentDidMount()
    {
        axios.get('/assignments/outcomesAndMeasures')
            .then(res => {
                this.setState({
                    outcomeList: res.data.outcomeList,
                    selectedMeasure: res.data.outcomeList[0].measures[0].Measure_ID,
                })
            })
        axios.get('/evaluators/evaluatorList/' + localStorage.getItem("dept_Id"))
            .then(res => {
                this.setState({
                    evaluatorList: res.data.evaluatorList,
                    selectedOutcomeIndex: 0,
                    selectedEvaluator: res.data.evaluatorList[0].email
                })
            })
    }

    handleSelectOutcome(e)
    {
        this.setState({
            selectedOutcomeIndex: e.target.value,
            selectedMeasure: this.state.outcomeList[e.target.value].measures[0].Measure_ID
        })
    }

    handleSelectMeasure(e)
    {
        this.setState({
            selectedMeasure: e.target.value
        })
    }

    handleInputChange(e)
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeFile(e)
    {
        if (!(this.fileInput.current.files[0].type === "text/csv"))
        {
            this.setState({
                showFileAlert: true
            })
        }
        else
        {
            this.setState({
                showFileAlert: false
            })
        }
    }

    updateManualStudentEntry(e)
    {
        let index = e.target.id;
        let tempManualEntry = this.state.manualStudentEntry;

        if(e.target.name === "subjectName")
        {
            tempManualEntry[index].subjectName = e.target.value
        }
        else if (e.target.name === "subjectId")
        {
            tempManualEntry[index].subjectId = e.target.value
        }

        this.setState({
            manualStudentEntry: tempManualEntry
        })
    }

    addStudent(e)
    {
        let tempManualEntry = this.state.manualStudentEntry;
        tempManualEntry.push({
            subjectName: '',
            subjectId: ''
        })

        this.setState({
            manualStudentEntry: tempManualEntry
        })
    }

    onSubmit(e)
    {
        console.log("Entered on submit");
        e.preventDefault();

        if (this.fileInput.current.files[0])
        {
            let fileReader = new FileReader();
            fileReader.onloadend = e => {
                let assignment = {
                    Measure_ID: this.state.selectedMeasure,
                    User_Email: this.state.selectedEvaluator,
                    studentList: fileReader.result + 
                    (this.state.manualStudentEntry.length === 0 ? null : "\n" + manualStudentEntryToString(this.state.manualStudentEntry))
                }

                console.log(assignment);
                
                axios.post('/assignments/createAssignment', assignment)
                    .then(res =>  {
                        if (res.data.status)
                        {
                            alert(res.data.message);
                            this.setState({
                                selectedMeasure: this.state.outcomeList[0].measures[0].Measure_ID,
                                selectedEvaluator: this.state.evaluatorList[0].email
                            })
                        }
                    });
            }
            fileReader.readAsText(this.fileInput.current.files[0]);
        }
        else
        {
            let assignment = {
                Measure_ID: this.state.selectedMeasure,
                User_Email: this.state.selectedEvaluator,
                studentList: "Name,ID\n" + manualStudentEntryToString(this.state.manualStudentEntry)
            }

            axios.post('/assignments/createAssignment', assignment)
                .then(res =>  {
                    if (res.data.status)
                    {
                        alert(res.data.message);
                        this.setState({
                            selectedMeasure: this.state.outcomeList[0].measures[0].Measure_ID,
                            selectedEvaluator: this.state.evaluatorList[0].email
                        })
                    }
                });
        }
    }

    render()
    {
        return(
            <form onSubmit={this.onSubmit}>
                <h1>Create Assignment</h1>
                <div className="form-group">
                    <label>Select Outcome: </label>
                    <select className="form-control" value={this.state.selectedOutcomeIndex} 
                            onChange={this.handleSelectOutcome} onClick={this.handleSelectOutcome}>
                        <SelectOutcome outcomeList={this.state.outcomeList} />
                    </select>
                </div>
                <div className="form-group">
                    <label>Select Measure: </label>
                    <select className="form-control" value={this.state.selectedMeasure}
                            onChange={this.handleSelectMeasure} onClick={this.handleSelectMeasure}>
                        <SelectMeasure onChange measureList={this.state.outcomeList[this.state.selectedOutcomeIndex].measures} />
                    </select>
                </div>
                <div className="form-group">
                    <label>Select Evaluator: </label>
                    <select className="form-control" value={this.state.selectedEvaluator} name="selectedEvaluator"
                            onChange={this.handleInputChange} onClick={this.handleInputChange}>
                        <SelectEvaluator evaluatorList={this.state.evaluatorList} />
                    </select>
                </div>
                <div className="form-group">
                    <label>Upload list of subjects as .csv file: </label>
                    <input type="file" className="form-control-file" ref={this.fileInput} onChange={this.changeFile} />
                    {this.state.showFileAlert ? <p className="text-danger">Invalid File</p>: null}
                </div>
                <div className="form-group">
                    <ManualStudentEntry formData={this.state.manualStudentEntry} onChange={this.updateManualStudentEntry} />
                </div>
                <div>
                    <button className="btn btn-secondary mb-4" type="button" 
                    onClick={this.addStudent}>Add Subject Manually</button>
                </div>
                <input type="submit" value="submit" className="btn btn-primary" onClick={this.onSubmit} />
            </form>
        )
    }

}

