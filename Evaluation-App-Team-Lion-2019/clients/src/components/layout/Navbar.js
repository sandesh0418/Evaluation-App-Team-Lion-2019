import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


import { Navbar} from 'react-bootstrap';






class NavBar extends Component 
{
    
    
    render()
    {
        
        return (
        
            <Navbar bg="light" expand="md">
            <Link to="/" className="navbar-brand">ULM Evaluation App</Link>
            
          
          </Navbar>
          
        );
    }
}



export default NavBar;