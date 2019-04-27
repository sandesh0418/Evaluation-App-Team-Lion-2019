import { GET_RUBRIC, GET_ALL_RUBRICS} from '../actions/types';



const initialState = {
  rubric: null, 
  getAllRubric: null,
  loading: false
  
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
        
        default:
            return state

     }
}