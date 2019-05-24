import axios from "axios";
import { FETCH_USER } from "../constants/actionTypes";

export const fetchUser = () => async dispatch => {
  dispatch({ type: FETCH_USER });
  try {
    // const res = await axios;
  } catch (error) {}
};
