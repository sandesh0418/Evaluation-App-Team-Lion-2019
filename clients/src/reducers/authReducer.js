import { SET_CURRENT_USER, PASSWORD_CHANGE} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  password_changed: '',
  user: {},
  
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case PASSWORD_CHANGE:
      return {
        ...state,
        
        password_changed: action.payload
      };
    
    default:
      return state;
  }
}
