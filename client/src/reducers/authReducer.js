import { FETCH_USER } from "../constants/actionTypes";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}
