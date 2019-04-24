import { GET_ALL_OUTCOMES} from '../actions/types';


const initialState = {
    outcome: null
}


export default function (state= initialState, action){
    switch(action.type){
        case  GET_ALL_OUTCOMES:
            return{
                ...state,
                outcome: action.payload
            }
        default:
            return state
                
            
    }
}