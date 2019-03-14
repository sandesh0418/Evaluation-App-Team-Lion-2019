import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";


export default class CreateRubric extends Component{

    constructor(props){
        super(props);
        
        this.state = ({
            addMode : false,
            rows: 0,
            columns:0,
            measureID:0,
            rubricTitle:""
        });
    }

    onSubmit = e=> {
        e.preventDefault();

        this.props.rubricCreator(this.state, this.props.history);
    }

    render() {
        //const add = this.state.addMode();
        console.log('sdfsdf');
        return(
        <div>
           <form noValidate onSubmit={this.onSubmit}>
           <div >
               <input 
               onChange={this.onChange}
               value ={this.state.measureID}
               id ="measureID"
               type="int"
               />
               <label htmlFor="measureID">Enter the measure ID you like like to create a rubric for</label>
           </div>

           <div >
               <input 
               onChange={this.onChange}
               value ={this.state.rubricTitle}
               id ="rubricTitle"
               type="int"
               />
               <label htmlFor="rubricTitle">Enter a title for the rubric</label>
           </div>

           <div >
                <input
                  onChange={this.onChange}
                  value={this.state.rows}
                  id="rows"
                  type="int"
                />

                <label htmlFor="rows">Enter the desired number of rows for the rubric</label>
              </div>

              <div >
                <input
                  onChange={this.onChange}
                  value={this.state.columns}
                  id="columns"
                  type="int"
                />

                <label htmlFor="columns">Enter the desired number of columns for the rubric</label>
              </div>

              <button 
              type= "submit">
                  Create Rubric
              </button>
              </form>
        </div>
        
        );
    }
}

