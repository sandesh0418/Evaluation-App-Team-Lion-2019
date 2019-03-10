import React, { Component } from 'react';
import logo from "../../ulm.jpg";
import './generalNavBar.css'

import AdminNavBar from './navAdmin';
import EvalNavBar from './navEvaluator';
import LoginNav from './loginNav.js';

const user = sessionStorage.getItem('userRole');

class GeneralNavBar extends Component 
{
    render(){
        return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
          <button className="navbar-brand" target="_blank">
            <img src={logo} width="50" height="50" alt="Not available" />
          </button>
          {user==="Administrator" ? <AdminNavBar /> : null}
          {user==="Evaluator" ? <EvalNavBar /> : null}
          {user===null ? <LoginNav /> : null}
        </nav>
        );
    }
}

export default GeneralNavBar;