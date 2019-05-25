import axios from "axios";
import { FETCHING_USER, LOGIN_ATTEMPT } from "../constants/actionTypes";

export const fetchUser = () => async dispatch => {
  dispatch({ type: FETCHING_USER });
  try {
    // const res = await axios;
  } catch (error) {}
};

export const loginUser = data => async dispatch => {
  console.log(data);
  dispatch({ type: LOGIN_ATTEMPT });
  try {
    // const res = await
  } catch (error) {}
};
