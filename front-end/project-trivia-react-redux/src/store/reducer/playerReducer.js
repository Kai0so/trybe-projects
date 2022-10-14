import { ADD_DATA, ADD_SCORE } from '../actions';

export const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

export const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_DATA:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
      score: 0,
    };
  case ADD_SCORE:
    return {
      ...state, // => player
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};
