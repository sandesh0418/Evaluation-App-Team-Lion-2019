import React, { Component } from 'react';
import { viewCoordinator,viewCoordinatorDeleted } from '../../../actions/addCoordinator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Axios from 'axios';
import { ClipLoader } from 'react-spinners';



class ViewCoordinator extends Component {
    constructor(props){
        super(props);
        this.removeCoordinator= this.removeCoordinator.bind(this);
    }

    componentDidMount(){
        this.props.viewCoordinator();
        this.props.viewCoordinatorDeleted();
    }

    removeCoordinator(e){
        console.log(e.target.id);
        Axios.post("/Coordinator/removeCoordinator", {email : e.target.id})
        .then(res =>{
            
        })
    }

    render(){
        let { coordinators } = this.props;
        var display = " ";
        var displayDeleted = " ";
        var load='';
       
       
        if(coordinators.coordinators != null){
            
            display = coordinators.coordinators.map((singleValue, index) =>(
                // <div class="row" key={index}>
                <div class="col-sm-8" style={{margin: "auto"}} key={index}>
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Name: {singleValue.firstName} {singleValue.lastName}</h5>
                      <p  class="card-text">Email: {singleValue.email}</p>
                      <a href="/viewCoordinator" className="btn btn-danger" style={{height : "100%"}}
                                id={singleValue.email}
                      onClick= {this.removeCoordinator}>Remove this coordinator</a>

                    </div>
                  </div>
                </div>
                
              //</div>
            )
            )
        }

        if(coordinators.deleted != null){
            
            displayDeleted = coordinators.deleted.map((singleValue, index) =>(
                
                <div  class="col-sm-8" style={{margin: "auto"}} key={index}>
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Name: {singleValue.firstName} {singleValue.lastName}</h5>
                      <p  class="card-text">Email: {singleValue.email}</p>
                      

                    </div>
                  </div>
                </div>
                
             
            )
            )
        }

        else{
          
                load = <div className='sweet-loading'>
                <ClipLoader
                 
                  sizeUnit={"px"}
                  size={150}
                  color={'#123abc'}
                  
                />
              </div>;
                   
               }
        
        return (
            <div class="container">
            <div class="row">
               <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                <h2 style={{textAlign: "center"}}>List of the coordinators</h2>

                {display}

                </div>

                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                <h2 style={{textAlign: "center"}}>List of removed coordinators</h2>

                {displayDeleted}

                </div>
            </div>
            </div>
        )
    }
}

ViewCoordinator.propTypes = {
    viewCoordinator: PropTypes.func.isRequired,
    viewCoordinatorDeleted: PropTypes.func.isRequired,
    coordinators: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    coordinators: state.coordinators
})

export default connect(mapStateToProps, {viewCoordinator,viewCoordinatorDeleted})(ViewCoordinator);