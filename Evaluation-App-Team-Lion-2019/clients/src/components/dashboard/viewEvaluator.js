import React, { Component } from 'react';


import PropTypes from 'prop-types';
import { GetAllEvaluator } from '../../actions/evaluator';
import { connect } from "react-redux";

class ViewEvaluator extends Component
{
    constructor(props){
        super(props);
        
    }

    componentWillMount(){
        this.props.GetAllEvaluator();
    }

    render()
    

    {
        const { evaluator } = this.props;
        var display = '';
        
        if(evaluator.evaluator){
            display = evaluator.evaluator.map((singleEvaluator, index) =>(
                <div key={index} >
                <div class="row">
                <div class="col-sm-6" style={{margin: "auto"}}>
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Name: {singleEvaluator.firstName} {singleEvaluator.lastName}</h5>
                      <p class="card-text">Email: {singleEvaluator.email}</p>
                      
                    </div>
                  </div>
                </div>
                
              </div>
              </div>
            ))
        }
        else{
            console.log("Loading");
        }

        return(
            <div className="jumbotron" >
                
            {display}
            </div>
        );
    }
}

ViewEvaluator.propTypes = {
    GetAllEvaluator: PropTypes.func.isRequired,
    evaluator: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    evaluator: state.evaluator
})
export default connect(mapStateToProps, {GetAllEvaluator})(ViewEvaluator);

// Alert.propTypes = {
//     className: PropTypes.string,
//     closeClassName: PropTypes.string,
//     color: PropTypes.string, // default: 'success'
//     isOpen: PropTypes.bool,  // default: true
//     toggle: PropTypes.func,
//     tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
//     //fade: PropTypes.bool, // default: true
//     // Controls the transition of the alert fading in and out
//     // See Fade for more details
//     //transition: PropTypes.shape(Fade.propTypes),
//   }