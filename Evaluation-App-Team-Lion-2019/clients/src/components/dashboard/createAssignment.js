import React, {Component} from 'react';

//dummy data
var out1mea1 = {
    Measure_ID: 11,
    Description: 'out 1 measure 1'
}

var out1mea2 = {
    Measure_ID: 12,
    Description: 'out 1 measure 2'
}

var out1mea3 = {
    Measure_ID: 13,
    Description: 'out 1 measure 3'
}

var out1 = {
    Outcome_ID: 1,
    Description: 'outcome 1',
    measures: [out1mea1, out1mea2, out1mea3]
}

var out2mea1 = {
    Measure_ID: 21,
    Description: 'out 2 measure 1'
}

var out2mea2 = {
    Measure_ID: 22,
    Description: 'out 2 measure 2'
}

var out2mea3 = {
    Measure_ID: 23,
    Description: 'out 2 measure 3'
}

var out2 = {
    Outcome_ID: 2,
    Description: 'outcome 2',
    measures: [out2mea1, out2mea2, out2mea3]
}

var out3mea1 = {
    Measure_ID: 31,
    Description: 'out 3 measure 1'
}

var out3mea2 = {
    Measure_ID: 32,
    Description: 'out 3 measure 2'
}

var out3mea3 = {
    Measure_ID: 33,
    Description: 'out 3 measure 3'
}

var out3 = {
    Outcome_ID: 3,
    Description: 'outcome 3',
    measures: [out3mea1, out3mea2, out3mea3]
}

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

var dummyOutcomeList = [out1, out2, out3];

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

export default class CreateAssignment extends Component
{
    constructor(props)
    {
        super(props);
        this.handleSelectOutcome = this.handleSelectOutcome.bind(this);
        this.handleSelectMeasure = this.handleSelectMeasure.bind(this);
        this.handleSelectEvaluator = this.handleSelectEvaluator.bind(this);
        this.state = {
            outcomeList: dummyOutcomeList,
            evaluatorList: evalList,
            selectedOutcomeIndex: 0,
            selectedMeasure: -1,
            selectedEvaluator: ''
        }
    }

    componentDidMount()
    {
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

    render()
    {
        return(
            <form>
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
                        <option value=''>Please pick an evaluator</option>
                        <SelectEvaluator evaluatorList={this.state.evaluatorList} />
                    </select>
                </div>
                <div className="form-group">
                    <label>Select List of Subjects as .csv file: </label>
                    <input type="file" className="form-control-file" />
                </div>
                <p>The current selectedMeasure {this.state.selectedMeasure}</p>
                <p>The current selectedEvaluator {this.state.selectedEvaluator}</p>
            </form>
        )
    }

}

