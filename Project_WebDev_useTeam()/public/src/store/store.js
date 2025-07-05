import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../reducers/index';

const store = configureStore({ reducer: playerReducer });

export default store;