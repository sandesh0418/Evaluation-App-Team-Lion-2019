import React, { Component } from 'react';
import { Jumbotron,Container } from 'react-bootstrap';
import classnames from "classnames";

import PropTypes from "prop-types";
import { connect } from "react-redux";


class CreateRubric extends Component{

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onChange.bind(this);
        this.state={
            columns : 0,
            rows: 0,
            rubricTitle: "",
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

      onSubmit(e){
          e.preventDefault();
          localStorage.setItem("columns",this.state.columns);
          localStorage.setItem("rows", this.state.rows);

          const obj ={
              columns: this.state.columns,
              rows: this.state.rows,
              rubricTitle: this.state.rubricTitle
          }

          
      }


render()
{
    const { errors } = this.state;
return(
<Jumbotron fluid>
  <Container>
    <h1>Create a new rubric</h1>
    <br />
    <br />
   <form onSubmit={this.onSubmit}>
<div className="input-field col s8">
    <input type="text"
            id="rubricTitle"
            onChange={this.onChange}
            value={this.state.rubricTitle}
            errors={errors.rubricTitle}
            required/>
            <label htmlFor="number">Rubric Title</label>
                <span className="red-text">
                  {errors.rubricTitle}
                  
                </span>
</div>
<br />
    <div className="input-field col s8">
                <input
                  onChange={this.onChange}
                  value={this.state.columns}
                  error={errors.columns}
                  id="columns"
                  type="number"
                  className={classnames("", {
                    invalid: errors.columns
                  })}
                required/>
                <label htmlFor="number">Number of Columns</label>
                <span className="red-text">
                  {errors.columns}
                  
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
                <label htmlFor="number">Number of Rows</label>
                <span className="red-text">
                  {errors.rows}
                  
                </span>
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
 
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
     auth: state.auth,
     errors: state.errors,
     
})
export default connect(mapStateToProps)(CreateRubric);