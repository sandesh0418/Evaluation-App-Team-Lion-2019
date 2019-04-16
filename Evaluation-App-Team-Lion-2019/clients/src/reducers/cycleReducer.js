import {GET_ALL_CYCLES} from '../actions/types';


const initialState = {
    cycles: null
}


export default function(state = initialState, action){
    switch(action.type){
        case GET_ALL_CYCLES:
            return{
                ...state,
                cycles: action.payload
            }
        default:
            return{
                ...state
            }
    }
}