import { GET_ALL_OUTCOMES, GET_MEASURES} from '../actions/types';


const initialState = {
    outcome: null,
    measure: null
}


export default function (state= initialState, action){
    switch(action.type){
        case  GET_ALL_OUTCOMES:
            return{
                ...state,
                outcome: action.payload
            }
        case  GET_MEASURES:
            return{
                ...state,
                measure: action.payload
            }
        default:
            return state
                
            
    }
}