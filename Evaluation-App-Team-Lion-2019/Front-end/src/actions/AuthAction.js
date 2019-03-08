
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from '../helper/setAuthToken';

import {GET_ERRORS, SET_CURRENT_USER} from './types';

export function setCurrentUser(decoded){
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}


export function logOut(){
    return dispatch =>{
       localStorage.removeItem("Token");
       localStorage.removeItem("Role");
       setAuthToken(false);
       dispatch(setCurrentUser({}));
   }}


export function login(obj) { 
    return dispatch => {
    return axios
        .post("http://localhost:8000/api/login",obj)
        .then (res=>{
            const token = res.data.token;
            const role = res.data.role;

            localStorage.setItem("Token", token);
            localStorage.setItem("Role",role);
            setAuthToken(token);
            dispatch(setCurrentUser(jwt_decode(token)));

        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.res.data
        })
        );
}}




