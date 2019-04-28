import {GET_ERRORS, GET_ALL_EVALUATOR, FOR_PROGRESS_BAR } from './types';
import Axios from 'axios';


export const AddNewEvaluator= (obj, history) => dispatch => {
    Axios.post("/api/evaluators/addEvaluator", obj)
        .then(res => {
            history.push("/viewEvaluator")
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}


export const ProgressBar = (id) => dispatch => {
    Axios.get("/api/evaluators/evaluatorProgressBar/"+`${id}`)
            .then(res => {
                dispatch({
                    type: FOR_PROGRESS_BAR,
                    payload: res.data
                })
            })

            .catch(err => (
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            ))
}

export const GetAllEvaluator = () => dispatch => {
    Axios.get("/api/evaluators/evaluatorList/"+`${localStorage.getItem("dept_Id")}`)
        .then(res => {
            dispatch({
                type: GET_ALL_EVALUATOR,
                payload: res.data.evaluatorList
            })
        })
        .catch(err => {

            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const deleteEvaluator = (obj) => dispatch =>{
    Axios.post("/api/evaluators/deleteEvaluator", obj)
        .then(res => {
            
        })
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}