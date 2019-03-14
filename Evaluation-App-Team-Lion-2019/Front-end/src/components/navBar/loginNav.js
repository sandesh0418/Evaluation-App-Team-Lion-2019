import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NavBar extends Component 
{
    render()
    {
        return (
          <>
            <Link to="/" className="navbar-brand">Evaluation Application</Link>
              <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Log In</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
              </ul>
            </div>
          </>
        );
    }
}

export default NavBar;