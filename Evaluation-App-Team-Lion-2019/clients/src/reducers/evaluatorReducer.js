import {GET_ALL_EVALUATOR } from '../actions/types';

const initialState = {
    evaluator: null
}


export default function(state = initialState, action ){
    switch(action.type){
        case GET_ALL_EVALUATOR:
            return{
                ...state,
                evaluator: action.payload
            }

        default:
            return{
                ...state
            }
    }
}