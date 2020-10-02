import { isEmpty } from "../../shared/helpers/validationHelpers";

import {
  SET_COLLECTIONS,
  SET_COLLECTION_PRODUCTS,
  SET_PRODUCTS_VARIANTS,
  OUTFIT_ERRORS,
  OUTFIT_SUCCESS,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  CLEAR_MESSAGES,
  IS_LOADING,
  IS_LOADING_FALSE,
  SHOW_OUTFIT_MSG,
  CLEAR_OUTFIT_MSG,
} from "../actions/outfitActions";

const initialState = {
  collections: [],
  products: [],
  variants: [],
  showOutfitMsg: false,
  isLoading: false,
  errorMsg: null,
  successMsg: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_COLLECTIONS:
      return {
        ...state,
        collections: payload,
        isLoading: false,
      };
    case SET_COLLECTION_PRODUCTS:
      return {
        ...state,
        products: payload,
        isLoading: false,
      };
    case SET_PRODUCTS_VARIANTS:
      return {
        ...state,
        variants: payload,
        isLoading: false,
      };
    case OUTFIT_ERRORS:
      return { ...state, errorMsg: payload, isLoading: false };
    case CLEAR_ERRORS:
      return { ...state, errorMsg: "" };
    case OUTFIT_SUCCESS:
      return { ...state, successMsg: payload, isLoading: false };
    case CLEAR_SUCCESS:
      return { ...state, successMsg: "" };
    case CLEAR_MESSAGES:
      return { ...state, successMsg: "", errorMsg: "", showOutfitMsg: false };
    case IS_LOADING:
      return { ...state, isLoading: true };
    case IS_LOADING_FALSE:
      return { ...state, isLoading: false };
    case SHOW_OUTFIT_MSG:
      return { ...state, showOutfitMsg: true };
    case CLEAR_OUTFIT_MSG:
      return { ...state, showOutfitMsg: false };
    default:
      return state;
  }
}
