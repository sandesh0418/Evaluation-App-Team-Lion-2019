import React, { Component } from "react";
import { Link } from "react-router-dom";



class Landing extends Component {
  render() {
    return (
      <div>
    
      <div style={{margin: "25vh auto" }} className="container">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>ULM's Department Evaluation App</b> 
            </h4>
            <br />
            <div className="col s12">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable cornblue accent-3"
              >
                Register
              </Link>
              
            </div>
            <br/><br/><br/>
            <div className="col s12">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable cornblue accent-3"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Landing;
