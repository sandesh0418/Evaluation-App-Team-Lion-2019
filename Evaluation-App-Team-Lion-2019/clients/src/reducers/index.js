import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import rubricReducer from './rubricReducer';
import cycle from './cycleReducer';
import evaluator from './evaluatorReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  rubric: rubricReducer,
  cycles: cycle,
  evaluator: evaluator
});
