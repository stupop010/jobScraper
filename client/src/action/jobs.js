import axios from "axios";
import {
  FETCH_JOB,
  FETCH_JOB_SUCCESS,
  ADDING_SEARCH
} from "../constants/actionTypes";

export const fetchJobs = () => async dispatch => {
  dispatch({ type: FETCH_JOB });
  try {
    const res = await axios.get("/api/jobs");
    console.log(res);
    dispatch({ type: FETCH_JOB_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const addJobSearch = data => async dispatch => {
  dispatch({ type: ADDING_SEARCH });
  try {
    const res = await axios.put("/api/jobs", data, config);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};
