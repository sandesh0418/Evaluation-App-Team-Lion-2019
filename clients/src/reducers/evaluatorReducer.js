import {GET_ALL_EVALUATOR, FOR_PROGRESS_BAR} from '../actions/types';

const initialState = {
    evaluator: null,
    progressBar: null
}


export default function(state = initialState, action ){
    switch(action.type){
        case GET_ALL_EVALUATOR:
            return{
                ...state,
                evaluator: action.payload
            }

        case FOR_PROGRESS_BAR:
            return{
                ...state,
                progressBar: action.payload
                
            }
        
        default:
            return{
                ...state
            }
    }
}