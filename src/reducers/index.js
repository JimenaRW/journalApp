import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { notesReducer } from "./notesReducer";
import { uiReducer } from "./uiReducer";

const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: notesReducer,
});

export default reducer;
