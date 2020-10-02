import jwt_decode from "jwt-decode";
import LogRocket from "logrocket";
import config from "../../config";
import {
  postData,
  getData,
  setURLParams,
  getBaseURL,
} from "../../shared/helpers/apiAccessHelpers";
export const AUTH_ERRORS = "AUTH_ERRORS";
export const IS_LOADING = "IS_LOADING";
export const IS_LOADING_FALSE = "IS_LOADING_FALSE";
export const VERIFIED_FORGOT_PASSWORD = "VERIFIED_FORGOT_PASSWORD";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";
export const CLEAR_SUCCESS = "CLEAR_SUCCESS";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const CLEAR_CURRENT_USER = "CLEAR_CURRENT_USER";
export const SHOW_AUTH_MSG = "SHOW_AUTH_MSG";
export const CLEAR_AUTH_MSG = "CLEAR_AUTH_MSG";

export const checkAuthState = () => (dispatch) => {
  dispatch({ type: CLEAR_AUTH_MSG });

  if (localStorage.jwtToken) {
    const decoded = jwt_decode(localStorage.jwtToken);
    const currentTime = Date.now() / 1000;

    dispatch(setCurrentUser(JSON.parse(localStorage.user)));

    if (decoded.exp < currentTime) {
      dispatch(logoutUser());
      dispatch(setCurrentUser({}));
      window.location.href = "/login";
    }
  }
};

export const registerUser = (regData, history) => async (dispatch) => {
  try {
    dispatch(clearMessages());
    dispatch(setLoading());
    const baseUrl = getBaseURL();
    const url = new URL(`${baseUrl}/user/sign-up`);
    const urlParams = await setURLParams(url);
    const header = {
      "Content-Type": "application/json",
    };
    const res = await postData(urlParams, header, regData);
    dispatch(setLoadingFalse());
    dispatch({ type: SHOW_AUTH_MSG });
    history.push("/auth/signup-success");
  } catch (err) {
    dispatch({
      type: AUTH_ERRORS,
      payload: err.message,
    });
  }
};

export const requestForgotPassword = (resetData, history) => async (
  dispatch
) => {
  try {
    dispatch(clearMessages());
    dispatch(setLoading());
    const baseUrl = getBaseURL();
    const url = new URL(`${baseUrl}/user/forgot-password`);
    const urlParams = await setURLParams(url);
    const header = {
      "Content-Type": "application/json",
    };
    await postData(urlParams, header, resetData);
    dispatch(setLoadingFalse());
    dispatch({ type: SHOW_AUTH_MSG });
    history.push("/auth/forgot-password-success");
  } catch (err) {
    dispatch({
      type: AUTH_ERRORS,
      payload: err.message,
    });
  }
};
export const verifyForgotPassword = (token) => async (dispatch) => {
  try {
    dispatch(clearMessages());
    dispatch(setLoading());
    const baseUrl = getBaseURL();
    const url = new URL(`${baseUrl}/user/verify-reset-password/${token}`);
    const urlParams = await setURLParams(url);
    const header = {
      "Content-Type": "application/json",
    };
    await getData(urlParams, header);
    dispatch({
      type: VERIFIED_FORGOT_PASSWORD,
    });
  } catch (err) {
    dispatch({ type: SHOW_AUTH_MSG });
    dispatch({
      type: AUTH_ERRORS,
      payload: err.message,
    });
  }
};
export const resetPassword = (payload, token, history) => async (dispatch) => {
  try {
    dispatch(clearMessages());
    dispatch(setLoading());
    const baseUrl = getBaseURL();
    const url = new URL(`${baseUrl}/user/confirm-reset-password/${token}`);
    const urlParams = await setURLParams(url);
    const headers = {
      "Content-Type": "application/json",
    };
    await postData(urlParams, headers, payload);
    dispatch(setLoadingFalse());
    dispatch({ type: SHOW_AUTH_MSG });
    history.push("/auth/confirm-password-success");
  } catch (error) {
    dispatch({
      type: AUTH_ERRORS,
      payload: error.message,
    });
  }
};

export const registerUserWithOauth = (regData, history) => async (dispatch) => {
  try {
    dispatch(clearMessages());
    dispatch(setLoading());
    const baseUrl = getBaseURL();
    const url = new URL(`${baseUrl}/user/sign-up-oauth`);
    const urlParams = await setURLParams(url);
    const header = {
      "Content-Type": "application/json",
    };

    const res = await postData(urlParams, header, regData);
    dispatch(setLoadingFalse());
    dispatch({ type: SHOW_AUTH_MSG });
    history.push("/auth/signup-success");
  } catch (err) {
    dispatch({
      type: AUTH_ERRORS,
      payload: err.message,
    });
  }
};

export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch(clearMessages());
    dispatch(setLoading());
    const baseUrl = getBaseURL();
    const url = new URL(`${baseUrl}/user/login`);
    const urlParams = await setURLParams(url);
    const header = {
      "Content-Type": "application/json",
    };

    const resData = await postData(urlParams, header, formData);
    localStorage.setItem("jwtToken", resData.content.token);
    localStorage.setItem("user", JSON.stringify(resData.content.user));
    dispatch(setCurrentUser(resData.content.user));
  } catch (err) {
    dispatch({
      type: AUTH_ERRORS,
      payload: err.message,
    });
  }
};

export const loginUserWithOauth = (payload) => async (dispatch) => {
  try {
    dispatch(clearMessages());
    dispatch(setLoading());
    const baseUrl = getBaseURL();
    const url = new URL(`${baseUrl}/user/login-oauth`);
    const urlParams = await setURLParams(url);
    const header = {
      "Content-Type": "application/json",
    };

    const resData = await postData(urlParams, header, payload);
    localStorage.setItem("jwtToken", resData.content.token);
    localStorage.setItem("user", JSON.stringify(resData.content.user));
    dispatch(setCurrentUser(resData.content.user));
  } catch (err) {
    dispatch({
      type: AUTH_ERRORS,
      payload: err.message,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
  dispatch(clearCurrentUser());
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  };
};
export const clearSignupError = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
export const clearSignupSuccess = () => {
  return {
    type: CLEAR_SUCCESS,
  };
};
export const setLoading = () => ({
  type: IS_LOADING,
});
export const setLoadingFalse = () => ({
  type: IS_LOADING_FALSE,
});

export const emailVerified = (payload) => ({
  type: EMAIL_VERIFIED,
  payload,
});

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};
export const isLoggedIn = (userData) => {
  return {
    type: LOGIN_USER,
    payload: userData,
  };
};
export const clearLoginErrors = (userData) => {
  return {
    type: LOGIN_ERRORS,
    payload,
  };
};
export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER,
  };
};
export const set2FA = (data) => {
  return {
    type: SET_2FA,
    payload: data,
  };
};
