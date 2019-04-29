import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import { logoutUser} from '../../actions/authActions';

import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import '../../stylesheets/navAdmin.css';

function User() {
    return(
        "Hi "+localStorage.name+"!"
    );
}

class NavBar extends Component 
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
               
                    <Nav.Link href="/myAssignments"  style={{marginRight: "20px"}}>My Assignments</Nav.Link>
                    <Nav.Link href="/receivedMessages"  style={{marginRight: "20px", top: "5px"}}> <i className="fas fa-bell" style={{color: "white"}}></i></Nav.Link>
                    <NavDropdown title={User()}  style={{marginRight: "20px"}}>
                        <Nav.Link href="/editProfile" >Change Password</Nav.Link>
                        <Nav.Link href="/" onClick ={this.onLogOut.bind(this)}>Logout</Nav.Link>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </>
        );
    }
}

NavBar.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect (mapStateToProps, {logoutUser})(NavBar);