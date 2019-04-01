import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import rubricReducer from './rubricReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  rubric: rubricReducer
});
