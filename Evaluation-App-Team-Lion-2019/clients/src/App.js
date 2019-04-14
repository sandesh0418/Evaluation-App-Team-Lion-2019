import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import NavBar from '../src/components/layout/Navbar';
import ViewRubric from './components/dashboard/rubricView.js';
import ViewSummary from './components/dashboard/viewSummary/viewSummary.js';
import RubricList from './components/dashboard/rubricList.js';
import MyAssignments from './components/dashboard/myAssignments.js';
import EditProgramSummary from './components/dashboard/editProgramSummary/editProgramSummary';
import Rubric from './components/dashboard/Rubric';
import CreateRubric from './components/dashboard/createRubric';
import CreateAssignment from './components/dashboard/createAssignment.js';
import ViewEvaluator from './components/dashboard/viewEvaluator';
import AddEvaluator from './components/dashboard/addEvaluator';
import EvaluateTest from './components/dashboard/evaluateTest';
import EditProfile from './components/dashboard/editProfile';
import Cycle from './components/dashboard/cycle';
import EndCycle from './components/dashboard/endCycle';
import Admin from './components/dashboard/admin/admin';

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
                <PrivateRoute exact path="/endCycle" component={EndCycle} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;