import React, { Component } from 'react';
import { Jumbotron,Container, Form } from 'react-bootstrap';
import classnames from "classnames";
import { createRubric } from '../../../actions/rubric';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import uuid from 'uuid';


class CreateRubric extends Component{

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleCheck=this.handleCheck.bind(this);
        this.state={
            rows : 0,
            scores: "",
            Rubric_Title: "",
            dept_Id: "",
            checked: false,
            Rubric_Id: '',
            errors: {}

        }
    }

    componentWillReceiveProps(nextProps){

      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
      if(nextProps.rubric){
        
        window.location.replace("/createRubric/"+this.state.Rubric_Id)
          
    }
  }

 

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

      handleCheck(){
        this.setState({checked: !(this.state.checked)});
        
      }

      

      onSubmit(e){
          e.preventDefault();
        
         var RubricId = uuid();
         this.setState({Rubric_Id: RubricId})
          const obj ={
              rows: this.state.rows,
              scores: this.state.scores,
              Rubric_Title: this.state.Rubric_Title,
              Rubric_Id: RubricId,
              Cycle_Id: localStorage.getItem("Cycle_Id"),
              weight: this.state.checked
          }

          this.props.createRubric(obj);

         


          
          

          

          
      }


render()
{

  const { errors } = this.state;
  
    
return(
<Jumbotron fluid id="main">
  <Container>
    <h1>Create a new rubric</h1>
    <br />
    <br />
   <form onSubmit={this.onSubmit}>
<div className="input-field col s8">
    <input  onChange={this.onChange}
            value={this.state.Rubric_Title}
            error={errors.title}
            type="text"
            id="Rubric_Title"
            
            className={classnames("", {
              invalid: errors.title
            })}
            required/>
            <label htmlFor="text" style={{fontSize: "1.3rem"}}>Rubric Title</label>
                <span className="red-text">
                  {errors.title}
                  
                </span>
</div>
<br />
    <div className="input-field col s8">
                <input
                  onChange={this.onChange}
                  value={this.state.rows}
                  error={errors.rows}
                  id="rows"
                  type="number"
                  className={classnames("", {
                    invalid: errors.rows
                  })}
                required/>
                <label htmlFor="number" style={{fontSize: "1.3rem"}}>Number of Criteria</label>
                <span className="red-text">
                  {errors.rows}
                  
                </span>
              </div>
              <br />
    
    <div className="input-field col s8">
                <input
                  onChange={this.onChange}
                  value={this.state.scores}
                  error={errors.scores}
                  id="scores"
                  type="number"
                  placeholder="A rubric grading Students from Poor, Average and Good will have 3 scores"
                  className={classnames("", {
                    invalid: errors.scores
                  })}
                required/>
                <label htmlFor="number" style={{fontSize: "1.3rem"}}>Number of Scores</label>
                <span className="red-text">
                  {errors.scores}
                  
                </span>
              </div>

              <div style ={{color: "black", padding: "10px"}}>

              <input onChange={this.handleCheck}
                     value={this.state.checked}
                     type= "checkbox"
                     id ="weight"
                     style={{opacity : 1, pointerEvents: "auto"}}
                     />
              <label htmlFor="checkbox" style={{marginLeft: "12px"}}>Do you want a weight column?</label>
            
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
                  Create
                </button>
              </div>
              </form>
  </Container>
</Jumbotron>
)

}
}
CreateRubric.propTypes={
 
    rubric: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    auth: state.auth,
     rubric: state.rubric,
     errors: state.errors
     
     
})
export default connect(mapStateToProps,{createRubric})(CreateRubric);