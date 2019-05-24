import axios from "axios";
import { FETCH_JOB, FETCH_JOB_SUCCESS } from "../constants/actionTypes";

export const fetchJobs = () => async dispatch => {
  dispatch({ type: FETCH_JOB });
  try {
    const res = await axios("/api");
    dispatch({ type: FETCH_JOB_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
