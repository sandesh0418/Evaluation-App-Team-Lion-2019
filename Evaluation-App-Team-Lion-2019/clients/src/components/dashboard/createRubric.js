import React, {Component} from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { rubricCreator } from "../../actions/authActions";
import { connect } from "react-redux";



class CreateRubric extends Component{

    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = ({
            addMode : false,
            rows: 3,
            columns:3,
            measureID:1,
            rubricTitle:""
        });
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

    onSubmit = e=> {
        e.preventDefault();
        this.setState({addMode: true});
        //console.log('TEST');

        this.props.rubricCreator(this.state, this.props.history);
    }

    render() {
        const add = this.state.addMode;
        console.log('sdfsdf');
        let rubricFiller;
        if (add){
            rubricFiller=<div>
                
            </div>
        }else
         {
            rubricFiller = 
            <div>
           <form noValidate onSubmit={this.onSubmit}>
           <div >
               <input 
               onChange={this.onChange}
               value ={this.state.measureID}
               id ="measureID"
               type="number"
               />
               <label htmlFor="measureID">Enter the measure ID you like like to create a rubric for</label>
           </div>

           <div >
               <input 
               onChange={this.onChange}
               value ={this.state.rubricTitle}
               id ="rubricTitle"
               type="text"
               />
               <label htmlFor="rubricTitle">Enter a title for the rubric</label>
           </div>

           <div >
                <input
                  onChange={this.onChange}
                  value={this.state.rows}
                  id="rows"
                  type="number"
                />

                <label htmlFor="rows">Enter the desired number of rows for the rubric</label>
              </div>

              <div >
                <input
                  onChange={this.onChange}
                  value={this.state.columns}
                  id="columns"
                  type="number"
                />

                <label htmlFor="columns">Enter the desired number of columns for the rubric</label>
              </div>

              <button 
              type= "submit">
                  Create Rubric
              </button>
              </form>
        </div>
        }
        return(
            <div>
                {rubricFiller}
            </div>
            
        );
    }
}

CreateRubric.propTypes = {
    rubricCreator: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { rubricCreator }
)(withRouter (CreateRubric));