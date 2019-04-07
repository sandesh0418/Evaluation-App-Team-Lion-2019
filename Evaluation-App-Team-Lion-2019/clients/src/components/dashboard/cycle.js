import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { CreateNewCycle }from '../../actions/cycle';

class Cycle extends Component {
    constructor(props){
        super(props);
        this.state ={
            startDate : new Date(),
            
            cycleName : ''
        }
    }

    onChange(e){
        this.setState({[e.target.name]:[e.target.value]})
    }

    onSubmit(e){
        e.preventDefault();
        const obj ={
            Cycle_Name: this.state.cycleName,
            Start_Date: this.state.startDate
        }
        this.props.CreateNewCycle(obj);
        window.location.reload();
        
    }

  render() {

   
      
    return (
        <form style = {{padding: "20px", 
                        border: "1px solid rgba(128, 128, 128, 0.32)", 
                        borderRadius: "15px", 
                        margin: "150px 0"}} onSubmit={this.onSubmit.bind(this)}
                         className="container">
        
        <input onChange={this.onChange.bind(this)}
                value ={this.state.cycleName}
                placeholder="Please enter a cycle name"
                type = "text"
                name="cycleName"/>
                <label> Cycle name</label>
                <input onChange={this.onChange.bind(this)}
                        value ={this.state.startDate}
                        type = "date"
                        name="startDate"
                        

                />
                <label> Cycle Start Date</label>
         <br></br>       
         <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable cornblue accent-3"
                >
                  Start a new cycle
                </button>
      </form>
    )
  }
}

Cycle.propTypes = {
    CreateNewCycle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
  });

  
export default connect(mapStateToProps,{CreateNewCycle})(Cycle);