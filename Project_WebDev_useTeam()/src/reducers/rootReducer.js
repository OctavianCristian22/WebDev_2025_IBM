import { combineReducers } from 'redux';
import playerReducer from './index';
import mapReducer from './map';

const rootReducer = combineReducers({
  player: playerReducer,
  currentMap: mapReducer,
});

export default rootReducer;
