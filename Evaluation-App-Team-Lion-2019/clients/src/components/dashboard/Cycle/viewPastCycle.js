import React, { Component } from 'react'
import {getAllRubric} from '../../../actions/rubric';
import { getOutcome} from '../../../actions/outcome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import '../../../stylesheets/spinner.css';
import { Collapse, Button, CardBody, Card } from 'reactstrap';




class viewPastCycle extends Component {

   
     


    componentDidMount(){
        this.props.getAllRubric(this.props.match.params.cycle);
        this.props.getOutcome(this.props.match.params.cycle);
    }
  render() {

    const {rubric} = this.props;
    const { outcomes } = this.props;
    var rubricDisplay;
    var outcomeDisplay;
    if(rubric.getAllRubric != null){
        if(rubric.getAllRubric.rubrics.length>0){
            rubricDisplay= <div className="card" style={{width: "18rem"}}>
            <div className="card-header">
              Rubrics
            </div>
            <ul className="list-group list-group-flush">
              
              {rubric.getAllRubric.rubrics.map((single, index) =>(
                  <li className="list-group-item" key={index}> {single.Rubric_Title}</li>
              ))}
              
            </ul>
          </div>
        }

        else{
            rubricDisplay = <p className="text-danger" style={{textAlign: "center", fontSize: "30px"}}> This Cycle does not have any rubrics</p>
        }
    }


    
    else{
        rubricDisplay = <Loader 
        type="Oval"
        
        color="black"
        height="100"	
        width="100"
     />
    }

    if(outcomes.outcome != null){
        if(outcomes.outcome.length>0){
            outcomeDisplay = <div className="card" style={{width: "18rem"}}>
                                <div className="card-header">
                                    Outcomes
                                </div>
                            <ul className="list-group list-group-flush">
                                
                            {outcomes.outcome.map((single, index) =>(
                                <div key={index}>
                            <span className="list-group-item" >{single.Outcome_Name} 
                             
                                 
                                 <Card>
                                     <span style={{fontWeight: "bold"}}>Description</span>
                                    <CardBody>
                                       {single.Description}
                                    </CardBody>
                                </Card>
                                 
                                
                                 </span>
                                 </div>
                           
                                ))}
              
                            </ul>
                            </div>}
    }

    return (
      <div>

          <div className ="row justify-content-md-center container">
            <div className="col-sm-6">
                {rubricDisplay}
                </div>
            <div className="col-sm-6">
                {outcomeDisplay}
                </div>
        </div>
      </div>
    )
  }
}

viewPastCycle.propTypes={
    getAllRubric: PropTypes.func.isRequired,
    rubric: PropTypes.object.isRequired,
    getOutcome: PropTypes.func.isRequired,
    outcomes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapPropsToState = state =>({
    rubric: state.rubric,
    outcomes: state.outcomes,
    auth: state.auth
})



export default connect(mapPropsToState, {getAllRubric, getOutcome})(viewPastCycle);