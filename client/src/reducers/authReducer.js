import {
  FETCHING_USER,
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  USER_LOGGED,
  REGISTER_USER_ATTEMPT,
  REGISTER_SUCCESS,
  LOGOUT
} from "../constants/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case USER_LOGGED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false
      };
    case LOGIN_ATTEMPT:
    case FETCHING_USER:
    case REGISTER_USER_ATTEMPT:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
