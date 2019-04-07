import { ADD_EVALUATOR, GET_ERRORS } from './types';
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