import React, {Component} from 'react';
import axios from "axios";

const StubjectList = props => {
    return props.subjectList.map(s => {
        return (
            <div className="row no-gutters">
                <div className="col-2 m-0 p-0 no-gutters">
                    <span>{s.subjectName + ":"}</span>
                </div>
                <div className="col-1 m-0 p-0 no-gutters">
                    <input id={s.subjectId} type="number" min="0" max="100" />
                </div>
            </div>
        )
    })
}

export default class EvaluateTest extends Component
{
    constructor(props)
    {
        super(props);
        this.submitScores = this.submitScores.bind(this);
        this.state = {
            subjectList: [],
            subjectId: null,
            measure: null
        }
    }

    componentDidMount()
    {
        console.log(this.props.match.params.assignment);
        axios.get('http://localhost:5000/assignments/subjectList/'+this.props.match.params.assignment)
            .then(res => {
                this.setState({
                    subjectList: res.data.subjectList,
                    subjectId: res.data.subjectList[0]
                })
            })
        axios.get('http://localhost:5000/assignments/assignmentMeasure/' + this.props.match.params.assignment)
            .then(res => {
                this.setState({
                    measure: res.data.measure
                })
            })
    }

    submitScores(e)
    {
        e.preventDefault();
    }

    render()
    {
        return (
            <>
                <h1>Enter Scores</h1>
                <p>{this.state.measure ? "for measure: " + this.state.measure.description : null}</p>
                <p>Enter scores a percent of 100. Example: if 85%, then enter 85.</p>
                <form onSubmit={this.submitScores}>
                    <StubjectList subjectList={this.state.subjectList} />
                    <input className="btn btn-primary" type="submit" />
                </form>
            </>
        );
    }
}