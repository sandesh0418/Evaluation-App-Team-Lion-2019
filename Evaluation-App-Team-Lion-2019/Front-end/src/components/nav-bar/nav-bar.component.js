import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../ulm.jpg";

class NavBar extends Component 
{

    render()
    {
        return (
            
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-brand" target="_blank">
                  <img src={logo} width="50" height="50" alt="Not available" />
                </button>
                <Link to="/view-summary" className="navbar-brand">Department Evaluation</Link>
                <div className="collpase nav-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/view-summary" className="nav-link">View Summary</Link>
                    </li>
                    <li className="navbar-item">
                        <div className="dropdown">
                            <a className="dropdown-toggle" href="#" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Evaluations
                            </a>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <Link to="/gradeRubric" className="nav-link">My Assignments</Link>
                                <Link to="/rubric-list" className="nav-link">Make Assignments</Link>
                            </div>
                        </div>
                    </li>
                    <li className="navbar-item">
                        <Link to="/rubric-list" className="nav-link">Rubrics</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/summary-report" className="nav-link">Report</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/view-summary" className="nav-link">Past Assessments</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Log Out</Link>
                    </li>
                </ul>
                    </div>
                 </nav>
            
        );
    }
}

export default NavBar;