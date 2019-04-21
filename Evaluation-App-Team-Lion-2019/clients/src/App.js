import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import axios from 'axios';
import { CyclesInProgress } from './actions/cycle';
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard/Dashboard";
import EvaluatorDashboard from "./components/dashboard/Dashboard/EvaluatorDashboard";
import NavBar from '../src/components/layout/Navbar';
import ViewRubric from './components/dashboard/Rubric/rubricView';
import ViewSummary from './components/dashboard/viewSummary/viewSummary.js';
import RubricList from './components/dashboard/Rubric/rubricList.js';
import MyAssignments from './components/dashboard/Assignment/myAssignments.js';
import EditProgramSummary from './components/dashboard/editProgramSummary/editProgramSummary';
import Rubric from './components/dashboard/Rubric/Rubric';
import CreateRubric from './components/dashboard/Rubric/createRubric';
import CreateAssignment from './components/dashboard/Assignment/createAssignment.js';
import ViewEvaluator from './components/dashboard/Evaluator/viewEvaluator';
import AddEvaluator from './components/dashboard/Evaluator/addEvaluator';
import EvaluateTest from './components/dashboard/evaluateTest';
import EditProfile from './components/dashboard/editProfile';
import Cycle from './components/dashboard/Cycle/cycle';
import ViewCycles from './components/dashboard/Cycle/viewCycle';

import MeasureReport from './components/dashboard/measureReport'
import Admin from './components/dashboard/admin/admin';
import ViewCoordinator from './components/dashboard/admin/viewCoordinator';
import MigrateCycle from './components/dashboard/Cycle/migrateCycle';

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp

  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  localStorage.setItem("email", decoded.email)
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}


class App extends Component {


  
componentDidMount(){

  var dept_Id = localStorage.getItem("Dept_Id");
  
}
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <NavBar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <div className="container pb-5">
              <Switch>
                <PrivateRoute exact path="/gradeRubric/:rubric/:assignment" component={ViewRubric} />
                <PrivateRoute exact path="/evaluateTest/:test/:assignment" component={EvaluateTest} />
                <PrivateRoute exact path="/viewRubric/:rubric" component={ViewRubric} />
                <PrivateRoute exact path="/viewSummary" component={ViewSummary} />
                <PrivateRoute exact path="/summaryReport" component={ViewSummary} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/evaluatorDashboard" component={EvaluatorDashboard} />
                <PrivateRoute exact path="/rubricList" component={RubricList} />
                <PrivateRoute exact path="/myAssignments" component={MyAssignments} />
                <PrivateRoute exact path="/editProgramSummary" component={EditProgramSummary} />
                <PrivateRoute exact path="/Rubric" component={Rubric} />
                <PrivateRoute exact path="/createRubric" component={CreateRubric} />
                <PrivateRoute exact path="/createAssignment" component={CreateAssignment} />
                <PrivateRoute exact path="/viewEvaluator" component={ViewEvaluator} />
                <PrivateRoute exact path="/addEvaluator" component={AddEvaluator} />
                <PrivateRoute exact path="/editProfile" component={EditProfile} />
                <PrivateRoute exact path="/cycle" component={Cycle} />
                <PrivateRoute exact path="/admin" component={Admin} />
                <PrivateRoute exact path="/viewCoordinator" component={ViewCoordinator} />
                <PrivateRoute exact path="/cycles" component={ViewCycles} />
                <PrivateRoute exact path="/migrateCycles" component={MigrateCycle} />
                <PrivateRoute exact path="/measureReport" component={MeasureReport} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}



export default App;
