import {
  FETCH_JOB,
  FETCH_JOB_SUCCESS,
  ADDING_SEARCH
} from "../constants/actionTypes";

export const initialState = {
  items: [],
  isLoading: false,
  message: null
};

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOB_SUCCESS:
      return {
        items: action.payload,
        isLoading: false
      };
    case FETCH_JOB:
    case ADDING_SEARCH:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};
