import { Store, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import initialAppState from "./initialStore";
import { IApplicationState, rootReducer } from "./index";

export default (): Store<IApplicationState> => {
  return createStore(rootReducer, initialAppState, applyMiddleware(thunk));
};
