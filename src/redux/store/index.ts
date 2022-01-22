import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Reducers from "../reducers/index";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(Reducers, composeEnhancers(applyMiddleware(thunk)));
