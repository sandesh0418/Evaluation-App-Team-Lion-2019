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
            <Navbar expand="md" className="mb-5 navbar navbar-dark bg-dark">
                <button className="navbar-brand bg-dark" target="_blank">
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