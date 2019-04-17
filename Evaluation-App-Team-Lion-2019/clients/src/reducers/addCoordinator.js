import { VIEW_COORDINATOR, DELETED_COORDINATOR, GET_DEPARTMENT} from '../actions/types';


const intialState = {
    coordinators: null,
    deleted: null,
    getDept: null
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
        case GET_DEPARTMENT:
            return{
                ...state,
                getDept: action.payload
            }
        default:
            return state;
    }
}