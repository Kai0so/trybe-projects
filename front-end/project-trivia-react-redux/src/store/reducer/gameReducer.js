import { ADD_INDEX } from '../actions';

export const INITIAL_STATE = {
  index: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_INDEX:
    return ({ index: state.index + action.payload });
  default:
    return state;
  }
};

export default gameReducer;
