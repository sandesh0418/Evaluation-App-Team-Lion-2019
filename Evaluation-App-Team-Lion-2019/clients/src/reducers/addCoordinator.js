import { VIEW_COORDINATOR, DELETED_COORDINATOR } from '../actions/types';


const intialState = {
    coordinators: null,
    deleted: null
}


export default function(state = intialState, action){
    switch(action.type){
        case VIEW_COORDINATOR:
            return{
                ...state,
                coordinators: action.payload
            }
        case DELETED_COORDINATOR:
            return{
                ...state,
                deleted: action.payload
            }
        default:
            return state;
    }
}