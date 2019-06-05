import {
  FETCH_JOB,
  FETCH_JOB_SUCCESS,
  ADDING_SEARCH,
  ADDING_SEARCH_SUCCESS
} from "../constants/actionTypes";

export const initialState = {
  items: [],
  isLoading: false,
  shouldFetchData: false,
  message: null
};

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOB_SUCCESS:
      return {
        items: action.payload,
        isLoading: false,
        shouldFetchData: false
      };
    case FETCH_JOB:
    case ADDING_SEARCH:
      return {
        ...state,
        isLoading: true,
        shouldFetchData: false
      };
    case ADDING_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        shouldFetchData: true
      };
    default:
      return state;
  }
};
