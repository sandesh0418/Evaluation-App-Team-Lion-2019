import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CyclesInProgress } from '../../../actions/cycle';
import { ProgressBar } from '../../../actions/evaluator';
import Loader from 'react-loader-spinner';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";


class Dashboard extends Component {

  componentDidMount(){
      this.props.CyclesInProgress();
      this.props.ProgressBar(localStorage.getItem("dept_Id"))
  }
  onClickNewCycle(e){
    window.location.replace("/cycle");
  }

  onClick(e){
    localStorage.removeItem("Cycle_Id");
    localStorage.setItem("Cycle_Id", e.target.id);
    window.location.replace("/dashboard");
  }
  

  render() {
    const { user } = this.props.auth;
    const  {cycles , evaluator} = this.props;
   
 
    var displayCycle;
    var displayProgressBar;
    var noProgressBar;

    

  


    if(cycles.inProgressCycles != null){

      displayCycle = cycles.inProgressCycles.map((singleCycle, index) =>(
        <p className="card-text" key={index} style={{marginLeft: "10px", fontWeight: "600"}}>
          {singleCycle.Cycle_Name}

          {singleCycle.Cycle_Id === localStorage.Cycle_Id ? "" :
            <button type="button" className="btn btn-secondary" 
            style={{float: "right", display:"inline", position: "relative", bottom: "25px", marginRight: "5px"}}
            onClick={this.onClick}
            id={singleCycle.Cycle_Id}
            >
              Enter Cycle</button>}
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

    if(evaluator.progressBar != null){
      
       
     
        displayProgressBar = evaluator.progressBar[0].map((single, index) =>(
          <span key={index} >
          
          <p className="card-text" style={{marginLeft: "10px", fontWeight: "600", fontSize: "2rem"}}>
            {single.firstName} { single.lastName}
          
          </p>
          <p>
          <Progress percent={Number(single.progress)}/>
          </p>
          </span>
        ))
      
     
      noProgressBar = evaluator.progressBar[1].map((single, index) =>(
        <span key={index} >
        <p className="card-text" style={{marginLeft: "10px", fontWeight: "600", fontSize: "2rem"}}>
          {single.firstName} { single.lastName}
        
        </p>
        <p >
          
          No assignment has been assigned
        </p>
        </span>
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
        <h1 className="card-title" style={{padding: "20px", color:"white", background: "#322348", textAlign: "center"}}>Cycles</h1>
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
        <h1 className="card-title" style={{padding: "20px", color:"white", background: "#322348"}}>Evaluator Progress Bar</h1>
        {displayProgressBar}

        <hr />
        {noProgressBar}
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
 ProgressBar: PropTypes.func.isRequired,
 evaluator: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cycles: state.cycles,
  evaluator: state.evaluator
});

export default connect(mapStateToProps, {CyclesInProgress, ProgressBar})(Dashboard);
