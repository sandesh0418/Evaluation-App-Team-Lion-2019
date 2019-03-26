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

var eval1 = {
    email: 'a@gmail.com',
    firstName: 'Ryan',
    lastName: 'Blomquist'
}

var eval2 = {
    email: 'b@gmail.com',
    firstName: 'Bryan',
    lastName: 'Rlomquist'
}

var eval3 = {
    email: 'c@gmail.com',
    firstName: 'Cyan',
    lastName: 'Hlomquist'
}

var evalList = [eval1, eval2, eval3];

function SelectOutcome(props)
{
    return props.outcomeList.map((outcome, index) => {
        return <option key={outcome.Outcome_ID} value={index}>{outcome.Description}</option>
    })
}

function SelectMeasure(props)
{
    return props.measureList.map(measure => {
        return <option key={measure.Measure_ID} value={measure.Measure_ID}>{measure.Description}</option>
    })
}

function SelectEvaluator(props)
{
    return props.evaluatorList.map(e => {
        return <option key={e.email} value={e.email}>{e.firstName + ' ' + e.lastName}</option>
    })
}

function getExtension(filename) {
    let parts = filename.split('.');
    return parts[parts.length - 1];
}

export default class CreateAssignment extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSelectOutcome = this.handleSelectOutcome.bind(this);
        this.handleSelectMeasure = this.handleSelectMeasure.bind(this);
        this.handleSelectEvaluator = this.handleSelectEvaluator.bind(this);
        this.fileInput = React.createRef();
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            outcomeList: dummyOutcomeList,
            evaluatorList: evalList,
            selectedOutcomeIndex: 0,
            selectedMeasure: undefined,
            selectedEvaluator: ''
        }
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/assignments/outcomesAndMeasures')
            .then(res => {
                this.setState({
                    outcomeList: res.data.outcomeList,
                    selectedMeasure: this.state.outcomeList[0].measures[0].Measure_ID,
                })
            })
        axios.get('http://localhost:5000/evaluators/evaluatorList')
        .then(res => {
            console.log(res.data);
            this.setState({
                evaluatorList: res.data.evaluatorList
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

    onSubmit(e)
    {
        e.preventDefault();
        let assignment = {
            Measure_ID: this.state.selectedMeasure,
            User_Email: this.state.selectedEvaluator,
            studentList: this.fileInput.current.files[0]
        }

        axios.post('http://localhost:5000/assignments/createAssignment', assignment)
            .then(res =>  {
                console.log(res.data);
            });

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
                    <input type="file" className="form-control-file" ref={this.fileInput} />
                </div>
                <input type="submit" value="submit" className="btn btn-primary" onClick={this.onSubmit} />
                <p>The current selectedMeasure {this.state.selectedMeasure}</p>
                <p>The current selectedEvaluator {this.state.selectedEvaluator}</p>
                <p>The current student list {this.state.studentList}</p>
            </form>
        )
    }

}

