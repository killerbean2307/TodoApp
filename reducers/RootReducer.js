import { combineReducers } from "redux";
import todoReducer from "./TodoReducer";

const rootReducer = combineReducers({
  todo: todoReducer
});

export default rootReducer;
