import Axios from 'axios';

import { NEW_CYCLE, GET_ERRORS } from './types';

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