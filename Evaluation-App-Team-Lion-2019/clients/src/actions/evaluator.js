import { ADD_EVALUATOR, GET_ERRORS, GET_ALL_EVALUATOR } from './types';
import Axios from 'axios';


export const AddNewEvaluator= (obj, history) => dispatch => {
    Axios.post("http://localhost:5000/evaluators/addEvaluator", obj)
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

export const GetAllEvaluator = () => dispatch => {
    Axios.get("http://localhost:5000/evaluators/evaluatorList")
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