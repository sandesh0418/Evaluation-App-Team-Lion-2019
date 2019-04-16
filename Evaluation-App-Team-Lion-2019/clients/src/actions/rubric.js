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

export const setTopRow = (id, description) => dispatch => {
   
    Axios.post(`http://localhost:5000/rubric/setTopRow/${localStorage.title}`, {
        row: id,
        value: description
    })
        .then(res =>{
            
            
        })
        
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: err.data
            })
        })
}


export const setCriteria = (id, description) => dispatch => {
   
    Axios.post(`http://localhost:5000/rubric/setCriteria/${localStorage.title}`, {
        row: id,
        value: description
    })
        .then(res =>{
            
           
        })
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: err.data
            })
        })

   
}

export const setData = (id, description, criteria) => dispatch => {
   
    Axios.post(`http://localhost:5000/rubric/setData/${localStorage.title}`, {
        row: id,
        value: description
    })
        .then(res =>{
            
           
        })
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: err.data
            })
        })
}
                
                
}


