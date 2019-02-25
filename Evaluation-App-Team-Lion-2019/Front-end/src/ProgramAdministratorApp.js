import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import ViewSummary from "./components/view-summary/view-summary.component.js";
import RubricList from "./components/rubric-list/rubric-list.component.js";

class ProgramAdministratorApp extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link to="/viewSummary" className="navbar-brand">Department Evaluation</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/viewSummary" className="nav-link">View Summary</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewSummary" className="nav-link">Evaluations</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/rubricList" className="nav-link">Rubrics</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewSummary" className="nav-link">Report</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewSummary" className="nav-link">Past Assessments</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/viewSummary" exact component={ViewSummary} />
          <Route path="/rubricList" exact component={RubricList} />
        </div>
      </Router>
    );
  }
}

export default ProgramAdministratorApp;
