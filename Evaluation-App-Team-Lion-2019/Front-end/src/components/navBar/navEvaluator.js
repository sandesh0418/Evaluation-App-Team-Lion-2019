import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavEvaluator extends Component{

    render(){
        return(
          <>
            <div className="navbar-brand">Evaluator</div>
              <div className="collpase nav-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/" className="nav-link">Log Out</Link>
                  </li>
                </ul>
              </div>
            </>
        );
    }
}

export default NavEvaluator;