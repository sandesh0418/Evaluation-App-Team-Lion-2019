import React, {Component} from 'react';
import './viewSummary.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

const ProgramSummaryBody = props =>
{
    return props.state.programSummary.outcomes.map(function(currentOutcome, i){
        return <Outcome outcome={currentOutcome} state={props.state} key={currentOutcome.Outcome_ID} />;
    });
}

const Outcome = props => (
    <tr>
        <th scope="row">{props.outcome.Description}</th>
        <td><Measures measures={props.outcome.measures} state={props.state}  /></td>
    </tr>
)

function Measures(props)
{
    return props.measures.map(function(currentMeasure, i){
        return (
            <div key={i}>
                <p>{currentMeasure.Description}</p>
                {props.state.reportMode ? <Statistics state={props.state} measure={currentMeasure} /> : null}
            </div>
        )
    });
}

function Statistics(props)
{
    return <p>
            {props.measure.totalEvaluated !== 0 ? 
                <span className="mr-4">Measure statistics: {((props.measure.metTarget / props.measure.totalEvaluated) * 100).toFixed(2)}% of 
                evaluations have met the target score of {props.measure.Target_Score}.</span> : null}
            {props.measure.totalEvaluated} subjects have been evaluated.
            </p>
}

export default class ViewSummary extends Component 
{
    
    constructor(props){
        super(props);
        this.setView = this.setView.bind(this);
        this.state = {
            reportMode: false,
            programSummary: dummySummary,
            total: 0,
            metTarget: 0
        };
    }

    componentDidMount()
    {
        console.log("Inside componentDidMount");
        this.setView();
    }

    setView()
    {
        console.log("Inside setView");
        if (window.location.pathname==="/summaryReport")
        {
            this.getSummaryWithStatistics();
            this.setState({
                reportMode: true
            });
        }
        else
        {
            this.getSummary();
        }
    }

    getSummaryWithStatistics()
    {
        axios.get('http://localhost:5000/summaryReport/measureStatistics')
            .then(res => {
                console.log(res.data);
                this.setState({
                    programSummary: res.data.programSummary
                })
            })
    }

    getSummary()
    {
        axios.get('http://localhost:5000/summaryReport/getSummary')
            .then(res => {
                console.log(res.data);
                this.setState({
                    programSummary: res.data.programSummary
                })
            })
    }

    render()
    {
        return (
            <div>
                <h1>{this.state.programSummary.title}</h1>
            
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="outcome-width">Learning Outcomes</th>
                            <th scope="col" className="measure-width">Measures of Performace</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ProgramSummaryBody state={this.state} />
                    </tbody>
                </table>
                <Link to="/editProgramSummary" className="btn btn-primary">Edit Program Summary</Link>
            </div>
        );
    }
}