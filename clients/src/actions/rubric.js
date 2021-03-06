import Axios from 'axios';

import { GET_RUBRIC, GET_ERRORS, GET_ALL_RUBRICS, RUBRIC} from './types';

export const getRubric = (title) => dispatch => {
    
    Axios.get("/api/rubric/getRubric/"+`${title}`)
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

export const getAllRubric = (CycleId) => dispatch => {
    
    Axios.get(`/api/rubric/getList/${CycleId}`)
            .then(res => {
                dispatch({
                    type: GET_ALL_RUBRICS,
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
    Axios.post('/api/rubric/createRubric', obj)
        .then(res => {
            dispatch({
                type: RUBRIC,
                payload: res.data
            })
            
        })
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}


export const updateRubric = (obj) => dispatch => {
    Axios.put(`/api/rubric/updateRubric/`, obj)
            .then(res => {
               
            })
            .catch(err =>{
                dispatch({
                    type: GET_RUBRIC,
                    payload: err
                })
            })

                
                
}

export const updateTitle= (obj) => dispatch => {
    Axios.put(`/api/rubric/updateTitle/`, obj)
            .then(res => {
               
            })
            .catch(err =>{
                dispatch({
                    type: GET_RUBRIC,
                    payload: err
                })
            })

                
                
}

