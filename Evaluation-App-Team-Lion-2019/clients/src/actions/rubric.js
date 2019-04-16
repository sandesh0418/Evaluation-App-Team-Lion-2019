import Axios from 'axios';

import { GET_RUBRIC, SET_RUBRIC, LOADING} from './types';

export const getRubric = (title, obj) => dispatch => {
    
    Axios.get(`/rubric/getRubric/${title+" "+obj}`)
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


