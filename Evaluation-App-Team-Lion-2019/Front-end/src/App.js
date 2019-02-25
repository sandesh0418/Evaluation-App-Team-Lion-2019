import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import LogIn from "./LoginPageApp";
import Register from "./Register";
import ViewSummary from "./components/view-summary/view-summary.component";
import Rubric from "./components/view-rubric/view-rubric.component";
import RubricList from "./components/rubric-list/rubric-list.component";
import NavBar from "./components/nav-bar/nav-bar.component";

class App extends Component{

    render(){



        return(
            <Router>
            <div className="container">
              
              
    
              <Route path="/" exact component={LogIn} />
              <Route path="/register" component={Register} />
              <Route path="/view-summary" component={ViewSummary}/>
              <Route path="/rubric" component={Rubric}/>
              <Route path="/rubric-list" component={RubricList}/>
            </div>
          </Router>
        );
      }
    }
    
    export default App;