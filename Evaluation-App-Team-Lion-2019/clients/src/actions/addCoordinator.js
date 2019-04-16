import axios from 'axios';

import { VIEW_COORDINATOR, GET_ERRORS } from './types';

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


export const viewCoordinator = () => dispatch =>{
    axios.get('/coordinator/viewCoordinator')
        .then(res => {
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