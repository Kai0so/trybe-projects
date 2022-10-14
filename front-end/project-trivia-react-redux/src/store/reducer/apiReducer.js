import { ADD_TOKEN } from '../actions';

export const INITIAL_STATE = '';

export const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TOKEN:
    return action.payload;
  default:
    return state;
  }
};
