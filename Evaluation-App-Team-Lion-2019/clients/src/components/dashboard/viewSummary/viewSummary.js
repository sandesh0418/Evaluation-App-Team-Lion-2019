import React, {Component} from 'react';
import './viewSummary.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

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
    if(props.state.programSummary != undefined){
    return props.state.programSummary.outcomes.map(function(currentOutcome, i){
        return <Outcome outcome={currentOutcome} state={props.state} key={currentOutcome.Outcome_ID} />;
    });}
    else{
        return null;
    }
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
                <p>
                    {"At least " + (currentMeasure.Percent_to_reach_target * 100) + "% of subjects score a " + 
                    (currentMeasure.Value_Name ? "'" + currentMeasure.Value_Name + "'" : 
                    (currentMeasure.Target_Score * 100) + "%") +" or higher on " + currentMeasure.Tool_Name + "."}
                </p>
                {currentMeasure.Description ? <p className="ml-3">{"Additional description: " + currentMeasure.Description}</p> : null}
                {props.state.reportMode ? <Statistics state={props.state} measure={currentMeasure} /> : null}
                <hr/>
            </div>
            
        )
    });
}

function Statistics(props)
{
    
    var target ;
    target = props.measure.Percent_to_reach_target*100;
    console.log(target);
    var achieved = ((props.measure.metTarget / props.measure.totalEvaluated) * 100).toFixed(2);
    console.log(achieved);
    let colorToBe;
    if (achieved > target){
        colorToBe = "success";
    }
    else if(achieved < target){
        colorToBe ="danger";
    }
    else {
        colorToBe="warning";
    }
    return <p>
            {props.measure.totalEvaluated !== 0 ? 
                <Alert color={colorToBe}>
                <span className="mr-4">Measure statistics: {((props.measure.metTarget / props.measure.totalEvaluated) * 100).toFixed(2)}% of 
                evaluations have met the target score of {props.measure.Target_Score}.</span></Alert> : null}
            <Alert color="info"> {props.measure.totalEvaluated} subjects have been evaluated.</Alert>
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
        //console.log("Inside componentDidMount");
        this.setView();
    }

    setView()
    {
       // console.log("Inside setView");
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
        axios.get('/summaryReport/measureStatistics')
            .then(res => {
                //console.log(res.data);
                this.setState({
                    programSummary: res.data.programSummary
                })
            })
    }

    getSummary()
    {
        axios.get('/summaryReport/getSummary')
            .then(res => {
                //console.log(res.data);
                this.setState({
                    programSummary: res.data.programSummary
                })
            })
    }

    render()
    {
        var programSum= '';
        if(this.state.programSummary){
                programSum = this.state.programSummary.title;
        }
        return (
            <div>
                
                <h1>{programSum}</h1>
            
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

Alert.propTypes = {
    className: PropTypes.string,
    closeClassName: PropTypes.string,
    color: PropTypes.string, // default: 'success'
    isOpen: PropTypes.bool,  // default: true
    toggle: PropTypes.func,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    //fade: PropTypes.bool, // default: true
    // Controls the transition of the alert fading in and out
    // See Fade for more details
    //transition: PropTypes.shape(Fade.propTypes),
  }