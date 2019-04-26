import React, {Component} from 'react';
import './viewSummary.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const ProgramSummaryBody = props =>
{
    return props.state.programSummary.outcomes.map(function(currentOutcome, i){
        return <Outcome outcome={currentOutcome} state={props.state} key={currentOutcome.Outcome_ID} />;
    });
}

const Outcome = props => (
    <tr>
        <th className="p-2" scope="row">
            <p className="h4">{props.outcome.Outcome_Name}</p>
            <p>{props.outcome.Description}</p>
        </th>
        <td className="p-2"><Measures measures={props.outcome.measures} state={props.state}  /></td>
    </tr>
)

function Measures(props)
{
    return props.measures.map(function(currentMeasure, i){
        return (
            <div key={i}>
                <span className="bold mr-3"><strong>{currentMeasure.Measure_Name}</strong></span>
                <a href={"/measureReport/" + currentMeasure.Measure_ID}>
                    {"At least " + (currentMeasure.Percent_to_reach_target * 100) + "% of subjects score a " + 
                    (currentMeasure.Value_Name ? "'" + currentMeasure.Value_Name + "'" : 
                    (currentMeasure.Target_Score * 100) + "%") +" or higher on " + currentMeasure.Tool_Name + "."}
                </a>
                {currentMeasure.Description ?  
                    <details className="ml-3 mb-3">
                        <summary>Additional description: </summary>
                        <p className="ml-3">{currentMeasure.Description}</p>
                    </details>
                    : null}
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
    return <div>
            {props.measure.totalEvaluated !== 0 ? 
                <Alert color={colorToBe}>
                <span className="mr-4">Measure statistics: {((props.measure.metTarget / props.measure.totalEvaluated) * 100).toFixed(2)}% of 
                evaluations have met the target score of {(props.measure.Value_Name ? "'" + props.measure.Value_Name + "'" : 
                    (props.measure.Target_Score * 100) + "%")}.</span></Alert> : null}
            <Alert color="info"> {props.measure.totalEvaluated} subjects have been evaluated.</Alert>
            </div>
}

export default class ViewSummary extends Component 
{
    
    constructor(props){
        super(props);
        this.setView = this.setView.bind(this);
        this.state = {
            reportMode: false,
            programSummary: null,
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
        axios.get('/summaryReport/measureStatistics/' + localStorage.getItem("Cycle_Id"))
            .then(res => {
                //console.log(res.data);
                this.setState({
                    programSummary: res.data.programSummary
                })
            })
    }

    getSummary()
    {
        console.log(localStorage.getItem("Cycle_Id"));
        axios.get('/summaryReport/getSummary/' + localStorage.getItem("Cycle_Id"))
            .then(res => {
                console.log(res.data);
                this.setState({
                    programSummary: res.data.programSummary
                })
            })
    }

    render()
    {
        if (this.state.programSummary === null)
        {
            return <p>loading...</p>
        }
        else
        {
            return (
                <div>
                   <div>
                    <h1>{this.state.programSummary.title}</h1>
                
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="p-2" scope="col" className="outcome-width">Learning Outcomes</th>
                                <th className="p-2" scope="col" className="measure-width">Measures of Performace</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ProgramSummaryBody state={this.state} />
                        </tbody>
                    </table>
                    <button className="btn btn-primary" > <a href="/editProgramSummary"  style={{color: "white"}}>Edit Program Summary</a></button>
                    </div>
                </div>
            );
        }
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