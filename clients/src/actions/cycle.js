import Axios from 'axios';

import { NEW_CYCLE, GET_ERRORS, PREVIOUS_CYCLES, CYCLES_IN_PROGRESS } from './types';

export const CreateNewCycle = (obj) => dispatch =>{
    Axios.post(`/cycle/`,
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


export const GetPreviousCycle = () => dispatch =>{
    Axios.get("/api/cycle/getPreviousCycles/"+localStorage.getItem("dept_Id"))
        .then(res => {
            dispatch({
                type: PREVIOUS_CYCLES,
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

export const CyclesInProgress = () => dispatch => {
    Axios.get("/api/cycle/getCyclesInProgress/"+localStorage.getItem("dept_Id"))
    .then(res => {
        dispatch({
            type: CYCLES_IN_PROGRESS,
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

export const MigrateCycle= (obj) => dispatch => {
    Axios.post('/cycle/migrateCycle', obj)
         .then(res => {

         })
         .catch(err => {
             dispatch({
                 type: GET_ERRORS,
                 payload: err
             })
         })
}

export const EndCycle= (obj) => dispatch => {
    Axios.post('/cycle/endCycle', obj)
         .then(res => {

         })
         .catch(err => {
             dispatch({
                 type: GET_ERRORS,
                 payload: err
             })
         })
}