import React, { Component } from 'react';
import { Jumbotron,Container, Form } from 'react-bootstrap';
import classnames from "classnames";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';


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
            checked: false,
            errors: {}

        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
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
        

          const obj ={
              rows: this.state.rows,
              scores: this.state.scores,
              Rubric_Title: this.state.Rubric_Title,
              weight: this.state.checked
          }

          localStorage.setItem("title", this.state.Rubric_Title);

          axios.post("/rubric/createRubric", obj)
                .then(res => window.location.replace('/createRubric'))
                .catch(err => 
                  this.setState({errors: err.response.data}))

          ;

          
      }


render()
{
  
    
return(
<Jumbotron fluid>
  <Container>
    <h1>Create a new rubric</h1>
    <br />
    <br />
   <form onSubmit={this.onSubmit}>
<div className="input-field col s8">
    <input  onChange={this.onChange}
            value={this.state.Rubric_Title}
            error={this.state.errors.title}
            type="text"
            id="Rubric_Title"
            
            className={classnames("", {
              invalid: this.state.errors.title
            })}
            required/>
            <label htmlFor="text">Rubric Title</label>
                <span className="red-text">
                  {this.state.errors.title}
                  
                </span>
</div>
<br />
    <div className="input-field col s8">
                <input
                  onChange={this.onChange}
                  value={this.state.rows}
                  error={this.state.errors.rows}
                  id="rows"
                  type="number"
                  className={classnames("", {
                    invalid: this.state.errors.rows
                  })}
                required/>
                <label htmlFor="number">Number of Criteria</label>
                <span className="red-text">
                  {this.state.errors.rows}
                  
                </span>
              </div>
              <br />
    
    <div className="input-field col s8">
                <input
                  onChange={this.onChange}
                  value={this.state.scores}
                  error={this.state.errors.scores}
                  id="scores"
                  type="number"
                  placeholder="A rubric grading Students from Poor, Average and Good will have 3 scores"
                  className={classnames("", {
                    invalid: this.state.errors.scores
                  })}
                required/>
                <label htmlFor="number">Number of Scores</label>
                <span className="red-text">
                  {this.state.errors.scores}
                  
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
 
    
    auth: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
     auth: state.auth,
     
     
})
export default connect(mapStateToProps)(CreateRubric);