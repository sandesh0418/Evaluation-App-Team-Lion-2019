import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './generalNavBar.css';

class NavBar extends Component 
{
    logout()
    {
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('userCWID');
        localStorage.removeItem("jwtToken");
        window.location.assign('/');
    }

    render()
    {
        return (
            <>
                <Link to="/viewSummary" className="navbar-brand">Department Evaluation</Link>
                <div className="collpase nav-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/viewSummary" className="nav-link">View Summary</Link>
                        </li>
                        <li className="navbar-item">
                            <div className="dropdown">
                                <button className="dropdown-toggle btn nav-link" id="dropdownMenuLink" data-toggle="dropdown" 
                                        aria-haspopup="true" aria-expanded="false">
                                    Evaluations
                                </button>
                                <div className="dropdown-menu bg-primary" aria-labelledby="dropdownMenuLink">
                                    <Link to="/gradeRubric" className="nav-link">My Assignments</Link>
                                    <Link to="/rubricList" className="nav-link">Make Assignments</Link>
                                </div>
                            </div>
                        </li>
                        <li className="navbar-item">
                            <Link to="/rubricList" className="nav-link">Rubrics</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/summaryReport" className="nav-link">Report</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/viewSSummary" className="nav-link">Past Assessments</Link>
                        </li>
                        <li className="navbar-item">
                            <button className="btn btn-danger" onClick={this.logout}>Log Out </button>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}

export default NavBar;