import React, {Component} from 'react';
import './viewSummary.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import Table from 'react-bootstrap/Table'

const ProgramSummaryBody = props =>
{
    return props.state.programSummary.outcomes.map(function(currentOutcome, i){
        return <Outcome outcome={currentOutcome} state={props.state} key={currentOutcome.Outcome_ID} />;
    });
}

function Outcome(props)
{
    let curriculumElements = props.outcome.courses.map(c => {
        return <p>{c.departmentCode + " " + c.courseCode + " - " + c.name + ". " + c.relevantHours + " hours."}</p>
    })

    return (
        <tr>
            <th className="p-2" scope="row">
                <p className="h4">{props.outcome.Outcome_Name}</p>
                <p>{props.outcome.Description}</p>
                <details>
                    <summary>Curriculum Elements</summary><br/>
                    {curriculumElements}
                </details>
            </th>
            <td className="p-2"><Measures measures={props.outcome.measures} state={props.state}  /></td>
        </tr>
    )
}

function Measures(props)
{
    return props.measures.map(function(currentMeasure, i){
        return (
            <div key={i}>
                <span className="bold mr-3"><strong>{currentMeasure.Measure_Name}</strong></span>
                <br/><a href={"/measureReport/" + currentMeasure.Measure_ID}>
                    {"At least " + (currentMeasure.Percent_to_reach_target * 100) + "% of subjects score a " + 
                    (currentMeasure.Value_Name ? "'" + currentMeasure.Value_Name.trim() + "'" : 
                    (currentMeasure.Target_Score * 100) + "%") + " or higher on " + currentMeasure.Tool_Name + "."}
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
    
    var achieved = ((props.measure.metTarget / props.measure.totalEvaluated) * 100).toFixed(2);
   
    let colorToBe;
    if (achieved > target){
        colorToBe = "bg-success success";
    }
    else if(achieved < target){
        colorToBe ="bg-danger danger";
    }
    else {
        colorToBe="bg-warning warning";
    }
    return <div>
            {props.measure.numberOfAssignments > 0 ?
                (props.measure.totalEvaluated !== 0 ? 
                    <>
                        <div className={colorToBe}>
                            <span className="mr-4"  style={{color: "white"}}>Measure statistics: 
                                {((props.measure.metTarget / props.measure.totalEvaluated) * 100).toFixed(2)}% of 
                                evaluations have met the target score of {(props.measure.Value_Name ? "'" + 
                                props.measure.Value_Name.trim() + "'" : (props.measure.Target_Score * 100) + "%")}.
                            </span>
                        </div>
                        <div className="bg-info info" style={{color: "white"}}> {props.measure.totalEvaluated} subjects have been evaluated.</div>
                    </>
                    :
                    <div className="bg-dark info text-light">
                        <Loader type="ThreeDots" color="white" height="12" width="12"/>
                        Pending evaluations on {props.measure.numberOfAssignments} assignments.
                    </div>)
                : null}
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
       
        this.setView();
    }

    setView()
    {
      
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
        axios
            .get('/api/summaryReport/measureStatistics/' + localStorage.getItem("Cycle_Id") + "/" + localStorage.getItem("dept_Id"))
            .then(res => {
               console.log(res.data.programSummary);
                this.setState({
                    programSummary: res.data.programSummary
                })
            })
    }

    getSummary()
    {
      
        axios
            .get('/api/summaryReport/getSummary/' + localStorage.getItem("Cycle_Id") + "/" + localStorage.getItem("dept_Id"))
            .then(res => {
                console.log(res.data.programSummary);
                this.setState({
                    programSummary: res.data.programSummary
                })
            })
    }

    render()
    {
        if(this.state.programSummary === null)
        {
            return <Loader 
                type="Oval"
                color="black"
                height="100"	
                width="100"
            />
        }
        else if (this.state.programSummary === undefined)
        {
            return <p>There was an error getting the program summary.</p>
        }
        else
        {
            return (
                <div>
                   <div>
                    <h2 id="heading">{this.state.programSummary.title}</h2>
                
                    <Table 
                        bordered
                        striped
                        hover
                        responsive="sm"
                        responsive="md"
                        //   responsive="lg"
                        //   responsive="xl"
                        id="viewSummary">
                        <thead>
                            <tr>
                                <th className="p-2" scope="col" className="outcome-width">Learning Outcomes</th>
                                <th className="p-2" scope="col" className="measure-width">Measures of Performace</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ProgramSummaryBody state={this.state} />
                        </tbody>
                    </Table>
                    <button className="btn btn-primary" > <a href="/editProgramSummary"  style={{color: "white"}}><i className="fas fa-edit"> Edit Program Summary</i></a></button>
                    </div>
                </div>
            )
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
