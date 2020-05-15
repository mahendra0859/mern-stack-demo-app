import { combineReducers } from "redux";

import authReducer from "./auth";
import toasterReducer from "./toaster";

export default combineReducers({
  authReducer,
  toasterReducer,
});
