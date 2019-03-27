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
import Rubric from './components/dashboard/rubricView.js';
import ViewSummary from './components/dashboard/viewSummary/viewSummary.js';
import RubricList from './components/dashboard/rubricList.js';
import MyAssignments from './components/dashboard/myAssignments.js';
import EditProgramSummary from './components/dashboard/editProgramSummary/editProgramSummary.js';
import CreateRubric from './components/dashboard/createRubric';
import CreateAssignment from './components/dashboard/createAssignment.js';
import ViewEvaluator from './components/dashboard/viewEvaluator';
import AddEvaluator from './components/dashboard/addEvaluator';

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
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/gradeRubric/:id" component={Rubric} />
                <PrivateRoute exact path="/viewRubric/:id" component={Rubric} />
                <PrivateRoute exact path="/viewSummary" component={ViewSummary} />
                <PrivateRoute exact path="/summaryReport" component={ViewSummary} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/rubricList" component={RubricList} />
                <PrivateRoute exact path="/myAssignments" component={MyAssignments} />
                <PrivateRoute exact path="/editProgramSummary" component={EditProgramSummary} />
                <PrivateRoute exact path="/createRubric" component={CreateRubric} />
                <PrivateRoute exact path="/createAssignment" component={CreateAssignment} />
                <PrivateRoute exact path="/viewEvaluator" component={ViewEvaluator} />
                <PrivateRoute exact path="/addEvaluator" component={AddEvaluator} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;