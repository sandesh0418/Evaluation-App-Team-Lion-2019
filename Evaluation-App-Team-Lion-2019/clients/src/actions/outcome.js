import Axios from 'axios';

import { GET_ALL_OUTCOMES, GET_ERRORS } from './types';


export const getOutcome = (CycleId) => dispatch => {
    Axios.get('/outcome/'+`${CycleId}`)
        .then(res =>{
            dispatch({
                type:  GET_ALL_OUTCOMES,
                payload: res.data
            })


        })

        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.data
            })
        })
}