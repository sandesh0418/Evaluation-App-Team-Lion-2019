import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { GetAllEvaluator, AddNewEvaluator, deleteEvaluator } from '../../../actions/evaluator';
import { connect } from "react-redux";
import classnames from "classnames";


class ViewEvaluator extends Component
{
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      
      firstName: '',
      lastName: '',
      email: '',
      
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

    componentWillMount(){
        
        this.props.GetAllEvaluator();
    }

    onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };

    delete(e){
      const obj ={
        email: e.target.id
      }

      
      this.props.deleteEvaluator(obj);
      window.location.replace("/viewEvaluator");
    }
  
    onSubmit = e => {
      e.preventDefault();
      const obj ={
        firstName : this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        Dept_Id: localStorage.getItem("dept_Id")
      }
     
      this.props.AddNewEvaluator(obj, this.props.history);
      
  
      
    };
  

    render()
    

    {
        const { evaluator } = this.props;
        var display = '';
        const { errors } = this.state;
        
        if(evaluator.evaluator){
            display = evaluator.evaluator.map((singleEvaluator, index) =>(
                <div key={index} >
                
                
                  
                    <div >
                      <h5 class="card-title">Name: {singleEvaluator.firstName} {singleEvaluator.lastName} 
                      <i style={{color: "red", margin: "0 auto", fontSize: "30px", float: "right"}}
                          onClick={this.delete.bind(this)}
                          id={singleEvaluator.email}
                      
                      class="far fa-trash-alt"></i></h5>
                      <p class="card-text">Email: {singleEvaluator.email}</p>
                      </div>
                      <hr/>
                      

                      
                    </div>
                 
                
              
            ))
        }
        else{
            console.log("Loading");
        }

        return(
            <div className="jumbotron" >

            <div className="row">
            
              <div className="col-sm-6">
             <span style={{fontSize: "1.5rem", color: "rgb(11, 107, 218)"}} > List of Evaluators</span>
              <div class="card">
                    <div class="card-body">
                    
            {display}
            </div></div>
            </div>
            <div className="col-sm-6">
            <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Add a new</b> Evaluator
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.firstname}
                  error={errors.firstName}
                  id="firstName"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstName
                  })}
                />

                <label htmlFor="firstName">Please enter first name of the evaluator</label>
                <span className="red-text">{errors.firstName}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.lastName}
                  error={errors.lastName}
                  id="lastName"
                  type="text"
                  className={classnames("", {
                    invalid: errors.lastName
                  })}
                />

                <label htmlFor="lastName">Please enter last name of the evaluator</label>
                <span className="red-text">{errors.lastName}</span>
              </div>
              
              
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />


                
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>

              

              
              
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
            
            </div>
            </div>
            </div>
        );
    }
}

ViewEvaluator.propTypes = {
  AddNewEvaluator: PropTypes.func.isRequired,
    GetAllEvaluator: PropTypes.func.isRequired,
    evaluator: PropTypes.object.isRequired,
    deleteEvaluator: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    evaluator: state.evaluator,
    errors: state.errors
})
export default connect(mapStateToProps, {GetAllEvaluator, AddNewEvaluator, deleteEvaluator})(ViewEvaluator);

