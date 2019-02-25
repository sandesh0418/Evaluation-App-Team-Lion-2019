import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../ulm.jpg";


class NavBar extends Component 
{
    render()
    {
        return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-brand" href="#" target="_blank">
                  <img src={logo} width="50" height="50" alt="Not available" />
                </button>
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
              </nav>


);
    }
}

export default NavBar;