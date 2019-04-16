import {PREVIOUS_CYCLES, CYCLES_IN_PROGRESS} from '../actions/types';


const initialState = {
    
    previousCycle: null,
    inProgressCycles: null
}


export default function(state = initialState, action){
    switch(action.type){
        
        case PREVIOUS_CYCLES:
            return{
                ...state,
                previousCycle: action.payload
            }
        case CYCLES_IN_PROGRESS:
            return{
                ...state,
                inProgressCycles: action.payload
            }
        default:
            return{
                ...state
            }
    }
}