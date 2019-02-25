import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import logo from "../../ulm.jpg";
class NavEvaluator extends Component{

    render(){
        return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#" target="_blank">
                  <img src={logo} width="50" height="50" alt="Picture not available" />
                </a>
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