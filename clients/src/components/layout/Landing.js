import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../stylesheets/Landing.css";
class Landing extends Component {



  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      if (localStorage.role === "Administrator") {
        this.props.history.push("/dashboard");
      } else if (localStorage.role === "Evaluator") {
        this.props.history.push("/evaluatorDashboard");
      } else {
        this.props.history.push("/admin");
      }
    }
  }
  render() {
    return (
      <div>
        <div id="background" style={{bottom: "1px"}}/>
        <div
          id="maincontent"
          style={{ margin: "25vh auto" }}
          className="container"
        >
          <div className="row landing">
            <div id="main" className="col s12 center-align">
              <h4>
                <b id="title">ULM's Department Evaluation App</b>
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
                  className="btn btn-large waves-effect waves-light hoverable green accent-3"
                >
                  Register
                </Link>
              </div>
              <br />
              <br />
              <br />
              <div className="col s12">
                <Link
                  to="/login"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable green accent-3"
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

Landing.propTypes = {

  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)
(Landing);
