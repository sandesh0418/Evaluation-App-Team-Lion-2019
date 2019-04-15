import { VIEW_COORDINATOR } from '../actions/types';

const intialState = {
    coordinators: null
}


export default function(state = intialState, action){
    switch(action.type){
        case VIEW_COORDINATOR:
            return{
                ...state,
                coordinators: action.payload
            }
        default:
            return state;
    }
}