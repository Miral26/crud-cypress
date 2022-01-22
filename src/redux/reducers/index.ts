import { combineReducers } from "redux";
import PostReducer from "./PostReducer";

const Reducers = combineReducers({
  post: PostReducer,
});

export default Reducers;
