import axios from 'axios';

import { VIEW_COORDINATOR,DELETED_COORDINATOR,GET_DEPARTMENT, GET_ERRORS } from './types';

export const addCoordinator = (obj) => dispatch =>{
    axios.post('/coordinator/addCoordinator', obj)
        .then(res => {
            window.location.replace('/admin')
        })
        .catch(err => {
            dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })  
        })
}

export const getDepartment = () => dispatch => {
    axios.get('/coordinator/getDepartment')
    .then(res => {
        dispatch({
            type: GET_DEPARTMENT,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch ({
            type: GET_ERRORS,
            payload: err
        })
    })
}


export const viewCoordinator = () => dispatch =>{
    axios.get('/coordinator/viewCoordinator')
        .then(res =>  {
            dispatch({
                type: VIEW_COORDINATOR,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        })
    }

    export const viewCoordinatorDeleted = () => dispatch =>{


        axios.get('/coordinator/viewCoordinatorDeleted')
        .then(res => {
            dispatch({
                type: DELETED_COORDINATOR,
                payload: res.data
            })
           
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        })
}
