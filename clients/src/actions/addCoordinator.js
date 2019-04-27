import axios from "axios";

import {
  VIEW_COORDINATOR,
  DELETED_COORDINATOR,
  GET_DEPARTMENT,
  GET_ERRORS
} from "./types";

export const addCoordinator = obj => dispatch => {
  axios
    .post("/api/coordinator/addCoordinator", obj)
    .then(res => {
      window.location.replace("/viewCoordinator");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addDepartment = obj => dispatch => {
  axios
    .post("/api/coordinator/addDepartment", obj)
    .then(res => {
      window.location.replace("/departments");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getDepartment = () => dispatch => {
  axios
    .get("/api/coordinator/getDepartment")
    .then(res => {
      dispatch({
        type: GET_DEPARTMENT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const viewCoordinator = () => dispatch => {
  axios
    .get("/api/coordinator/viewCoordinator")
    .then(res => {
      dispatch({
        type: VIEW_COORDINATOR,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const viewCoordinatorDeleted = () => dispatch => {
  axios
    .get("/api/coordinator/viewCoordinatorDeleted")
    .then(res => {
      dispatch({
        type: DELETED_COORDINATOR,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
