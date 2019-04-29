import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { CreateNewCycle, CyclesInProgress, GetPreviousCycle,MigrateCycle }from '../../../actions/cycle';

import '../../../stylesheets/cycle.css';


class Cycle extends Component {
    constructor(props){
        super(props);
        this.onClick=this.onClick.bind(this);
        this.state ={
            startDate : '',
            cycleName : '',
            migrate: false,
            migrate_Cycle_Id: ""
        }
    }
    
  

    componentDidMount(){
      this.props.CyclesInProgress();
      this.props.GetPreviousCycle();
    }

    onChange(e){
        this.setState({[e.target.name]:[e.target.value]})
    }

    onClick(e){
      this.setState({
        migrate: true
      })

    }

    handleChange(e){
      this.setState({
        migrate_Cycle_Id: e.target.value
      })
    }

   

    

   

    onSubmit(e){
        e.preventDefault();

        if(this.state.migrate){
          const obj ={
            Cycle_Name: this.state.cycleName,
            Start_Date: this.state.startDate,
            deptId: localStorage.getItem("dept_Id"),
            migrate_Id: this.state.migrate_Cycle_Id

        }

        
        this.props.MigrateCycle(obj);
        window.location.reload('/cycles');
        
      }
      else{
        const obj ={
          Cycle_Name: this.state.cycleName,
          Start_Date: this.state.startDate,
          deptId: localStorage.getItem("dept_Id")

      }
      this.props.CreateNewCycle(obj);
      window.location.reload('/cycles');
      }
        
        
   

        
    }

  render() {
    const {cycles} = this.props;

    return (
        <form style = {{padding: "20px", 
                        border: "1px solid rgba(128, 128, 128, 0.32)", 
                        borderRadius: "15px", 
                        margin: "150px 0"}} onSubmit={this.onSubmit.bind(this)}
                         className="container" id ="main" style={{margin: "0 auto"}}>
        
        <input onChange={this.onChange.bind(this)}
                value ={this.state.cycleName}
                placeholder="Please enter a cycle name"
                type = "text"
                name="cycleName"
                required/>
                <br/>
                <label> Cycle name</label><br/>
                <input onChange={this.onChange.bind(this)}
                        value ={this.state.startDate}
                        type = "text"
                        name="startDate"
                        placeholder="Please enter a start date"
                        

                required/>
                <br/>
                <label> Cycle Start Date</label>
                <br/>

         {this.state.migrate ? <section> 
           <label>Past Cycles</label>
           
          <select style={{display: "flex", border: "1px solid #9e9e9e", width: "75%"}} onChange={this.handleChange.bind(this)} value={this.state.migrate_Cycle_Id} name="migrate_Cycle_Id">
          <option>-- Select a cycle --</option>
            {cycles.previousCycle.map((single, index) => (
              <option key={index} 
                      value={single.Cycle_Id}
                      >{single.Cycle_Name}</option>
            ))}
          </select>
           
           </section> : " "

         }
             
         {this.state.migrate ? " " : <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable cornblue accent-3"
                >
                  Start as a new cycle
                </button>}


              
              {this.state.migrate ? " " :  <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginLeft: "10px"
                  }}
                  onClick={this.onClick}
                  className="btn btn-large waves-effect waves-light hoverable cornblue accent-3"
                >
                  Migrate Cycle
                </button> }

                {this.state.migrate ? <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginLeft: "10px"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable cornblue accent-3"
                >
                  Submit
                </button> : " " }



                
      </form>
    )
  }
}

Cycle.propTypes = {
    CreateNewCycle: PropTypes.func.isRequired,
    CyclesInProgress: PropTypes.func.isRequired,
    GetPreviousCycle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    MigrateCycle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    cycles: state.cycles,
    auth: state.auth
  });

  
export default connect(mapStateToProps,{CreateNewCycle, GetPreviousCycle, CyclesInProgress, MigrateCycle})(Cycle);