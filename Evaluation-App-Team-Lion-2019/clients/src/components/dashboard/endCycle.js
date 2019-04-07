import React, { Component } from 'react';
import { GetAllCycle } from '../../actions/cycle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class EndCycle extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.GetAllCycle();
    }
  render() {
    let  { cycles } = this.props;
      var cycleName = ""; 
        if(cycles.cycles != null){
            
            cycleName = cycles.cycles.map((singleCycle) =>(

                    
                <div class="row">
                <div class="col-sm-6" style={{margin: "auto"}}>
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">{singleCycle.Cycle_Name}</h5>
                      <p class="card-text">State Date: {singleCycle.Start_Date}</p>
                      <a href="#" class="btn btn-primary">End Cycle</a>
                    </div>
                  </div>
                </div>
                
              </div>
                    
     
            ))
        }
        else{
            console.log("loading")
        }
    return (
      <div className="container">
        <h3>Select a Cycle that needs to be ended</h3>
        <div className="jumbotron">
        
        {cycleName}

        </div>
      </div>
    )
  }
}

EndCycle.propTypes ={
    GetAllCycle: PropTypes.func.isRequired,
    cycles: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    cycles: state.cycles
})
export default connect(mapStateToProps, {GetAllCycle})(EndCycle);