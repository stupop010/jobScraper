import axios from "axios";
import {
  FETCHING_USER,
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  USER_LOGGED,
  REGISTER_USER_ATTEMPT,
  REGISTER_SUCCESS,
  LOGOUT
} from "../constants/actionTypes";
import setAuthHeader from "../utils/setAuthHeader";

import history from "../history";

export const fetchUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthHeader(localStorage.token);
  }
  dispatch({ type: FETCHING_USER });
  try {
    console.log("autth");
    const res = await axios.get("api/auth");
    dispatch({ type: USER_LOGGED, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = data => async dispatch => {
  dispatch({ type: LOGIN_ATTEMPT });
  try {
    const res = await axios.post("/api/user", data, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error.response);
  }
};

export const registerUser = data => async dispatch => {
  dispatch({ type: REGISTER_USER_ATTEMPT });
  try {
    const res = await axios.post("/api/auth", data, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error.response);
  }
};

export const logout = () => dispatch => {
  console.log("loging out");
  dispatch({ type: LOGOUT });
};

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};
