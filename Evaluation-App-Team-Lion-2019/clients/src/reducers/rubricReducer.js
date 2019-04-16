import { GET_RUBRIC} from '../actions/types';



const initialState = {
  rubric: null, 
  
  loading: false
  
};


export default function (state = initialState, action){
    switch(action.type){
        case GET_RUBRIC:
                return{
                    ...state,
                    rubric: action.payload
                }

        
        default:
            return state

     }
}