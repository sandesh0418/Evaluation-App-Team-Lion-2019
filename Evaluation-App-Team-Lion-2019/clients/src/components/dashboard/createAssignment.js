import React, {Component} from 'react';
import axios from "axios";

//dummy data
var out1mea1 = {
    Measure_ID: 1,
    Description: ''
}

var out1 = {
    Outcome_ID: 1,
    Description: '',
    measures: [out1mea1]
}

var dummyOutcomeList = [out1];

var eval3 = {
    email: '',
    firstName: '',
    lastName: ''
}

var evalList = [eval3];

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

export default class CreateAssignment extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSelectOutcome = this.handleSelectOutcome.bind(this);
        this.handleSelectMeasure = this.handleSelectMeasure.bind(this);
        this.handleSelectEvaluator = this.handleSelectEvaluator.bind(this);
        this.changeFile = this.changeFile.bind(this);
        this.fileInput = React.createRef();
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            outcomeList: dummyOutcomeList,
            evaluatorList: evalList,
            selectedOutcomeIndex: 0,
            selectedMeasure: undefined,
            selectedEvaluator: '',
            showFileAlert: false
        }
    }

    componentDidMount()
    {
        axios.get('/assignments/outcomesAndMeasures')
            .then(res => {
                console.log(res.data.outcomeList);
                this.setState({
                    outcomeList: res.data.outcomeList,
                    selectedMeasure: this.state.outcomeList[0].measures[0].Measure_ID,
                })
            })
        axios.get('/evaluators/evaluatorList')
        .then(res => {
            console.log(res.data);
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

    handleSelectEvaluator(e)
    {
        this.setState({
            selectedEvaluator: e.target.value
        })
    }

    changeFile(e)
    {
        if (!(this.fileInput.current.files[0].type == "text/csv"))
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

    onSubmit(e)
    {
        e.preventDefault();

        if (this.fileInput.current.files[0])
        {
            let fileReader = new FileReader();
            fileReader.onloadend = e => {
                let assignment = {
                    Measure_ID: this.state.selectedMeasure,
                    User_Email: this.state.selectedEvaluator,
                    studentList: fileReader.result
                }
                
                axios.post('http://localhost:5000/assignments/createAssignment', assignment)
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
            console.log("No file");
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
                    <select className="form-control" value={this.state.selectedEvaluator}
                            onChange={this.handleSelectEvaluator} onClick={this.handleSelectEvaluator}>
                        <SelectEvaluator evaluatorList={this.state.evaluatorList} />
                    </select>
                </div>
                <div className="form-group">
                    <label>Select List of Subjects as .csv file: </label>
                    <input type="file" className="form-control-file" ref={this.fileInput} onChange={this.changeFile} />
                    {this.state.showFileAlert ? <p className="text-danger">Invalid File</p>: null}
                </div>
                <input type="submit" value="submit" className="btn btn-primary" onClick={this.onSubmit} />
            </form>
        )
    }

}

