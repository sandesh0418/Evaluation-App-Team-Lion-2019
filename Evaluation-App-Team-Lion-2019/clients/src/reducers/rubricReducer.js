import { GET_CRITERIA, GET_TOP_ROW, GET_DATA} from '../actions/types';



const initialState = {
  topRow: null,
  criteria: null,
  data: null, 
  loading: false
  
};


export default function (state = initialState, action){
    switch(action.type){
        case GET_CRITERIA: 
            return{
                ...state,
                criteria: action.payload
            }
        case GET_DATA:
            return{
                ...state,
                data: action.payload
            }
        case GET_TOP_ROW:
            return{
                ...state,
                topRow: action.payload
            }
        default:
            return state

     }
}