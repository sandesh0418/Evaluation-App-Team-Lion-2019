import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import { logoutUser} from '../../actions/authActions';

import { Navbar, Nav, NavDropdown} from 'react-bootstrap';

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
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/dashboard">Home</Nav.Link>
                    <Nav.Link href="/viewSummary">View Summary</Nav.Link>
                    <NavDropdown title="Assignments">
                        <NavDropdown.Item href="/myAssignments">My Assignments</NavDropdown.Item>
                        <NavDropdown.Item href="/viewSummary">Create Assignment</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Rubrics">
                        <NavDropdown.Item href="/rubricList">Rubric List</NavDropdown.Item>
                        <NavDropdown.Item href="/createRubric">Create Rubric</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/summaryReport">Report</Nav.Link>
                    <Nav.Link href="/dashboard">Past Assesments</Nav.Link>
                    <NavDropdown title="Cycle">
                        <NavDropdown.Item href="/viewSummary">Start Cycle</NavDropdown.Item>
                        <NavDropdown.Item href="/viewSummary">End Cycle</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/" onClick ={this.onLogOut.bind(this)}>Logout</Nav.Link>
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