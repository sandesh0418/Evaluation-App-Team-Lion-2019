import Axios from 'axios';

import { GET_RUBRIC, GET_ERRORS} from './types';

export const getRubric = (title) => dispatch => {
    
    Axios.get(`/rubric/getRubric/${title}`)
            .then(res => {
                dispatch({
                    type: GET_RUBRIC,
                    payload: res.data
                })
            })
            .catch(err =>{
                dispatch({
                    type: GET_RUBRIC,
                    payload: err
                })
            })

                
                
}

export const createRubric = (obj) =>dispatch =>{
    Axios.post('/rubric/createRubric', obj)
        .then(res => {
            
            dispatch(getRubric(res.data.Rubric_Id))
        })
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
        })
}


export const updateRubric = (obj) => dispatch => {
    Axios.put(`/rubric/updateRubric/`, obj)
            .then(res => {
               
            })
            .catch(err =>{
                dispatch({
                    type: GET_RUBRIC,
                    payload: err
                })
            })

                
                
}


