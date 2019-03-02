import {
  TODO_REQUEST,
  TODO_SUCCESS,
  TODO_FAILURE,
} from './action';

const initialState = {
  fetching: false,
  data: [],
  error: [],
};

export const todoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TODO_REQUEST:
      return {
        ...state,
        fetching: true,
      }
    case TODO_SUCCESS: 
      return {
        ...state,
        fetching: false,
        data: payload,
      }
    case TODO_FAILURE:
      return {
        ...state,
        fetching: false,
        error: payload,
      }
    default:
      return state;
  }
};