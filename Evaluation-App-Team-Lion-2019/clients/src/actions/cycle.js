import Axios from 'axios';

import { NEW_CYCLE, GET_ERRORS, GET_ALL_CYCLES } from './types';

export const CreateNewCycle = (obj) => dispatch =>{
    Axios.post(`http://localhost:5000/cycle/`,
    obj )
    .then(res => {
        dispatch({
            type: NEW_CYCLE,
            payload: res.data
        })
    })
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    })
}

export const GetAllCycle = () => dispatch => {
    Axios.get("http://localhost:5000/cycle/getCycles")
        .then(res => {
            dispatch({
                type: GET_ALL_CYCLES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload:err
            })
        })
}