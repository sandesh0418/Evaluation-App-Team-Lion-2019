import Axios from 'axios';

import { GET_CRITERIA, GET_TOP_ROW, GET_DATA, SET_TOP_ROW, GET_ERRORS} from './types';

export const getCriteria = () => dispatch => {
    Axios.get(`http://localhost:5000/rubric/getCriteria/${localStorage.title}`)
            .then(res => {
                dispatch({
                    type: GET_CRITERIA,
                    payload: res.data
                })
            })
            .catch(err =>{
                dispatch({
                    type: GET_CRITERIA,
                    payload: err
                })
            })

                
                
}


export const getTopRow = () => dispatch =>{
    Axios.get(`http://localhost:5000/rubric/getTopRow/${localStorage.title}`)
        .then(res => {
            dispatch({
                type: GET_TOP_ROW,
                payload: res.data
            })
        })
        .catch(err =>{
            dispatch({
                type: GET_TOP_ROW,
                payload: err
            })
        })


}


export const getData = () => dispatch => {
    Axios.get(`http://localhost:5000/rubric/getRow/${localStorage.title}`)
            .then(res => {
                dispatch({
                    type: GET_DATA,
                    payload: res.data
                })
            })
            .catch(err =>{
                dispatch({
                    type: GET_DATA,
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
            dispatch(getTopRow())
           
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
            dispatch(getCriteria())
           
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
            dispatch(getData())
           
        })
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: err.data
            })
        })
}