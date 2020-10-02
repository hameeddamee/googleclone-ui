import { isEmpty } from "../../shared/helpers/validationHelpers";

import {
  SET_CURRENT_USER,
  AUTH_ERRORS,
  AUTH_SUCCESS,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  CLEAR_MESSAGES,
  IS_LOADING,
  IS_LOADING_FALSE,
  VERIFIED_FORGOT_PASSWORD,
  SHOW_AUTH_MSG,
  CLEAR_AUTH_MSG
} from "../actions/authActions";

const initialState = {
  isAuthenticated: false,
  showAuthMsg: false,
  isLoading: false,
  isPasswordReset: false,
  errorMsg: null,
  successMsg: null,
  isLogged: false,
  user: {},
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload,
        isLoading: false,
        role: payload.role,
      };
    case AUTH_ERRORS:
      return { ...state, errorMsg: payload, isLoading: false };
    case CLEAR_ERRORS:
      return { ...state, errorMsg: "" };
    case AUTH_SUCCESS:
      return { ...state, successMsg: payload, isLoading: false };
    case CLEAR_SUCCESS:
      return { ...state, successMsg: "" };
    case CLEAR_MESSAGES:
      return { ...state, successMsg: "", errorMsg: "", showAuthMsg: false};
    case IS_LOADING:
      return { ...state, isLoading: true };
    case IS_LOADING_FALSE:
      return { ...state, isLoading: false };
    case VERIFIED_FORGOT_PASSWORD:
      return { ...state, isLoading: false, isPasswordReset: true };
    case SHOW_AUTH_MSG:
      return { ...state,  showAuthMsg: true };
    case CLEAR_AUTH_MSG:
      return { ...state,  showAuthMsg: false };
    default:
      return state;
  }
}
