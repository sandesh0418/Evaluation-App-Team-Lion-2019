import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CyclesInProgress } from '../../../actions/cycle';
import { GetAllEvaluator} from '../../../actions/evaluator';
import Loader from 'react-loader-spinner';

class Dashboard extends Component {

  componentDidMount(){
      this.props.CyclesInProgress();
      this.props.GetAllEvaluator(localStorage.getItem("dept_Id"))
  }
  onClickNewCycle(e){
    window.location.replace("/cycle");
  }
  

  render() {
    const { user } = this.props.auth;
    const  {cycles , evaluator} = this.props;
 
    var displayCycle;
    var displayProgressBar;


    if(cycles.inProgressCycles != null){

      displayCycle = cycles.inProgressCycles.map((singleCycle, index) =>(
        <p className="card-text" key={index} style={{marginLeft: "10px", fontWeight: "600"}}>
          {singleCycle.Cycle_Name}
            <button type="button" className="btn btn-secondary" 
            style={{float: "right", display:"inline", position: "relative", bottom: "25px", marginRight: "5px"}}>
            Edit cycle</button>
        <hr/>
        </p>
      ))

      if(displayCycle===''){
        displayCycle = <span>You do not have any active cycle</span>
      }

    }
    else{
      displayCycle=  <Loader 
      type="Oval"
      
      color="black"
      height="100"	
      width="100"
   />
    }

    if(evaluator.evaluator != null){
      displayProgressBar = evaluator.evaluator.map((single, index) =>(
        <p className="card-text" key={index} style={{marginLeft: "10px", fontWeight: "600"}}>
          {single.firstName} { single.lastName}
        <hr/>
        </p>
      ))
    }

    else{
      displayProgressBar=  <Loader 
      type="Oval"
      
      color="black"
      height="100"	
      width="100"
   />
    }
    return (
      <div>
        <div className="row">

        <div className="col-sm-6">
        <div className="card" style={{borderRadius: "10px"}}>
        <h2 className="card-title" style={{padding: "20px", color:"white", background: "#322348"}}>Cycles</h2>
        {displayCycle}
        <p style={{textAlign: "center", color: "red", fontSize: "30px"}}> OR </p>

        <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    margin: "1rem auto"
                  }}
                 onClick={this.onClickNewCycle.bind(this)}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Create a new Cycle
                </button>        
        </div>

        
        
        
        </div>
        <div className="col-sm-6">
        <div className="card" style={{borderRadius: "10px"}}>
        <h2 className="card-title" style={{padding: "20px", color:"white", background: "#322348"}}>Evaluator Progress Bar</h2>
        {displayProgressBar}
        </div>
        </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
 CyclesInProgress: PropTypes.func.isRequired,
 cycles: PropTypes.object.isRequired,
 GetAllEvaluator: PropTypes.func.isRequired,
 evaluator: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cycles: state.cycles,
  evaluator: state.evaluator
});

export default connect(mapStateToProps, {CyclesInProgress, GetAllEvaluator})(Dashboard);
