import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";


import LogIn from "./LoginPageApp";
import Register from "./Register";
import ViewSummary from "./components/viewSummary/viewSummary.js";
import Rubric from "./components/viewRubric/viewRubric";
import RubricList from "./components/rubricList/rubricList";
import GeneralNavBar from './components/navBar/generalNavBar.js';

require('bootstrap');


class App extends Component{

    render(){

        return(
          
          <div className="container darkest-gray pb-2">
            <Router>
              <div>
                <GeneralNavBar />
                <Route exact path="/"  component={LogIn} />
                <Route exact path="/register" component={Register} />
                
                <Route exact path="/viewSummary" component={ViewSummary}/>
                <Route exact path="/summaryReport" component={ViewSummary} />
                <Route exact path="/viewRubric" component={Rubric}/>
                <Route exact path="/gradeRubric" component={Rubric}/>
                <Route exact path="/rubricList" component={RubricList}/>
                
            </div>
          </Router>
        </div>
       
        );
      }
    }
    
    export default App;