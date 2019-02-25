import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";

import LogIn from "./LoginPageApp";
import Register from "./Register";
import ViewSummary from "./components/view-summary/view-summary.component";
import Rubric from "./components/view-rubric/view-rubric.component";
import RubricList from "./components/rubric-list/rubric-list.component";


class App extends Component{

    render(){

        return(
          <Router>
          <div className="container">
          {console.log("inside div: " + sessionStorage.getItem("userType"))}

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