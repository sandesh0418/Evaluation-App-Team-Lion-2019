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
            < >
            <Navbar.Toggle aria-controls="basic-navbar-nav"  />
            <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="ml-auto" >
                    <Nav.Link href="/admin" style={{marginRight: "20px"}}>Add Coordinator</Nav.Link>
                    <Nav.Link href="/viewCoordinator" style={{marginRight: "20px"}}>View Coordinators</Nav.Link>
                    <Nav.Link href="/departments" style={{marginRight: "20px"}}>Departments</Nav.Link>
                    <NavDropdown title={User()} style={{marginRight: "50px", width: "100%"}}>
                        <Nav.Link href="/editProfile">Change Password</Nav.Link>
                        <Nav.Link href="/" onClick ={this.onLogOut.bind(this)}>Logout</Nav.Link>
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