import React, { Component } from 'react';
import { viewCoordinator } from '../../../actions/addCoordinator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class ViewCoordinator extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.viewCoordinator();
    }
    render(){
        let { coordinators } = this.props;
        var display = " ";
       
        if(coordinators.coordinators != null){
            
            display = coordinators.coordinators.map((singleValue, index) =>(
                <div class="row" key={index}>
                <div class="col-sm-6" style={{margin: "auto"}}>
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Name: {singleValue.firstName} {singleValue.lastName}</h5>
                      <p class="card-text">Email: {singleValue.email}</p>
                      
                    </div>
                  </div>
                </div>
                
              </div>
            ))
        }

        else{

        }
        return (
            <div>
                <h2 style={{textAlign: "center"}}>List of the coordinators</h2>

                {display}
            </div>
        )
    }
}

ViewCoordinator.propTypes = {
    viewCoordinator: PropTypes.func.isRequired,
    coordinators: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    coordinators: state.coordinators
})

export default connect(mapStateToProps, {viewCoordinator})(ViewCoordinator);