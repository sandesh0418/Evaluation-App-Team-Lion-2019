import { GET_RUBRIC, GET_ALL_RUBRICS, RUBRIC} from '../actions/types';



const initialState = {
  rubric: null, 
  getAllRubric: null,
  currentRubric: null
  
};


export default function (state = initialState, action){
    switch(action.type){
        case GET_RUBRIC:
                return{
                    ...state,
                    rubric: action.payload
                }
        case GET_ALL_RUBRICS:
            return{
                ...state,
                getAllRubric: action.payload
                }
        case RUBRIC:
                return{
                    ...state,
                    currentRubric: action.payload
                }
        
        default:
            return state

     }
}