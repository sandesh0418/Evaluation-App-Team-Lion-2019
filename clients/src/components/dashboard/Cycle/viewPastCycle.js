import React, { Component } from 'react'
import {getAllRubric} from '../../../actions/rubric';
import { getOutcome, getMeasure} from '../../../actions/outcome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import '../../../stylesheets/spinner.css';






class viewPastCycle extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          open: false,
        };
      }
   
     onClick(e){
         this.props.getMeasure(e.target.id)
         this.setState({ open: !this.state.open })
     }


    componentDidMount(){
        this.props.getAllRubric(this.props.match.params.cycle);
        this.props.getOutcome(this.props.match.params.cycle);
    }
  render() {
    const { open } = this.state;
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
            outcomeDisplay = <div className="card">
                                <div className="card-header" style={{textAlign: "center"}}>
                                    Outcomes
                                </div>


                                <table className="table-bordered">

                                    {
                                        outcomes.outcome.map((single, index) =>(
                                            <tbody key={index}>
                                            <tr >
                                            <td style={{padding: "2px", width: "2rem", textAlign: "center"}}><a 
                                                                                                                onClick={this.onClick.bind(this)}
                                                                                                                id={single.Outcome_ID}
                                                                                                                name={single.Outcome_Name}
                                                                                                                >{single.Outcome_Name}</a>
                                                                                                                                                                                </td>
                                            <td style={{padding: "8px", width: "4rem", textAlign: "justify"}}>{single.Description}
                                            
        </td>
                    
                                            </tr></tbody>
                                        ))
                                    }
                                </table>
                           
                            </div>}
    }

    else{
      outcomeDisplay = <Loader 
      type="Oval"
      
      color="black"
      height="100"	
      width="100"/>
    }

    return (
      <div>

          <div className ="row justify-content-md-center container">
            <div className="col-sm-4">
                {rubricDisplay}
                </div>
            <div className="col-sm-8">
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
    getMeasure: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapPropsToState = state =>({
    rubric: state.rubric,
    outcomes: state.outcomes,
    auth: state.auth
})



export default connect(mapPropsToState, {getAllRubric, getOutcome, getMeasure})(viewPastCycle);