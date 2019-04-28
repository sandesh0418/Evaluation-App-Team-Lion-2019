import React, { Component } from 'react';
import { viewCoordinator,viewCoordinatorDeleted } from '../../../actions/addCoordinator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Axios from 'axios';
import Loader from 'react-loader-spinner';



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
                <div className="col-sm-8" style={{margin: "auto"}} key={index}>
                  
                      <p  className="card-text">Name: {singleValue.firstName} {singleValue.lastName}</p>
                      <p  className="card-text">Email: {singleValue.email}</p>
                      <a href="/viewCoordinator" className="btn btn-danger" style={{height : "100%", margin: "0 auto"}}
                                id={singleValue.email}
                      onClick= {this.removeCoordinator}>Delete Coordinator</a>
                      <hr/>
                    </div>
                    
                 
                
              //</div>
            )
            )
        }
        else{
          display = <Loader 
          type="Oval"
          
          color="black"
          height="100"	
          width="100"
       />
        }

        if(coordinators.deleted != null){
            
            displayDeleted = coordinators.deleted.map((singleValue, index) =>(
                
                <div  className="col-sm-8" style={{margin: "auto"}} key={index}>
                  
                      <p className="card-text">Name: {singleValue.firstName} {singleValue.lastName}</p>
                      <p  className="card-text">Email: {singleValue.email}</p>
                      

                   
                </div>
                
             
            )
            )
        }

        else{
          
          displayDeleted = <Loader 
          type="Oval"
          
          color="black"
          height="100"	
          width="100"
       />
                   
               }
        
        return (
            <div className="container">
            <div className="row">
               <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
               <div className="card">
                    <div className="card-body">
                    <h2 className="card-title text-success" style={{textAlign: "center", padding: "20px", textShadow: "none", fontSize: "30px"}}>Active coordinators</h2>
                

                {display}
                </div>
                </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="card">
                    <div className="card-body">
                    <h2 className="card-title text-danger" style={{textAlign: "center", padding: "20px", textShadow: "none", fontSize: "30px"}}>Deleted coordinators</h2>
                

                {displayDeleted}

                </div>
                </div>
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