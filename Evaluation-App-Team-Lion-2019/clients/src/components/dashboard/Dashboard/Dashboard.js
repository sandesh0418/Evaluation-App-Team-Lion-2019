import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CyclesInProgress } from '../../../actions/cycle';
import Loader from 'react-loader-spinner';

class Dashboard extends Component {

  componentDidMount(){
      this.props.CyclesInProgress();
  }
  

  render() {
    const { user } = this.props.auth;
    const  {cycles} = this.props;
    var displayCycle;


    if(cycles.inProgressCycles != null){

      displayCycle = cycles.inProgressCycles.map((singleCycle, index) =>(
        <p className="card-text" key={index}>
          {singleCycle.Cycle_Name}

        </p>
      ))

    }
    else{
      displayCycle=  <Loader 
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
        <div className="card">
        <h2 className="card-title bg-info" style={{padding: "20px"}}>Cycles</h2>
        {displayCycle}
        
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cycles: state.cycles
});

export default connect(mapStateToProps, {CyclesInProgress})(Dashboard);
