import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import { logoutUser} from '../../actions/authActions';

import { Navbar, Nav, NavDropdown} from 'react-bootstrap';

function User() {
    return(
        "Hi "+localStorage.name+"!"
    );
}

class NavAdmin extends Component 
{
    onLogOut(e){
        e.preventDefault();
        this.props.logoutUser();
    }
    
    render()
    {
        return (
            <>
            <Navbar.Toggle aria-controls="basic-navbar-nav "  />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto" >
                    <Nav.Link href="/dashboard">Home</Nav.Link>
                    <Nav.Link href="/viewSummary">View Summary</Nav.Link>
                    <NavDropdown title="Assignments">
                        <NavDropdown.Item href="/myAssignments">My Assignments</NavDropdown.Item>
                        <NavDropdown.Item href="/createAssignment">Create Assignment</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Evaluators">
                        <NavDropdown.Item href="/addEvaluator">Add Evaluator</NavDropdown.Item>
                        <NavDropdown.Item href="/viewEvaluator">View Evaluator</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Rubrics">
                        <NavDropdown.Item href="/rubricList">Rubric List</NavDropdown.Item>
                        <NavDropdown.Item href="/Rubric">Create Rubric</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Reports">
                        <NavDropdown.Item href="/summaryReport">Summary</NavDropdown.Item>
                        <NavDropdown.Item href="/measureReport">By Measure</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/dashboard">Past Assesments</Nav.Link>
                    <NavDropdown title="Cycle">
                        <NavDropdown.Item href="/cycle">Start a new Cycle</NavDropdown.Item>
                        <NavDropdown.Item href="/cycles">View Cycles</NavDropdown.Item>
                        <NavDropdown.Item href="/migrateCycles">Migrate Cycles</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title={User()}  >
                    
                    <NavDropdown.Item href="/editProfile">Edit Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/" onClick ={this.onLogOut.bind(this)}>Logout</NavDropdown.Item>
                        
                </NavDropdown>
                </Nav> 

            </Navbar.Collapse>

            </>
        );
    }
}

NavAdmin.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(NavAdmin);