import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../../ulm.jpg';
import { Navbar} from 'react-bootstrap';
import {connect } from 'react-redux';

import AdminNavBar from './navAdmin.js';
import EvalNavBar from './navEvaluator.js';
import Nav from './nav';

class NavBar extends Component 
{
    
    render()
    {
        const { user, isAuthenticated} = this.props.auth;
        let userRole = null;
        if (isAuthenticated)
        {
            userRole = localStorage.getItem('role').toLowerCase();
        }
        return (
            <Navbar bg="light" expand="lg" className="mb-5">
                <button className="navbar-brand" target="_blank">
                    <img src={logo} width="50" height="50" alt="Not available" />
                </button>
                {userRole==="administrator" ? <AdminNavBar /> : null}
                {userRole==="evaluator" ? <EvalNavBar /> : null}
                {userRole==="admin" ? <Nav /> : null}
            </Navbar>
          
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(NavBar);