import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import { player } from './playerReducer';
import { token } from './apiReducer';

const rootReducer = combineReducers({
  player,
  token,
  gameReducer,
});

export default rootReducer;
