import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { reducer as toastReducer } from "react-redux-toastr";

import outfitReducer from "./outfitReducer";
import sidebarReducer from "./sidebarReducer";
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";

export default combineReducers({
  form: reduxFormReducer,
  notification: toastReducer,
  sidebar: sidebarReducer,
  theme: themeReducer,
  outfit: outfitReducer,
  auth: authReducer,
});
