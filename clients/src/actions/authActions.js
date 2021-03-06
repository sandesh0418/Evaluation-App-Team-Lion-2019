import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, PASSWORD_CHANGE} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Update user info
export const updateUser = (userData)=> dispatch => {
  axios.post("/api/users/update", userData)
  .then(res => 
   dispatch(logoutUser()))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
    );
}

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", res.data.email);
      
      localStorage.setItem("dept_Id", res.data.department);
      localStorage.setItem("name", res.data.name);
      // Decode token to get user data
      const decoded = (token);
      
      // Set current user
      dispatch(setCurrentUser(decoded));

      
      
        
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: 
      decoded
  };
};



// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  localStorage.removeItem("role");
  localStorage.removeItem("name");
  localStorage.removeItem("dept_Id");
  localStorage.removeItem("Rubric_Id");
  localStorage.removeItem("Cycle_Id");
  localStorage.removeItem("email");
  window.location.replace("/login")
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
 
};
