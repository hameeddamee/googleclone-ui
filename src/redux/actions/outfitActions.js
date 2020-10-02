import jwt_decode from "jwt-decode";
import LogRocket from "logrocket";
import config from "../../config";
import {
  postData,
  getData,
  setURLParams,
  getBaseURL,
} from "../../shared/helpers/apiAccessHelpers";
export const OUTFIT_ERRORS = "OUTFIT_ERRORS";
export const IS_LOADING = "IS_LOADING";
export const IS_LOADING_FALSE = "IS_LOADING_FALSE";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const OUTFIT_SUCCESS = "OUTFIT_SUCCESS";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";
export const CLEAR_SUCCESS = "CLEAR_SUCCESS";
export const SET_COLLECTIONS = "SET_COLLECTIONS";
export const SET_COLLECTION_PRODUCTS = "SET_COLLECTION_PRODUCTS";
export const SET_PRODUCTS_VARIANTS = "SET_PRODUCTS_VARIANTS";
export const SHOW_OUTFIT_MSG = "SHOW_OUTFIT_MSG";
export const CLEAR_OUTFIT_MSG = "CLEAR_OUTFIT_MSG";

export const getOutfitCollections = () => async (dispatch) => {
  try {
    dispatch(clearMessages());
    dispatch(setLoading());
    const baseUrl = getBaseURL();
    const url = new URL(`${baseUrl}/outfit/collections`);
    const urlParams = await setURLParams(url);
    const header = {
      "Content-Type": "application/json",
    };
    const resData = await getData(urlParams, header);

    dispatch({
      type: SET_COLLECTIONS,
      payload: resData.content,
    });
  } catch (err) {
    dispatch({ type: SHOW_OUTFIT_MSG });
    dispatch({
      type: OUTFIT_ERRORS,
      payload: err.message,
    });
  }
};

export const getCollectionProducts = (collectionId) => async (dispatch) => {
  try {
    dispatch(clearMessages());
    dispatch(setLoading());
    const baseUrl = getBaseURL();
    const url = new URL(`${baseUrl}/outfit/${collectionId}/all`);
    const urlParams = await setURLParams(url);
    const header = {
      "Content-Type": "application/json",
    };
    const resData = await getData(urlParams, header);

    dispatch({
      type: SET_COLLECTION_PRODUCTS,
      payload: resData.content,
    });
  } catch (err) {
    dispatch({ type: SHOW_OUTFIT_MSG });
    dispatch({
      type: OUTFIT_ERRORS,
      payload: err.message,
    });
  }
};

export const getProductVariants = (productId) => async (dispatch) => {
  try {
    dispatch(clearMessages());
    dispatch(setLoading());
    const baseUrl = getBaseURL();
    const url = new URL(`${baseUrl}/outfit/${productId}/variants`);
    const urlParams = await setURLParams(url);
    const header = {
      "Content-Type": "application/json",
    };
    const resData = await getData(urlParams, header);

    dispatch({
      type: SET_PRODUCTS_VARIANTS,
      payload: resData.content,
    });
  } catch (err) {
    dispatch({ type: SHOW_OUTFIT_MSG });
    dispatch({
      type: OUTFIT_ERRORS,
      payload: err.message,
    });
  }
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  };
};
export const setLoading = () => ({
  type: IS_LOADING,
});
export const setLoadingFalse = () => ({
  type: IS_LOADING_FALSE,
});
