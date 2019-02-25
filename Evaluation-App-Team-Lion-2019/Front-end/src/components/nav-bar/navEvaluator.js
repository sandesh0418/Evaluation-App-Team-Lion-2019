import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import logo from "../../ulm.jpg";
class NavEvaluator extends Component{

    render(){
        return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-brand" target="_blank">
                  <img src={logo} width="50" height="50" alt="Not available" />
                </button>
                <div className="navbar-brand">Evaluator</div>
                 <div className="collpase nav-collapse">
                  <ul className="navbar-nav mr-auto">
                    
                    <li className="navbar-item">
                      <Link to="/" className="nav-link">Log Out</Link>
                    </li>
                  </ul>
                </div> 
        </nav>
        );
    }
}

export default NavEvaluator;