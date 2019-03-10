import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import { logoutUser} from '../../actions/authActions';

import { Navbar, Nav} from 'react-bootstrap';

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
                <Nav className="mr-auto">
                    <Nav.Link href="/dashboard">Evaluator</Nav.Link>
                    <Nav.Link href="/gradeRubric">My Assignments</Nav.Link>
                    <Nav.Link  href="/" onClick ={this.onLogOut.bind(this)}>Logout</Nav.Link>
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