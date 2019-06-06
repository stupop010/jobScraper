import {
  FETCH_JOB,
  FETCH_JOB_SUCCESS,
  ADDING_SEARCH,
  ADDING_SEARCH_SUCCESS,
  FETCHING_SEARCHS,
  FETCH_SEARCH_SUCCESS
} from "../constants/actionTypes";

export const initialState = {
  items: [],
  isLoading: false,
  shouldFetchData: false,
  message: null,
  searchs: []
};

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOB_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false
      };
    case FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        shouldFetchData: false,
        searchs: action.payload
      };
    case FETCH_JOB:
    case ADDING_SEARCH:
    case FETCHING_SEARCHS:
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
